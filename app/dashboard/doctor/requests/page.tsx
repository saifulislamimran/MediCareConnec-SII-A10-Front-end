"use client";

import { useState, useEffect } from 'react';

interface AppointmentRequest {
  id: string;
  patientName: string;
  avatarUrl: string;
  date: string;
  time: string;
  specialty: string;
  reason: string;
  priority: 'Emergency' | 'Normal';
  reqNumber?: string;
}

export default function DoctorRequestsPage() {
  const [requests, setRequests] = useState<AppointmentRequest[]>([
    {
      id: '1',
      patientName: 'Sarah Jenkins',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIbG0dmR0KNcD7nKpG6hlK5D2-b2nEu6miGRW_CawFUcsHB5yuUtbG_JmqIk9PbAdez4lU316sf4WuJ4BLvzbfoFKH5d41hs6Uxpuv9P8OCyTTMHj9jtowjze_VvEWzNX5BqbpPHZFJBi0-2r-M8mEJKaQ7p9FbPXqjUZ0tEell4Lnv7r8wp08iODnu4sZXxVzB_6lAx9jqmG4ldAcAqXjqelyOV2I2MvpSE1Wd4I7438bfh-JRJcIJMlhJobx5FmUq9P9dFY0OdRy',
      date: 'Oct 24, 2023',
      time: '09:30 AM',
      specialty: 'Dermatology',
      reason: "Persistent rash on my left forearm for the last 3 days. It's getting itchy.",
      priority: 'Normal'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKq0iZe9TZiCMwgA0Iv9-UMvrX2aII5TaZkWsHgZo6XQPLUfSrW8GJ7SxryhuoJl1VN0E1-CHwC2u9EMhpAFznh5YXfDuicmAoDP-sK35sYi87SdpSaDXznyZzCQY21gS8b9EXxJv1wEU-AM037v9h3vcRsgbC25qKSLJ8tkt_vWuXqWKyK4P7ff6_f4hekglAXy5fNfCNo0rZx-h15oREEzFPUp7me7D8J-i47MfcpcyAbvEgezxYvKsQ0Rb_TahqKldmpbioAsvM',
      date: 'Oct 24, 2023',
      time: '11:15 AM',
      specialty: 'General Wellness',
      reason: 'Annual physical examination and blood work review. Nutrition plan discussion.',
      priority: 'Normal'
    },
    {
      id: '3',
      patientName: 'Albert Thompson',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm80jo8Q8JPDkpOBeOglVRI9opgfjyVIfL3jd4QMPZsqHC_YbrwQS3I_E6ThjvYosnSk6Rk2ugLFskx3TQxNHmdPsmmvgWC6SbuO3PzQiB5ZqQQ5ZiuYbQxJl4IFo4GInhg6-SSMATTzxJo40hiXLisS7Doqq8DumbbHaYe_4QEf3QnHYyQhypv3N16zwEBpO8wXFbr5tUDeCOHCEKAoUtD8pFbujPjZ41DhQ5ldzpKtE_x_Kwz802uFzQGoG1lIO--AM8LPxyEwxK',
      date: 'Oct 25, 2023',
      time: '02:00 PM',
      specialty: 'Cardiology',
      reason: 'Follow-up on recent hypertension medication change. Occasional dizziness.',
      priority: 'Normal'
    },
    {
      id: '4',
      patientName: 'Elena Rodriguez',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs7G8vEsQzrEC-yyj0NQNdxqXZZcrAI4SWp3rYlEjVP4P9etqwkd5OamLZQkN54gqZxZ_KMK4iGTJXriJY2k8nU1ezXURJA4ghOgqA4SVIB97a7vBrPIYehsytHWeZApx72HVKQDoYtpMd89M5l-_JgTVjYQwakD6LL2h6HSOwLrWpO5LI3lAcYjFVadjJYvvHUUeSlgtFDe571GlKGSsyabv4puuUzm5WAPsoVa0Oweu-_WUYWgCv18s1XqD4qlawbnt4PyQHOyg6',
      date: 'Today',
      time: '1:45 PM',
      specialty: 'Emergency Video Call',
      reason: "Urgent video consultation regarding post-operative discomfort after last week's procedure. Reports moderate localized pain.",
      priority: 'Emergency',
      reqNumber: '8821'
    }
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<AppointmentRequest | null>(null);
  const [autoScheduling, setAutoScheduling] = useState(false);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleResolve = (id: string, action: 'Accept' | 'Reject' | 'Decline') => {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    setRequests(prev => prev.filter(r => r.id !== id));
    triggerToast(
      `Request from ${request.patientName} has been ${action === 'Accept' ? 'approved and added to schedule' : 'rejected'}.`,
      action === 'Accept' ? 'success' : 'info'
    );
  };

  const handleAutoSchedule = () => {
    setAutoScheduling(true);
    setTimeout(() => {
      setAutoScheduling(false);
      triggerToast("Calendar slots optimized and gaps auto-scheduled successfully!", "success");
    }, 1500);
  };

  // Find priority and normal requests
  const priorityRequest = requests.find(r => r.priority === 'Emergency');
  const normalRequests = requests.filter(r => r.priority === 'Normal');

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

      {/* Header Section */}
      <div className="mb-xl">
        <div className="flex items-center gap-sm mb-xs">
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 font-bold tracking-tight">Appointment Requests</h2>
          <span className="px-3 py-1 bg-primary/10 dark:bg-primary-fixed-dim/20 text-primary dark:text-primary-fixed-dim rounded-full font-label-sm text-label-sm font-bold">
            {requests.length} New
          </span>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-2xl mt-xs">
          Review and manage incoming consultation requests. Ensure timely responses to maintain high patient satisfaction scores.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-gutter mb-xl items-stretch">
        {normalRequests.map(req => (
          <div 
            key={req.id} 
            className="glass p-md rounded-xl flex flex-col gap-md hover:shadow-2xl hover:scale-[1.01] transition-all border-l-4 border-l-primary/40 dark:bg-slate-900/60 dark:border-white/10"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-sm">
                <img 
                  className="w-14 h-14 rounded-xl object-cover border border-white/20 shadow-sm" 
                  src={req.avatarUrl} 
                  alt={req.patientName} 
                />
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-bold">{req.patientName}</h4>
                  <div className="flex items-center gap-1 text-on-surface-variant dark:text-slate-400 text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                    <span>{req.date} • {req.time}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim rounded font-label-sm text-label-sm font-bold">{req.specialty}</span>
            </div>
            <div className="bg-surface-variant/20 dark:bg-white/5 p-4 rounded-xl flex-grow text-left">
              <p className="text-label-sm text-on-surface-variant dark:text-slate-400 mb-1 font-bold uppercase tracking-tight">Reason for Visit</p>
              <p className="font-body-md text-body-md italic text-on-surface/80 dark:text-slate-300">"{req.reason}"</p>
            </div>
            <div className="mt-auto flex gap-2">
              <button 
                onClick={() => handleResolve(req.id, 'Accept')}
                className="flex-1 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span> Accept
              </button>
              <button 
                onClick={() => handleResolve(req.id, 'Reject')}
                className="flex-1 py-2 rounded-xl bg-error hover:opacity-90 text-on-error font-label-md text-label-md shadow-lg shadow-error/10 transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span> Reject
              </button>
              <button 
                onClick={() => setSelectedRequest(req)}
                className="px-3 py-2 rounded-xl bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim hover:bg-secondary hover:text-white transition-all cursor-pointer"
                title="View request details"
              >
                <span className="material-symbols-outlined">task_alt</span>
              </button>
            </div>
          </div>
        ))}

        {/* Priority Large Card */}
        {priorityRequest && (
          <div className="glass xl:col-span-2 p-md rounded-xl flex flex-col md:flex-row gap-lg hover:shadow-2xl transition-all border-l-4 border-l-error bg-error/5 dark:bg-error/10 dark:border-white/10 flex-grow">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div 
                className="h-48 md:h-full w-full rounded-2xl bg-cover bg-center border border-white/10" 
                style={{ backgroundImage: `url('${priorityRequest.avatarUrl}')` }}
              ></div>
            </div>
            <div className="flex-grow flex flex-col justify-between text-left">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-error text-on-error px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Emergency Priority</span>
                  <span className="text-on-surface-variant dark:text-slate-400 font-label-md font-mono">Req #{priorityRequest.reqNumber}</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 mb-2 font-bold">{priorityRequest.patientName}</h3>
                <p className="text-on-surface-variant dark:text-slate-400 font-body-md mb-6 leading-relaxed">
                  {priorityRequest.reason}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <button 
                  onClick={() => handleResolve(priorityRequest.id, 'Accept')}
                  className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined">video_call</span> Accept Call
                </button>
                <button 
                  onClick={() => handleResolve(priorityRequest.id, 'Decline')}
                  className="flex-1 py-3 rounded-xl bg-error hover:opacity-90 text-on-error font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span> Decline
                </button>
                <div className="flex items-center gap-2 bg-white/20 dark:bg-slate-900/40 px-4 py-3 rounded-xl border border-white/10 dark:border-white/5">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">schedule</span>
                  <span className="text-label-md font-bold dark:text-slate-100">{priorityRequest.date}, {priorityRequest.time}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Efficiency Card */}
        <div className="glass p-md rounded-xl flex flex-col justify-between border-l-4 border-l-secondary/40 dark:bg-slate-900/60 dark:border-white/10 text-left">
          <div>
            <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-semibold mb-2">Efficiency Rating</h4>
            <div className="flex items-end gap-2">
              <span className="text-[56px] font-bold text-primary dark:text-primary-fixed-dim leading-none">98%</span>
              <span className="text-on-surface-variant dark:text-slate-400 font-label-md mb-2 font-bold">+2.4% this week</span>
            </div>
          </div>
          <div className="bg-white/30 dark:bg-black/20 p-4 rounded-xl mt-4 border border-white/10 dark:border-white/5">
            <p className="text-label-sm font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-2">Quick Action</p>
            <button 
              onClick={handleAutoSchedule}
              disabled={autoScheduling}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-70"
            >
              {autoScheduling ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Optimizing Gaps...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">bolt</span> 
                  Auto-Schedule Gaps
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Request Summary
              </h4>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-on-surface-variant dark:text-slate-400 hover:opacity-85"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-sm">
                <img className="w-12 h-12 rounded-full object-cover" src={selectedRequest.avatarUrl} alt="" />
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-slate-100 font-bold">{selectedRequest.patientName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{selectedRequest.specialty}</p>
                </div>
              </div>
              <div className="h-px bg-outline-variant/20 dark:bg-white/10"></div>
              <div className="text-xs space-y-2 text-on-surface-variant dark:text-slate-300 font-mono">
                <p><span className="font-bold text-on-surface dark:text-slate-200">Date:</span> {selectedRequest.date}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-200">Requested Time:</span> {selectedRequest.time}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-200">Urgency Level:</span> {selectedRequest.priority}</p>
              </div>
              <div className="bg-surface-variant/20 dark:bg-white/5 p-3 rounded-xl">
                <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-tight mb-1">Reason Statement</p>
                <p className="text-xs italic text-on-surface/80 dark:text-slate-300">"{selectedRequest.reason}"</p>
              </div>
            </div>
            <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2">
              <button 
                onClick={() => {
                  handleResolve(selectedRequest.id, 'Reject');
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Reject Request
              </button>
              <button 
                onClick={() => {
                  handleResolve(selectedRequest.id, 'Accept');
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold cursor-pointer"
              >
                Accept Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
