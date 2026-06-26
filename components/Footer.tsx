"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-3xl bg-white/40 dark:bg-[#0b1120]/60 backdrop-blur-xl border-t border-white/20 dark:border-white/10 mt-auto shadow-2xl relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg px-margin-mobile md:px-margin-desktop py-xl max-w-7xl mx-auto">
        <div className="flex flex-col space-y-md">
          <div className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-slate-100 flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            MediCare Connect
          </div>
          <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md leading-relaxed">
            Modern healthcare solutions for everyone, everywhere. Bridging the gap between clinical excellence and digital accessibility.
          </p>
          <div className="flex gap-md mt-sm">
            <Link 
              className="w-10 h-10 rounded-full bg-primary/10 dark:bg-white/5 flex items-center justify-center text-primary dark:text-inverse-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95 shadow-sm" 
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </Link>
            <Link 
              className="w-10 h-10 rounded-full bg-primary/10 dark:bg-white/5 flex items-center justify-center text-primary dark:text-inverse-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95 shadow-sm" 
              href="#"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </Link>
          </div>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-slate-100 mb-md tracking-wide uppercase text-xs">Quick Links</h6>
          <ul className="space-y-sm">
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="#">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="#">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="#">
                Patient Rights
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="#">
                Emergency Care
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-slate-100 mb-md tracking-wide uppercase text-xs">Specializations</h6>
          <ul className="space-y-sm">
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="/doctors">
                Cardiology
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="/doctors">
                Neurology
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="/doctors">
                Pediatrics
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-label-md text-label-md" href="/doctors">
                Orthopedics
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-md">
          <h6 className="font-bold text-on-surface dark:text-slate-100 tracking-wide uppercase text-xs">Newsletter</h6>
          <p className="text-on-surface-variant dark:text-slate-400 text-label-md leading-relaxed">
            Get the latest health updates directly to your inbox.
          </p>
          <div className="flex glass rounded-xl border border-white/20 dark:border-white/10 overflow-hidden shadow-inner bg-white/20 dark:bg-black/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input 
              className="bg-transparent border-none px-4 py-2 w-full focus:ring-0 outline-none text-on-surface dark:text-slate-100 text-label-md placeholder-on-surface-variant/40 dark:placeholder-slate-500" 
              placeholder="Your email" 
              type="email"
              aria-label="Email address for newsletter"
            />
            <button className="bg-primary text-on-primary px-4 py-2 hover:bg-primary-container transition-colors active:scale-95 flex items-center justify-center shrink-0" aria-label="Subscribe">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 dark:border-white/5 py-md text-center bg-black/5 dark:bg-black/20">
        <p className="text-on-surface-variant dark:text-slate-500 font-label-md text-label-md">
          © 2026 MediCare Connect. All rights reserved. HIPAA Compliant Secure Portal.
        </p>
      </div>
    </footer>
  );
}
