"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface UserProfile {
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  phone?: string;
  avatar?: string;
}

export default function ProfileEditPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("medicare_user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as UserProfile;
          setUser(parsed);
          setName(parsed.name || "");
          setEmail(parsed.email || "");
          setPhone(parsed.phone || "+1 (555) 019-2834");
          setAvatar(parsed.avatar || "");
        } catch (e) {
          console.error(e);
        }
      } else {
        // Fallback demo user
        const defaultUser: UserProfile = {
          name: "Sarah Smith",
          email: "sarah.smith@medicare.com",
          role: "patient",
          phone: "+1 (555) 019-2834",
        };
        localStorage.setItem("medicare_user", JSON.stringify(defaultUser));
        setUser(defaultUser);
        setName(defaultUser.name);
        setEmail(defaultUser.email);
        setPhone(defaultUser.phone || "");
      }
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        toast.success("Profile photo loaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const updatedUser: UserProfile = {
        ...user,
        name,
        email,
        phone,
        avatar: selectedFile || avatar,
      };

      localStorage.setItem("medicare_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLoading(false);
      toast.success("Profile updated successfully!");
      
      // Refresh current page/layout components
      router.refresh();
    }, 800);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "WARNING: Are you sure you want to permanently delete your account? This action cannot be undone and you will lose all medical records."
    );

    if (confirmDelete) {
      localStorage.removeItem("medicare_user");
      toast.warning("Account deleted successfully.");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Define role accent colors
  const roleColors = {
    patient: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    doctor: "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    admin: "from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-md"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-base bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        <div>
          <h1 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-slate-100">
            Profile Edit
          </h1>
          <p className="text-on-surface-variant dark:text-slate-400 mt-1">
            Manage your personal data, verification numbers, and global login credentials.
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full border font-bold uppercase tracking-wider text-xs bg-gradient-to-r ${roleColors[user.role]} text-center shrink-0`}>
          {user.role} Account
        </div>
      </div>

      {/* Main Form Box */}
      <form onSubmit={handleSave} className="bg-white/40 dark:bg-[#0b1120]/45 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-md relative overflow-hidden">
        {/* Photo Upload Area */}
        <div className="flex flex-col sm:flex-row items-center gap-lg pb-md border-b border-black/5 dark:border-white/5">
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-primary/30 overflow-hidden bg-primary/10 dark:bg-white/5 flex items-center justify-center shadow-lg relative">
              {selectedFile || avatar ? (
                <img
                  src={selectedFile || avatar}
                  alt="User profile avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-5xl text-primary/70 dark:text-slate-400">
                  account_circle
                </span>
              )}
            </div>
            <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity cursor-pointer">
              <span className="material-symbols-outlined mr-1 text-[16px]">
                photo_camera
              </span>
              Change
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-on-surface dark:text-slate-100">Profile Picture</h3>
            <p className="text-xs text-on-surface-variant/70 dark:text-slate-400 mt-1">
              Supports JPEG, PNG or WebP files. Max file size: 2MB.
            </p>
            <div className="mt-3 flex justify-center sm:justify-start gap-sm">
              <label className="bg-primary hover:bg-primary-container text-on-primary text-xs px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors active:scale-95">
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {(selectedFile || avatar) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setAvatar("");
                    toast.info("Avatar reset to default.");
                  }}
                  className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface dark:text-slate-300 text-xs px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Input Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@email.com"
              className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Assigned Role (Disabled representation) */}
          <div className="space-y-2">
            <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300 opacity-60">
              Account Role
            </label>
            <div className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-outline-variant/20 dark:border-white/5 rounded-2xl text-on-surface/60 dark:text-slate-400 capitalize font-medium flex items-center gap-xs select-none">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              {user.role}
            </div>
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div className="flex justify-end gap-sm pt-base">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface dark:text-slate-300 rounded-2xl font-bold transition-all duration-200 cursor-pointer active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary text-on-primary hover:bg-primary-container rounded-2xl font-bold flex items-center justify-center gap-xs shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-75"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>

      {/* Danger Zone Container */}
      <div className="bg-red-500/5 dark:bg-red-950/10 border border-red-500/20 rounded-3xl p-6 md:p-8 space-y-base backdrop-blur-xl">
        <div className="flex items-start gap-md">
          <span className="material-symbols-outlined text-rose-500 text-3xl">warning</span>
          <div>
            <h3 className="font-bold text-rose-600 dark:text-rose-400 text-lg">Danger Zone</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 max-w-xl">
              Permanently delete this account and all connected clinical data, prescriptions, appointment schedules, and billing statements. This action is irreversible.
            </p>
          </div>
        </div>
        <div className="pt-2 flex justify-start pl-[44px]">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold text-xs transition-colors active:scale-95 cursor-pointer shadow-lg shadow-red-600/15"
          >
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
}
