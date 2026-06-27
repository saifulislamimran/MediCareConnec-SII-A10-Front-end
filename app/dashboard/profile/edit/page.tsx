"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

interface UserProfile {
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  phone?: string;
  avatar?: string;
  
  // Advanced Medical Info
  dob?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  address?: string;

  // Role-Specific Attributes (RBAC)
  department?: string;
  qualifications?: string;
  accessLevel?: string;

  // Pending approval status
  pendingDepartment?: string;
  pendingQualifications?: string;
  pendingAccessLevel?: string;
  isDepartmentPending?: boolean;
  isQualificationsPending?: boolean;
  isAccessLevelPending?: boolean;
}

export default function ProfileEditPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states - Basic Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Form states - Advanced Medical Info
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [address, setAddress] = useState("");

  // Form states - Role-Specific Attributes
  const [department, setDepartment] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

  // Pending States for Doctor
  const [isDeptPending, setIsDeptPending] = useState(false);
  const [isQualPending, setIsQualPending] = useState(false);
  const [isAccessPending, setIsAccessPending] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("medicare_user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as UserProfile;
          setUser(parsed);
          
          // Populate basic details
          setName(parsed.name || "");
          setEmail(parsed.email || "");
          setPhone(parsed.phone || "+1 (555) 019-2834");
          setAvatar(parsed.avatar || "");

          // Populate advanced medical details
          setDob(parsed.dob || "1994-08-12");
          setBloodGroup(parsed.bloodGroup || "O+");
          setEmergencyContactName(parsed.emergencyContactName || "Robert Doe");
          setEmergencyContactPhone(parsed.emergencyContactPhone || "+1 (555) 987-6543");
          setAddress(parsed.address || "123 Medical Center Way, Suite 4B, New York, NY");

          // Populate role-specific attributes
          setDepartment(parsed.department || "Cardiology");
          setQualifications(parsed.qualifications || "M.D., Cardiologist");
          setAccessLevel(parsed.accessLevel || "Level 2 (Clinical Staff)");

          // Populate pending states (especially for Doctors)
          setIsDeptPending(!!parsed.isDepartmentPending);
          setIsQualPending(!!parsed.isQualificationsPending);
          setIsAccessPending(!!parsed.isAccessLevelPending);

          // If pending edits exist, set form inputs to display them as currently edited values
          if (parsed.isDepartmentPending && parsed.pendingDepartment) {
            setDepartment(parsed.pendingDepartment);
          }
          if (parsed.isQualificationsPending && parsed.pendingQualifications) {
            setQualifications(parsed.pendingQualifications);
          }
          if (parsed.isAccessLevelPending && parsed.pendingAccessLevel) {
            setAccessLevel(parsed.pendingAccessLevel);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        // Fallback admin demo user
        const defaultUser: UserProfile = {
          name: "Dr. Sarah Smith",
          email: "admin@medicare.com",
          role: "admin",
          phone: "+1 (555) 019-2834",
          dob: "1980-05-15",
          bloodGroup: "A+",
          address: "742 Evergreen Terrace, Springfield",
          department: "IT & Clinical Ops",
          qualifications: "Ph.D., Healthcare Systems",
          accessLevel: "Level 3 (Super Admin)",
        };
        localStorage.setItem("medicare_user", JSON.stringify(defaultUser));
        setUser(defaultUser);
        setName(defaultUser.name);
        setEmail(defaultUser.email);
        setPhone(defaultUser.phone || "");
        setDob("1980-05-15");
        setBloodGroup("A+");
        setAddress(defaultUser.address || "");
        setDepartment("IT & Clinical Ops");
        setQualifications("Ph.D., Healthcare Systems");
        setAccessLevel("Level 3 (Super Admin)");
      }
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        toast.success("Profile photo uploaded!");
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
      // Setup base update
      const updatedUser: UserProfile = {
        ...user,
        name,
        email,
        phone,
        avatar: selectedFile || avatar,
        dob,
        bloodGroup,
        emergencyContactName,
        emergencyContactPhone,
        address,
      };

      // RBAC Save Logic
      if (user.role === "doctor") {
        // Doctors edit fields -> goes to HR/Admin pending state
        const originalDept = user.department || "Cardiology";
        const originalQual = user.qualifications || "M.D., Cardiologist";
        const originalAccess = user.accessLevel || "Level 2 (Clinical Staff)";

        if (department !== originalDept) {
          updatedUser.isDepartmentPending = true;
          updatedUser.pendingDepartment = department;
          setIsDeptPending(true);
        }
        if (qualifications !== originalQual) {
          updatedUser.isQualificationsPending = true;
          updatedUser.pendingQualifications = qualifications;
          setIsQualPending(true);
        }
        if (accessLevel !== originalAccess) {
          updatedUser.isAccessLevelPending = true;
          updatedUser.pendingAccessLevel = accessLevel;
          setIsAccessPending(true);
        }

        // Retain original saved values on the core fields until Admin approves
        updatedUser.department = originalDept;
        updatedUser.qualifications = originalQual;
        updatedUser.accessLevel = originalAccess;

        toast.info("Basic profile updated. Role-specific edits sent to Admin for review.");
      } else if (user.role === "admin") {
        // Admins edit fields -> saves immediately
        updatedUser.department = department;
        updatedUser.qualifications = qualifications;
        updatedUser.accessLevel = accessLevel;

        // Clear any pending state
        updatedUser.isDepartmentPending = false;
        updatedUser.isQualificationsPending = false;
        updatedUser.isAccessLevelPending = false;
        
        setIsDeptPending(false);
        setIsQualPending(false);
        setIsAccessPending(false);

        toast.success("Profile saved and clinical credentials updated immediately!");
      }

      localStorage.setItem("medicare_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLoading(false);
      router.refresh();
    }, 800);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "WARNING: Are you sure you want to permanently delete your account? This action cannot be undone and you will lose all records."
    );

    if (confirmDelete) {
      localStorage.removeItem("medicare_user");
      toast.warning("Account permanently deleted.");
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
      {/* Header Profile Cover */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-base bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-md">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 dark:bg-white/5 border border-primary/20 flex items-center justify-center shadow-inner relative">
            {selectedFile || avatar ? (
              <img
                src={selectedFile || avatar}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-[35px] text-primary dark:text-inverse-primary">
                {user.role === "doctor" ? "medical_services" : user.role === "admin" ? "admin_panel_settings" : "patient_list"}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-slate-100">
              Profile Settings
            </h1>
            <p className="text-on-surface-variant dark:text-slate-400 mt-1">
              Configure personal information, clinical parameters, and account security.
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full border font-bold uppercase tracking-wider text-xs bg-gradient-to-r ${roleColors[user.role]} text-center shrink-0`}>
          {user.role} Account
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-md">
        
        {/* Card 1: Basic Information */}
        <div className="bg-white/40 dark:bg-[#0b1120]/45 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h3 className="text-label-md font-bold uppercase tracking-widest text-primary dark:text-inverse-primary border-b border-black/5 dark:border-white/5 pb-2">
            Basic Information
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-lg">
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-20 h-20 rounded-full border border-primary/30 overflow-hidden bg-primary/5 dark:bg-white/5 flex items-center justify-center relative shadow-md">
                {selectedFile || avatar ? (
                  <img src={selectedFile || avatar} alt="Profile photo avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-[36px] text-primary/70 dark:text-slate-400">
                    photo_camera
                  </span>
                )}
              </div>
              <label className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity cursor-pointer">
                Upload
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
            
            <div className="text-center sm:text-left space-y-1">
              <h4 className="font-bold text-on-surface dark:text-slate-100 text-sm">Account Photo</h4>
              <p className="text-[11px] text-on-surface-variant/70 dark:text-slate-400">
                Update your picture. JPG, PNG or WEBP formats supported.
              </p>
              <div className="flex gap-sm pt-1 justify-center sm:justify-start">
                <label className="bg-primary hover:bg-primary-container text-on-primary text-[11px] px-3.5 py-1.5 rounded-xl font-bold cursor-pointer transition-colors active:scale-95">
                  Change Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                {(selectedFile || avatar) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setAvatar("");
                      toast.info("Avatar reset.");
                    }}
                    className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-on-surface dark:text-slate-300 text-[11px] px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Advanced Medical Info */}
        <div className="bg-white/40 dark:bg-[#0b1120]/45 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h3 className="text-label-md font-bold uppercase tracking-widest text-primary dark:text-inverse-primary border-b border-black/5 dark:border-white/5 pb-2">
            Advanced Medical Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white dark:bg-slate-900"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Emergency Contact Name
              </label>
              <input
                type="text"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Emergency Contact Phone
              </label>
              <input
                type="tel"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Residential Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Role-Specific Attributes (RBAC Logic) */}
        {user.role !== "patient" && (
          <div className="bg-white/40 dark:bg-[#0b1120]/45 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <h3 className="text-label-md font-bold uppercase tracking-widest text-primary dark:text-inverse-primary">
                Role Specific Credentials
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary dark:text-inverse-primary border border-primary/20">
                RBAC Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Department */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                    Clinical Department
                  </label>
                  {user.role === "doctor" && isDeptPending && (
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current">pending</span>
                      Pending Approval
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
                />
              </div>

              {/* Qualifications */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                    Qualifications & Credentials
                  </label>
                  {user.role === "doctor" && isQualPending && (
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current">pending</span>
                      Pending Approval
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
                />
              </div>

              {/* Access Level */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                    System Security Access Level
                  </label>
                  {user.role === "doctor" && isAccessPending && (
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current">pending</span>
                      Pending Approval
                    </span>
                  )}
                </div>
                
                {user.role === "admin" ? (
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white dark:bg-slate-900"
                  >
                    {["Level 1 (Standard Operations)", "Level 2 (Clinical Staff)", "Level 3 (Super Admin)"].map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
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

      {/* Danger Zone Redesign */}
      <div className="bg-red-50/40 dark:bg-red-950/10 border border-red-200/50 dark:border-red-500/20 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-xl w-full">
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
          <span className="material-symbols-outlined text-rose-500 text-3xl shrink-0">warning</span>
          <div className="flex-1 w-full">
            <h3 className="font-bold text-rose-600 dark:text-rose-400 text-lg leading-none mb-2">Danger Zone</h3>
            <p className="text-sm text-on-surface-variant/80 dark:text-slate-300 w-full leading-relaxed max-w-3xl">
              Permanently delete this account and all connected clinical data, prescriptions, appointment schedules, and billing statements. This action is irreversible.
            </p>
          </div>
        </div>
        <div className="pt-2 flex justify-start sm:pl-11 w-full">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-600/20 border border-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
}
