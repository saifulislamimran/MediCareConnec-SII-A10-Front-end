"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <main className="bg-surface dark:bg-[#0b1120] text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-300 overflow-x-hidden pt-20">
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass-ultra { 
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(24px); 
            -webkit-backdrop-filter: blur(24px); 
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
        }
        .dark .glass-ultra { 
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(24px); 
            -webkit-backdrop-filter: blur(24px); 
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .hero-glow {
            background: radial-gradient(circle at 50% 50%, rgba(0, 104, 95, 0.08) 0%, rgba(248, 249, 255, 0) 60%);
        }
        .dark .hero-glow {
            background: radial-gradient(circle at 50% 50%, rgba(137, 245, 231, 0.05) 0%, rgba(11, 17, 32, 0) 60%);
        }
        .achievement-timeline::before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, transparent, rgba(0, 104, 95, 0.3), transparent);
        }
        @media (max-width: 768px) {
            .achievement-timeline::before {
                left: 20px;
                transform: none;
            }
        }
      `}} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-ultra mb-md border border-primary/20 dark:border-white/10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-inverse-primary animate-pulse shadow-[0_0_12px_rgba(0,104,95,0.6)] dark:shadow-[0_0_12px_rgba(137,245,231,0.4)]"></span>
            <span className="text-primary dark:text-inverse-primary font-label-md text-label-md tracking-widest uppercase font-bold">The Future of Care</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="font-headline-xl text-[clamp(2.2rem,6vw,4rem)] text-on-surface dark:text-slate-100 mb-lg max-w-5xl mx-auto leading-[1.1] tracking-tight"
          >
            Pioneering the Digital Frontier of <span className="text-primary dark:text-inverse-primary italic font-medium">Clinical Excellence</span>
          </motion.h1>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="glass-ultra p-6 md:p-10 rounded-[2.5rem] max-w-3xl mx-auto mt-12 border border-white/30 dark:border-white/10"
          >
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-405 dark:text-slate-350 leading-relaxed mb-6">
              At MediCare Connect, we believe world-class healthcare should be as intuitive as your favorite app. By fusing glassmorphic aesthetics with deep clinical precision, we're building a bridge between patients and specialists.
            </p>
            <div className="flex flex-wrap justify-center gap-md sm:gap-xl mt-md">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface dark:text-slate-300 uppercase tracking-wider">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface dark:text-slate-300 uppercase tracking-wider">2.4M+ Patient Network</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision/Mission Narrative */}
      <section className="py-24 bg-surface dark:bg-[#0b1120] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 mb-md">Our Vision</h2>
            <p className="text-body-lg text-on-surface-variant dark:text-slate-400 leading-relaxed mb-8">
              We envision a world where geographical boundaries no longer dictate the quality of medical attention one receives. Our platform leverages cutting-edge AI and secure data architecture to ensure that every consultation is informed, efficient, and deeply personal.
            </p>
            <div className="mt-xl space-y-6">
              <div className="flex gap-md items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary dark:text-inverse-primary">security</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface dark:text-slate-200">Military-Grade Security</h4>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400">End-to-end encryption for all patient data and communication.</p>
                </div>
              </div>
              <div className="flex gap-md items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary dark:text-inverse-primary">psychology</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface dark:text-slate-200">Intelligent Diagnostics</h4>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400">AI-assisted screening tools that help clinicians catch what eyes might miss.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 dark:bg-inverse-primary/5 blur-[100px] rounded-full"></div>
            <div className="glass-ultra rounded-[2.5rem] p-4 relative border border-primary/20 dark:border-white/10">
              <img 
                alt="Clinical Excellence" 
                className="rounded-[2rem] w-full h-[350px] md:h-[500px] object-cover shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdlk9hNQk7jXcsfxm4Q6PEHVYwxXUL3GW45Xa13vwMcbD1IMGgCD76UTz5Xjeo3y6nHqzEysApMaIH9nRq2PvC2NFWKN5G-ytjkLITL4Z8M0VHLWVLRnt8pFQX-U9zyxN0sDj-dQw8Sl307z3yoCwQnwO3C-2xj3jKA3-tXItQ50uECOGox4jXFw1DsNekeLonfvh39bn5oqUZhNx-wi5K8f74zKr-eAChYRvpCDbez1igfQlQRkNBg2zLQvUHz9c2qMVxyXs4lOVG"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Stats */}
      <section className="py-32 bg-white/20 dark:bg-slate-900/10 border-y border-white/10 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="text-center mb-xl"
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100">Global Impact in Numbers</h2>
            <p className="text-on-surface-variant dark:text-slate-400 mt-4 max-w-2xl mx-auto">Scaling healthcare accessibility through technology and dedicated specialist networks.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
            {/* Metric 1: Main */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="md:col-span-2 md:row-span-2 glass-ultra rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center text-center group overflow-hidden relative border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <span className="material-symbols-outlined text-6xl text-primary dark:text-inverse-primary mb-6 animate-pulse">monitoring</span>
              <div className="z-10 max-w-md">
                <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 font-bold">Real-time Vitals</h3>
                <p className="text-on-surface-variant dark:text-slate-400 mt-3 max-w-sm mx-auto">Integrating 24/7 monitoring for over 2.4 million active patients worldwide.</p>
                <div className="text-[5.5rem] font-black text-primary dark:text-inverse-primary leading-none tracking-tighter mt-6">99.9%</div>
              </div>
            </motion.div>
            
            {/* Metric 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="md:col-span-1 glass-ultra rounded-3xl p-8 flex flex-col items-center justify-center text-center group border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="text-headline-xl font-black text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform">10k+</div>
              <div className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mt-2">Patients Served</div>
            </motion.div>
            
            {/* Metric 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="md:col-span-1 glass-ultra rounded-3xl p-8 flex flex-col items-center justify-center text-center group border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="text-headline-xl font-black text-primary dark:text-inverse-primary group-hover:scale-110 transition-transform">15+</div>
              <div className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mt-2">Intl. Awards</div>
            </motion.div>
            
            {/* Metric 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="md:col-span-2 glass-ultra rounded-3xl p-6 md:p-10 flex items-center gap-lg border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary-container/20 dark:bg-white/5 flex items-center justify-center shadow-inner shrink-0">
                <span className="material-symbols-outlined text-secondary dark:text-inverse-primary text-5xl">public</span>
              </div>
              <div>
                <div className="text-headline-md font-headline-md text-on-surface dark:text-slate-100">Global Specialist Network</div>
                <div className="text-body-md font-body-md text-on-surface-variant dark:text-slate-400">Connected across 12 countries, providing 24/7 specialist coverage.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievement Timeline */}
      <section className="py-32 relative bg-surface dark:bg-[#0b1120] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop achievement-timeline relative">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 text-center mb-24"
          >
            The Evolution of Excellence
          </motion.h2>
          
          <div className="space-y-24">
            {/* Timeline Item 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={revealVariants}
              className="flex flex-col md:flex-row items-center w-full group relative"
            >
              <div className="w-full md:w-1/2 md:pr-24 md:text-right">
                <div className="glass-ultra p-6 md:p-10 rounded-3xl group-hover:shadow-2xl transition-all border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60">
                  <span className="text-primary dark:text-inverse-primary font-black text-2xl mb-2 block">2018</span>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mt-1">Foundation & R&D</h4>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-4 leading-relaxed">
                    MediCare Connect began in a specialized research lab focused on secure distributed ledger technology for patient health records.
                  </p>
                </div>
              </div>
              <div className="absolute left-[8px] md:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full glass-ultra border border-primary/50 dark:border-white/20 flex items-center justify-center z-10 bg-surface dark:bg-[#0b1120]">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-inverse-primary group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="w-full md:w-1/2"></div>
            </motion.div>
            
            {/* Timeline Item 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={revealVariants}
              className="flex flex-col md:flex-row items-center w-full group relative"
            >
              <div className="w-full md:w-1/2"></div>
              <div className="absolute left-[8px] md:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full glass-ultra border border-primary/50 dark:border-white/20 flex items-center justify-center z-10 bg-surface dark:bg-[#0b1120]">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-inverse-primary group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="w-full md:w-1/2 md:pl-24">
                <div className="glass-ultra p-6 md:p-10 rounded-3xl group-hover:shadow-2xl transition-all border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60">
                  <span className="text-primary dark:text-inverse-primary font-black text-2xl mb-2 block">2020</span>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mt-1">Universal Telehealth</h4>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-4 leading-relaxed">
                    Scaling our platform to meet global demand, we launched high-fidelity video consultations with built-in translation services.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Timeline Item 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={revealVariants}
              className="flex flex-col md:flex-row items-center w-full group relative"
            >
              <div className="w-full md:w-1/2 md:pr-24 md:text-right">
                <div className="glass-ultra p-6 md:p-10 rounded-3xl group-hover:shadow-2xl transition-all border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60">
                  <span className="text-primary dark:text-inverse-primary font-black text-2xl mb-2 block">2023</span>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mt-1">AI Diagnostic Core</h4>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-4 leading-relaxed">
                    Integration of the Neural-Doc™ AI engine, providing real-time data analysis for clinicians with industry-leading accuracy.
                  </p>
                </div>
              </div>
              <div className="absolute left-[8px] md:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full glass-ultra border border-primary/50 dark:border-white/20 flex items-center justify-center z-10 bg-surface dark:bg-[#0b1120]">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-inverse-primary group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="w-full md:w-1/2"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-32 bg-surface-container-low dark:bg-[#0b1120]/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 leading-tight">Meet Our Visionaries</h2>
              <p className="text-body-lg text-on-surface-variant dark:text-slate-400 mt-4">
                A multidisciplinary team of medical pioneers and technological architects driving the future of clinical excellence.
              </p>
            </div>
            <Link 
              href="/doctors" 
              className="flex items-center gap-3 text-primary dark:text-inverse-primary font-bold hover:gap-5 transition-all bg-primary/10 dark:bg-white/5 border border-primary/10 dark:border-white/10 px-8 py-4 rounded-full"
            >
              View Full Directory <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Team Member 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={revealVariants}
              className="glass-ultra rounded-[2.5rem] overflow-hidden group transition-all duration-700 hover:-translate-y-2 border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Sarah Chen studio portrait" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA_cC4QGG2BKbsaTSc51TWOl7gkSDqZJCHzB8b07oegSMyEbGsQXLAGR5QqAbgWbIcR_CKkjtuyZezPo-jB5_buxc6OJdcVkU2wuQRyLdCxQARU26sdWAs-PCA4aVMY4e8memIkxWaCZVpYwIGBrJWcPZLhe7ky2GX1S1BmrCdi9KN5u_UOzmkgIBPudJzi8tFzLADqXZkpzMwc5Oj_dgRD-A_AD2Ab0EqEHXHLo35GcLs_s_Dum4PqaV-2chJPNvFTkUleTJP-5Bp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 dark:from-inverse-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white dark:text-slate-950 text-sm italic font-semibold leading-relaxed">
                    "Technology is the vessel, but compassion is the cure."
                  </p>
                </div>
              </div>
              <div className="p-8 text-center bg-white/5">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Dr. Sarah Chen</h4>
                <p className="text-label-md text-primary dark:text-inverse-primary font-black uppercase tracking-[0.2em] mt-1">Chief Medical Officer</p>
                <div className="mt-8 flex justify-center gap-4">
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </a>
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">medical_services</span>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={revealVariants}
              className="glass-ultra rounded-[2.5rem] overflow-hidden group transition-all duration-700 hover:-translate-y-2 border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Marcus Thorne studio portrait" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXBvhT9zxDdX2G7d05FsDZfiPi5y8-sUQH40q8lZogQryll_og-0kNFQjnXrHynD8LVBkNowGmnesqGoczfsaDqTvYJthZNETCHW612YcHJ7DYE-6zGeeINL0-sXdaNS5anEDihQolRT_aZ5vocikYzzS-6bOa9YEXcCzADZFoRH2RJyUOBLBs9bswh1ceAijuqSnY_yww90qKY0CtQvJSFiHx8OgzXFP8NFElUW_RamPqOX0tK-e03jCtuEbCTIwqlJcAWwXpeMC0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 dark:from-inverse-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white dark:text-slate-950 text-sm italic font-semibold leading-relaxed">
                    "Democratizing elite healthcare through code."
                  </p>
                </div>
              </div>
              <div className="p-8 text-center bg-white/5">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Marcus Thorne</h4>
                <p className="text-label-md text-primary dark:text-inverse-primary font-black uppercase tracking-[0.2em] mt-1">CEO & Founder</p>
                <div className="mt-8 flex justify-center gap-4">
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </a>
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Team Member 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={revealVariants}
              className="glass-ultra rounded-[2.5rem] overflow-hidden group transition-all duration-700 hover:-translate-y-2 border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="James Wilson studio portrait" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh-kNeUz-A-JWOXSsSJUhU9Y-6NdoljeAjTmVGkkcuaM_Ouy0HuLL7VMXn4ZLOyfX0az71WYO3xM6aycm-t6d_gD1wk4AMQqOC7nnShAw-3Jnt4D4Oevx-7GVXbGiJ4oClzAH4Mp5kKs-6vvgeLvXI0NECFltKi6rNlRAAPC1XECtV4Jhe6mdpvLmCmijhpujkmMY9HeunaF7jLGs4RKU1NezUKntu2Amz28z-VExdpWRFlZIbDnqSVDM-0HkOFNtxRoE3gVL1H_qW"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 dark:from-inverse-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white dark:text-slate-950 text-sm italic font-semibold leading-relaxed">
                    "The mind is our most complex frontier."
                  </p>
                </div>
              </div>
              <div className="p-8 text-center bg-white/5">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Dr. James Wilson</h4>
                <p className="text-label-md text-primary dark:text-inverse-primary font-black uppercase tracking-[0.2em] mt-1">Head of Neurology</p>
                <div className="mt-8 flex justify-center gap-4">
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </a>
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">neurology</span>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Team Member 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={revealVariants}
              className="glass-ultra rounded-[2.5rem] overflow-hidden group transition-all duration-700 hover:-translate-y-2 border border-white/30 dark:border-white/10 bg-white/40 dark:bg-slate-900/60"
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Elena Rodriguez studio portrait" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHpU3D709r2Il666WX2zG68sJZF2oba81yIX5c4A1-_tjKMoO4TJDQvnWwHVeTnCCq-JEa6B5GhusE4hSZmATZ8eaeRaiCqk9ZgjorPF54B36VkfrlYU1sGHxesbHqzSXpPzsIy-DrrYPZZYgl_bvN75NAjSDe6lbemBIJOio-srTadWh3p9BndkJtmGdFXZnnIQgh1eeKNU6OX4GAAJKwMgIRiBy7YPtUOe4WyODTVTbwcZJ6RuDYWNl6HkQv93ntE6avW4URTOpn"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 dark:from-inverse-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white dark:text-slate-950 text-sm italic font-semibold leading-relaxed">
                    "Data points are lives waiting to be saved."
                  </p>
                </div>
              </div>
              <div className="p-8 text-center bg-white/5">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">Elena Rodriguez</h4>
                <p className="text-label-md text-primary dark:text-inverse-primary font-black uppercase tracking-[0.2em] mt-1">Head of Bio-Data</p>
                <div className="mt-8 flex justify-center gap-4">
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </a>
                  <a className="w-10 h-10 rounded-full glass-ultra flex items-center justify-center hover:bg-primary dark:hover:bg-inverse-primary hover:text-white dark:hover:text-slate-950 border border-white/30 dark:border-white/10 transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">analytics</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach CTA */}
      <section className="py-32 bg-surface dark:bg-[#0b1120] overflow-hidden relative transition-colors duration-300">
        <div className="absolute inset-0 hero-glow opacity-50"></div>
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="glass-ultra p-8 md:p-16 rounded-[4rem] border border-primary/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl"
          >
            <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 mb-6 font-extrabold">Ready to Join the Revolution?</h2>
            <p className="text-body-lg text-on-surface-variant dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you're a patient seeking world-class care or a specialist looking to expand your reach, MediCare Connect is your portal to the future.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/doctors" 
                className="bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/30 dark:shadow-inverse-primary/15 text-center"
              >
                Connect with a Specialist
              </Link>
              <Link 
                href="/" 
                className="glass-ultra px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all text-on-surface dark:text-slate-100 border border-white/20 dark:border-white/10"
              >
                Learn About Our Tech
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
