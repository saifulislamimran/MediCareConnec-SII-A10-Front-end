"use client";

import { useState, useEffect } from 'react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  dateJoined: string;
  initials?: string;
  avatarUrl?: string;
  blocked?: boolean;
}

interface DoctorItem {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  avatarUrl?: string;
  initials?: string;
}

export default function AdminPlatformManagePage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Tab State: 'users' | 'doctors'
  const [activeTab, setActiveTab] = useState<'users' | 'doctors'>('users');

  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // Users State
  const [users, setUsers] = useState<UserItem[]>([
    { id: '1', name: 'Elena Wright', email: 'elena.w@clinical.com', status: 'Verified', dateJoined: 'Oct 24, 2023', initials: 'EW', blocked: false },
    { 
      id: '2', 
      name: 'Marcus Chen', 
      email: 'm.chen@healthmail.org', 
      status: 'Pending', 
      dateJoined: 'Nov 02, 2023',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3EZibs2aRSmpnCRRXjyBqmNhmpKLPU4H1M4ZbfVfQdRywlCg2zmAYgSGReYR59gGx-gngtwZTMPRJgGCPNMzw8Wghv1xi-vaYgJoKXMlBYnljH2_1eljpf8_MSiSyj0fmCJM2yVy69T9a1GJmCJNCS6-e-oa9Y9D8FZl2uHNIQxs2Rvq-zr-JlvS72vbOtu3-LZIQYdKZ1a64sH54A__gx6GprQnAlO0AA00Ggm1ZaG7rPWcDGvzWKgRTUwzhM0ZWxYWiYRTTIp8V',
      blocked: false 
    },
    { id: '3', name: 'Sarah Kepler', email: 'sarah.k@biotech.io', status: 'Rejected', dateJoined: 'Oct 29, 2023', initials: 'SK', blocked: false }
  ]);

  // Doctors State
  const [doctors, setDoctors] = useState<DoctorItem[]>([
    {
      id: '1',
      name: 'Dr. Julian Vance',
      specialty: 'Neuro-Cardiology',
      credentials: 'M.D. (Stanford)',
      status: 'Pending',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHFF19Ga63qvfpYdQ-5EJ7CneFBDh-2Hws76lFtPpjMvMwp1ezsBF3_o8aWnnSyyxlPZROdgKO1D1HnV5NgWSeu3_1pJBIF18CNLvfslcENxsJdLQ320e_x1XwdT_PQcmeqPGx5tNCVqURPA4IsfqTZ8GQ3f_AiWthgJbVX-JkHGL0I7BeHACUNe3sSPxELfChg6eL_UQpiypK7-fGd65tg2SHHL3L2WvxFdiyloyBpt_55w4bL8r23VX2ZoeQqWKT-c1EHJym37pl'
    },
    {
      id: '2',
      name: 'Dr. Amara Singh',
      specialty: 'Molecular Genetics',
      credentials: 'Ph.D. (Oxford)',
      status: 'Verified',
      initials: 'AS'
    }
  ]);

  // Modal States
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorItem | null>(null);

  // Form Fields - User
  const [formUserName, setFormUserName] = useState("");
  const [formUserEmail, setFormUserEmail] = useState("");
  const [formUserStatus, setFormUserStatus] = useState<'Verified' | 'Pending' | 'Rejected'>('Verified');

  // Form Fields - Doctor
  const [formDoctorName, setFormDoctorName] = useState("");
  const [formDoctorSpecialty, setFormDoctorSpecialty] = useState("");
  const [formDoctorCredentials, setFormDoctorCredentials] = useState("");

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Search filters
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // User Actions
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUserName.trim() || !formUserEmail.trim()) {
      triggerToast("All fields are required.", "error");
      return;
    }

    const newUser: UserItem = {
      id: Date.now().toString(),
      name: formUserName,
      email: formUserEmail,
      status: formUserStatus,
      dateJoined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      initials: formUserName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
      blocked: false
    };

    setUsers(prev => [newUser, ...prev]);
    setShowAddUserModal(false);
    setFormUserName("");
    setFormUserEmail("");
    setFormUserStatus("Verified");
    triggerToast(`User ${newUser.name} created successfully!`);
  };

  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete && confirm(`Are you sure you want to delete ${userToDelete.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      triggerToast(`${userToDelete.name} deleted.`, "info");
    }
  };

  const handleToggleBlockUser = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextState = !u.blocked;
        triggerToast(`${u.name} has been ${nextState ? 'blocked' : 'unblocked'}.`, nextState ? 'error' : 'info');
        return { ...u, blocked: nextState };
      }
      return u;
    }));
  };

  // Doctor Actions
  const handleVerifyDoctor = (id: string, approve: boolean) => {
    setDoctors(prev => prev.map(doc => {
      if (doc.id === id) {
        const nextStatus = approve ? 'Verified' : 'Rejected';
        triggerToast(`${doc.name} status updated to ${nextStatus}.`);
        return { ...doc, status: nextStatus };
      }
      return doc;
    }));
  };

  const handleOpenEditDoctor = (doc: DoctorItem) => {
    setSelectedDoctor(doc);
    setFormDoctorName(doc.name);
    setFormDoctorSpecialty(doc.specialty);
    setFormDoctorCredentials(doc.credentials);
    setShowEditDoctorModal(true);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    setDoctors(prev => prev.map(doc => 
      doc.id === selectedDoctor.id 
        ? { ...doc, name: formDoctorName, specialty: formDoctorSpecialty, credentials: formDoctorCredentials }
        : doc
    ));
    setShowEditDoctorModal(false);
    triggerToast("Doctor profile updated successfully!");
  };

  return (
    <div className="w-full text-left relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border text-white font-bold text-sm ${
            toast.type === 'success' 
              ? 'bg-emerald-600 border-emerald-500' 
              : toast.type === 'error'
                ? 'bg-rose-600 border-rose-500'
                : 'bg-sky-600 border-sky-500'
          }`}>
            <span className="material-symbols-outlined">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header and Tab Control */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant/20 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 font-bold tracking-tight">Users &amp; Doctors Control Center</h1>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-1">Manage credentials, verification cycles, and account statuses.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => { setActiveTab('users'); setSearchQuery(""); }}
            className={`relative pb-4 px-2 text-label-md font-bold transition-all cursor-pointer ${
              activeTab === 'users' ? 'text-primary dark:text-teal-400 font-extrabold' : 'text-on-surface-variant dark:text-slate-400 font-medium'
            }`}
          >
            User Directory
            {activeTab === 'users' && <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary dark:bg-teal-400"></div>}
          </button>
          <button 
            onClick={() => { setActiveTab('doctors'); setSearchQuery(""); }}
            className={`relative pb-4 px-2 text-label-md font-bold transition-all cursor-pointer ${
              activeTab === 'doctors' ? 'text-primary dark:text-teal-400 font-extrabold' : 'text-on-surface-variant dark:text-slate-400 font-medium'
            }`}
          >
            Doctor Verification Queue
            {activeTab === 'doctors' && <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary dark:bg-teal-400"></div>}
          </button>
        </div>
      </div>

      {/* Search Filter Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 dark:text-slate-400">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-outline-variant/35 dark:border-white/10 rounded-full text-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-teal-400 text-on-surface dark:text-slate-100" 
            placeholder={`Search ${activeTab === 'users' ? 'users by name or email...' : 'doctors by name or specialty...'}`} 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {activeTab === 'users' && (
          <button 
            onClick={() => setShowAddUserModal(true)}
            className="bg-primary hover:bg-primary-container text-on-primary dark:bg-teal-400 dark:text-[#0b1120] px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-95 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span> Add New User
          </button>
        )}
      </div>

      {/* View 1: User Directory */}
      {activeTab === 'users' && (
        <div className="space-y-md mt-6">
          <div className="flex gap-base">
            <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-teal-400/10 dark:text-teal-400 rounded-full text-label-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> {users.length} Total Users
            </span>
            <span className="px-3 py-1 bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 rounded-full text-label-sm font-bold">32 New Today</span>
          </div>

          <div className="glass dark:bg-slate-900/60 dark:border-white/10 rounded-xl overflow-hidden shadow-sm border border-white/20">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 dark:bg-white/5 text-on-surface-variant/70 dark:text-slate-400 border-b border-outline-variant/10 dark:border-white/5">
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">User Name</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Date Joined</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {u.avatarUrl ? (
                            <img className="w-8 h-8 rounded-full object-cover border border-outline-variant/30 dark:border-white/10" src={u.avatarUrl} alt="" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary-container/30 dark:bg-white/10 flex items-center justify-center text-secondary dark:text-teal-400 font-bold text-xs">
                              {u.initials}
                            </div>
                          )}
                          <span className={`font-label-md font-semibold dark:text-white ${u.blocked ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>{u.name}</span>
                          {u.blocked && (
                            <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold">Blocked</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant dark:text-slate-300 font-label-md">{u.email}</td>
                      <td className="px-6 py-4">
                        {u.status === 'Verified' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border border-green-200 dark:border-green-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Verified
                          </span>
                        ) : u.status === 'Pending' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border border-red-200 dark:border-red-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span> Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant dark:text-slate-300 font-label-md">{u.dateJoined}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => setSelectedUser(u)}
                            className="p-1.5 rounded-md hover:bg-primary/20 text-primary dark:text-slate-400 dark:hover:text-teal-400 transition-all cursor-pointer"
                            title="View Info"
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          <button 
                            onClick={() => handleToggleBlockUser(u.id)}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${
                              u.blocked 
                                ? 'hover:bg-green-600/20 text-green-600 dark:text-green-400' 
                                : 'hover:bg-on-surface-variant/20 text-on-surface-variant dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                            title={u.blocked ? "Unblock User" : "Block User"}
                          >
                            <span className="material-symbols-outlined text-[20px]">{u.blocked ? 'check_circle' : 'block'}</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-md hover:bg-error/20 text-error transition-all cursor-pointer"
                            title="Delete User"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Simulation */}
            <div className="bg-surface-container-low/80 dark:bg-[#111827] px-6 py-4 flex items-center justify-between border-t border-outline-variant/10 dark:border-white/5">
              <span className="text-label-sm text-on-surface-variant/60 dark:text-slate-400">Showing 1-{filteredUsers.length} of {users.length} entries</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => triggerToast("Loading page index 0...", "info")}
                  className="px-3 py-1 rounded border border-outline-variant/20 dark:border-white/10 hover:bg-surface-bright dark:hover:bg-slate-800 transition-colors text-label-sm dark:text-slate-300 cursor-pointer"
                >
                  Prev
                </button>
                <button className="px-3 py-1 rounded bg-primary dark:bg-teal-400 text-on-primary dark:text-[#0b1120] text-label-sm font-bold">1</button>
                <button 
                  onClick={() => triggerToast("Loading page index 2...", "info")}
                  className="px-3 py-1 rounded border border-outline-variant/20 dark:border-white/10 hover:bg-surface-bright dark:hover:bg-slate-800 transition-colors text-label-sm dark:text-slate-300 cursor-pointer"
                >
                  2
                </button>
                <button 
                  onClick={() => triggerToast("Loading page index 3...", "info")}
                  className="px-3 py-1 rounded border border-outline-variant/20 dark:border-white/10 hover:bg-surface-bright dark:hover:bg-slate-800 transition-colors text-label-sm dark:text-slate-300 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Doctor Verification */}
      {activeTab === 'doctors' && (
        <div className="space-y-md mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="glass dark:bg-slate-900/60 dark:border-white/10 p-6 rounded-xl border-l-4 border-amber-400 border border-white/20">
              <p className="text-label-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Queue Status</p>
              <h3 className="text-headline-md font-bold dark:text-slate-100">14 Pending</h3>
              <p className="text-body-md text-on-surface-variant/60 dark:text-slate-400 mt-1">Average wait: 2.4 hours</p>
            </div>
            <div className="glass dark:bg-slate-900/60 dark:border-white/10 p-6 rounded-xl border-l-4 border-primary border border-white/20">
              <p className="text-label-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Approval Rate</p>
              <h3 className="text-headline-md font-bold dark:text-slate-100">88.2%</h3>
              <p className="text-body-md text-on-surface-variant/60 dark:text-slate-400 mt-1">+1.2% from last month</p>
            </div>
            <div className="glass dark:bg-slate-900/60 dark:border-white/10 p-6 rounded-xl border-l-4 border-secondary border border-white/20">
              <p className="text-label-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Verified Doctors</p>
              <h3 className="text-headline-md font-bold dark:text-slate-100">412 Active</h3>
              <p className="text-body-md text-on-surface-variant/60 dark:text-slate-400 mt-1">Across 12 specializations</p>
            </div>
          </div>

          <div className="glass dark:bg-slate-900/60 dark:border-white/10 rounded-xl overflow-hidden border border-white/20 mt-4">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 dark:bg-white/5 text-on-surface-variant/70 dark:text-slate-400 border-b border-outline-variant/10 dark:border-white/5">
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Doctor Name</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Credentials</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-label-sm uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
                  {filteredDoctors.map(doc => (
                    <tr key={doc.id} className="hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {doc.avatarUrl ? (
                            <img className="w-8 h-8 rounded-full object-cover border border-outline-variant/30 dark:border-white/10" src={doc.avatarUrl} alt="" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-tertiary-container/30 dark:bg-white/10 flex items-center justify-center text-tertiary dark:text-teal-400 font-bold text-xs">
                              {doc.initials}
                            </div>
                          )}
                          <div>
                            <p className="font-label-md font-semibold dark:text-white">{doc.name}</p>
                            <p className="text-[10px] text-on-surface-variant/60 dark:text-slate-400">ID: MC-2093-X</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant dark:text-slate-300 font-label-md">{doc.specialty}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary dark:text-teal-400 text-[18px]">verified_user</span>
                          <span className="font-label-md dark:text-slate-200">{doc.credentials}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {doc.status === 'Verified' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border border-green-200 dark:border-green-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 status-glow"></span> Verified
                          </span>
                        ) : doc.status === 'Pending' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border border-red-200 dark:border-red-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span> Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {doc.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleVerifyDoctor(doc.id, true)}
                              className="bg-primary text-on-primary dark:bg-teal-400 dark:text-[#0b1120] px-3 py-1 rounded text-label-sm font-bold active:scale-95 transition-all cursor-pointer"
                            >
                              Verify
                            </button>
                            <button 
                              onClick={() => handleVerifyDoctor(doc.id, false)}
                              className="bg-error/10 text-error px-3 py-1 rounded text-label-sm font-bold border border-error/20 hover:bg-error/20 active:scale-95 transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleOpenEditDoctor(doc)}
                            className="p-1.5 rounded-md hover:bg-on-surface-variant/10 text-on-surface-variant dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
                            title="Edit Profile"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Add New User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10 dark:border-white/5">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-white">Add New User Account</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-on-surface-variant dark:text-slate-400 hover:opacity-80">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-300 mb-1">Full Name</label>
                <input 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-white/10 rounded-lg text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  type="text" 
                  value={formUserName}
                  onChange={(e) => setFormUserName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-300 mb-1">Email Address</label>
                <input 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-white/10 rounded-lg text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  type="email" 
                  value={formUserEmail}
                  onChange={(e) => setFormUserEmail(e.target.value)}
                  placeholder="jane.doe@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-300 mb-1">Status Classification</label>
                <select 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-white/10 rounded-lg text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  value={formUserStatus}
                  onChange={(e: any) => setFormUserStatus(e.target.value)}
                >
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-outline-variant/10 dark:border-white/5">
                <button 
                  type="button" 
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-2 rounded-lg border border-outline-variant dark:border-white/10 text-on-surface-variant dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white dark:bg-teal-400 dark:text-[#0b1120] rounded-lg text-xs font-bold hover:opacity-90"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: View User Profile Details */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10 dark:border-white/5">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-white">User Metadata View</h3>
              <button onClick={() => setSelectedUser(null)} className="text-on-surface-variant dark:text-slate-400 hover:opacity-85">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {selectedUser.avatarUrl ? (
                  <img className="w-12 h-12 rounded-full object-cover" src={selectedUser.avatarUrl} alt="" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-teal-400 font-bold text-lg">
                    {selectedUser.initials}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-base">{selectedUser.name}</h4>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400">{selectedUser.email}</p>
                </div>
              </div>
              <div className="h-px bg-outline-variant/10 dark:bg-white/10"></div>
              <div className="text-xs font-mono space-y-1.5 text-on-surface-variant dark:text-slate-300">
                <p><span className="font-bold text-on-surface dark:text-white">User ID:</span> #USR-{selectedUser.id}1920</p>
                <p><span className="font-bold text-on-surface dark:text-white">Account Status:</span> {selectedUser.status}</p>
                <p><span className="font-bold text-on-surface dark:text-white">Date Registered:</span> {selectedUser.dateJoined}</p>
                <p><span className="font-bold text-on-surface dark:text-white">Access Level:</span> Clinical Standard User</p>
                <p><span className="font-bold text-on-surface dark:text-white">Restriction Status:</span> {selectedUser.blocked ? "Blocked / Suspended" : "Active / No Limits"}</p>
              </div>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => setSelectedUser(null)}
                className="w-full py-2 bg-primary text-white dark:bg-teal-400 dark:text-[#0b1120] rounded-lg text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Doctor Info */}
      {showEditDoctorModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10 dark:border-white/5">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-white">Edit Doctor Profile</h3>
              <button onClick={() => setShowEditDoctorModal(false)} className="text-on-surface-variant dark:text-slate-400 hover:opacity-80">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveDoctor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-300 mb-1">Doctor Name</label>
                <input 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-white/10 rounded-lg text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  type="text" 
                  value={formDoctorName}
                  onChange={(e) => setFormDoctorName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-300 mb-1">Specialization</label>
                <input 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-white/10 rounded-lg text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  type="text" 
                  value={formDoctorSpecialty}
                  onChange={(e) => setFormDoctorSpecialty(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-300 mb-1">Credentials</label>
                <input 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-white/10 rounded-lg text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                  type="text" 
                  value={formDoctorCredentials}
                  onChange={(e) => setFormDoctorCredentials(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-outline-variant/10 dark:border-white/5">
                <button 
                  type="button" 
                  onClick={() => setShowEditDoctorModal(false)}
                  className="flex-1 py-2 rounded-lg border border-outline-variant dark:border-white/10 text-on-surface-variant dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white dark:bg-teal-400 dark:text-[#0b1120] rounded-lg text-xs font-bold hover:opacity-90"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
