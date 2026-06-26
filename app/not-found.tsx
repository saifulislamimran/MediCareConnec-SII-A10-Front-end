"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  // Mouse tracking glow effect from original HTML
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.querySelector('.bg-secondary-container\\/20') as HTMLElement;
      if (glow) {
        const rect = glow.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 25;
        const y = (e.clientY - rect.top - rect.height / 2) / 25;
        glow.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-margin-mobile md:px-margin-desktop min-h-[70vh]">
      <div className="max-w-4xl w-full py-xl text-center flex flex-col items-center">
        {/* Animated Visual Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-lg">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-secondary-container/20 blur-3xl rounded-full transition-transform duration-200"></div>
          {/* Medical Illustration */}
          <img 
            className="relative z-10 w-full h-full object-contain drop-shadow-xl animate-float" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBbwyjfECE0oLy3RqdUoDwFFVr5iM3aPLtrUA27szcVWKM0j3IIb5byrmnlDMc7H9nqG9nJYWG-KRqBNKAT3Ip0oaybm350TaKgYgOXdd9KFIU2sCDXf4kDeAlaeDvc4u0lemCgcJIX3UJ0gc3c_5idkW1p79HYU1kYnKR-oulvzYcceT0aRyc_fqlvmmnZ1lETd9E-H53VE75KPO3ImuFifGyKrvdAIyAWyN0LrdQjzA7kZSfi7-g9gDH7XEHNDC7EPGqczfBR1C"
            alt="404 Illustration"
          />
        </div>
        
        {/* Error Content */}
        <div className="space-y-sm max-w-[512px]">
          <h1 className="font-headline-xl text-headline-xl text-primary dark:text-inverse-primary md:text-[64px] md:leading-tight">404</h1>
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100">Page Not Found</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 px-4">
            The requested appointment, profile, or medical record could not be located in our system. It might have been moved or the diagnosis code is invalid.
          </p>
        </div>
        
        {/* Action Area */}
        <div className="mt-lg flex flex-col sm:flex-row gap-gutter justify-center w-full max-w-[448px]">
          {/* Secondary Glass Action */}
          <button 
            onClick={() => router.back()} 
            className="glass px-8 py-3 rounded-xl font-label-md text-label-md text-primary dark:text-inverse-primary flex items-center justify-center gap-2 hover:bg-white/60 dark:hover:bg-white/10 transition-all active:scale-95 border border-primary/20 dark:border-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Go Back
          </button>
          
          {/* Primary Action */}
          <Link 
            className="bg-primary text-on-primary dark:bg-inverse-primary dark:text-on-primary-fixed-variant px-8 py-3 rounded-xl font-label-md text-label-md shadow-lg shadow-primary/20 dark:shadow-inverse-primary/10 flex items-center justify-center gap-2 hover:bg-primary-container dark:hover:bg-primary-fixed transition-all active:scale-95" 
            href="/"
          >
            <span className="material-symbols-outlined">home_health</span>
            Back to Home
          </Link>
        </div>
        
        {/* Help Hints */}
        <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-gutter w-full max-w-3xl">
          <div className="p-md rounded-xl glass border-white/20 dark:border-white/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary mb-2">search</span>
            <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">Check the URL</span>
          </div>
          <div className="p-md rounded-xl glass border-white/20 dark:border-white/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary mb-2">support_agent</span>
            <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">Contact Support</span>
          </div>
          <div className="p-md rounded-xl glass border-white/20 dark:border-white/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary mb-2">home_health</span>
            <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">Visit Help Center</span>
          </div>
        </div>
      </div>
    </main>
  );
}
