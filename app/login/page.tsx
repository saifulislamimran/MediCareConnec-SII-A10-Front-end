"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
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
    setToastMessage(`Redirecting to ${role === 'doctor' ? 'Doctor Clinical' : role === 'admin' ? 'Admin Analytics' : 'Patient'} Portal...`);
    setShowToast(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push(`/dashboard/${role}`);
      router.refresh();
    }, 2000);
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center overflow-x-hidden relative">
      {/* Hero Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 filter blur-sm" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBauiSo7RbxS-XopgORdy3AIwGVbGHZPHa9-H7o83kggrzvUtfPQBq-D6IYjc9OIB7BzFMRKeXIYkI7tQf_ICxLXuNBhEhUh3xYCuY0c57yRyo-EDMVb6bpubnudrw6IHJVDcpIrkVUpqGn_bXtMUynlsoPcoPfMSM7P6M553nhVUFBhodkoQ1uDfy7sdWB85mKyRFCiFyg6YSFBsaZ15J5SvPFYmy-K9cVqeAG8q76eUkV-7lJScSWEGlceNOsU4biCCV-m2GuJWEW')" }}
        ></div>
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
      </div>
      
      {/* Main Content Shell */}
      <main className="relative z-10 w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop flex items-center justify-center pt-20">
        {/* Auth Card Container */}
        <div className="w-full max-w-[480px]">
          <div className="glass-card rounded-xl p-md md:p-lg flex flex-col gap-lg bg-white/45 backdrop-blur-2xl border border-white/30 shadow-lg">
            {/* Brand Anchor Header */}
            <div className="flex flex-col items-center gap-sm">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shadow-lg mb-xs">
                <span className="material-symbols-outlined text-[32px]">health_metrics</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary text-center">MediCare Connect</h1>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 text-center px-sm">Welcome back. Please enter your credentials to access your clinical dashboard.</p>
            </div>
            
            {/* Form Section */}
            <form className="flex flex-col gap-md" onSubmit={handleLogin}>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface ml-xs" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input 
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant/60" 
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
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                  <Link className="font-label-sm text-label-sm text-primary hover:underline transition-all" href="#">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input 
                    className="glass-input w-full pl-10 pr-10 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant/60" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Role Simulation Selector */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface ml-xs" htmlFor="role">Access Portal Role (Simulation)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">verified_user</span>
                  <select 
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-lg font-body-md text-body-md text-on-surface focus:ring-0 focus:outline-none appearance-none cursor-pointer"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                  >
                    <option value="patient">Patient Portal</option>
                    <option value="doctor">Doctor Clinic Portal</option>
                    <option value="admin">Administrator Analytics Portal</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>
              
              <button className="bg-primary hover:bg-primary-container text-on-primary py-4 rounded-lg font-headline-md text-headline-md shadow-md transition-all btn-hover-effect flex items-center justify-center gap-sm mt-sm cursor-pointer" type="submit">
                <span>Login to Portal</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-sm">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant/60">OR CONTINUE WITH</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>
            
            {/* Secondary Auth Actions */}
            <div className="flex flex-col gap-md">
              <button 
                type="button"
                onClick={() => {
                  setEmail('test@medicare.com');
                  setPassword('Password123!');
                  alert('Mock credentials pre-filled. Select role and click Login.');
                }}
                className="glass-card bg-white/20 hover:bg-white/40 border border-white/50 py-3 rounded-lg flex items-center justify-center gap-md transition-all cursor-pointer shadow-sm"
              >
                <img alt="Google" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzHkiYTkeS9MvH-MzeuWG7aN-2Qx-O7zPE0o6zOrEB9nD-tSdi7XlpLLS2QTTfL4qsdKjm5Xp33IulzCdigBEsmO_dvD39VLL7frXGeoYIvOWQdm__hIND-Uw0Ju4IZtXFwCrfh0e6goLqpSuBdS9Ebbwg30-Vn-4m8-JVFc9veAAib8Ojl7o5kzrWn2kqtiM6m7Ois86S4mXjSz2wZsetZKfb1gL9HnZPWmHNouhHFmf6BJZSbC8HpuHwsH22qPpBviXdvfXpKBSx" />
                <span className="font-label-md text-label-md text-on-surface">Sign in with Google</span>
              </button>
              <p className="text-center font-label-md text-label-md text-on-surface-variant">
                Don't have an account? {' '}
                <Link className="text-primary font-bold hover:underline" href="/register">Register Clinic</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed top-1/2 right-margin-desktop -translate-y-1/2 z-50 pointer-events-none transition-all duration-500 flex">
          <div className="toast-slide-in glass-card border-l-4 border-l-primary-container bg-white/90 p-md flex items-center gap-md min-w-[320px] rounded-r-xl shadow-2xl border border-white/35">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-bold">Authentication Successful</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer Identity */}
      <footer className="fixed bottom-0 w-full py-8 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 z-10 pointer-events-none">
        <p className="font-label-sm text-label-sm text-on-surface-variant/70">© 2024 MediCare Connect. Clinical Excellence & Precision.</p>
        <div className="flex gap-lg pointer-events-auto">
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">HIPAA Compliance</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Help Center</Link>
        </div>
      </footer>
    </div>
  );
}
