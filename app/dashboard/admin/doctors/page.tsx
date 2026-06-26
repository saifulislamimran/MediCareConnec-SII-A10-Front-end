"use client";

import { useState } from 'react';

interface DoctorVerification {
  id: string;
  name: string;
  doctorId: string;
  avatarText: string;
  avatarUrl?: string;
  specialization: string;
  credentials: string;
  status: 'Pending' | 'Verified' | 'Rejected';
}

const initialDoctors: DoctorVerification[] = [
  { 
    id: '1', 
    name: 'Dr. Julian Vance', 
    doctorId: 'MC-2093-X', 
    avatarText: 'JV', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHFF19Ga63qvfpYdQ-5EJ7CneFBDh-2Hws76lFtPpjMvMwp1ezsBF3_o8aWnnSyyxlPZROdgKO1D1HnV5NgWSeu3_1pJBIF18CNLvfslcENxsJdLQ320e_x1XwdT_PQcmeqPGx5tNCVqURPA4IsfqTZ8GQ3f_AiWthgJbVX-JkHGL0I7BeHACUNe3sSPxELfChg6eL_UQpiypK7-fGd65tg2SHHL3L2WvxFdiyloyBpt_55w4bL8r23VX2ZoeQqWKT-c1EHJym37pl',
    specialization: 'Neuro-Cardiology', 
    credentials: 'M.D. (Stanford)', 
    status: 'Pending' 
  },
  { 
    id: '2', 
    name: 'Dr. Amara Singh', 
    doctorId: 'MC-4412-K', 
    avatarText: 'AS', 
    specialization: 'Molecular Genetics', 
    credentials: 'Ph.D. (Oxford)', 
    status: 'Verified' 
  },
  { 
    id: '3', 
    name: 'Dr. Sarah Connor', 
    doctorId: 'MC-8812-Y', 
    avatarText: 'SC', 
    specialization: 'Pediatric Surgery', 
    credentials: 'M.D. (Harvard)', 
    status: 'Pending' 
  },
  { 
    id: '4', 
    name: 'Dr. Robert Chen', 
    doctorId: 'MC-1049-M', 
    avatarText: 'RC', 
    specialization: 'Clinical Oncology', 
    credentials: 'M.D. (Johns Hopkins)', 
    status: 'Verified' 
  }
];

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorVerification[]>(initialDoctors);
  const [filterSpecialization, setFilterSpecialization] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleVerify = (id: string) => {
    setDoctors(doctors.map(doc => doc.id === id ? { ...doc, status: 'Verified' } : doc));
  };

  const handleReject = (id: string) => {
    if (confirm("Are you sure you want to reject this doctor's application?")) {
      setDoctors(doctors.map(doc => doc.id === id ? { ...doc, status: 'Rejected' } : doc));
    }
  };

  // Unique list of specializations for filter
  const specializations = ['All', ...Array.from(new Set(doctors.map(d => d.specialization)))];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSpec = filterSpecialization === 'All' || doc.specialization === filterSpecialization;
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    return matchesSpec && matchesStatus;
  });

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tight">Doctor Verification Queue</h1>
        <p className="text-on-surface-variant dark:text-slate-400 text-sm">Review clinical applications, verify background credentials, and manage medical registries.</p>
      </div>

      {/* Top Grid Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-amber-400 border-white/20 dark:border-white/10 shadow-lg">
          <p className="text-xs text-on-surface-variant/70 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Queue Status</p>
          <h3 className="text-headline-md font-bold text-on-surface dark:text-white">
            {doctors.filter(d => d.status === 'Pending').length} Pending
          </h3>
          <p className="text-xs text-on-surface-variant/60 dark:text-slate-450 mt-1">Average wait: 2.4 hours</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-primary border-white/20 dark:border-white/10 shadow-lg">
          <p className="text-xs text-on-surface-variant/70 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Approval Rate</p>
          <h3 className="text-headline-md font-bold text-on-surface dark:text-white">88.2%</h3>
          <p className="text-xs text-on-surface-variant/60 dark:text-slate-450 mt-1">+1.2% from last month</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-secondary border-white/20 dark:border-white/10 shadow-lg">
          <p className="text-xs text-on-surface-variant/70 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Verified Doctors</p>
          <h3 className="text-headline-md font-bold text-on-surface dark:text-white">
            {doctors.filter(d => d.status === 'Verified').length + 410} Active
          </h3>
          <p className="text-xs text-on-surface-variant/60 dark:text-slate-450 mt-1">Across 12 specializations</p>
        </div>
      </section>

      {/* Filter Options */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-surface-container-low/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="text-xs font-bold text-on-surface-variant/80 dark:text-slate-300">
          Filter Applications:
        </div>
        <div className="flex gap-2">
          <select 
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="bg-white/50 dark:bg-slate-900 text-on-surface-variant dark:text-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold border border-outline-variant/20 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            {specializations.map(spec => (
              <option key={spec} value={spec} className="dark:bg-slate-900 dark:text-slate-200">{spec}</option>
            ))}
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/50 dark:bg-slate-900 text-on-surface-variant dark:text-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold border border-outline-variant/20 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            <option value="All" className="dark:bg-slate-900 dark:text-slate-200">All Statuses</option>
            <option value="Pending" className="dark:bg-slate-900 dark:text-slate-200">Pending</option>
            <option value="Verified" className="dark:bg-slate-900 dark:text-slate-200">Verified</option>
            <option value="Rejected" className="dark:bg-slate-900 dark:text-slate-200">Rejected</option>
          </select>
        </div>
      </div>

      {/* Doctor Verification Table */}
      <div className="glass-card rounded-2xl overflow-hidden border-white/20 dark:border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-surface-container-low/80 dark:bg-slate-900/60 text-on-surface-variant/80 dark:text-slate-300 border-b border-outline-variant/10">
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Doctor Name</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Credentials</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 bg-white/10 dark:bg-slate-950/10">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {doc.avatarUrl ? (
                          <img className="w-9 h-9 rounded-full object-cover border border-outline-variant/30" src={doc.avatarUrl} alt={doc.name} />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary font-bold text-xs">
                            {doc.avatarText}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-sm text-on-surface dark:text-white">{doc.name}</p>
                          <p className="text-[10px] text-on-surface-variant/60 dark:text-slate-400">{doc.doctorId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant dark:text-slate-300 text-sm font-semibold">{doc.specialization}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                        <span className="font-semibold text-sm text-on-surface dark:text-white">{doc.credentials}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        doc.status === 'Verified' 
                          ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900/50' 
                          : doc.status === 'Pending' 
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50' 
                          : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          doc.status === 'Verified' ? 'bg-green-500' : doc.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></span> 
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {doc.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleVerify(doc.id)}
                            className="bg-primary text-on-primary hover:bg-primary-container px-3 py-1 rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-md"
                          >
                            Verify
                          </button>
                          <button 
                            onClick={() => handleReject(doc.id)}
                            className="bg-error/10 text-error px-3 py-1 rounded-xl text-xs font-bold border border-error/20 hover:bg-error/20 active:scale-95 transition-all cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-on-surface-variant/50 dark:text-slate-400 font-bold italic">Decision Logged</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant/60 dark:text-slate-400 font-semibold text-sm">
                    No doctor applications found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
