"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [showPassword, setShowPassword] = useState(false);

  // Real-time password validation state
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // Run validation checks on password input change
  useEffect(() => {
    setHasMinLength(password.length >= 6);
    setHasNumber(/\d/.test(password));
    // eslint-disable-next-line no-useless-escape
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>_+\-\[\]\\\/]/.test(password));
  }, [password]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!hasMinLength || !hasNumber || !hasSpecialChar) {
      toast.error("Please satisfy all password security requirements.");
      return;
    }

    // Set simulated session
    const mockUser = { name: fullname, role, email };
    localStorage.setItem('medicare_user', JSON.stringify(mockUser));

    // Trigger toast success notification
    toast.success("Account created successfully. Accessing dashboard...");

    // Redirect after 1.5 seconds
    setTimeout(() => {
      router.push(`/dashboard/${role}`);
      router.refresh();
    }, 1500);
  };

  return (
    <div className="bg-background dark:bg-[#0b1120] min-h-screen flex flex-col font-body-md text-on-surface dark:text-slate-100 transition-colors duration-300">
      {/* Global Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 bg-white/40 dark:bg-[#0b1120]/40 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          MediCare Connect
        </Link>
        <Link className="text-primary dark:text-inverse-primary font-label-md flex items-center gap-1 hover:opacity-80 transition-opacity" href="#">
          <span className="material-symbols-outlined">help_outline</span>
          Support
        </Link>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-32 pb-12 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBauiSo7RbxS-XopgORdy3AIwGVbGHZPHa9-H7o83kggrzvUtfPQBq-D6IYjc9OIB7BzFMRKeXIYkI7tQf_ICxLXuNBhEhUh3xYCuY0c57yRyo-EDMVb6bpubnudrw6IHJVDcpIrkVUpqGn_bXtMUynlsoPcoPfMSM7P6M553nhVUFBhodkoQ1uDfy7sdWB85mKyRFCiFyg6YSFBsaZ15J5SvPFYmy-K9cVqeAG8q76eUkV-7lJScSWEGlceNOsU4biCCV-m2GuJWEW')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-[#0b1120]/90 dark:to-[#0b1120]/50 opacity-100 dark:opacity-20"></div>
        </div>

        {/* Auth Card Container */}
        <div className="relative z-10 w-full max-w-[576px] animate-fade-in">
          <div className="glass-card p-8 md:p-12 rounded-2xl flex flex-col gap-8 border border-white/20 dark:border-white/10 bg-white/45 dark:bg-slate-900/60 backdrop-blur-2xl shadow-xl">
            <div className="text-center space-y-2">
              <h1 className="font-headline-xl text-headline-xl text-primary dark:text-inverse-primary tracking-tight font-extrabold">Create Account</h1>
              <p className="text-on-surface-variant dark:text-slate-400 font-body-md">Join the next generation of clinical precision.</p>
            </div>
            
            <form className="flex flex-col gap-6" onSubmit={handleRegister}>
              {/* Photo Upload UI */}
              <div className="flex flex-col gap-3">
                <label className="font-label-md text-on-surface-variant dark:text-slate-300">Profile Identification</label>
                <div 
                  className="relative border-2 border-dashed border-outline-variant/30 dark:border-white/10 rounded-xl p-6 bg-white/10 dark:bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all group"
                  onClick={() => alert("Photo upload is simulated for frontend demo.")}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-white/5 flex items-center justify-center text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-primary dark:text-inverse-primary font-bold">Click or drag to upload</p>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant dark:text-slate-300" htmlFor="fullname">Full Name</label>
                  <input 
                    className="w-full p-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20" 
                    id="fullname" 
                    placeholder="Dr. Jane Smith" 
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant dark:text-slate-300" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full p-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20" 
                    id="email" 
                    placeholder="jane.smith@mediconnect.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Role Simulation Selector */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant dark:text-slate-300" htmlFor="role">Register As (Role Simulation)</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20 appearance-none cursor-pointer"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                  >
                    <option value="patient" className="dark:bg-slate-900 dark:text-slate-100">Patient Portal</option>
                    <option value="doctor" className="dark:bg-slate-900 dark:text-slate-100">Doctor Clinic Portal</option>
                    <option value="admin" className="dark:bg-slate-900 dark:text-slate-100">System Administrator</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline dark:text-slate-400">expand_more</span>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant dark:text-slate-300" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    className="w-full p-3 rounded-lg font-body-md text-body-md text-on-surface dark:text-slate-100 bg-white/30 dark:bg-slate-800/40 border border-white/20 dark:border-white/10 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-inverse-primary/20" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Password Validation UI */}
              <div className="bg-white/15 dark:bg-slate-800/50 rounded-xl p-4 border border-white/10 dark:border-white/5 space-y-3">
                <p className="font-label-sm text-on-surface-variant/90 dark:text-slate-350 uppercase tracking-wider font-bold">Security Requirements</p>
                <ul className="space-y-2">
                  <li className={`flex items-center gap-2 font-label-md transition-colors ${hasMinLength ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-on-surface-variant/70 dark:text-slate-450'}`}>
                    <span className="material-symbols-outlined text-lg leading-none">
                      {hasMinLength ? 'check_circle' : 'circle'}
                    </span>
                    At least 6 characters
                  </li>
                  <li className={`flex items-center gap-2 font-label-md transition-colors ${hasNumber ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-on-surface-variant/70 dark:text-slate-450'}`}>
                    <span className="material-symbols-outlined text-lg leading-none">
                      {hasNumber ? 'check_circle' : 'circle'}
                    </span>
                    Including 1 number
                  </li>
                  <li className={`flex items-center gap-2 font-label-md transition-colors ${hasSpecialChar ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-on-surface-variant/70 dark:text-slate-450'}`}>
                    <span className="material-symbols-outlined text-lg leading-none">
                      {hasSpecialChar ? 'check_circle' : 'circle'}
                    </span>
                    Including 1 special character
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <button className="w-full bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant py-4 rounded-xl font-label-md text-md hover:bg-primary-container dark:hover:bg-primary-fixed transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 dark:shadow-inverse-primary/10 cursor-pointer">
                Create Account
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            
            {/* Social Authentication Block */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="relative flex items-center justify-center text-sm mb-2">
                <span className="absolute inset-x-0 h-px bg-gray-200"></span>
                <span className="relative bg-white px-4 text-gray-500 font-medium">Or sign up with</span>
              </div>

              <button 
                type="button"
                onClick={async () => {
                  try {
                    const { signInWithPopup } = await import("firebase/auth");
                    const { auth, googleProvider } = await import("@/lib/firebase");
                    const result = await signInWithPopup(auth, googleProvider);
                    const user = result.user;
                    
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
                      localStorage.setItem('medicare_user', JSON.stringify({ name: data.user.name, role: data.user.role, email: data.user.email }));
                      
                      // DISPATCH CUSTOM EVENT FOR INSTANT UI SYNC
                      window.dispatchEvent(new Event('auth-change'));
                      
                      toast.success(`Welcome ${data.user.name}! Accessing dashboard...`);
                      setTimeout(() => { 
                        window.location.href = `/dashboard/${data.user.role}`; 
                      }, 1000);
                    } else toast.error("Failed to sync with backend.");
                  } catch (error) {
                    console.error("FIREBASE GOOGLE AUTH ERROR:", error);
                  }
                }}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                Sign up with Google
              </button>

              <button 
                type="button"
                onClick={() => toast.info("Coming soon in v2.0")} 
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Sign up with Phone
              </button>

              <button 
                type="button"
                onClick={() => toast.info("Coming soon in v2.0")} 
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                Sign up with Game Center
              </button>
            </div>
            
            <p className="text-center mt-6 font-body-md text-on-surface-variant dark:text-slate-400">
              Already have an account?{' '}
              <Link className="text-primary dark:text-inverse-primary font-bold hover:underline decoration-2 underline-offset-4" href="/login">Log in</Link>
            </p>
          </div>
        </div>
      </main>



      {/* Footer */}
      <footer className="w-full py-8 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 border-t border-outline-variant/30 dark:border-white/10 mt-auto bg-white/5 dark:bg-slate-950/20">
        <p className="font-label-sm text-label-sm text-on-surface-variant/70 dark:text-slate-500">© 2024 MediCare Connect. Clinical Excellence & Precision.</p>
        <div className="flex gap-lg">
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 dark:text-slate-500 hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">HIPAA Compliance</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 dark:text-slate-500 hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Help Center</Link>
        </div>
      </footer>
    </div>
  );
}
