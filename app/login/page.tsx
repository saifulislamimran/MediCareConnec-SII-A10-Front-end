"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Sync with MongoDB backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://medi-care-connec-sii-a10-back-end.vercel.app'}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googleId: user.uid,
          avatar: user.photoURL
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Set authenticated session with role from DB
        const authUser = { name: data.user.name, role: data.user.role, email: data.user.email, avatar: data.user.avatar };
        localStorage.setItem('medicare_user', JSON.stringify(authUser));
        
        toast.success(`Welcome back, ${data.user.name}! Accessing dashboard...`);
        setTimeout(() => {
          router.push(`/dashboard/${data.user.role}`);
          router.refresh();
        }, 1500);
      } else {
        toast.error("Failed to sync with backend database.");
      }
    } catch (error) {
      console.error("FIREBASE GOOGLE AUTH ERROR:", error);
      toast.error("An error occurred during Google Authentication.");
    }
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Determine mock name based on role
    let name = "John Doe";
    if (role === 'doctor') name = "Dr. Sarah Smith";
    if (role === 'admin') name = "Administrator";

    // Set simulated session
    const mockUser = { name, role, email };
    localStorage.setItem('medicare_user', JSON.stringify(mockUser));

    // Trigger toast success notification
    toast.success(`Welcome back, ${name}! Accessing dashboard...`);

    // Redirect after 1.5 seconds
    setTimeout(() => {
      router.push(`/dashboard/${role}`);
      router.refresh();
    }, 1500);
  };

  return (
    <div className="bg-background dark:bg-[#0b1120] min-h-screen flex items-center justify-center overflow-x-hidden relative transition-colors duration-300">
      {/* Hero Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 filter blur-sm opacity-50 dark:opacity-20" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBauiSo7RbxS-XopgORdy3AIwGVbGHZPHa9-H7o83kggrzvUtfPQBq-D6IYjc9OIB7BzFMRKeXIYkI7tQf_ICxLXuNBhEhUh3xYCuY0c57yRyo-EDMVb6bpubnudrw6IHJVDcpIrkVUpqGn_bXtMUynlsoPcoPfMSM7P6M553nhVUFBhodkoQ1uDfy7sdWB85mKyRFCiFyg6YSFBsaZ15J5SvPFYmy-K9cVqeAG8q76eUkV-7lJScSWEGlceNOsU4biCCV-m2GuJWEW')" }}
        ></div>
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-[#0b1120]/90 dark:via-[#0b1120]/75 dark:to-[#0b1120]/90"></div>
      </div>
      
      {/* Main Content Shell */}
      <main className="relative z-10 w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop flex items-center justify-center pt-20">
        {/* Auth Card Container */}
        <div className="w-full max-w-[480px]">
          <div className="glass-card rounded-2xl p-md md:p-lg flex flex-col gap-lg bg-white/45 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-lg">
            {/* Brand Anchor Header */}
            <div className="flex flex-col items-center gap-sm">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shadow-lg mb-xs">
                <span className="material-symbols-outlined text-[32px]">health_metrics</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary dark:text-inverse-primary text-center font-extrabold">MediCare Connect</h1>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 text-center px-sm">Welcome back. Please enter your credentials to access your clinical dashboard.</p>
            </div>
            
            {/* Form Section */}
            <form className="flex flex-col gap-md" onSubmit={handleLogin}>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface dark:text-slate-100 ml-xs" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">mail</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 placeholder:text-outline-variant/60 dark:placeholder:text-slate-500 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20" 
                    id="email" 
                    placeholder="dr.smith@medicare.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center px-xs">
                  <label className="font-label-md text-label-md text-on-surface dark:text-slate-100" htmlFor="password">Password</label>
                  <Link className="font-label-sm text-label-sm text-primary dark:text-inverse-primary hover:underline transition-all" href="#">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">lock</span>
                  <input 
                    className="w-full pl-10 pr-10 py-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 placeholder:text-outline-variant/60 dark:placeholder:text-slate-500 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
 
              {/* Role Simulation Selector */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface dark:text-slate-100 ml-xs" htmlFor="role">Access Portal Role (Simulation)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">verified_user</span>
                  <select 
                    className="w-full pl-10 pr-10 py-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20 appearance-none cursor-pointer"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                  >
                    <option value="patient" className="dark:bg-slate-900 dark:text-slate-100">Patient Portal</option>
                    <option value="doctor" className="dark:bg-slate-900 dark:text-slate-100">Doctor Clinic Portal</option>
                    <option value="admin" className="dark:bg-slate-900 dark:text-slate-100">Administrator Analytics Portal</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline dark:text-slate-400">expand_more</span>
                </div>
              </div>
              
              <button className="bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant hover:bg-primary-container dark:hover:bg-primary-fixed py-4 rounded-lg font-headline-md text-headline-md shadow-md dark:shadow-inverse-primary/10 transition-all flex items-center justify-center gap-sm mt-sm cursor-pointer" type="submit">
                <span>Login to Portal</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-sm">
              <div className="h-[1px] flex-1 bg-outline-variant/30 dark:bg-white/10"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant/60 dark:text-slate-500">OR CONTINUE WITH</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30 dark:bg-white/10"></div>
            </div>
            
            {/* Secondary Auth Actions */}
            <div className="flex flex-col gap-md">
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="glass-card bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 border border-white/50 dark:border-white/10 py-3 rounded-lg flex items-center justify-center gap-md transition-all cursor-pointer shadow-sm"
              >
                <img alt="Google" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzHkiYTkeS9MvH-MzeuWG7aN-2Qx-O7zPE0o6zOrEB9nD-tSdi7XlpLLS2QTTfL4qsdKjm5Xp33IulzCdigBEsmO_dvD39VLL7frXGeoYIvOWQdm__hIND-Uw0Ju4IZtXFwCrfh0e6goLqpSuBdS9Ebbwg30-Vn-4m8-JVFc9veAAib8Ojl7o5kzrWn2kqtiM6m7Ois86S4mXjSz2wZsetZKfb1gL9HnZPWmHNouhHFmf6BJZSbC8HpuHwsH22qPpBviXdvfXpKBSx" />
                <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">Sign in with Google</span>
              </button>
              <p className="text-center font-label-md text-label-md text-on-surface-variant dark:text-slate-400">
                Don't have an account? {' '}
                <Link className="text-primary dark:text-inverse-primary font-bold hover:underline" href="/register">Register Clinic</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      

      
      {/* Footer Identity */}
      <footer className="fixed bottom-0 w-full py-8 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 z-10 pointer-events-none">
        <p className="font-label-sm text-label-sm text-on-surface-variant/70 dark:text-slate-500">© 2024 MediCare Connect. Clinical Excellence & Precision.</p>
        <div className="flex gap-lg pointer-events-auto">
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 dark:text-slate-500 hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">HIPAA Compliance</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 dark:text-slate-500 hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Help Center</Link>
        </div>
      </footer>
    </div>
  );
}
