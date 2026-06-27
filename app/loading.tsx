"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f8f9ff] dark:bg-[#0b1120] z-[9999] transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -left-20 -top-20 w-[450px] h-[450px] bg-primary/5 dark:bg-inverse-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-[450px] h-[450px] bg-secondary/5 dark:bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Pulsating Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-28 h-28 flex items-center justify-center mb-8"
        >
          {/* Pulsating Glass Rings */}
          <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 animate-ping opacity-60"></div>
          <div className="absolute inset-2 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/15 dark:border-white/5 animate-pulse"></div>
          
          {/* Main Core Icon */}
          <div className="relative w-20 h-20 rounded-full bg-white/50 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 flex items-center justify-center shadow-xl shadow-primary/10">
            <span className="material-symbols-outlined text-[44px] text-primary dark:text-inverse-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
              health_metrics
            </span>
          </div>
        </motion.div>

        {/* Heartbeat Wave Line */}
        <div className="w-48 h-8 flex items-center justify-center opacity-40 mb-6">
          <svg className="w-full h-full text-primary dark:text-inverse-primary" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
            <motion.path
              d="M0,15 L30,15 L35,5 L40,25 L45,15 L50,15 L53,10 L56,20 L59,15 L100,15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Loader Text labels */}
        <h2 className="text-headline-md font-headline-md font-extrabold text-on-surface dark:text-slate-100 tracking-tight leading-none mb-2">
          MediCare Connect
        </h2>
        
        {/* Apple-grade glass status capsule */}
        <div className="glass-card border border-white/30 dark:border-white/10 px-6 py-2 rounded-full text-xs font-bold text-on-surface-variant/80 dark:text-slate-400 mt-6 shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary dark:bg-inverse-primary animate-pulse"></span>
          Establishing clinical sync...
        </div>
      </div>
    </div>
  );
}
