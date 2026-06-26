"use client";

import { useState } from 'react';

interface AppointmentRequest {
  id: string;
  patientName: string;
  avatarUrl?: string;
  time: string;
  type: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
}

const initialRequests: AppointmentRequest[] = [
  { 
    id: '1', 
    patientName: 'Sarah Mitchell', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaxHw3WOMXu14_zFLOl9WVbp2soyAmHKj_QdGGg4-cfmSpOeMHdvUEZGKT3u0fhnNOA0Zs4TeqDes-lA--ulus4WK-HKvEyFKE7ljF0JhTJa6eQbcPeyy8HtWDC02Ec0K07TtndbhqyytJthS6kOHO3QnPvmUL2MEC3-P_0hhkAmvD6sGeGgnY6YLpw8qkruDRSkpGfabazCydmBSbvZYnYuRmjI_e8hGgjs0VAKYJGi4Ae715NwRpM5Y8rSQ_9TtPhgL2yn-QPaEs',
    time: '10:30 AM - Today', 
    type: 'Routine Checkup',
    status: 'Pending' 
  },
  { 
    id: '2', 
    patientName: 'Arthur Jenkins', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD11qK8qyjv9B8Pmx_oaqvcZbmZKIyQqIbQ1cLbqliGu4kgojT284Mb3TEgbrg9K1A-4W9mZuG84cQMoX8__dECjcB3fklO-vD-z3AviRwNvA095mCjyK7tbgeoo4OuEQlA7h4ZMqvh6LWzs9J5zYj5UuvV-Yu6U9bAkQG4qxEUTtrcaYAsU58bxE4YJnMGHzJAjGs5GyKqAcGrwUbVQMJC1vuBT4pc_Kn6DNe32SnxD9mSpWsP5Ia5yV0o3JpN9gWpZqelYiRUSRqE',
    time: '01:45 PM - Today', 
    type: 'Hypertension Follow-up',
    status: 'Pending' 
  },
  { 
    id: '3', 
    patientName: 'David Chen', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFP4IEp9MkBmF5ON0KUtCMjG45Zn7QcRmAFg5ZwYyvrVDJQZX6NODWUGH7SN1HEJryT9Dde1lnqqJvq_Y157nKlZj874en16x8j3wL0U5aVh8APlhFwJAlfQvqHna3cWtptjw-lvkU-taOi1WPX88ItEZf8SmgxJa5i3IZbQVFqJS7ongko6bQKQ05S01HbMzBu5HgUiz8bIN9AZwS1L_DPQgjXsyANssHTHoHksMANqbVEE7HNHwQ7oL2zp19aREERl4duR9Ybh3y',
    time: '04:15 PM - Tomorrow', 
    type: 'ECG Results Review',
    status: 'Pending' 
  }
];

export default function DoctorDashboardPage() {
  const [requests, setRequests] = useState<AppointmentRequest[]>(initialRequests);

  const handleAccept = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Accepted' } : req));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const handleComplete = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Completed' } : req));
  };

  const activeAppointmentsCount = requests.filter(r => r.status === 'Accepted').length + 8;
  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-lg">
      {/* Welcome Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary">Dashboard Overview</h2>
        <p className="text-on-surface-variant dark:text-on-surface-variant/80 text-sm">Welcome back, Doctor. You have {activeAppointmentsCount} active appointments scheduled.</p>
      </div>

      {/* Statistics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* Total Patients */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group border-white/20 dark:border-white/10 shadow-md hover:scale-[1.01] transition-all">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary dark:text-inverse-primary">
              <span className="material-symbols-outlined fill-icon text-lg">group</span>
            </div>
            <span className="text-primary dark:text-inverse-primary text-xs font-bold bg-primary/5 px-2 py-0.5 rounded-full">+12% vs last month</span>
          </div>
          <div>
            <h3 className="font-label-sm text-[10px] text-on-surface-variant/70 uppercase tracking-widest">Total Patients</h3>
            <p className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary mt-1">1.2k</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all group-hover:bg-primary/20"></div>
        </div>

        {/* Today's Appointments */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group border-white/20 dark:border-white/10 shadow-md hover:scale-[1.01] transition-all">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-secondary/10 rounded-lg text-secondary">
              <span className="material-symbols-outlined fill-icon text-lg">calendar_today</span>
            </div>
            <span className="text-secondary text-xs font-bold bg-secondary/5 px-2 py-0.5 rounded-full">{pendingRequestsCount} new requests</span>
          </div>
          <div>
            <h3 className="font-label-sm text-[10px] text-on-surface-variant/70 uppercase tracking-widest">Active Appointments</h3>
            <p className="font-headline-md text-headline-md font-bold text-secondary mt-1">{activeAppointmentsCount}</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl transition-all group-hover:bg-secondary/20"></div>
        </div>

        {/* Reviews Received */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group border-white/20 dark:border-white/10 shadow-md hover:scale-[1.01] transition-all sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-surface-tint/10 rounded-lg text-surface-tint">
              <span className="material-symbols-outlined fill-icon text-lg">star_half</span>
            </div>
            <span className="text-surface-tint text-xs font-bold bg-surface-tint/5 px-2 py-0.5 rounded-full">184 ratings</span>
          </div>
          <div>
            <h3 className="font-label-sm text-[10px] text-on-surface-variant/70 uppercase tracking-widest">Reviews Received</h3>
            <div className="flex items-end gap-1 mt-1">
              <p className="font-headline-md text-headline-md font-bold text-surface-tint">4.9</p>
              <span className="text-xs text-on-surface-variant pb-1 font-bold">/5.0</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-surface-tint/10 rounded-full blur-2xl transition-all group-hover:bg-surface-tint/20"></div>
        </div>
      </div>

      {/* Appointment Requests Section */}
      <section className="space-y-md">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">Appointment Requests</h2>
            <p className="text-on-surface-variant dark:text-on-surface-variant/80 text-sm">Manage incoming clinical patient visits.</p>
          </div>
          <button className="text-primary dark:text-inverse-primary font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer">
            View all requests <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col gap-sm">
          {requests.map((req) => (
            <div 
              key={req.id} 
              className={`glass-card p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-md border-white/20 dark:border-white/10 ${
                req.status === 'Accepted' 
                  ? 'border-l-4 border-l-primary' 
                  : req.status === 'Rejected' 
                  ? 'border-l-4 border-l-error opacity-60'
                  : req.status === 'Completed'
                  ? 'border-l-4 border-l-secondary opacity-80'
                  : 'border-l-4 border-l-amber-400'
              }`}
            >
              <div className="flex items-center gap-md flex-1">
                <div className="relative">
                  {req.avatarUrl ? (
                    <img className="w-12 h-12 rounded-full object-cover border border-outline-variant/20" src={req.avatarUrl} alt={req.patientName} />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {req.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  {req.status === 'Accepted' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-white font-extrabold">check</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-base text-on-surface dark:text-white">{req.patientName}</h4>
                  <div className="flex flex-wrap gap-x-md gap-y-xs mt-1">
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant dark:text-on-surface-variant/80">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {req.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant dark:text-on-surface-variant/80">
                      <span className="material-symbols-outlined text-[14px]">emergency</span> {req.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-sm self-end md:self-center">
                {req.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleAccept(req.id)}
                      className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-primary-container active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span> Accept
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="px-4 py-2 bg-error-container text-on-error-container hover:bg-error/20 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-error-container"
                    >
                      <span className="material-symbols-outlined text-[16px]">cancel</span> Reject
                    </button>
                  </>
                )}
                {req.status === 'Accepted' && (
                  <>
                    <button 
                      onClick={() => handleComplete(req.id)}
                      className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-xs font-bold flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[16px]">task_alt</span> Mark Completed
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-2 bg-error-container text-on-error-container rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {req.status === 'Rejected' && (
                  <span className="text-xs font-bold text-error bg-error/10 px-3 py-1 rounded-full">Rejected</span>
                )}
                {req.status === 'Completed' && (
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check</span> Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
