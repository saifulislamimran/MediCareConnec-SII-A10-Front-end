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
  // Patient details
  dob?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  allergies?: string;
  // Doctor details
  licenseNumber?: string;
  specialization?: string;
  experience?: string;
  bio?: string;
  clinicAddress?: string;
  // Admin details
  adminLevel?: string;
  department?: string;
  badgeNumber?: string;
}

export default function ProfileEditPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states - General
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Form states - Patient
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [allergies, setAllergies] = useState("");

  // Form states - Doctor
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");

  // Form states - Admin
  const [adminLevel, setAdminLevel] = useState("Level 3 (Super Admin)");
  const [department, setDepartment] = useState("IT Operations");
  const [badgeNumber, setBadgeNumber] = useState("");

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

          // Load role-specific info
          setDob(parsed.dob || "1994-08-12");
          setBloodGroup(parsed.bloodGroup || "O+");
          setEmergencyContactName(parsed.emergencyContactName || "Robert Doe");
          setEmergencyContactPhone(parsed.emergencyContactPhone || "+1 (555) 987-6543");
          setAllergies(parsed.allergies || "None");

          setLicenseNumber(parsed.licenseNumber || "LIC-98231-MC");
          setSpecialization(parsed.specialization || "Cardiology");
          setExperience(parsed.experience || "12");
          setBio(parsed.bio || "Senior healthcare specialist dedicated to clinical operations and telemedicine care.");
          setClinicAddress(parsed.clinicAddress || "MediCare Central Office, Suite 404");

          setAdminLevel(parsed.adminLevel || "Level 3 (Super Admin)");
          setDepartment(parsed.department || "IT & Technical Operations");
          setBadgeNumber(parsed.badgeNumber || "BADGE-ADM-998");
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
          dob: "1994-08-12",
          bloodGroup: "O+",
        };
        localStorage.setItem("medicare_user", JSON.stringify(defaultUser));
        setUser(defaultUser);
        setName(defaultUser.name);
        setEmail(defaultUser.email);
        setPhone(defaultUser.phone || "");
        setDob("1994-08-12");
        setBloodGroup("O+");
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
      // Build role-specific attributes object
      const roleSpecificData: Partial<UserProfile> = {};
      if (user.role === "patient") {
        roleSpecificData.dob = dob;
        roleSpecificData.bloodGroup = bloodGroup;
        roleSpecificData.emergencyContactName = emergencyContactName;
        roleSpecificData.emergencyContactPhone = emergencyContactPhone;
        roleSpecificData.allergies = allergies;
      } else if (user.role === "doctor") {
        roleSpecificData.licenseNumber = licenseNumber;
        roleSpecificData.specialization = specialization;
        roleSpecificData.experience = experience;
        roleSpecificData.bio = bio;
        roleSpecificData.clinicAddress = clinicAddress;
      } else if (user.role === "admin") {
        roleSpecificData.adminLevel = adminLevel;
        roleSpecificData.department = department;
        roleSpecificData.badgeNumber = badgeNumber;
      }

      const updatedUser: UserProfile = {
        ...user,
        name,
        email,
        phone,
        avatar: selectedFile || avatar,
        ...roleSpecificData,
      };

      localStorage.setItem("medicare_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLoading(false);
      toast.success("Profile saved successfully!");
      router.refresh();
    }, 800);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "WARNING: Are you sure you want to permanently delete your account? This action cannot be undone and you will lose all records."
    );

    if (confirmDelete) {
      localStorage.removeItem("medicare_user");
      toast.warning("Account deleted.");
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

  // Define role branding and themes
  const roleThemes = {
    patient: {
      accent: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      avatarBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      outline: "border-emerald-500/30",
    },
    doctor: {
      accent: "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      avatarBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      outline: "border-cyan-500/30",
    },
    admin: {
      accent: "from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      avatarBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      outline: "border-purple-500/30",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-md"
    >
      {/* Dynamic Profile Cover / Header */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-base bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-md text-center sm:text-left">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border shadow-inner ${roleThemes[user.role].avatarBg} ${roleThemes[user.role].outline} overflow-hidden shrink-0`}>
            {selectedFile || avatar ? (
              <img
                src={selectedFile || avatar}
                alt="User preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-[40px]">
                {user.role === "doctor" ? "medical_services" : user.role === "admin" ? "admin_panel_settings" : "patient_list"}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-slate-100 leading-tight">
              {name || "User Profile"}
            </h1>
            <p className="text-on-surface-variant dark:text-slate-400 text-sm mt-1">
              {email} • Registered as <span className="font-bold capitalize">{user.role}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`px-5 py-2 rounded-full border font-bold uppercase tracking-wider text-[10px] bg-gradient-to-r ${roleThemes[user.role].accent} shrink-0`}>
            {user.role} Account
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="bg-white/40 dark:bg-[#0b1120]/45 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl space-y-md relative">
        
        {/* Photo Upload Card Section */}
        <div className="bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-lg">
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-primary/20 overflow-hidden bg-primary/10 dark:bg-white/5 flex items-center justify-center relative">
              {selectedFile || avatar ? (
                <img
                  src={selectedFile || avatar}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary/70 dark:text-slate-400">
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
              Pick a dynamic square JPG/PNG. Default system initials will display if blank.
            </p>
            <div className="flex gap-sm pt-1 justify-center sm:justify-start">
              <label className="bg-primary hover:bg-primary-container text-on-primary text-[11px] px-3.5 py-1.5 rounded-xl font-bold cursor-pointer transition-colors active:scale-95">
                Choose Image
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

        {/* General Fields Grid */}
        <div className="space-y-sm">
          <h3 className="text-label-md font-bold uppercase tracking-widest text-primary dark:text-inverse-primary border-b border-black/5 dark:border-white/5 pb-2">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-2">
            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Display Name
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

            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                Current Role
              </label>
              <div className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-outline-variant/20 dark:border-white/5 rounded-2xl text-on-surface/50 dark:text-slate-400 capitalize font-medium flex items-center gap-xs select-none">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                {user.role}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic / Role-specific Section */}
        <div className="space-y-sm pt-md">
          <h3 className="text-label-md font-bold uppercase tracking-widest text-primary dark:text-inverse-primary border-b border-black/5 dark:border-white/5 pb-2">
            Role Specific Attributes
          </h3>
          
          {/* Patient Details */}
          {user.role === "patient" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-2">
              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white dark:bg-slate-900"
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
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
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
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Known Allergies
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Peanuts, Penicillin, Pollen..."
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Doctor Details */}
          {user.role === "doctor" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-2">
              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Medical License ID
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Primary Specialization
                </label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white dark:bg-slate-900"
                >
                  {["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "General Medicine", "Dermatology"].map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Clinic/Office Address
                </label>
                <input
                  type="text"
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Professional Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            </div>
          )}

          {/* Admin Details */}
          {user.role === "admin" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-2">
              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Access Level
                </label>
                <input
                  type="text"
                  value={adminLevel}
                  onChange={(e) => setAdminLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  Department Division
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white dark:bg-slate-900"
                >
                  {["IT Operations", "Clinical Management", "Billing & Auditing", "Emergency Services", "Global HR Division"].map((dep) => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-300">
                  System Badge Identifier
                </label>
                <input
                  type="text"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-white/5 border border-outline-variant/35 dark:border-white/10 rounded-2xl text-on-surface dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons Action Bar */}
        <div className="flex justify-end gap-sm pt-md border-t border-black/5 dark:border-white/5">
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
      <div className="bg-red-500/5 dark:bg-red-950/10 border border-red-500/20 rounded-3xl p-6 md:p-8 space-y-md backdrop-blur-xl w-full">
        <div className="flex items-start gap-md w-full">
          <span className="material-symbols-outlined text-rose-500 text-3xl shrink-0">warning</span>
          <div className="flex-grow w-full">
            <h3 className="font-bold text-rose-600 dark:text-rose-400 text-lg">Danger Zone</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 max-w-xl w-full leading-relaxed">
              Permanently delete this account and all connected clinical data, prescriptions, appointment schedules, and billing statements. This action is irreversible.
            </p>
          </div>
        </div>
        <div className="pt-2 flex justify-start pl-[44px] w-full">
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
