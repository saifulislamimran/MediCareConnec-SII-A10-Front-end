"use client";

import { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  doctorName: string;
  hospital: string;
  avatarUrl: string;
  date: string;
  time: string;
  specialty: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

interface PastAppointment {
  id: string;
  title: string;
  doctorName: string;
  specialty: string;
  day: string;
  month: string;
}

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Mitchell',
      hospital: 'City General Hospital',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyT0hhYaVASQASck5qtbBVEa9nT4Jty2H9d3CxO7N3dWf1T-u7ZqIJkhMeDrzAY6Qj0ufl7TW8HDNpz56NCvuGaJnUjPoQ5yIzN1ySjP9jopUrfBsLJ-C0pnVvlDSrAU1dVGRVy_UvMOSiZlkiyCFEaN8QhX3U1PWYeBAHFQXkcsriAxymXOq0250wKXlSDfNh5xElwqmVdAhwsSnkP1iMQeaVtjdz1Qul0oKg0_j8AqcIv5HixggyMXhCjhnToKk8L_OqMCr_CyoJ',
      date: 'Oct 24, 2023',
      time: '09:30 AM (In-person)',
      specialty: 'Cardiology',
      status: 'Confirmed'
    },
    {
      id: '2',
      doctorName: 'Dr. Marcus Thorne',
      hospital: 'SkinCare Specialists',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOyZjRtmSiHPlrZ0BIPpj8WwlZdkr4rEEAJxz1Kk0DBFECDN6eacZ8O_MqvS6JFOF4G02dqe_dpKJt1TxmG5vM8jze_nkrq-_JebHzmvVBCDuujcl0aZxizVevCR05gnZ6B0jbXlc6ZZdBs9tVrZPsBxsRQ3hA2p6ebixtxlwJ968-1shbgqBuISFkxTmj4gpQqFSMpCnEqR_FvlSny04WSKbt1DP9LYpJ1tIFBGG1Jjlst1t2BJEJE6kzR5OUHSQirP-UFxI3Hk1f',
      date: 'Oct 28, 2023',
      time: '02:15 PM (Video Call)',
      specialty: 'Dermatology',
      status: 'Pending'
    }
  ]);

  const [pastAppointments, setPastAppointments] = useState<PastAppointment[]>([
    {
      id: 'p1',
      title: 'Annual Wellness Exam',
      doctorName: 'Dr. Emily Chen',
      specialty: 'Internal Medicine',
      day: '12',
      month: 'Sep'
    },
    {
      id: 'p2',
      title: 'Orthopedic Consultation',
      doctorName: 'Dr. Robert Vance',
      specialty: 'Orthopedics',
      day: '28',
      month: 'Aug'
    }
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Modal States
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // New Appointment Fields
  const [newDoc, setNewDoc] = useState("Dr. Sarah Chen");
  const [newSpecialty, setNewSpecialty] = useState("Cardiology");
  const [newDate, setNewDate] = useState("2023-11-05");
  const [newTime, setNewTime] = useState("10:00 AM");
  const [newType, setNewType] = useState("In-person");

  // Reschedule Fields
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("10:00 AM");

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleScheduleNew = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = new Date(newDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorName: newDoc,
      hospital: 'City General Hospital',
      avatarUrl: newDoc.includes('Chen')
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiR5RYTGvSTO29od2n487K8uvvRxjLO9tYt1Piz_3Le5JPzRo5tWkJjaP-1qcVOAJmZAut9PNOF8eDTGD5UvqpO-q2HjqmV6CXviOjtAqpctFIwQxJ5X1CvW7h9wac0E86rZx2QrQ8FdLVEmYBxfW4dtKB02F7KDJLuqLrCFmF0XB2Y0B6INMeD-pupa_EkR7S84-cXyvAFsylO0gqYkeFUW1LpIa8skhF7m8PV8b-6uosRHQP-DwKjMYY9JMr2BLCJ4dkk4Ithm7x'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyT0hhYaVASQASck5qtbBVEa9nT4Jty2H9d3CxO7N3dWf1T-u7ZqIJkhMeDrzAY6Qj0ufl7TW8HDNpz56NCvuGaJnUjPoQ5yIzN1ySjP9jopUrfBsLJ-C0pnVvlDSrAU1dVGRVy_UvMOSiZlkiyCFEaN8QhX3U1PWYeBAHFQXkcsriAxymXOq0250wKXlSDfNh5xElwqmVdAhwsSnkP1iMQeaVtjdz1Qul0oKg0_j8AqcIv5HixggyMXhCjhnToKk8L_OqMCr_CyoJ',
      date: formattedDate,
      time: `${newTime} (${newType})`,
      specialty: newSpecialty,
      status: 'Pending'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowScheduleModal(false);
    triggerToast("Appointment scheduled successfully!");
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;
    const formattedDate = new Date(rescheduleDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    setAppointments(prev => prev.map(app => 
      app.id === selectedAppointment.id 
        ? { ...app, date: formattedDate, time: `${rescheduleTime} (In-person)`, status: 'Pending' }
        : app
    ));
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    triggerToast("Appointment reschedule request submitted.", "info");
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(prev => prev.filter(app => app.id !== id));
      triggerToast("Appointment cancelled successfully.", "info");
    }
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

      {/* Header and Action */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-xl gap-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 font-bold tracking-tight">My Appointments</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-2xl mt-xs">
            Manage your clinical schedule, review past visits, and stay connected with your healthcare providers.
          </p>
        </div>
        <button 
          onClick={() => {
            setShowScheduleModal(true);
          }}
          className="bg-primary hover:bg-primary-container text-on-primary px-lg py-3 rounded-xl font-label-md text-label-md shadow-lg shadow-primary/20 transition-all flex items-center gap-sm group cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
          Schedule New Appointment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
        <div className="glass p-md rounded-xl shadow-sm border border-white/20 dark:bg-slate-900/60 dark:border-white/10">
          <div className="flex justify-between items-start mb-sm">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim p-xs bg-primary/10 dark:bg-primary-fixed-dim/10 rounded-lg">calendar_month</span>
            <span className="text-on-surface-variant dark:text-slate-400 font-label-sm">+{appointments.length} Total</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wide">Upcoming</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-bold">0{appointments.length}</p>
        </div>
        <div className="glass p-md rounded-xl border-l-4 border-l-secondary shadow-sm dark:bg-slate-900/60 dark:border-white/10">
          <div className="flex justify-between items-start mb-sm">
            <span className="material-symbols-outlined text-secondary dark:text-secondary-fixed-dim p-xs bg-secondary/10 dark:bg-secondary-fixed-dim/10 rounded-lg">history</span>
            <span className="text-on-surface-variant dark:text-slate-400 font-label-sm">Past 30 Days</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wide">Total Completed</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-bold">12</p>
        </div>
        <div className="glass p-md rounded-xl shadow-sm border border-white/20 dark:bg-slate-900/60 dark:border-white/10">
          <div className="flex justify-between items-start mb-sm">
            <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim p-xs bg-tertiary/10 dark:bg-tertiary-fixed-dim/10 rounded-lg">lab_research</span>
            <span className="text-on-surface-variant dark:text-slate-400 font-label-sm">2 Pending</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wide">Reports Ready</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-bold">08</p>
        </div>
        <div className="glass p-md rounded-xl shadow-sm border border-white/20 dark:bg-slate-900/60 dark:border-white/10">
          <div className="flex justify-between items-start mb-sm">
            <span className="material-symbols-outlined text-error dark:text-red-400 p-xs bg-error/10 dark:bg-red-400/10 rounded-lg">favorite</span>
            <span className="text-error dark:text-red-400 font-label-sm font-semibold">Stable</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wide">Vitals Check</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-bold">Normal</p>
        </div>
      </div>

      {/* Upcoming Appointments Table */}
      <section className="mb-xl">
        <div className="flex items-center gap-sm mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-semibold">Upcoming Appointments</h3>
          <span className="px-3 py-1 bg-primary/10 dark:bg-primary-fixed-dim/20 text-primary dark:text-primary-fixed-dim rounded-full font-label-sm text-label-sm font-bold">
            {appointments.length} Scheduled
          </span>
        </div>
        <div className="glass rounded-xl overflow-hidden shadow-xl border border-white/20 dark:border-white/10 dark:bg-slate-900/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-variant/30 dark:bg-white/5 text-on-surface-variant dark:text-slate-400 font-label-sm text-label-sm border-b border-white/10 dark:border-white/5">
                  <th className="p-md font-bold uppercase tracking-wider">Provider</th>
                  <th className="p-md font-bold uppercase tracking-wider">Date &amp; Time</th>
                  <th className="p-md font-bold uppercase tracking-wider">Specialty</th>
                  <th className="p-md font-bold uppercase tracking-wider">Status</th>
                  <th className="p-md font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-white/5">
                {appointments.map(app => (
                  <tr key={app.id} className="hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group">
                    <td className="p-md">
                      <div className="flex items-center gap-sm">
                        <img 
                          className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-sm" 
                          src={app.avatarUrl} 
                          alt={app.doctorName}
                        />
                        <div>
                          <p className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-bold">{app.doctorName}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{app.hospital}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-md">
                      <p className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-semibold">{app.date}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{app.time}</p>
                    </td>
                    <td className="p-md">
                      <span className="px-3 py-1 bg-secondary/15 text-secondary dark:text-secondary-fixed-dim rounded-full font-label-sm text-label-sm font-bold">{app.specialty}</span>
                    </td>
                    <td className="p-md">
                      <div className="flex items-center gap-xs">
                        <span className={`w-2 h-2 rounded-full ${app.status === 'Confirmed' ? 'bg-primary animate-pulse' : 'bg-outline'}`}></span>
                        <span className={`font-label-sm text-label-sm font-bold ${app.status === 'Confirmed' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>
                          {app.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-md text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedAppointment(app);
                            setShowViewModal(true);
                          }}
                          className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim rounded-lg font-label-sm font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedAppointment(app);
                            setRescheduleDate("2023-10-30");
                            setRescheduleTime("10:00 AM");
                            setShowRescheduleModal(true);
                          }}
                          className="px-3 py-1.5 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim rounded-lg font-label-sm font-bold hover:bg-secondary hover:text-white transition-all cursor-pointer"
                        >
                          Reschedule
                        </button>
                        <button 
                          onClick={() => handleCancelAppointment(app.id)}
                          className="p-1.5 text-on-surface-variant dark:text-slate-400 hover:text-error transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section>
        <div className="flex items-center justify-between mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-semibold">Past Appointments</h3>
          <button 
            onClick={() => triggerToast("Full appointment history navigation loaded.", "info")}
            className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline flex items-center gap-xs cursor-pointer font-bold"
          >
            View Full History <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {pastAppointments.map(past => (
            <div 
              key={past.id}
              className="glass p-md rounded-xl flex items-start gap-md hover:shadow-2xl hover:scale-[1.01] transition-all border-l-4 border-l-primary/40 dark:bg-slate-900/60 dark:border-white/10"
            >
              <div className="w-16 h-16 bg-surface-variant dark:bg-white/10 rounded-xl flex flex-col items-center justify-center shrink-0 border border-white/10">
                <span className="font-headline-md text-on-surface-variant dark:text-slate-100 font-bold">{past.day}</span>
                <span className="font-label-sm text-on-surface-variant dark:text-slate-400 uppercase text-[10px] font-bold">{past.month}</span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-bold">{past.title}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-semibold">{past.doctorName} • {past.specialty}</p>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 dark:bg-primary-fixed-dim/20 text-primary dark:text-primary-fixed-dim rounded font-label-sm text-label-sm font-bold">Completed</span>
                </div>
                <div className="mt-md flex gap-sm">
                  <button 
                    onClick={() => triggerToast("Summary details downloaded successfully.")}
                    className="flex-1 py-2 bg-white/20 dark:bg-white/5 border border-white/10 dark:border-white/5 rounded-lg font-label-sm text-on-surface dark:text-slate-100 hover:bg-white/30 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-xs cursor-pointer font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">description</span> Summary
                  </button>
                  <button 
                    onClick={() => triggerToast("Prescription file ready for download.")}
                    className="flex-1 py-2 bg-white/20 dark:bg-white/5 border border-white/10 dark:border-white/5 rounded-lg font-label-sm text-on-surface dark:text-slate-100 hover:bg-white/30 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-xs cursor-pointer font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span> Prescription
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule New Appointment Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                Schedule Consultation
              </h4>
              <button onClick={() => setShowScheduleModal(false)} className="text-on-surface-variant dark:text-slate-400 hover:opacity-80">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleScheduleNew} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Select Doctor</label>
                <select 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  value={newDoc}
                  onChange={(e) => {
                    setNewDoc(e.target.value);
                    if (e.target.value.includes('Chen')) {
                      setNewSpecialty('Cardiology');
                    } else {
                      setNewSpecialty('Dermatology');
                    }
                  }}
                >
                  <option className="dark:bg-[#1e293b]" value="Dr. Sarah Chen">Dr. Sarah Chen (Cardiologist)</option>
                  <option className="dark:bg-[#1e293b]" value="Dr. Marcus Thorne">Dr. Marcus Thorne (Dermatologist)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Date</label>
                  <input 
                    className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Time Slot</label>
                  <select 
                    className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  >
                    <option className="dark:bg-[#1e293b]" value="09:30 AM">09:30 AM</option>
                    <option className="dark:bg-[#1e293b]" value="10:00 AM">10:00 AM</option>
                    <option className="dark:bg-[#1e293b]" value="11:30 AM">11:30 AM</option>
                    <option className="dark:bg-[#1e293b]" value="02:15 PM">02:15 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Consultation Type</label>
                <select 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option className="dark:bg-[#1e293b]" value="In-person">In-person Visit</option>
                  <option className="dark:bg-[#1e293b]" value="Video Call">Video Teleconsultation</option>
                </select>
              </div>
              <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-on-surface/5 dark:bg-white/5 text-on-surface-variant dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Appointment Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-white">Reschedule Visit</h4>
              <button onClick={() => setShowRescheduleModal(false)} className="text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-left">
              <p className="text-xs text-on-surface-variant dark:text-slate-400">
                Request a new date/time with <span className="font-bold text-on-surface dark:text-slate-200">{selectedAppointment.doctorName}</span>.
              </p>
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">New Date</label>
                <input 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">New Time</label>
                <select 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                >
                  <option className="dark:bg-[#1e293b]" value="09:30 AM">09:30 AM</option>
                  <option className="dark:bg-[#1e293b]" value="10:00 AM">10:00 AM</option>
                  <option className="dark:bg-[#1e293b]" value="11:30 AM">11:30 AM</option>
                  <option className="dark:bg-[#1e293b]" value="02:15 PM">02:15 PM</option>
                </select>
              </div>
              <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 bg-on-surface/5 dark:bg-white/5 text-on-surface-variant dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Request Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Appointment Details Modal */}
      {showViewModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-white">Visit Details</h4>
              <button onClick={() => setShowViewModal(false)} className="text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-sm">
                <img className="w-12 h-12 rounded-full object-cover" src={selectedAppointment.avatarUrl} alt="" />
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-bold">{selectedAppointment.doctorName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{selectedAppointment.specialty}</p>
                </div>
              </div>
              <div className="h-px bg-outline-variant/20 dark:bg-white/10"></div>
              <div className="text-xs space-y-2 text-on-surface-variant dark:text-slate-300">
                <p><span className="font-bold text-on-surface dark:text-slate-200">Date:</span> {selectedAppointment.date}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-200">Time / Type:</span> {selectedAppointment.time}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-200">Location:</span> {selectedAppointment.hospital}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-200">Status:</span> {selectedAppointment.status}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-outline-variant/10 flex justify-end">
              <button 
                onClick={() => setShowViewModal(false)}
                className="w-full py-2 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating FAB for Help Support */}
      <button 
        onClick={() => triggerToast("Live chat assistance started.", "info")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group cursor-pointer"
      >
        <span className="material-symbols-outlined text-[28px] transition-transform group-hover:rotate-12">add_comment</span>
        <span className="absolute right-full mr-4 bg-on-surface dark:bg-slate-800 text-surface dark:text-slate-100 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">Help Support</span>
      </button>
    </div>
  );
}
