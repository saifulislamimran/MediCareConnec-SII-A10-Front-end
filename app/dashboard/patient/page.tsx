"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Activity {
  id: string;
  type: 'lab' | 'payment' | 'prescription';
  title: string;
  desc: string;
  time: string;
}

export default function PatientOverviewPage() {
  const [balance, setBalance] = useState(42.00);
  const [totalPaid, setTotalPaid] = useState(1248.50);
  const [showToast, setShowToast] = useState(false);

  // Trigger toast on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    if (balance === 0) {
      alert("You have no outstanding balance to pay.");
      return;
    }
    if (confirm(`Authorize co-pay payment of $${balance.toFixed(2)}?`)) {
      setTotalPaid(totalPaid + balance);
      setBalance(0);
      alert("Payment processed successfully! Thank you.");
    }
  };

  const activities: Activity[] = [
    { id: '1', type: 'lab', title: 'Lab Results Uploaded', desc: 'Annual Blood Work results are now available for review.', time: '2 hours ago' },
    { id: '2', type: 'payment', title: 'Payment Processed', desc: 'Co-pay for appointment on Oct 12th was successful ($25.00).', time: 'Yesterday' },
    { id: '3', type: 'prescription', title: 'Prescription Renewed', desc: 'Lisinopril 10mg renewed by Dr. Chen.', time: 'Oct 20, 2024' },
  ];

  return (
    <div className="space-y-lg relative">
      {/* Welcome Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">Good Morning, Alexander</h2>
        <p className="text-on-surface-variant dark:text-on-surface-variant/80 text-sm">You have 1 appointment today and your health vitals look stable.</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Vitals Summary Card */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between h-80 relative overflow-hidden border-white/20 dark:border-white/10 shadow-lg">
          <div className="absolute -right-6 -top-6 opacity-5 pointer-events-none text-primary dark:text-inverse-primary select-none">
            <span className="material-symbols-outlined text-[180px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="flex justify-between items-start z-10">
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white">Real-time Vitals</h3>
              <p className="text-xs text-on-surface-variant/60">Last updated: 5 mins ago via MediWatch</p>
            </div>
            <span className="px-3 py-1.5 bg-primary/10 text-primary dark:text-inverse-primary text-xs font-bold rounded-full flex items-center gap-1.5 border border-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Live Syncing
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8 z-10">
            <div className="bg-white/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-white/50 dark:border-white/10 shadow-sm">
              <p className="text-xs text-on-surface-variant/80 font-bold mb-1">Heart Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary">72</span>
                <span className="text-xs text-on-surface-variant/60 font-semibold">BPM</span>
              </div>
              <div className="mt-4 h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[70%]"></div>
              </div>
            </div>
            <div className="bg-white/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-white/50 dark:border-white/10 shadow-sm">
              <p className="text-xs text-on-surface-variant/80 font-bold mb-1">Blood Pressure</p>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-lg text-headline-lg font-bold text-secondary">118/76</span>
                <span className="text-xs text-on-surface-variant/60 font-semibold">mmHg</span>
              </div>
              <div className="mt-4 h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[85%]"></div>
              </div>
            </div>
            <div className="bg-white/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-white/50 dark:border-white/10 shadow-sm">
              <p className="text-xs text-on-surface-variant/80 font-bold mb-1">SPO2</p>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">98</span>
                <span className="text-xs text-on-surface-variant/60 font-semibold">%</span>
              </div>
              <div className="mt-4 h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="bg-on-surface h-full w-[98%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-6 flex flex-col h-80 border-white/20 dark:border-white/10 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/80">Upcoming Visits</h3>
            <Link className="text-primary dark:text-inverse-primary text-xs font-bold hover:underline" href="/dashboard/patient/appointments">View All</Link>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            <div className="flex gap-3.5 p-3 bg-primary-container/5 rounded-2xl border border-primary/10">
              <div className="bg-primary/10 text-primary dark:text-inverse-primary h-12 w-12 rounded-xl flex flex-col items-center justify-center font-bold shrink-0">
                <span className="text-[10px] leading-tight">OCT</span>
                <span className="text-base leading-tight">24</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface dark:text-white">General Checkup</h4>
                <p className="text-xs text-on-surface-variant/80 mt-0.5">09:30 AM • Dr. Sarah Chen</p>
              </div>
            </div>
            <div className="flex gap-3.5 p-3 hover:bg-surface-container-high/20 rounded-2xl transition-colors border border-transparent">
              <div className="bg-surface-container-highest text-on-surface-variant h-12 w-12 rounded-xl flex flex-col items-center justify-center font-bold shrink-0">
                <span className="text-[10px] leading-tight">NOV</span>
                <span className="text-base leading-tight">02</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface dark:text-white">Dental Cleaning</h4>
                <p className="text-xs text-on-surface-variant/80 mt-0.5">02:15 PM • Dr. James Miller</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-5 glass-card rounded-3xl p-6 h-[380px] flex flex-col border-white/20 dark:border-white/10 shadow-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/80 mb-4">Recent Activity</h3>
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 items-start">
                <div className={`p-2 rounded-full shrink-0 ${
                  act.type === 'lab' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : act.type === 'payment' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-primary-fixed text-on-primary-fixed'
                }`}>
                  <span className="material-symbols-outlined text-sm">
                    {act.type === 'lab' ? 'science' : act.type === 'payment' ? 'payments' : 'medication'}
                  </span>
                </div>
                <div className="flex-1 border-b border-outline-variant/10 pb-3">
                  <p className="text-sm font-bold text-on-surface dark:text-white">{act.title}</p>
                  <p className="text-xs text-on-surface-variant dark:text-on-surface-variant/80 mt-0.5 leading-relaxed">{act.desc}</p>
                  <p className="text-[10px] text-on-surface-variant/60 font-semibold mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Doctors */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card rounded-3xl p-6 h-[380px] border-white/20 dark:border-white/10 shadow-lg flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/80 mb-4">Favorite Doctors</h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="bg-white/30 dark:bg-slate-900/30 rounded-2xl p-3.5 text-center border border-white/20 dark:border-white/5 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-center">
              <img className="w-12 h-12 rounded-full object-cover mx-auto mb-2 border border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9J693rISU37S5SLTUf9sqxUerYH9xAGRE9HX023CwkCDqOEoyahr6s63tvf_JSKu8CGazc5aZcEfQzg1uzm7l10VjdZt5vjMCg11EjUm4nIXJwPJSc5MThP27aUfBTx4sIfWGlo69Ll6aUVNFts4xlI8UYRbhtdCThC4GkLnrraDvcJVg_t0X7-e6a71wUQVanzCGYoJNk59wkL47KZnzlnMIZNZX7KBMLvzW9kU8Zjc872xkm1QuRgvIc0zONCxvEAIUgZCc8aJb" alt="Dr. Miller" />
              <p className="text-xs font-bold text-on-surface dark:text-white truncate">Dr. Miller</p>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold truncate mt-0.5">Cardiology</p>
            </div>
            <div className="bg-white/30 dark:bg-slate-900/30 rounded-2xl p-3.5 text-center border border-white/20 dark:border-white/5 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-center">
              <img className="w-12 h-12 rounded-full object-cover mx-auto mb-2 border border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB4EJLQqmdAaD-iZwGDuu2x3HV7dnkfx8Txw_UF6maQj-_cRz-ZWoVmaz6vb-s_Jgwt_ndQBh46sBf-Ahkff2Vr4LXtHfg4Je0NmrAeOGKDk1XA4Y2ESxh1y_-OrYZp2PUn7eepxv0SqMuHjIEo4MrDq1q9uk5w5Z4FTEavkTuXgS0F7Uoxx99NRUmsbj7G0ZUM_gKTuYER_b6pEOHv5NVG6U5aYsld-gykEFB80vtXxw1Q06zGJD7fdzUuzBdVNpxsL4ap7l2XAQM" alt="Dr. Sophia" />
              <p className="text-xs font-bold text-on-surface dark:text-white truncate">Dr. Sophia</p>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold truncate mt-0.5">Pediatrics</p>
            </div>
            <div className="bg-white/30 dark:bg-slate-900/30 rounded-2xl p-3.5 text-center border border-white/20 dark:border-white/5 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-center">
              <img className="w-12 h-12 rounded-full object-cover mx-auto mb-2 border border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR-cs0OVmcMlDgo8SlSHT-YOpiiiKOclR6dq_LBt9WkGG_LVDhFCSKUzruZUM6GLr0F6U3g2czpNq-4tCFoT9-KH4uN9TGo8q6d6xQlR32hcqp0CLgA3EAbfgjaY8BmZcg4GQqe_1JtDdNjKpnOG6l5V1AkFlHFNlzEJaCIaHW5WkW38tSO2pGyC9TcjNdptdNxNVL09r-3_f_uiVsmqK-R8Rp9YEg_z8VELjXiZPrxZWcMKSqEYakSJZKNImZTkRsT6AxorQxsoqu" alt="Dr. Hans" />
              <p className="text-xs font-bold text-on-surface dark:text-white truncate">Dr. Hans</p>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold truncate mt-0.5">Orthopedic</p>
            </div>
            <Link href="/doctors" className="bg-primary/5 hover:bg-primary/10 rounded-2xl p-3.5 text-center border border-primary/20 flex flex-col items-center justify-center cursor-pointer group">
              <span className="material-symbols-outlined text-primary mb-1 transition-transform group-hover:scale-110">add</span>
              <p className="text-[10px] text-primary font-bold leading-tight">Browse<br/>Directory</p>
            </Link>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 glass-card rounded-3xl p-6 h-[380px] flex flex-col justify-between overflow-hidden border-white/20 dark:border-white/10 shadow-lg relative">
          <div className="z-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/80 mb-6">Billing Summary</h3>
            <div className="mb-4">
              <p className="text-xs text-on-surface-variant/60">Total Paid (2026)</p>
              <h4 className="text-xl font-bold text-primary dark:text-inverse-primary">${totalPaid.toFixed(2)}</h4>
            </div>
            <div className="mb-4">
              <p className="text-xs text-on-surface-variant/60">Outstanding Balance</p>
              <h4 className="text-xl font-bold text-on-surface dark:text-white">${balance.toFixed(2)}</h4>
            </div>
          </div>
          <button 
            type="button"
            onClick={handlePayment}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all z-10 cursor-pointer shadow-md ${
              balance > 0 
                ? 'bg-secondary hover:bg-secondary/90 text-white' 
                : 'bg-surface-container-low text-on-surface-variant/50 cursor-not-allowed'
            }`}
            disabled={balance === 0}
          >
            {balance > 0 ? 'Pay Outstanding' : 'Fully Settled'}
          </button>
          <div className="absolute bottom-0 right-0 w-full opacity-5 pointer-events-none select-none">
            <svg className="w-full h-24 text-primary" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 C20,80 40,90 60,70 S80,60 100,40 V100 H0 Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Simulated Vital Sync Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 glass-card rounded-2xl p-4 shadow-2xl z-[100] flex items-center gap-3 max-w-sm border-white/20 dark:border-white/10 animate-slide-in">
          <div className="bg-primary/20 p-2 rounded-full shrink-0 text-primary">
            <span className="material-symbols-outlined">notifications_active</span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-on-surface dark:text-white">New Vital Sync</p>
            <p className="text-[11px] text-on-surface-variant">Your watch telemetry vitals were successfully synced.</p>
          </div>
          <button className="text-on-surface-variant/60 hover:text-on-surface p-1 cursor-pointer" onClick={() => setShowToast(false)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
