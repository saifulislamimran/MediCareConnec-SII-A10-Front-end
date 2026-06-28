"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Appointment {
  _id: string;
  doctorName: string;
  hospital: string;
  avatarUrl: string;
  appointmentDate: string;
  appointmentTime: string;
  specialization: string;
  appointmentStatus: 'Confirmed' | 'Pending' | 'Completed';
  paymentStatus: 'Pending' | 'Paid';
  consultationFee: number;
}

export default function PatientAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRescheduleModal(false);
    triggerToast('Appointment rescheduled successfully!');
  };
  
  const [newDoc, setNewDoc] = useState("Dr. Sarah Chen");
  const [newSpecialty, setNewSpecialty] = useState("Cardiology");
  const [newDate, setNewDate] = useState("2023-11-05");
  const [newTime, setNewTime] = useState("10:00 AM");
  const [newType, setNewType] = useState("In-person");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  const handleScheduleNew = (e: React.FormEvent) => {
    e.preventDefault();
    setShowScheduleModal(false);
    triggerToast('Appointment request submitted successfully!');
  };

  interface PastAppointment {
    id: string;
    title: string;
    doctorName: string;
    specialty: string;
    day: string;
    month: string;
  }

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

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://medi-care-connec-sii-a10-back-end.vercel.app'}/api/appointments/my-list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        const mappedData = data.data.map((app: any) => ({
          _id: app._id,
          doctorName: app.doctorId?.doctorName || 'Unknown Doctor',
          hospital: 'City General Hospital',
          avatarUrl: 'https://via.placeholder.com/150',
          appointmentDate: app.appointmentDate,
          appointmentTime: app.appointmentTime,
          specialization: app.doctorId?.specialization || 'General',
          appointmentStatus: app.appointmentStatus,
          paymentStatus: app.paymentStatus,
          consultationFee: app.doctorId?.consultationFee || 100
        }));
        setAppointments(mappedData);
      } else {
        triggerToast(data.message || 'Failed to fetch appointments', 'error');
      }
    } catch (error) {
      console.error(error);
      triggerToast('Error fetching appointments', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMsg({ message, type });
  };

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  return (
    <div className="min-h-screen bg-surface dark:bg-slate-950 p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/20 dark:bg-primary-fixed-dim/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-tertiary/20 dark:bg-tertiary-fixed-dim/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {toastMsg && (
          <div className="fixed top-24 right-4 z-50 animate-fade-in-up">
            <div className={`glass px-lg py-sm rounded-xl shadow-2xl flex items-center gap-sm font-label-md text-white border border-white/20 ${
              toastMsg.type === 'success' ? 'bg-emerald-600 border-emerald-500' : toastMsg.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-sky-600 border-sky-500'
            }`}>
              <span className="material-symbols-outlined">{toastMsg.type === 'success' ? 'check_circle' : toastMsg.type === 'error' ? 'error' : 'info'}</span>
              {toastMsg.message}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-xl gap-md">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 font-bold tracking-tight">My Appointments</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-2xl mt-xs">
              Manage your clinical schedule and complete pending payments for upcoming appointments.
            </p>
          </div>
        </div>

        <section className="mb-xl">
          <div className="flex items-center gap-sm mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-semibold">Upcoming Appointments</h3>
            <span className="px-3 py-1 bg-primary/10 dark:bg-primary-fixed-dim/20 text-primary dark:text-primary-fixed-dim rounded-full font-label-sm text-label-sm font-bold">
              {appointments.length} Scheduled
            </span>
          </div>
          <div className="glass overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-md font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-slate-400">Doctor</th>
                  <th className="p-md font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-slate-400">Date & Time</th>
                  <th className="p-md font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-slate-400">Status</th>
                  <th className="p-md font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-slate-400">Payment</th>
                  <th className="p-md font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-xl text-center text-on-surface-variant dark:text-slate-400">Loading appointments...</td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-xl text-center text-on-surface-variant dark:text-slate-400">No appointments found.</td>
                  </tr>
                ) : (
                  appointments.map(app => (
                    <tr key={app._id} className="hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <img 
                            className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-sm" 
                            src={app.avatarUrl} 
                            alt={app.doctorName}
                          />
                          <div>
                            <p className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-bold">{app.doctorName}</p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{app.specialization}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-md">
                        <p className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-semibold">{new Date(app.appointmentDate).toLocaleDateString()}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{app.appointmentTime}</p>
                      </td>
                      <td className="p-md">
                        <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${app.appointmentStatus === 'Confirmed' ? 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400' : app.appointmentStatus === 'Pending' ? 'bg-amber-600/10 text-amber-600 dark:text-amber-400' : 'bg-primary/10 text-primary dark:text-primary-fixed-dim'}`}>
                          {app.appointmentStatus}
                        </span>
                      </td>
                      <td className="p-md">
                        <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${app.paymentStatus === 'Paid' ? 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400' : 'bg-error/10 text-error dark:text-red-400'}`}>
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td className="p-md text-right flex items-center justify-end gap-sm">
                        {app.paymentStatus === 'Pending' ? (
                          <button 
                            onClick={() => router.push(`/dashboard/patient/payment?appointmentId=${app._id}&amount=${app.consultationFee}`)}
                            className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-sm font-bold shadow-md transition-colors"
                          >
                            Pay ${app.consultationFee}
                          </button>
                        ) : (
                          <button className="bg-surface-variant dark:bg-white/10 text-on-surface dark:text-slate-200 px-4 py-2 rounded-lg font-label-sm font-bold hover:bg-white/20 transition-colors">
                            Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
            <form onSubmit={handleReschedule} className="space-y-4 text-left">
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
    </div>
  );
}
