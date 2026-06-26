"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
      alert("Please fill in all fields");
      return;
    }

    if (!hasMinLength || !hasNumber || !hasSpecialChar) {
      alert("Please satisfy all password security requirements.");
      return;
    }

    // Set simulated session
    const mockUser = { name: fullname, role, email };
    localStorage.setItem('medicare_user', JSON.stringify(mockUser));

    // Trigger toast success notification
    setToastMessage("Account created successfully. Accessing dashboard...");
    setShowToast(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push(`/dashboard/${role}`);
      router.refresh();
    }, 2000);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-surface">
      {/* Global Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 bg-surface/30 backdrop-blur-sm">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          MediCare Connect
        </Link>
        <Link className="text-primary font-label-md flex items-center gap-1 hover:opacity-80 transition-opacity" href="#">
          <span className="material-symbols-outlined">help_outline</span>
          Support
        </Link>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-32 pb-12 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBauiSo7RbxS-XopgORdy3AIwGVbGHZPHa9-H7o83kggrzvUtfPQBq-D6IYjc9OIB7BzFMRKeXIYkI7tQf_ICxLXuNBhEhUh3xYCuY0c57yRyo-EDMVb6bpubnudrw6IHJVDcpIrkVUpqGn_bXtMUynlsoPcoPfMSM7P6M553nhVUFBhodkoQ1uDfy7sdWB85mKyRFCiFyg6YSFBsaZ15J5SvPFYmy-K9cVqeAG8q76eUkV-7lJScSWEGlceNOsU4biCCV-m2GuJWEW')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
        </div>

        {/* Auth Card Container */}
        <div className="relative z-10 w-full max-w-xl animate-fade-in">
          <div className="glass-panel p-8 md:p-12 rounded-xl flex flex-col gap-8 border border-white/20 bg-white/45 backdrop-blur-2xl shadow-xl">
            <div className="text-center space-y-2">
              <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">Create Account</h1>
              <p className="text-on-surface-variant font-body-md">Join the next generation of clinical precision.</p>
            </div>
            
            <form className="flex flex-col gap-6" onSubmit={handleRegister}>
              {/* Photo Upload UI */}
              <div className="flex flex-col gap-3">
                <label className="font-label-md text-on-surface-variant">Profile Identification</label>
                <div 
                  className="relative border-2 border-dashed border-outline-variant/50 rounded-lg p-6 bg-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/20 transition-all group"
                  onClick={() => alert("Photo upload is simulated for frontend demo.")}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-primary">Click or drag to upload</p>
                    <p className="text-xs text-on-surface-variant">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant" htmlFor="fullname">Full Name</label>
                  <input 
                    className="glass-input p-3 rounded-lg text-body-md w-full text-on-surface" 
                    id="fullname" 
                    placeholder="Dr. Jane Smith" 
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                  <input 
                    className="glass-input p-3 rounded-lg text-body-md w-full text-on-surface" 
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
                <label className="font-label-md text-on-surface-variant" htmlFor="role">Register As (Role Simulation)</label>
                <div className="relative">
                  <select 
                    className="glass-input p-3 rounded-lg text-body-md w-full text-on-surface appearance-none focus:outline-none cursor-pointer"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                  >
                    <option value="patient">Patient Portal</option>
                    <option value="doctor">Doctor Clinic Portal</option>
                    <option value="admin">System Administrator</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    className="glass-input p-3 rounded-lg text-body-md w-full pr-12 text-on-surface" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Password Validation UI */}
              <div className="bg-white/15 dark:bg-on-surface/10 rounded-lg p-4 border border-white/10 space-y-3">
                <p className="font-label-sm text-on-surface-variant/90 uppercase tracking-wider">Security Requirements</p>
                <ul className="space-y-2">
                  <li className={`flex items-center gap-2 font-label-md transition-colors ${hasMinLength ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-on-surface-variant/70'}`}>
                    <span className="material-symbols-outlined text-lg leading-none">
                      {hasMinLength ? 'check_circle' : 'circle'}
                    </span>
                    At least 6 characters
                  </li>
                  <li className={`flex items-center gap-2 font-label-md transition-colors ${hasNumber ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-on-surface-variant/70'}`}>
                    <span className="material-symbols-outlined text-lg leading-none">
                      {hasNumber ? 'check_circle' : 'circle'}
                    </span>
                    Including 1 number
                  </li>
                  <li className={`flex items-center gap-2 font-label-md transition-colors ${hasSpecialChar ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-on-surface-variant/70'}`}>
                    <span className="material-symbols-outlined text-lg leading-none">
                      {hasSpecialChar ? 'check_circle' : 'circle'}
                    </span>
                    Including 1 special character
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <button className="w-full bg-primary text-white py-4 rounded-lg font-label-md text-md hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
                Create Account
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            
            <p className="text-center font-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link className="text-primary font-semibold hover:underline decoration-2 underline-offset-4" href="/login">Log in</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-[100] max-w-sm w-full animate-slide-in flex">
          <div className="glass-panel bg-white/90 border-l-4 border-l-primary-container p-4 rounded-xl flex items-start gap-4 shadow-2xl border border-white/30">
            <div className="text-primary mt-0.5">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex-grow">
              <h4 className="font-label-md text-on-surface font-bold">Registration Successful</h4>
              <p className="text-label-sm text-on-surface-variant mt-1">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-8 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 border-t border-outline-variant/30 mt-auto bg-surface/30">
        <p className="font-label-sm text-label-sm text-on-surface-variant/70">© 2024 MediCare Connect. Clinical Excellence & Precision.</p>
        <div className="flex gap-lg">
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">HIPAA Compliance</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Help Center</Link>
        </div>
      </footer>
    </div>
  );
}
