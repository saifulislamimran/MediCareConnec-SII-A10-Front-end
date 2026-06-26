"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface ApiLog {
  timestamp: string;
  endpoint: string;
  method: string;
  status: string;
  latency: string;
}

export default function SystemMonitoringPage() {
  const [cpu, setCpu] = useState(8.2);
  const [memory, setMemory] = useState(32.4);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([
    { timestamp: "14:23:45.092", endpoint: "/api/v1/patients/active", method: "GET", status: "200 OK", latency: "14ms" },
    { timestamp: "14:23:42.881", endpoint: "/api/v1/auth/session", method: "POST", status: "200 OK", latency: "22ms" },
    { timestamp: "14:23:40.115", endpoint: "/api/v2/medical-records/scan", method: "GET", status: "404 ERR", latency: "8ms" },
    { timestamp: "14:23:38.452", endpoint: "/api/v1/billing/process", method: "POST", status: "201 OK", latency: "156ms" },
    { timestamp: "14:23:35.201", endpoint: "/api/v1/doctors/schedule", method: "GET", status: "200 OK", latency: "12ms" },
  ]);

  const [terminalLines, setTerminalLines] = useState<string[]>([
    "[INFO] System kernel updated to 5.15.0-89-generic",
    "14:20:12 Initializing firewall ruleset...",
    "14:20:15 Scanning incoming packets from NODE_X7...",
    "[WARN] Multiple failed login attempts from 192.168.1.104",
    "14:21:05 User \"admin_01\" authenticated via OAuth2",
    "[ALERT] Potential SQL Injection detected on /v1/records",
    "[BLOCK] IP 45.12.33.1 blocked for 24 hours",
    "14:22:30 Routine DB snapshot completed successfully",
    "[INFO] Network topology verified. 24 active shards.",
    "14:23:01 Heartbeat received from AuthCluster-B",
    "14:23:15 Connection established with Backup-Cloud-S3",
    "14:23:22 Patching CVE-2023-4567 on runtime containers...",
    "14:23:45 Monitoring agent 7.4.2 active and reporting.",
  ]);

  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  // Simulate CPU & Memory Fluctuations
  useEffect(() => {
    const cpuTimer = setInterval(() => {
      setCpu(prev => {
        const delta = Math.random() * 2 - 1;
        const next = parseFloat((prev + delta).toFixed(1));
        return next > 2 ? (next < 25 ? next : 15) : 5;
      });
    }, 3000);

    const memTimer = setInterval(() => {
      setMemory(prev => {
        const delta = Math.random() * 1.5 - 0.75;
        const next = parseFloat((prev + delta).toFixed(1));
        return next > 20 ? (next < 50 ? next : 40) : 25;
      });
    }, 4000);

    return () => {
      clearInterval(cpuTimer);
      clearInterval(memTimer);
    };
  }, []);

  // Simulate Live API Traffic Streaming
  const endpoints = [
    { url: '/api/v1/patients/active', method: 'GET', latency: '14ms', status: '200 OK' },
    { url: '/api/v1/auth/session', method: 'POST', latency: '22ms', status: '200 OK' },
    { url: '/api/v1/doctors/schedule', method: 'GET', latency: '12ms', status: '200 OK' },
    { url: '/api/v1/billing/process', method: 'POST', latency: '156ms', status: '201 OK' },
    { url: '/api/v2/medical-records/scan', method: 'GET', latency: '8ms', status: '404 ERR' },
    { url: '/api/v1/notifications/push', method: 'POST', latency: '45ms', status: '200 OK' },
    { url: '/api/v1/prescriptions/new', method: 'POST', latency: '89ms', status: '201 OK' },
  ];

  const triggerRefreshLogs = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    
    // Add 2-3 random logs at once
    const randomCount = Math.floor(Math.random() * 2) + 2;
    const newLogs: ApiLog[] = [];
    
    for (let i = 0; i < randomCount; i++) {
      const randomItem = endpoints[Math.floor(Math.random() * endpoints.length)];
      newLogs.push({
        timestamp: timeStr,
        endpoint: randomItem.url,
        method: randomItem.method,
        status: randomItem.status,
        latency: randomItem.latency
      });
    }

    setApiLogs(prev => [...newLogs, ...prev].slice(0, 10));
    setTerminalLines(prev => [...prev, `[INFO] ${timeStr} Live logs refreshed manually.`]);
  };

  useEffect(() => {
    const apiTimer = setInterval(() => {
      const randomItem = endpoints[Math.floor(Math.random() * endpoints.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      
      const newLog = {
        timestamp: timeStr,
        endpoint: randomItem.url,
        method: randomItem.method,
        status: randomItem.status,
        latency: randomItem.latency
      };

      setApiLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 6000);

    return () => clearInterval(apiTimer);
  }, []);

  // Handle Terminal Console Input
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLines = [...terminalLines, `> ${terminalInput}`];

    if (cmd === 'clear') {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    }

    if (cmd === 'help') {
      newLines.push(
        "Available commands:",
        "  help    - Show this system manual",
        "  status  - Print current system telemetry status",
        "  ping    - Ping biometric cluster database node",
        "  nodes   - List active shards and replication cluster",
        "  clear   - Clear console screen"
      );
    } else if (cmd === 'status') {
      newLines.push(
        "[OK] Core system cluster: STABLE",
        `[OK] CPU Load average: ${cpu}%`,
        `[OK] Memory usage: ${memory}%`,
        "[OK] Shards: 24 active, 0 failed",
        "[OK] Gateway response latency: 18ms"
      );
    } else if (cmd === 'ping') {
      newLines.push(
        "PING NODE_X7 (192.168.10.45) 56(84) bytes of data.",
        "64 bytes from NODE_X7: icmp_seq=1 ttl=64 time=12.4 ms",
        "64 bytes from NODE_X7: icmp_seq=2 ttl=64 time=11.8 ms",
        "--- NODE_X7 ping statistics ---",
        "2 packets transmitted, 2 received, 0% packet loss, time 1002ms",
        "rtt min/avg/max/mdev = 11.841/12.132/12.423/0.291 ms"
      );
    } else if (cmd === 'nodes') {
      newLines.push(
        "NODE_NAME        ROLE      STATUS    IP_ADDRESS",
        "AuthCluster-B    replica   active    192.168.10.12",
        "DB-Primary-Node  primary   active    192.168.10.45",
        "SyncEngine-Node  worker    active    192.168.10.88",
        "Cluster total: 3/3 nodes online."
      );
    } else {
      newLines.push(`Command not found: "${cmd}". Type 'help' for options.`);
    }

    setTerminalLines(newLines);
    setTerminalInput("");
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary/10 to-secondary/5 border border-outline-variant/20 bg-white/20 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="relative z-10 max-w-[672px]">
          <h3 className="font-headline-lg text-headline-lg mb-2 text-on-surface dark:text-slate-100 font-semibold">System Monitoring Dashboard</h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400">Real-time telemetry and health diagnostics for Medicare Connect's distributed infrastructure.</p>
        </div>
        {/* Background Decorative */}
        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[300px] text-primary">analytics</span>
        </div>
      </div>

      {/* Server Health Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Uptime Card */}
        <div className="glass dark:bg-slate-900/60 dark:border-white/10 p-6 rounded-2xl flex flex-col gap-4 group hover:bg-white/60 dark:hover:bg-slate-900/80 transition-all border border-white/20 dark:border-white/5">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/10 dark:bg-primary-fixed/10 rounded-xl text-primary dark:text-primary-fixed">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full status-glow-emerald"></div>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-bold">System Uptime</p>
            <h4 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 font-bold">99.998%</h4>
            <p className="text-emerald-500 font-label-sm text-label-sm flex items-center gap-1 mt-1 font-semibold">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> Stable since last 45 days
            </p>
          </div>
        </div>

        {/* CPU Load Card */}
        <div className="glass dark:bg-slate-900/60 dark:border-white/10 p-6 rounded-2xl flex flex-col gap-4 group hover:bg-white/60 dark:hover:bg-slate-900/80 transition-all border border-white/20 dark:border-white/5">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary/10 dark:bg-secondary-container/10 rounded-xl text-secondary dark:text-secondary-container">
              <span className="material-symbols-outlined">memory</span>
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full status-glow-emerald"></div>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-bold">CPU Load</p>
            <h4 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 font-bold">{cpu}%</h4>
            <div className="w-full bg-outline-variant/35 dark:bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(0,104,95,0.5)] transition-all duration-500" 
                style={{ width: `${cpu}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Memory Usage Card */}
        <div className="glass dark:bg-slate-900/60 dark:border-white/10 p-6 rounded-2xl flex flex-col gap-4 group hover:bg-white/60 dark:hover:bg-slate-900/80 transition-all border border-white/20 dark:border-white/5">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary/10 dark:bg-tertiary-container/10 rounded-xl text-tertiary dark:text-tertiary-fixed-dim">
              <span className="material-symbols-outlined">storage</span>
            </div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${memory > 35 ? 'bg-rose-500 status-glow-rose' : 'bg-emerald-500 status-glow-emerald'}`}></div>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-bold">Memory Usage</p>
            <h4 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 font-bold">{memory}%</h4>
            <div className="w-full bg-outline-variant/35 dark:bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-secondary h-full rounded-full shadow-[0_0_8px_rgba(0,103,128,0.5)] transition-all duration-500" 
                style={{ width: `${memory}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Monitoring Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* API Logs Table */}
        <section className="lg:col-span-8 flex flex-col">
          <div className="glass dark:bg-slate-900/60 dark:border-white/10 rounded-3xl flex-1 overflow-hidden flex flex-col border border-white/20 dark:border-white/5">
            <div className="p-6 border-b border-outline-variant/10 dark:border-white/5 flex justify-between items-center bg-white/20 dark:bg-slate-900/40">
              <h5 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined">terminal</span>
                Live API Traffic
              </h5>
              <button 
                onClick={triggerRefreshLogs}
                className="px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer font-semibold shadow-md shadow-primary/10"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Refresh Logs
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-variant/20 dark:bg-slate-800/40 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-slate-400 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Endpoint</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
                  {apiLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-on-surface-variant dark:text-slate-400 font-mono text-xs">{log.timestamp}</td>
                      <td className="px-6 py-4 font-medium text-on-surface dark:text-slate-100">{log.endpoint}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          log.method === 'POST' 
                            ? 'bg-primary/10 text-primary dark:bg-primary-container/20 dark:text-primary-fixed' 
                            : 'bg-secondary/10 text-secondary dark:bg-secondary-container/20 dark:text-secondary-fixed'
                        }`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 font-bold ${
                          log.status.includes('ERR') 
                            ? 'text-rose-500' 
                            : 'text-emerald-500'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-on-surface-variant dark:text-slate-400">{log.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Security Alerts Terminal */}
        <section className="lg:col-span-4 flex flex-col">
          <div className="bg-[#0f172a] rounded-3xl overflow-hidden flex flex-col h-[500px] border border-white/10 shadow-2xl flex-grow">
            {/* Terminal Window Header */}
            <div className="px-4 py-3 bg-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f87171]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#34d399]"></div>
                </div>
                <span className="ml-4 text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold">Security Telemetry</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-white">filter_alt</span>
            </div>
            
            {/* Terminal Console Logs */}
            <div className="p-4 flex-1 font-mono text-[13px] leading-relaxed text-slate-300 terminal-scroll overflow-y-auto space-y-2 text-left">
              {terminalLines.map((line, idx) => {
                let colorClass = "text-slate-300";
                if (line.startsWith('>')) {
                  colorClass = "text-sky-400 font-bold";
                } else if (line.startsWith('[INFO]')) {
                  colorClass = "text-emerald-400";
                } else if (line.startsWith('[WARN]')) {
                  colorClass = "text-amber-400";
                } else if (line.startsWith('[ALERT]')) {
                  colorClass = "text-rose-500 font-bold animate-pulse";
                } else if (line.startsWith('[BLOCK]')) {
                  colorClass = "text-rose-400";
                } else if (line.includes('14:')) {
                  colorClass = "text-slate-500";
                }
                return (
                  <p key={idx} className={colorClass}>{line}</p>
                );
              })}
              <div ref={terminalEndRef} />
            </div>
            
            {/* Command Input Box */}
            <form onSubmit={handleCommand} className="p-3 bg-[#1e293b]/50 border-t border-white/5 flex items-center">
              <span className="text-emerald-400 mr-2 font-mono font-bold">$</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-slate-200 placeholder:text-slate-600 w-full font-mono text-[13px] outline-none" 
                placeholder="Execute command... (type 'help')" 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
              />
            </form>
          </div>
        </section>
      </div>

      {/* Visual Decorative Element (Genetic Pulse) */}
      <div className="relative w-full h-48 rounded-3xl overflow-hidden glass dark:bg-slate-900/60 dark:border-white/10 mt-md border border-white/20 dark:border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-60" 
            alt="Biometric sync visual representation"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEW50LF7A1MRoHjOYSrxMRobERUTzSUbreXLFUUz1z6joR8myEHmywxLpbwF3xuTQNCRBMAfUBFsXp1ru0fy5ga_CLuirmlMmsQ8TErlQpfyqD60JFmqo-YtnwWTad3JRqp0UWV27ASJ8Nf5NqmMkqnIjaHbnWCH16OJ3rjgUwSiR9HJrgwkaEGRBFSXBS1MppI6iliDVyGpL8WfbVCA5rFe10tOb3RAdhn_llRS8MK6dfdvYyC61E1_KRMNPFvsfEJkqrJZ6F4rpP"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-[#0b1120] to-transparent z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-end p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-primary dark:text-inverse-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dns</span>
            </div>
            <div>
              <h6 className="font-label-md text-label-md font-bold uppercase tracking-widest text-primary dark:text-primary-fixed">Biometric Sync Engine</h6>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Active processing of 2.4TB clinical datasets. All nodes reporting stable state.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAB for Quick Actions */}
      <button 
        onClick={() => {
          triggerRefreshLogs();
          alert("Telemetry health snapshot triggered successfully.");
        }}
        className="fixed bottom-margin-desktop right-margin-desktop w-14 h-14 bg-primary hover:bg-primary-container text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer"
        title="Trigger System Diagnostic Snapshot"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>
    </div>
  );
}
