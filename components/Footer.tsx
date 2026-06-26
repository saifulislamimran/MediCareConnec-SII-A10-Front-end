"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-xl bg-surface-container dark:bg-surface-container-high border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg px-margin-desktop py-xl max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-on-surface mb-md">
            MediCare Connect
          </div>
          <p className="text-on-surface-variant dark:text-on-surface-variant/80 font-label-md text-label-md">
            Modern healthcare solutions for everyone, everywhere.
          </p>
          <div className="flex gap-md mt-md">
            <Link 
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-primary-fixed hover:bg-primary hover:text-white transition-all" 
              href="#"
            >
              <span className="material-symbols-outlined">public</span>
            </Link>
            <Link 
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-primary-fixed hover:bg-primary hover:text-white transition-all" 
              href="#"
            >
              <span className="material-symbols-outlined">share</span>
            </Link>
          </div>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-on-surface mb-md">Quick Links</h6>
          <ul className="space-y-sm">
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all underline font-label-md text-label-md" href="#">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all underline font-label-md text-label-md" href="#">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all underline font-label-md text-label-md" href="#">
                Patient Rights
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all underline font-label-md text-label-md" href="#">
                Emergency Care
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-on-surface mb-md">Specializations</h6>
          <ul className="space-y-sm">
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all font-label-md text-label-md" href="/doctors">
                Cardiology
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all font-label-md text-label-md" href="/doctors">
                Neurology
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all font-label-md text-label-md" href="/doctors">
                Pediatrics
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-all font-label-md text-label-md" href="/doctors">
                Orthopedics
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="font-bold text-on-surface dark:text-on-surface mb-md">Newsletter</h6>
          <p className="text-on-surface-variant dark:text-on-surface-variant/80 text-label-md mb-md">
            Get the latest health updates directly to your inbox.
          </p>
          <div className="flex">
            <input 
              className="bg-surface dark:bg-on-surface border border-outline-variant dark:border-outline rounded-l-xl px-4 py-2 w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface dark:text-on-primary-container placeholder-on-surface-variant/50" 
              placeholder="Your email" 
              type="email"
            />
            <button className="bg-primary text-on-primary px-4 py-2 rounded-r-xl hover:bg-primary-container transition-colors active:scale-95">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant dark:border-outline/30 py-md text-center">
        <p className="text-on-surface-variant dark:text-on-surface-variant/60 font-label-md text-label-md">
          © 2024 MediCare Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
