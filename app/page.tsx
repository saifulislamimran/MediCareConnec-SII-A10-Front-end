"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Counter Component for Stats section
function Counter({ target, duration = 2000, suffix = '+' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  const formatCount = (val: number) => {
    if (target >= 1000) {
      return (val / 1000).toFixed(0) + 'k';
    }
    return val.toString();
  };

  return (
    <span ref={ref}>
      {formatCount(count)}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <main className="pt-20 bg-transparent">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Medical Background" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFtNYfjkoYHZOBC8wjW3Q2y4EglMVTDIoCrOyTfDWVAK7BNzWKdJbJUcZvlPc8b2FC6L3L-T9jLAMyqsFwDLW-XsdMDrYqxv-ys7sM0pGputLuGwkV_PVQdDB6ieBV28Ulzf_8bLg52fWxgAVJePRwYARK3pdwoTXmgSRp35pL03TjuyvU6MQCw-KCGcVn-FMN_OW41Q78vhhAzd4Sm4S4yvD3hzqL3uDzwlBOZvUFEU57sV3nMQGTc0MvKjzGixynL09RPQeq-8Bb"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-[#0b1120]/90 dark:via-[#0b1120]/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 gap-xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="flex flex-col justify-center text-left"
          >
            <h1 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 mb-md leading-tight">
              Precision Health for a <span className="text-primary dark:text-inverse-primary">Modern Life</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant dark:text-slate-400 mb-lg max-w-lg leading-relaxed">
              Experience clinical excellence paired with cutting-edge technology. Your personalized path to wellness starts here.
            </p>
            <div className="flex flex-wrap gap-md">
              <Link href="/doctors" className="bg-primary text-on-primary px-xl py-md rounded-xl font-headline-md text-headline-md hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 text-center flex items-center justify-center font-bold">
                Book an Appointment
              </Link>
              <Link href="/about" className="glass px-xl py-md rounded-xl border border-white/20 dark:border-white/10 text-primary dark:text-inverse-primary font-headline-md text-headline-md hover:bg-white/60 dark:hover:bg-white/10 transition-all text-center flex items-center justify-center font-bold">
                Learn More
              </Link>
            </div>
          </motion.div>
          
          <div className="hidden lg:flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="glass p-lg rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl relative bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl animate-float"
            >
              <div className="absolute -top-4 -right-4 bg-primary text-on-primary p-3 rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-[32px]">verified_user</span>
              </div>
              <div className="text-center px-4">
                <div className="text-primary dark:text-inverse-primary text-[48px] font-bold mb-xs">
                  <Counter target={10000} suffix="+" />
                </div>
                <div className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase tracking-widest font-extrabold">Active Patients</div>
              </div>
              <div className="mt-md flex -space-x-4 justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Patient 1"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy9XHV66r0TRi0dGoXgqRwp4xRrsyAA_FtetLYJoN_hhoaETnEc07swno1KzH-py_1jUipX-Yd7uN4it4zXwPxDO7-BW_2sbU7R-KxyQQLBoaPiuW70NismtJTisqwyjlEqRWHIPLDqkOH7pOAvY0Y8QXhIEc9tAvRjD5Z2l2UcnKarg2rMB_290vmt3Iv6dPlVfaAi_GZbZN2zORhIrMPm1Nu_PIoVD-om-hGzrZGtWGuvC2il7FNQOpF4cohMvX6h4mS13gG-khb"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-300 overflow-hidden shadow-sm">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Patient 2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWz8fIZkoYfGwlWshhUHyJSqGeIKA2bVyGda1pbM_8zJLKod9K_0R2Ks04PlgurpLzFCyGv0VcUEqdNHqAD__bhAqnvY60apt4MYnxn-gg83qH9u6lPdBjlwU-_QH9w45IPrIspgHbIfPTxayQcL_Ic4vDiD433Xv3LmaLF5Wlk5D4hPFjBG2OaucffUWo5EhLH7aU67-ellOlzihF1xxWSsh5Wl_XxRfBW89RAIF8e32Qg54xiMlqyidwxtqGYlWQb_pnaKO8l7u3"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-400 overflow-hidden shadow-sm">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Patient 3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARRUTS9aYmLXqi3pCcI2jXrx1aOISJKGMiOZyL9-eAhiqLHJrwwkmcXnKgRcwOOlI5R6ON3JqkK9NlCaBW4f3mokfR3qFuUaNOuT3rkcbdr3FkKv9JYXfdT6XNC9FIdFUJLwOzo15F2zmipNKF-4AZkGb4ido8_yX6Eb7Rzp8ZZN_Or08cWKy-rPbPozfDxycRBjlWnh2ztQ_q2wOqPHau8Qtad_jRURx0r_g61R3wZhKaiENKKSZBXqR92jxSLRh3PlCXs8FYA5EN"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">+99</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Medical Specializations */}
      <section className="py-xl bg-white/20 dark:bg-slate-900/10 backdrop-blur-md border-y border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="text-center mb-xl"
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 mb-sm">Medical Specializations</h2>
            <p className="text-on-surface-variant dark:text-slate-400 max-w-2xl mx-auto">Access specialized care across multiple disciplines, all powered by world-class experts.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            {/* Cardiology */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-md rounded-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-white/5 rounded-xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary transition-colors text-primary dark:text-inverse-primary">
                <span className="material-symbols-outlined text-[32px]">favorite</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-sm">Cardiology</h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-body-md leading-relaxed">Comprehensive heart care, from diagnostics to advanced surgical interventions.</p>
            </motion.div>

            {/* Neurology */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-md rounded-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-white/5 rounded-xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary transition-colors text-primary dark:text-inverse-primary">
                <span className="material-symbols-outlined text-[32px]">psychology</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-sm">Neurology</h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-body-md leading-relaxed">Specialized treatment for complex neurological conditions and brain health.</p>
            </motion.div>

            {/* Pediatrics */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-md rounded-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-white/5 rounded-xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary transition-colors text-primary dark:text-inverse-primary">
                <span className="material-symbols-outlined text-[32px]">child_care</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-sm">Pediatrics</h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-body-md leading-relaxed">Gentle, expert care tailored specifically for the youngest members of your family.</p>
            </motion.div>

            {/* Orthopedics */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-md rounded-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-white/5 rounded-xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary transition-colors text-primary dark:text-inverse-primary">
                <span className="material-symbols-outlined text-[32px]">skeleton</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-sm">Orthopedics</h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-body-md leading-relaxed">Advanced bone, joint, and muscle treatments to restore your mobility.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="flex justify-between items-end mb-xl"
          >
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 mb-sm">Featured Doctors</h2>
              <p className="text-on-surface-variant dark:text-slate-400 font-semibold">Consult with our top-rated medical professionals.</p>
            </div>
            <Link href="/doctors" className="text-primary dark:text-inverse-primary font-bold flex items-center gap-xs hover:underline transition-all">
              View All <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg overflow-hidden">
            {/* Doctor Card 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 group shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt="Dr. Sarah Chen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMYcb4Wl0rbPQO-p2pDtgi_xi1dHF4TsrKLtaPBIcO07QfJCseXvlelYBGkRYYpH8veXOS-tzld49cAKHeudbM4ZRPauA4Wfur0KWliTun1wMtu1W6hshOMnwvDEzH3EMXLU0PXegsZ4dRbN91UBEGQoudgjmMwFM3UBrE0U1Ir0rWJkLSI0oeVFcyQIhgWvnUYO7nIdi3PAmnTfi64yCTPtmi_najfF-L_1rmUE_siI1v33MpWio1-05dyp3QAUFgbEC8cgJz1jsa"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-label-sm font-label-sm text-primary dark:text-inverse-primary bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 font-bold">
                  Cardiology
                </div>
              </div>
              <div className="p-md">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-xs">Dr. Sarah Chen</h4>
                <p className="text-on-surface-variant dark:text-slate-400 text-label-md mb-md font-semibold">MBBS, MD - Cardiology</p>
                <div className="flex justify-between items-center py-sm border-t border-outline-variant/30 dark:border-white/10">
                  <div className="flex items-center gap-xs text-on-surface-variant dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-label-sm font-bold">10+ Years Exp</span>
                  </div>
                  <div className="font-bold text-primary dark:text-inverse-primary">$120/Consult</div>
                </div>
                <Link href="/doctors" className="w-full mt-md bg-primary/10 text-primary hover:bg-primary hover:text-white dark:bg-primary-container/20 dark:text-primary-fixed-dim dark:hover:bg-primary py-2.5 rounded-xl font-bold transition-all text-center flex items-center justify-center active:scale-[0.98]">
                  Book Now
                </Link>
              </div>
            </motion.div>

            {/* Doctor Card 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 group shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt="Dr. Michael Vance"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFBTq1Ib8ssSZq50qcMpUBTfPmRw28NEMu3O6yHtVHajIrQc-GKLIZk9zKXO7I48VUUTwiE5RZ1qjErisdJKYDZ2idsD2A2_AYiuKGmEo2OseHk35aMIg1lKOAiqnuMjIEYPRlwmhpP_FXxcQ-yO1tGozp4e1R2I4foN5_rAy7RPECS0ScmaSZGspNFD_k_06-SYtrota5rYo3-Ejjkd4osdp2qWMpDIGzedUkf4h1GGagt_RDa58leX_cXkpkrajy87nuTjCQ5CKj"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-label-sm font-label-sm text-primary dark:text-inverse-primary bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 font-bold">
                  Neurology
                </div>
              </div>
              <div className="p-md">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-xs">Dr. Michael Vance</h4>
                <p className="text-on-surface-variant dark:text-slate-400 text-label-md mb-md font-semibold">MD, PhD - Neurology</p>
                <div className="flex justify-between items-center py-sm border-t border-outline-variant/30 dark:border-white/10">
                  <div className="flex items-center gap-xs text-on-surface-variant dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-label-sm font-bold">15+ Years Exp</span>
                  </div>
                  <div className="font-bold text-primary dark:text-inverse-primary">$150/Consult</div>
                </div>
                <Link href="/doctors" className="w-full mt-md bg-primary/10 text-primary hover:bg-primary hover:text-white dark:bg-primary-container/20 dark:text-primary-fixed-dim dark:hover:bg-primary py-2.5 rounded-xl font-bold transition-all text-center flex items-center justify-center active:scale-[0.98]">
                  Book Now
                </Link>
              </div>
            </motion.div>

            {/* Doctor Card 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 group shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt="Dr. Elena Rodriguez"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUM8HJnj9qLFwvrk5e-gc1jXsf-gtX-OrDLOwHTRtqefVgoDayfNYlwnzuS0xHdJ75wPRto20wb_5aCX7vK5c7RuH3V4tinNESSvn9YmAlJxddEdUGrMIHRbWE863eDfBNJ5lDMKC6tY366kJOwfAxMHVT3D5dbre126Cd9vFF12X2uEGj3bEPQQxeFQ2AUZ4uQULsD50XyqSVlrnTuhBFp3vkBJlCCf7_u4CYI89sUeRJSgmH3gRSOcVYnEz3Dgk3LP1SB6gwVzF0"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-label-sm font-label-sm text-primary dark:text-inverse-primary bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 font-bold">
                  Pediatrics
                </div>
              </div>
              <div className="p-md">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-xs">Dr. Elena Rodriguez</h4>
                <p className="text-on-surface-variant dark:text-slate-400 text-label-md mb-md font-semibold">MD - Pediatrics</p>
                <div className="flex justify-between items-center py-sm border-t border-outline-variant/30 dark:border-white/10">
                  <div className="flex items-center gap-xs text-on-surface-variant dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-label-sm font-bold">8+ Years Exp</span>
                  </div>
                  <div className="font-bold text-primary dark:text-inverse-primary">$90/Consult</div>
                </div>
                <Link href="/doctors" className="w-full mt-md bg-primary/10 text-primary hover:bg-primary hover:text-white dark:bg-primary-container/20 dark:text-primary-fixed-dim dark:hover:bg-primary py-2.5 rounded-xl font-bold transition-all text-center flex items-center justify-center active:scale-[0.98]">
                  Book Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-xl bg-primary dark:bg-slate-900/40 dark:backdrop-blur-xl border-y border-transparent dark:border-white/5 text-on-primary dark:text-slate-100 shadow-inner">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-xl text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="text-[40px] font-extrabold mb-xs">
              <Counter target={500} suffix="+" />
            </div>
            <div className="text-on-primary/80 dark:text-slate-400 font-label-md uppercase tracking-wider font-bold">Expert Doctors</div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="text-[40px] font-extrabold mb-xs">
              <Counter target={20000} suffix="+" />
            </div>
            <div className="text-on-primary/80 dark:text-slate-400 font-label-md uppercase tracking-wider font-bold">Happy Patients</div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="text-[40px] font-extrabold mb-xs">
              <Counter target={50000} suffix="+" />
            </div>
            <div className="text-on-primary/80 dark:text-slate-400 font-label-md uppercase tracking-wider font-bold">Appointments</div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="text-[40px] font-extrabold mb-xs">4.9/5</div>
            <div className="text-on-primary/80 dark:text-slate-400 font-label-md uppercase tracking-wider font-bold">Average Rating</div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="text-left"
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 mb-md leading-tight">Why Choose <span className="text-primary dark:text-inverse-primary">MediCare Connect</span>?</h2>
            <p className="text-on-surface-variant dark:text-slate-400 mb-lg text-body-lg leading-relaxed">We provide a seamless digital health ecosystem designed to put the patient first, ensuring convenience without compromising quality.</p>
            
            <div className="space-y-md">
              <div className="flex gap-md items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0 text-primary dark:text-inverse-primary">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-xs">24/7 Priority Support</h4>
                  <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed text-sm">Our dedicated medical assistants are always online to help with your queries and scheduling.</p>
                </div>
              </div>
              
              <div className="flex gap-md items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0 text-primary dark:text-inverse-primary">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-xs">Secure Medical Records</h4>
                  <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed text-sm">End-to-end encrypted medical data ensures your private health information stays private.</p>
                </div>
              </div>
              
              <div className="flex gap-md items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0 text-primary dark:text-inverse-primary">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-xs">Verified Expert Doctors</h4>
                  <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed text-sm">Every professional on our platform undergoes a rigorous multi-stage verification process.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative w-full flex items-center justify-center mt-md lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-white/20 dark:border-white/10"
            >
              <img 
                className="w-full h-auto object-cover" 
                alt="Clinic Room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSxpldocxfWjnTNC0nembGI2vIbkiLHl72aG7tH0cg0XYlqiAnheHpPtzyLEOZbADTjliyxGI0D6TgexO65w4OgMb5xvs5innSWKyQOaxm9QPDibTL8fpHkhBYBqmIF0jz_WAUMC53IsGtxrFDxINAeAu6AmOjFyRiCA-CaQ_a8urOtDBgYXJI7mMy0_cpPFkH8NaO8cbBiR0AzX3H06wGyrRiZDpxdcjAjBJdB4gEor7vtK7LQ3jFcOEchflg975fDBpyq9mbljeF"
              />
            </motion.div>
            <div className="absolute -bottom-8 -left-2 sm:-left-8 glass p-md rounded-2xl shadow-xl z-20 border border-white/30 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <div className="flex items-center gap-sm">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <div className="text-on-surface dark:text-slate-100 font-bold text-sm">System Online</div>
              </div>
              <div className="text-xs text-on-surface-variant dark:text-slate-400 mt-xs">Real-time health monitoring active</div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Success Stories */}
      <section className="py-xl bg-white/10 dark:bg-slate-900/10 border-y border-white/10 dark:border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="text-center mb-xl"
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-slate-100 mb-sm">Patient Success Stories</h2>
            <p className="text-on-surface-variant dark:text-slate-400 font-semibold">Hear from those who trust us with their wellbeing.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Testimonial 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-lg rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-xs text-yellow-500 mb-md">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-on-surface dark:text-slate-300 text-body-md mb-lg italic leading-relaxed">"The best healthcare experience I've ever had. Booking was seamless and the doctor was truly exceptional in her care."</p>
              </div>
              <div className="flex items-center gap-md pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-white/30">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Amanda J"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAlVVTmAqT2sAzME7MD_UIkejHZJR52hg6-3SABqdLjpTG8QRjUriZFvpsusRaLjBWXVIzO5TnwbTuA4DPnLDcQbHz5rFBXZrUdwII6mlIzKTOvLBywpM5lH_Ra4ca9gHwYHEffRoHcuUIoq9qLEEzGQTCuqJleoFmBVW76aCVUKJI3_oYGTuWm95Li4eXCNqsiHLZKwrPLWZ1vvMsh9_cIfEUXUm6MxVEqTIH5JIRgHJFTz1NCfose6A9llGZ4rmXEKYnpceE0sQP"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-on-surface dark:text-slate-100">Amanda J.</h5>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400">Patient since 2022</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-lg rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-xs text-yellow-500 mb-md">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-on-surface dark:text-slate-300 text-body-md mb-lg italic leading-relaxed">"I value my privacy above all. MediCare Connect gave me the security I needed along with expert advice for my condition."</p>
              </div>
              <div className="flex items-center gap-md pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-white/30">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Robert K"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAomDgoI59cNHW3FNG8Pf7NDEJwK0WZHRDjKKGXQr2ZiSS9mcsEoh7xb752lgtg4D1ca9Y1dYnQ40FmHtE3sFmxg87d4qP6QkhqC9kVmE6ypOnzesJ2Dfli5HmCGFPr-Njrg0wNpb-8fu8cclq5OeM6DtiX0JhYK_lglNyTXt5TCHbzDUsClLSm8vv3WQ1uj0uiGZmoY129ygZ069lVKZTAqB3A-tPt4jaXrqfOJLRk3WdO3S9Cs1w_XJAoqT8J6syC0XoiI83htLtl"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-on-surface dark:text-slate-100">Robert K.</h5>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400">Patient since 2023</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="glass p-lg rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-xs text-yellow-500 mb-md">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1_half" }}>star_half</span>
                </div>
                <p className="text-on-surface dark:text-slate-300 text-body-md mb-lg italic leading-relaxed">"The video consultation felt just as personal as a clinic visit. Truly the future of medicine available today."</p>
              </div>
              <div className="flex items-center gap-md pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-white/30">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Linda W"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH7YJsA-koeg5FtO3_fJz1knwep48_nAunpyc4k2RmRx9LIfP3NzcLZtt543KCbrrZGGpTieaA9cBk1_nMRX6v96ij_uNv_Fuaf8Y-rWeklYqIGqPnXYU6Dp4d-8FHqNxf-KwjGFuQ369AQPiahnmDwpldQoyGQPYBzuF1thoqKWQCU-uwIdoMuaz3jYSNeRqFXuPeevnnuRZTRBjJb8PF5-SYz5FcAGQEqHzLIWIc3pjVAdoT0xrZo5eYoQu0w_hv9qnrOJiVh52b"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-on-surface dark:text-slate-100">Linda W.</h5>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400">Patient since 2021</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
