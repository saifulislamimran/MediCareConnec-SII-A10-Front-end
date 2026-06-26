"use client";

import { useState } from 'react';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  room: string;
  avatarUrl: string;
  date: string;
  time: string;
  type: 'in-person' | 'telehealth';
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const initialAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Elena Rodriguez',
    specialty: 'Internal Medicine',
    room: 'RM 402',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv9WG0YNOTbIWg62vb8dS_gTlShZ493opqH9czYWB9ALrYpfE419DJGZMTezk_3y0NVS9f-fvCOgEhBODS7D3SZlQENGEzxFZEO6ah5cOlswOIUIIKFXgn30LC3U9gh12WL3Vxl5vxkfywBiqUiHfBFLZHb2GqGTHyp_CpFJDErOzGW6R2q5BkbLkjD9FpFhL3libh8iMmZ_pEKSzuEiRS5KV7o2AtTEEKLXybZelM9NOFBP59qN_6-ncfyvaEg0bagYtLbH0wfgXV',
    date: 'October 24, 2026',
    time: '09:30 AM — 10:15 AM',
    type: 'in-person',
    status: 'Confirmed'
  },
  {
    id: '2',
    doctorName: 'Dr. Marcus Thorne',
    specialty: 'Dermatology',
    room: 'Telehealth Session',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdDRVmYCleA8RuemWczJpJDh-qYF1MIxum3RT5SO40y6QOBYWqQ6L6dMR_6KAFjBljFmmM8-17-ZyabfjkWAtP5ypGyjI-wrEosKsh1c1T09SjJd7FzJ6Wlyg92vefwy30FJ84BmcYXLZkJQzd_NVlbkfTIjBzkky2DDZ7orN4CzT9NU4bF8K3jj5aaAkknxcvInBghbHo1dZc9oABCsiPKNiGJS9IYFmDql2m3SrpwUzLwKumUuxAdStJMq7aCsyngqTtNV-HnqUq',
    date: 'October 28, 2026',
    time: '02:00 PM — 02:30 PM',
    type: 'telehealth',
    status: 'Pending'
  },
  {
    id: '3',
    doctorName: 'Dr. Sarah Chen',
    specialty: 'Orthopedic Surgery',
    room: 'RM 112',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3KezyJ0VY3npieLAp4bAehalsMxNuJzElNWiTuz9Y53SWLlZFXO-ToBDVwl3G9hRk6nuoT2OmCvvoUBGJxQsoKJUl0rqsdNzNljDoiVZQeTO36Gvd987RDW8wix2CjNmOOG7jkzb2u6mEft7CgyGmthmePwsOdw9ELAp2DgC3PgoySRq5u56j4MwewEf1lWkoLIq_DkHBVoFBmenbgpOYAbk_SC9b4wc-k2YsvD0nu5uBQeWKoqGNtWF8OycLYh859eiPCqz8tskd',
    date: 'November 05, 2026',
    time: '11:00 AM — 12:00 PM',
    type: 'in-person',
    status: 'Confirmed'
  }
];

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'Cancelled' } : app));
    }
  };

  const handleReschedule = (id: string) => {
    const newDate = prompt("Enter new date (e.g. October 30, 2026):");
    const newTime = prompt("Enter new time slot (e.g. 10:00 AM — 10:45 AM):");
    if (newDate && newTime) {
      setAppointments(appointments.map(app => app.id === id ? { ...app, date: newDate, time: newTime, status: 'Pending' } : app));
      alert("Appointment reschedule request submitted for approval.");
    }
  };

  // Filter appointments based on activeTab (cancelled/past appointments simulated under past)
  const filteredAppointments = appointments.filter(app => {
    if (activeTab === 'upcoming') {
      return app.status !== 'Cancelled';
    } else {
      return app.status === 'Cancelled';
    }
  });

  return (
    <div className="space-y-lg">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md border-b border-white/20 dark:border-white/10 pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tight">My Appointments</h2>
          <p className="text-on-surface-variant dark:text-slate-400 text-sm">Review, reschedule, or manage your clinical schedule and care visits.</p>
        </div>
        <div className="flex p-1 bg-surface-container-low dark:bg-slate-900 rounded-xl border border-outline-variant/20 dark:border-white/10">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upcoming' 
                ? 'bg-white dark:bg-primary text-primary dark:text-on-primary shadow-sm' 
                : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'past' 
                ? 'bg-white dark:bg-primary text-primary dark:text-on-primary shadow-sm' 
                : 'text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary'
            }`}
          >
            Past & Cancelled
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="glass-card rounded-3xl overflow-hidden border-white/20 dark:border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-surface-container-low/80 dark:bg-slate-900/60 text-on-surface-variant/80 dark:text-slate-300 border-b border-outline-variant/10 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4 w-1/3">Healthcare Provider</th>
                <th className="px-6 py-4 w-1/4">Schedule</th>
                <th className="px-6 py-4 w-1/6">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 bg-white/10 dark:bg-slate-950/10">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-primary/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img className="w-12 h-12 rounded-full object-cover border border-outline-variant/30 shadow-sm" src={app.avatarUrl} alt={app.doctorName} />
                        <div>
                          <p className="font-bold text-sm text-on-surface dark:text-white">{app.doctorName}</p>
                          <p className="text-xs text-on-surface-variant/70 dark:text-slate-400">{app.specialty} • {app.room}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-sm text-on-surface dark:text-white">{app.date}</p>
                      <p className="text-xs text-on-surface-variant/60 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">
                          {app.type === 'telehealth' ? 'videocam' : 'schedule'}
                        </span>
                        {app.time}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${
                        app.status === 'Confirmed' 
                          ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900/50' 
                          : app.status === 'Pending' 
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50' 
                          : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          app.status === 'Confirmed' ? 'bg-green-500' : app.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></span>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5 md:opacity-0 group-hover:opacity-100 transition-all duration-200">
                        {app.status !== 'Cancelled' && (
                          <>
                            <button 
                              onClick={() => handleReschedule(app.id)}
                              className="p-1.5 rounded-lg text-on-surface-variant/60 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
                              title="Reschedule Session"
                            >
                              <span className="material-symbols-outlined text-[18px]">event_repeat</span>
                            </button>
                            <button 
                              onClick={() => handleCancel(app.id)}
                              className="p-1.5 rounded-lg text-on-surface-variant/60 dark:text-slate-400 hover:text-error hover:bg-error/10 transition-all cursor-pointer"
                              title="Cancel Session"
                            >
                              <span className="material-symbols-outlined text-[18px]">cancel</span>
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => alert(`Reviewing appointment details with ${app.doctorName}...`)}
                          className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 dark:text-inverse-primary rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-on-surface-variant/60 dark:text-slate-400 font-semibold text-sm">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Insight Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border-white/20 dark:border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-inverse-primary shrink-0">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant/60 dark:text-slate-400 uppercase tracking-widest">Health Score</p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">92<span className="text-xs text-on-surface-variant/60 dark:text-slate-400 font-normal ml-0.5">/100</span></p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border-white/20 dark:border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined">calendar_month</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant/60 dark:text-slate-400 uppercase tracking-widest">Next Session</p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">24 Oct</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border-white/20 dark:border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant/60 dark:text-slate-400 uppercase tracking-widest">Action Items</p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
              {appointments.filter(a => a.status === 'Pending').length} Pending
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
