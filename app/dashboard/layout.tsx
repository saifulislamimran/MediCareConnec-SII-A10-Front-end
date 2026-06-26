"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Simulated session user
  const [user, setUser] = useState<{ name: string; role: 'patient' | 'doctor' | 'admin'; email: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('medicare_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      } else {
        // Default fallback for demo testing so dashboard is never blank
        const defaultUser = { name: "Dr. Sarah Smith", role: "admin" as const, email: "admin@medicare.com" };
        localStorage.setItem('medicare_user', JSON.stringify(defaultUser));
        setUser(defaultUser);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('medicare_user');
    router.push('/login');
    router.refresh();
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#0b1120]">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Sidebar Links config based on role
  const getSidebarLinks = () => {
    switch (user.role) {
      case 'admin':
        return [
          { name: 'Analytics Overview', href: '/dashboard/admin', icon: 'analytics' },
          { name: 'Manage Users', href: '/dashboard/admin/users', icon: 'group' },
          { name: 'Verify Doctors', href: '/dashboard/admin/doctors', icon: 'verified' },
          { name: 'System Monitoring', href: '/dashboard/admin/monitoring', icon: 'monitor_heart' },
        ];
      case 'doctor':
        return [
          { name: 'Doctor Overview', href: '/dashboard/doctor', icon: 'home_health' },
          { name: 'Prescriptions', href: '/dashboard/doctor/prescriptions', icon: 'medication' },
        ];
      case 'patient':
        return [
          { name: 'Patient Overview', href: '/dashboard/patient', icon: 'person' },
          { name: 'My Appointments', href: '/dashboard/patient/appointments', icon: 'calendar_month' },
          { name: 'Payments & Reviews', href: '/dashboard/patient/payments-reviews', icon: 'rate_review' },
        ];
      default:
        return [];
    }
  };

  const links = getSidebarLinks();

  return (
    <div className="min-h-screen flex text-body-md text-on-surface dark:text-slate-100 bg-background dark:bg-[#0b1120] transition-colors duration-300">
      {/* Sidebar Navigation - Desktop */}
      <aside className="h-screen w-64 left-0 top-0 fixed bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-white/20 dark:border-white/10 shadow-xl flex flex-col p-md space-y-base z-50 hidden md:flex">
        <div className="mb-lg flex items-center gap-base">
          <Link href="/" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          </Link>
          <span className="font-headline-md text-headline-md font-extrabold text-primary dark:text-inverse-primary">MediCare</span>
        </div>
        
        <nav className="flex-1 space-y-xs overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-sm px-sm py-base rounded-lg font-bold transition-all duration-200 hover:translate-x-1 ${
                  isActive 
                    ? 'bg-primary/10 text-primary dark:text-inverse-primary' 
                    : 'text-on-surface-variant/80 dark:text-slate-400 hover:bg-primary/5 hover:text-primary dark:hover:text-inverse-primary'
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="font-label-md text-label-md">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="pt-base border-t border-white/20 dark:border-white/10 space-y-xs">
          <button 
            onClick={() => alert("Emergency alert broadcasted to healthcare team.")}
            className="w-full bg-primary text-on-primary py-sm rounded-xl font-bold flex items-center justify-center gap-xs hover:bg-primary-container transition-colors active:scale-95 duration-200 cursor-pointer shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            Emergency Alert
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-sm px-sm py-base text-on-surface-variant/70 dark:text-slate-400 hover:text-error dark:hover:text-error transition-all duration-200 text-left font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Navigation - Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          <aside className="relative w-64 max-w-xs bg-white/90 dark:bg-slate-900/90 h-full p-md flex flex-col space-y-base shadow-2xl border-r border-white/20 dark:border-white/10 animate-slide-in">
            <div className="mb-lg flex items-center justify-between">
              <div className="flex items-center gap-base">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                </div>
                <span className="font-headline-md text-headline-md font-extrabold text-primary dark:text-inverse-primary">MediCare</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <nav className="flex-1 space-y-xs overflow-y-auto">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-sm px-sm py-base rounded-lg font-bold transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/10 text-primary dark:text-inverse-primary' 
                        : 'text-on-surface-variant/80 dark:text-slate-400 hover:bg-primary/5 hover:text-primary dark:hover:text-inverse-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined">{link.icon}</span>
                    <span className="font-label-md text-label-md">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="pt-base border-t border-white/20 dark:border-white/10 space-y-xs">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  alert("Emergency alert broadcasted.");
                }}
                className="w-full bg-primary text-on-primary py-sm rounded-xl font-bold flex items-center justify-center gap-xs shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                Emergency Alert
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-sm px-sm py-base text-on-surface-variant/70 dark:text-slate-400 hover:text-error dark:hover:text-error transition-all text-left font-bold"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-md text-label-md">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="top-0 sticky z-40 bg-white/60 dark:bg-[#0b1120]/75 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-sm max-w-7xl mx-auto h-20">
            <div className="flex items-center gap-md">
              <button className="md:hidden p-xs text-on-surface-variant dark:text-slate-400" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open sidebar menu">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="hidden lg:flex items-center gap-lg">
                <Link className={`font-label-md text-label-md transition-colors ${pathname.includes('admin') ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-on-surface-variant/80 dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`} href="/dashboard/admin">Admin Panel</Link>
                <Link className={`font-label-md text-label-md transition-colors ${pathname.includes('doctor') ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-on-surface-variant/80 dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`} href="/dashboard/doctor">Doctor Portal</Link>
                <Link className={`font-label-md text-label-md transition-colors ${pathname.includes('patient') ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-on-surface-variant/80 dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'}`} href="/dashboard/patient">Patient Portal</Link>
              </div>
            </div>
            
            <div className="flex items-center gap-md">
              <div className="relative hidden sm:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 dark:text-slate-500">search</span>
                <input className="pl-10 pr-4 py-2 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/35 dark:border-white/10 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-label-md text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/50 dark:placeholder:text-slate-500" placeholder="Search patients or records..." type="text"/>
              </div>
              <div className="flex items-center gap-sm">
                <button className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/5 text-on-surface-variant dark:text-slate-400 transition-all duration-300 relative" aria-label="Notifications">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-white dark:border-slate-900"></span>
                </button>
                <button 
                  onClick={() => router.push('/')}
                  className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/5 text-on-surface-variant dark:text-slate-400 transition-all duration-300"
                  title="Go to Home"
                  aria-label="Go to home"
                >
                  <span className="material-symbols-outlined">home</span>
                </button>
              </div>
              
              <div className="flex items-center gap-sm border-l border-white/20 dark:border-white/10 pl-md">
                <div className="text-right hidden lg:block mr-2">
                  <p className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-100 leading-tight">{user.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/60 dark:text-slate-400 leading-tight uppercase">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden shadow-sm flex items-center justify-center bg-primary/10 dark:bg-white/5">
                  <span className="material-symbols-outlined text-primary dark:text-inverse-primary">account_circle</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Canvas */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-md">
          {children}
        </main>
      </div>
    </div>
  );
}
