"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [zoom, setZoom] = useState(1.0);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setFullname('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, 3000);
    }, 1500);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.15, 1.8));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.15, 0.8));
  };

  return (
    <main className="bg-background dark:bg-[#0b1120] text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-300 overflow-x-hidden pt-32 pb-xl">
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .dark .glass {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-premium {
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            background: rgba(255, 255, 255, 0.6);
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
        }
        .dark .glass-premium {
            background: rgba(15, 23, 42, 0.8);
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .text-gradient {
            background: linear-gradient(135deg, #00685f 0%, #008378 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .dark .text-gradient {
            background: linear-gradient(135deg, #6bd8cb 0%, #89f5e7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
      `}} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center mb-xl">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="font-headline-xl text-headline-xl mb-4 text-gradient font-extrabold"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Bridging the gap between clinical excellence and personalized support. Our medical concierge team is available worldwide to ensure your care journey is seamless, secure, and precise.
        </motion.p>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Secure Communication Form */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="lg:col-span-7"
        >
          <div className="glass p-md md:p-lg rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[150px] dark:text-white">security</span>
            </div>
            
            <h2 className="font-headline-lg text-headline-lg mb-6 flex items-center gap-2 text-on-surface dark:text-slate-100 font-extrabold">
              <span className="material-symbols-outlined text-primary dark:text-inverse-primary">verified_user</span>
              Secure Communication
            </h2>
            
            <form className="space-y-md" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 px-1" htmlFor="fullname">Full Name</label>
                  <input 
                    className="w-full bg-white/50 dark:bg-white/5 border border-outline/30 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface dark:text-white placeholder:text-outline-variant/60 dark:placeholder-white/40" 
                    id="fullname"
                    placeholder="John Doe" 
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 px-1" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full bg-white/50 dark:bg-white/5 border border-outline/30 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface dark:text-white placeholder:text-outline-variant/60 dark:placeholder-white/40" 
                    id="email"
                    placeholder="john@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 px-1" htmlFor="subject">Subject</label>
                <input 
                  className="w-full bg-white/50 dark:bg-white/5 border border-outline/30 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface dark:text-white placeholder:text-outline-variant/60 dark:placeholder-white/40" 
                  id="subject"
                  placeholder="General Inquiry" 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 px-1" htmlFor="message">Message</label>
                <textarea 
                  className="w-full bg-white/50 dark:bg-white/5 border border-outline/30 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface dark:text-white placeholder:text-outline-variant/60 dark:placeholder-white/40 resize-none" 
                  id="message"
                  placeholder="How can our medical team assist you today?" 
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button 
                className={`w-full py-4 bg-gradient-to-r ${status === 'sent' ? 'from-green-600 to-green-500' : 'from-primary to-primary-container dark:from-primary-container dark:to-primary'} text-on-primary font-headline-md rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-85`} 
                type="submit"
                disabled={status !== 'idle'}
              >
                {status === 'idle' && (
                  <>
                    <span>Initialize Secure Send</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    <span>Securing Link...</span>
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Sent Successfully</span>
                  </>
                )}
              </button>
              
              <p className="text-center font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                End-to-end encrypted medical communication portal
              </p>
            </form>
          </div>
        </motion.div>

        {/* Support & Locations */}
        <div className="lg:col-span-5 space-y-gutter">
          {/* Urgent Support */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="glass p-md rounded-2xl border-l-4 border-error hover:translate-x-1 transition-transform duration-300 backdrop-blur-xl border-y border-r dark:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-error-container/20 rounded-full shrink-0">
                <span className="material-symbols-outlined text-error text-2xl">emergency</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md mb-1 text-on-surface dark:text-slate-100">Urgent Support</h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mb-4">24/7 Hotline for immediate clinical concerns.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary dark:text-inverse-primary font-bold text-lg">
                    <span className="material-symbols-outlined">call</span>
                    +1 (800) MED-CORE
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400 font-label-sm uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Protocol: Level 1 Triage Active
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Global HQ */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="glass p-md rounded-2xl hover:translate-x-1 transition-transform duration-300 backdrop-blur-xl dark:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-container/10 dark:bg-white/5 rounded-full shrink-0">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-2xl">location_on</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md mb-1 text-on-surface dark:text-slate-100">Global HQ</h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mb-3 leading-relaxed">
                  1200 Innovation Way, Suite 400<br/>Palo Alto, CA 94304
                </p>
                <p className="font-label-md text-label-md text-on-surface-variant/70 dark:text-slate-400/70">Mon - Fri: 08:00 - 20:00 PST</p>
              </div>
            </div>
          </motion.div>

          {/* Digital Support */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="glass p-md rounded-2xl hover:translate-x-1 transition-transform duration-300 backdrop-blur-xl dark:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary-container/10 dark:bg-white/5 rounded-full shrink-0">
                <span className="material-symbols-outlined text-secondary dark:text-inverse-primary text-2xl">support_agent</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md mb-1 text-on-surface dark:text-slate-100">Digital Support</h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mb-4">Technical help desk and data inquiries.</p>
                <div className="flex flex-col gap-2">
                  <a className="flex items-center gap-2 text-primary dark:text-inverse-primary hover:underline font-bold" href="mailto:support@medicareconnect.com">
                    <span className="material-symbols-outlined">mail</span>
                    support@medicareconnect.com
                  </a>
                  <a className="flex items-center gap-2 text-primary dark:text-inverse-primary hover:underline font-bold" href="#">
                    <span className="material-symbols-outlined">chat</span>
                    Live Care Portal Chat
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="lg:col-span-12"
        >
          <div className="relative w-full h-96 rounded-2xl overflow-hidden glass group backdrop-blur-xl">
            {/* Virtual Map Background */}
            <div 
              className="absolute inset-0 grayscale opacity-40 group-hover:opacity-60 transition-transform duration-500" 
              style={{ 
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPOVnWaV8-j804n8oYEnb2O05uVPs2MPLOK690mHz3C88xHYFtd1GH4UDQXyU-AlgQ5kUtKikE0oZlaDVLa-OyKqIqTdhqJlgt-uda3nkuvqlrZWKr9FhPEghKyu9J7lNfwArV7ChqSiASydnfGvZnBRoTG8K4OO84PsGtDAwSbeorY-mynE7NST9_ZO1_GG1RVM571pEJjNCNXkYIqLAACrI6Y9O8xdjuZZLBWxX0ZsVQ33ZDu2NwUqvKXonh7Mi2P9gdgr9nSr2W')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${zoom})`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 dark:from-[#0b1120]/80 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="glass-premium px-8 py-6 rounded-2xl flex flex-col items-center gap-3 animate-bounce shadow-2xl">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary dark:text-inverse-primary font-extrabold">MediCare Central</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 glass p-4 rounded-xl flex gap-4 backdrop-blur-xl">
              <button 
                onClick={handleZoomIn}
                className="p-2 bg-white/20 hover:bg-white/40 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors text-on-surface dark:text-white"
                aria-label="Zoom in map"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-2 bg-white/20 hover:bg-white/40 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors text-on-surface dark:text-white"
                aria-label="Zoom out map"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <div className="h-8 w-[1px] bg-white/20 dark:bg-white/10 self-center"></div>
              <button 
                onClick={() => alert("Calculating route to Innovations Way HQ...")}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95 shadow"
              >
                <span className="material-symbols-outlined text-sm">directions</span>
                Get Directions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
