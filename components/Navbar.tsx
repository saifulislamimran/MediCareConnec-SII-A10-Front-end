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

  const [user, setUser] = useState<{ name: string; role: 'patient' | 'doctor' | 'admin' } | null>(null);

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
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#0b1120]/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-lg h-20 transition-all duration-300">
      <div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary cursor-pointer select-none flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary dark:text-inverse-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          <span className="hidden sm:inline font-extrabold">MediCare Connect</span>
          <span className="sm:hidden font-extrabold">MediCare</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-lg">
          <Link 
            href="/" 
            className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/' ? 'text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`}
          >
            Home
          </Link>
          <Link 
            href="/doctors" 
            className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/doctors' ? 'text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`}
          >
            Find Doctors
          </Link>
          <Link 
            href="/about" 
            className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/about' ? 'text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`}
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/contact' ? 'text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`}
          >
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-sm md:gap-md">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2.5 text-primary dark:text-inverse-primary hover:bg-primary/10 dark:hover:bg-white/5 rounded-full transition-all active:scale-95 flex items-center justify-center border border-transparent hover:border-white/10"
            id="theme-toggle"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mounted && theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Authentication State */}
          {!user ? (
            <div className="flex items-center gap-sm">
              <Link href="/login" className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary font-bold text-xs md:text-sm transition-all px-2 py-1">
                Login
              </Link>
              <Link href="/register" className="bg-primary text-on-primary px-4 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm hover:bg-primary-container transition-all active:scale-95 shadow-md shadow-primary/20 hover:shadow-lg">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-xs sm:gap-sm border-l border-white/20 dark:border-white/10 pl-sm md:pl-md transition-all cursor-pointer"
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
              >
                <div className="text-right hidden lg:block mr-1">
                  <p className="font-bold text-xs text-on-surface dark:text-slate-100 leading-tight">{user.name}</p>
                  <p className="text-[9px] text-on-surface-variant/70 dark:text-slate-400 leading-tight uppercase tracking-wider">{user.role}</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-primary/30 dark:border-inverse-primary/30 overflow-hidden shadow-sm flex items-center justify-center bg-primary/10 dark:bg-white/5 group hover:border-primary">
                  <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-[20px]">account_circle</span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl z-50 border border-white/20 dark:border-white/10 animate-scale-up">
                  <div className="p-2 flex flex-col gap-1">
                    <Link 
                      href={`/dashboard/${user.role}`}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-on-surface dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-white/5 rounded-xl transition-colors font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-error hover:bg-error/10 rounded-xl transition-colors font-bold w-full text-left cursor-pointer"
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
