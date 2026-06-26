"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple state for auth role simulation (could be patient, doctor, admin)
  // Initially null (logged out) to show Login/Register
  const [user, setUser] = useState<{ name: string; role: 'patient' | 'doctor' | 'admin' } | null>(null);

  // Read mock user from localStorage if it exists for persistent role testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('medicare_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('medicare_user');
    setUser(null);
    setIsProfileOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 dark:bg-surface-dim/70 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-sm h-20">
      <div className="flex justify-between items-center h-full px-margin-desktop max-w-7xl mx-auto">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary cursor-pointer select-none">
          MediCare Connect
        </Link>
        
        <div className="hidden md:flex items-center gap-lg">
          <Link 
            href="/" 
            className={`font-body-md text-body-md transition-all ${pathname === '/' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1 font-semibold' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed'}`}
          >
            Home
          </Link>
          <Link 
            href="/doctors" 
            className={`font-body-md text-body-md transition-all ${pathname === '/doctors' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1 font-semibold' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed'}`}
          >
            Find Doctors
          </Link>
          <Link 
            href="/about" 
            className={`font-body-md text-body-md transition-all ${pathname === '/about' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1 font-semibold' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed'}`}
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            className={`font-body-md text-body-md transition-all ${pathname === '/contact' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1 font-semibold' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed'}`}
          >
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-md">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 text-primary dark:text-primary-fixed-dim hover:bg-primary-container/10 rounded-full transition-all"
            id="theme-toggle"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined">
              {mounted && theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Authentication State */}
          {!user ? (
            <>
              <Link href="/login" className="hidden sm:block text-on-surface-variant dark:text-on-surface-variant/80 font-label-md text-label-md hover:text-primary transition-all">
                Login
              </Link>
              <Link href="/register" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-sm border-l border-white/20 dark:border-white/10 pl-md"
              >
                <div className="text-right hidden lg:block mr-2">
                  <p className="font-label-md text-label-md font-bold text-on-surface dark:text-on-primary-container leading-tight">{user.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/60 leading-tight uppercase">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm flex items-center justify-center bg-primary/10">
                  <span className="material-symbols-outlined text-primary">account_circle</span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 glass dark:bg-on-surface/90 rounded-2xl overflow-hidden shadow-2xl z-50 border border-white/20">
                  <div className="p-2 flex flex-col gap-1">
                    <Link 
                      href={`/dashboard/${user.role}`}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-primary/10 rounded-xl transition-colors font-medium"
                    >
                      <span className="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/10 rounded-xl transition-colors font-medium w-full text-left"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
