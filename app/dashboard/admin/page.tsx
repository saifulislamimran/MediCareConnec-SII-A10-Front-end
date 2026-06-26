"use client";

import { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';

const growthData = [
  { name: 'Jan', appointments: 2400, doctors: 1800 },
  { name: 'Feb', appointments: 3000, doctors: 1950 },
  { name: 'Mar', appointments: 4200, doctors: 2100 },
  { name: 'Apr', appointments: 4800, doctors: 2400 },
  { name: 'May', appointments: 6100, doctors: 2800 },
  { name: 'Jun', appointments: 7200, doctors: 3200 },
];

const pieData = [
  { name: 'Consultation', value: 520 },
  { name: 'Surgery', value: 180 },
  { name: 'Follow-up', value: 300 },
];
const PIE_COLORS = ['#00685f', '#76dcff', '#bec6e0'];

const specialistData = [
  { name: 'Cardiology', score: 98, active: 45 },
  { name: 'Neurology', score: 94, active: 38 },
  { name: 'Oncology', score: 92, active: 52 },
  { name: 'Pediatrics', score: 88, active: 61 },
  { name: 'Dermatology', score: 85, active: 29 },
  { name: 'Radiology', score: 82, active: 33 },
];

// Custom Tooltip for Glassmorphism Chart Tooltips
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl">
        <p className="font-bold text-[#0d1c2e] dark:text-slate-100 text-sm mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-lg">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-slate-100">Analytics Dashboard</h1>
          <p className="text-on-surface-variant dark:text-slate-400 text-sm">Real-time healthcare platform statistics and growth metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-200 px-4 py-2 rounded-full text-xs font-bold border border-outline-variant/20 dark:border-white/10 focus:ring-primary focus:border-primary outline-none cursor-pointer">
            <option>Last 24h</option>
            <option>Last 7d</option>
            <option>Last 30d</option>
            <option selected>Last 6mo</option>
          </select>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-xs">download</span> Export
          </button>
        </div>
      </div>

      {/* Hero Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-36 border-white/20 dark:border-white/10">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 p-3 rounded-xl">
              <span className="material-symbols-outlined text-primary dark:text-inverse-primary">group</span>
            </div>
            <span className="text-primary dark:text-inverse-primary font-bold flex items-center text-xs px-2 py-1 bg-primary/5 rounded-full">+12.5% <span className="material-symbols-outlined text-xs ml-0.5">trending_up</span></span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant/70 dark:text-slate-400 font-label-sm text-[10px] uppercase tracking-widest font-extrabold">Total Users</p>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-slate-100">15,248</h3>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-36 border-white/20 dark:border-white/10">
          <div className="flex justify-between items-start">
            <div className="bg-secondary/10 p-3 rounded-xl">
              <span className="material-symbols-outlined text-secondary">medical_services</span>
            </div>
            <span className="text-secondary dark:text-secondary-container font-bold flex items-center text-xs px-2 py-1 bg-secondary/5 rounded-full">+3.2% <span className="material-symbols-outlined text-xs ml-0.5">trending_up</span></span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant/70 dark:text-slate-400 font-label-sm text-[10px] uppercase tracking-widest font-extrabold">Total Doctors</p>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-slate-100">842</h3>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-36 border-white/20 dark:border-white/10">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 p-3 rounded-xl">
              <span className="material-symbols-outlined text-primary dark:text-inverse-primary">event_available</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary dark:text-inverse-primary font-bold text-xs uppercase">Live</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant/70 dark:text-slate-400 font-label-sm text-[10px] uppercase tracking-widest font-extrabold">Active Appointments</p>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-slate-100">128</h3>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-36 border-white/20 dark:border-white/10">
          <div className="flex justify-between items-start">
            <div className="bg-tertiary/10 p-3 rounded-xl">
              <span className="material-symbols-outlined text-tertiary">payments</span>
            </div>
            <span className="text-primary dark:text-inverse-primary font-bold flex items-center text-xs px-2 py-1 bg-primary/5 rounded-full">+18.4% <span className="material-symbols-outlined text-xs ml-0.5">trending_up</span></span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant/70 dark:text-slate-400 font-label-sm text-[10px] uppercase tracking-widest font-extrabold">Platform Revenue</p>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-slate-100">$240.5k</h3>
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left Column: Growth & Specialists */}
        <div className="lg:col-span-2 space-y-gutter">
          {/* Growth Metrics */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border-white/20 dark:border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Growth Metrics</h4>
                <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-sm">6-Month Clinical Expansion Analysis</p>
              </div>
              <div className="flex gap-2 bg-surface-container-low dark:bg-slate-900 p-1 rounded-full border border-outline-variant/10">
                <button className="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-white dark:bg-primary text-primary dark:text-on-primary shadow-sm">Patients</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-bold transition-all text-on-surface-variant dark:text-slate-400 hover:text-primary">Doctors</button>
              </div>
            </div>
            <div className="h-[360px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00685f" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00685f" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,104,95,0.05)" />
                    <XAxis dataKey="name" stroke="#6d7a77" fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis stroke="#6d7a77" fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00685f', strokeWidth: 1 }} />
                    <Area type="monotone" dataKey="appointments" stroke="#00685f" strokeWidth={3} fillOpacity={1} fill="url(#colorPrimary)" name="Total Appointments" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          {/* Specialist Ratings */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border-white/20 dark:border-white/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Specialist Ratings</h4>
                <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-sm">Top Performance Index by Department</p>
              </div>
              <button className="text-primary dark:text-inverse-primary font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            <div className="h-[320px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={specialistData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,104,95,0.05)" />
                    <XAxis dataKey="name" stroke="#6d7a77" fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis stroke="#6d7a77" fontSize={10} fontWeight={600} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0, 104, 95, 0.05)', radius: 8}} />
                    <Bar dataKey="score" fill="#00685f" radius={[8, 8, 0, 0]} name="Performance Index" barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column: Distribution & Node Health */}
        <div className="space-y-gutter">
          {/* Appointment Distribution */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border-white/20 dark:border-white/10 flex flex-col">
            <div className="mb-8 text-center lg:text-left">
              <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Service Distribution</h4>
              <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-sm">Current Appointment Shares</p>
            </div>
            <div className="h-64 w-full flex-1">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="text-on-surface-variant dark:text-slate-400 text-sm font-semibold">Consultation</span>
                </div>
                <div className="text-right">
                  <p className="text-on-surface dark:text-slate-100 font-bold text-sm">52%</p>
                  <p className="text-[10px] text-primary dark:text-inverse-primary font-bold">+4% vs LW</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-secondary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                  <span className="text-on-surface-variant dark:text-slate-400 text-sm font-semibold">Surgery</span>
                </div>
                <div className="text-right">
                  <p className="text-on-surface dark:text-slate-100 font-bold text-sm">18%</p>
                  <p className="text-[10px] text-secondary font-bold">-2% vs LW</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-tertiary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                  <span className="text-on-surface-variant dark:text-slate-400 text-sm font-semibold">Follow-up</span>
                </div>
                <div className="text-right">
                  <p className="text-on-surface dark:text-slate-100 font-bold text-sm">30%</p>
                  <p className="text-[10px] text-tertiary font-bold">+1% vs LW</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Node Health Status */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border-white/20 dark:border-white/10 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Node Health</h4>
                <span className="material-symbols-outlined text-primary/40 animate-spin-slow">settings</span>
              </div>
              <div className="space-y-4">
                {/* Node Item 1 */}
                <div className="group/node p-4 bg-white/40 dark:bg-slate-950/40 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                      </span>
                      <p className="text-on-surface dark:text-slate-100 font-bold text-sm">Northern Cluster</p>
                    </div>
                    <span className="bg-primary/10 text-primary dark:text-inverse-primary px-2 py-0.5 rounded-full font-bold text-[10px] tracking-tight">OPTIMAL</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400 text-[10px] font-medium">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">speed</span> 14ms Latency</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">group</span> 1.2k Sessions</span>
                  </div>
                </div>
                
                {/* Node Item 2 */}
                <div className="group/node p-4 bg-white/40 dark:bg-slate-950/40 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      <p className="text-on-surface dark:text-slate-100 font-bold text-sm">Southern Records</p>
                    </div>
                    <span className="bg-primary/10 text-primary dark:text-inverse-primary px-2 py-0.5 rounded-full font-bold text-[10px] tracking-tight">ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400 text-[10px] font-medium">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">speed</span> 22ms Latency</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">group</span> 842 Sessions</span>
                  </div>
                </div>
                
                {/* Node Item 3 */}
                <div className="group/node p-4 bg-white/40 dark:bg-slate-950/40 rounded-2xl border border-error/5 hover:border-error/20 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-error opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
                      </span>
                      <p className="text-on-surface dark:text-slate-100 font-bold text-sm">Western API GW</p>
                    </div>
                    <span className="bg-error/10 text-error px-2 py-0.5 rounded-full font-bold text-[10px] tracking-tight">CRITICAL</span>
                  </div>
                  <div className="flex items-center justify-between text-error/80 dark:text-red-400 text-[10px] font-bold">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">warning</span> Maintenance required</span>
                    <span className="bg-error text-white px-1.5 py-0.5 rounded">Alert</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-40 group-hover:bg-primary/20 transition-all pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* FAB for quick action */}
      <button 
        onClick={() => alert("Quick Action modal is simulated.")}
        className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg hover:shadow-primary/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-50 cursor-pointer"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
