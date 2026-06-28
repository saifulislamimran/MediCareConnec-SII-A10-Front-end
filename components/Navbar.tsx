"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [user, setUser] = useState<{ name: string; role: 'patient' | 'doctor' | 'admin' } | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('medicare_user');
      if (storedUser) {
        try { setUser(JSON.parse(storedUser)); } 
        catch (e) { console.error(e); }
      } else {
        setUser(null);
      }
    };

    // Load initially
    if (typeof window !== 'undefined') {
      loadUser();
      // Listen for custom auth events from Login/Register pages
      window.addEventListener('auth-change', loadUser);
      // Also listen for multi-tab sync
      window.addEventListener('storage', loadUser);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth-change', loadUser);
        window.removeEventListener('storage', loadUser);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('medicare_user');
    setUser(null);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-sm h-20 transition-all duration-300">
      <div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed cursor-pointer select-none">
          MediCare Connect
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-lg">
          <Link href="/" className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed'}`}>Home</Link>
          <Link href="/doctors" className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/doctors' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed'}`}>Find Doctors</Link>
          <Link href="/about" className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/about' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed'}`}>About Us</Link>
          <Link href="/contact" className={`font-body-md text-body-md transition-all font-semibold ${pathname === '/contact' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed'}`}>Contact Us</Link>
        </div>

        <div className="flex items-center gap-sm md:gap-md">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 text-primary dark:text-primary-fixed hover:bg-primary-container/10 dark:hover:bg-white/5 rounded-full transition-all active:scale-95 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined">{mounted && theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>

          {/* Authentication State Desktop */}
          {!user ? (
            <div className="hidden md:flex items-center gap-sm">
              <Link href="/login" className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md hover:text-primary dark:hover:text-slate-100 transition-all px-2 py-1">Login</Link>
              <Link href="/register" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all shadow-lg shadow-primary/20">Register</Link>
            </div>
          ) : (
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-xs sm:gap-sm border-l border-white/20 dark:border-white/10 pl-sm md:pl-md transition-all cursor-pointer"
              >
                <div className="text-right mr-1">
                  <p className="font-bold text-xs text-on-surface dark:text-slate-100 leading-tight">{user.name}</p>
                  <p className="text-[9px] text-on-surface-variant/70 dark:text-slate-400 leading-tight uppercase tracking-wider">{user.role}</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-primary/30 dark:border-primary-fixed/30 overflow-hidden shadow-sm flex items-center justify-center bg-primary/10 dark:bg-white/5 group hover:border-primary">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-[20px]">account_circle</span>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl z-50 border border-white/30 dark:border-white/10 animate-scale-up">
                  <div className="p-2 flex flex-col gap-1 text-left">
                    <Link href={`/dashboard/${user?.role || 'patient'}`} onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-on-surface dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-white/5 rounded-xl transition-colors font-bold">
                      <span className="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
                    </Link>
                    <Link href="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-on-surface dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-white/5 rounded-xl transition-colors font-bold w-full text-left cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">edit</span> Edit Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-xs text-error hover:bg-error/10 rounded-xl transition-colors font-bold w-full text-left cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">logout</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
             </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-lg animate-scale-up z-40">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800">Home</Link>
            <Link href="/doctors" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800">Find Doctors</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800">About Us</Link>
            
            <div className="h-px bg-gray-200 dark:bg-slate-800 my-2"></div>

            {user ? (
              <>
                <Link href={`/dashboard/${user?.role || 'patient'}`} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-primary dark:text-primary-fixed hover:bg-gray-50 dark:hover:bg-slate-800">Dashboard</Link>
                <Link href="/dashboard/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-primary dark:text-primary-fixed hover:bg-gray-50 dark:hover:bg-slate-800">Edit Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error hover:bg-gray-50 dark:hover:bg-slate-800">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white">Log in</Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
