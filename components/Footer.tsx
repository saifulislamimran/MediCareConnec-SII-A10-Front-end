"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <footer className="w-full rounded-t-xl bg-surface-container dark:bg-slate-900 border-t border-outline-variant dark:border-white/10 mt-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg px-margin-desktop py-xl max-w-7xl mx-auto text-left">
        <div>
          <div className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-slate-100 mb-md">
            MediCare Connect
          </div>
          <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md leading-relaxed">
            Modern healthcare solutions for everyone, everywhere.
          </p>
          <div className="flex gap-md mt-md">
            <Link 
              className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-fixed/10 flex items-center justify-center text-primary dark:text-primary-fixed hover:bg-primary dark:hover:bg-primary-fixed hover:text-white dark:hover:text-on-primary-fixed transition-all" 
              href="#"
              aria-label="Social Link"
            >
              <span className="material-symbols-outlined">public</span>
            </Link>
            <Link 
              className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-fixed/10 flex items-center justify-center text-primary dark:text-primary-fixed hover:bg-primary dark:hover:bg-primary-fixed hover:text-white dark:hover:text-on-primary-fixed transition-all" 
              href="#"
              aria-label="Social Link"
            >
              <span className="material-symbols-outlined">share</span>
            </Link>
          </div>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-slate-100 mb-md">Quick Links</h6>
          <ul className="space-y-sm">
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all underline font-label-md text-label-md" href="#">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all underline font-label-md text-label-md" href="#">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all underline font-label-md text-label-md" href="#">
                Patient Rights
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all underline font-label-md text-label-md" href="#">
                Emergency Care
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-slate-100 mb-md">Specializations</h6>
          <ul className="space-y-sm">
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all font-label-md text-label-md" href="/doctors">
                Cardiology
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all font-label-md text-label-md" href="/doctors">
                Neurology
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all font-label-md text-label-md" href="/doctors">
                Pediatrics
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed transition-all font-label-md text-label-md" href="/doctors">
                Orthopedics
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-slate-100 mb-md">Newsletter</h6>
          <p className="text-on-surface-variant dark:text-slate-400 text-label-md mb-md leading-relaxed">
            Get the latest health updates directly to your inbox.
          </p>
          <div className="flex">
            <input 
              className="bg-surface dark:bg-white/5 border border-outline-variant dark:border-white/10 text-on-surface dark:text-slate-100 rounded-l-xl px-4 py-2 w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
              placeholder="Your email" 
              type="email"
              aria-label="Email address for newsletter"
            />
            <button className="bg-primary dark:bg-primary-container text-on-primary px-4 py-2 rounded-r-xl hover:opacity-90 transition-opacity flex items-center justify-center shrink-0" aria-label="Subscribe">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant dark:border-white/10 py-md text-center">
        <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md">
          © 2024 MediCare Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
