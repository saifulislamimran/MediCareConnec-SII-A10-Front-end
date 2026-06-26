"use client";

import { motion } from 'framer-motion';

export default function DesignShowcasePage() {
  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <main className="bg-background dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass { 
            background: rgba(255, 255, 255, 0.4); 
            backdrop-filter: blur(20px); 
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2); 
        }
        .dark .glass { 
            background: rgba(15, 23, 42, 0.6); 
            border: 1px solid rgba(255, 255, 255, 0.08); 
        }
        .glass-glow { 
            box-shadow: 0 0 20px rgba(13, 148, 136, 0.15); 
            border: 1px solid rgba(13, 148, 136, 0.3); 
        }
        .dark .glass-glow { 
            box-shadow: 0 0 30px rgba(0, 104, 95, 0.2); 
        }
      `}} />

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass border-none bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl"
        id="hero"
      >
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-md py-1 rounded-full bg-primary/10 dark:bg-inverse-primary/20 text-primary dark:text-inverse-primary font-label-sm text-label-sm mb-sm font-bold">
            Design System v1.0
          </span>
          <h1 className="font-headline-xl text-headline-xl mb-md text-slate-900 dark:text-slate-100 font-extrabold">
            High-Fidelity Clinical Intelligence
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 mb-lg leading-relaxed">
            MediCare Connect’s design system blends the precision of modern healthcare with sophisticated depth. Built on glassmorphism principles, we prioritize clarity, trust, and technological advancement in every interaction.
          </p>
          <div className="flex flex-wrap gap-md">
            <button 
              onClick={() => alert("Downloading style guide PDF (Simulated)...")}
              className="flex items-center gap-xs px-lg py-md bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant rounded-xl font-label-md text-label-md hover:shadow-lg hover:bg-primary-container dark:hover:bg-primary-fixed transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
              Get Style Guide
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('cards');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-xs px-lg py-md glass rounded-xl font-label-md text-label-md hover:bg-white/60 dark:hover:bg-white/10 transition-all dark:text-white active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined">visibility</span>
              View Components
            </button>
          </div>
        </div>
      </motion.section>

      {/* Color Palette */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        id="colors"
      >
        <h2 className="font-headline-lg text-headline-lg mb-lg text-slate-900 dark:text-slate-100 font-bold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
          <div className="flex flex-col gap-xs">
            <div className="h-24 rounded-2xl bg-primary shadow-sm flex items-end p-base">
              <span className="text-on-primary font-label-sm text-label-sm font-bold">#00685F</span>
            </div>
            <p className="font-label-md text-label-md text-slate-900 dark:text-slate-300 font-bold">Primary Main</p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="h-24 rounded-2xl bg-secondary shadow-sm flex items-end p-base">
              <span className="text-on-secondary font-label-sm text-label-sm font-bold">#006780</span>
            </div>
            <p className="font-label-md text-label-md text-slate-900 dark:text-slate-300 font-bold">Secondary Main</p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="h-24 rounded-2xl bg-surface-container dark:bg-slate-800 shadow-sm flex items-end p-base">
              <span className="text-on-surface dark:text-slate-300 font-label-sm text-label-sm font-bold">#E6EEFF</span>
            </div>
            <p className="font-label-md text-label-md text-slate-900 dark:text-slate-300 font-bold">Surface Container</p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="h-24 rounded-2xl bg-surface-variant dark:bg-slate-700/60 shadow-sm flex items-end p-base">
              <span className="text-on-surface-variant dark:text-slate-300 font-label-sm text-label-sm font-bold">#D5E3FC</span>
            </div>
            <p className="font-label-md text-label-md text-slate-900 dark:text-slate-300 font-bold">Surface Variant</p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="h-24 rounded-2xl bg-primary-container shadow-sm flex items-end p-base">
              <span className="text-on-primary-container font-label-sm text-label-sm font-bold">#008378</span>
            </div>
            <p className="font-label-md text-label-md text-slate-900 dark:text-slate-300 font-bold">Primary Container</p>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="h-24 rounded-2xl bg-error shadow-sm flex items-end p-base">
              <span className="text-on-error font-label-sm text-label-sm font-bold">#BA1A1A</span>
            </div>
            <p className="font-label-md text-label-md text-slate-900 dark:text-slate-300 font-bold">Error</p>
          </div>
        </div>
      </motion.section>

      {/* Typography */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="p-8 md:p-12 glass rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl"
        id="typography"
      >
        <h2 className="font-headline-lg text-headline-lg mb-xl text-slate-900 dark:text-slate-100 font-bold">Typography Hierarchy</h2>
        <div className="flex flex-col gap-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 items-baseline border-b border-outline-variant/30 dark:border-white/10 pb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">H1 / Headline XL</span>
            <h1 className="md:col-span-3 font-headline-xl text-headline-xl text-slate-900 dark:text-slate-100 font-extrabold">Clinically Precise Interfaces</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-baseline border-b border-outline-variant/30 dark:border-white/10 pb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">H2 / Headline LG</span>
            <h2 className="md:col-span-3 font-headline-lg text-headline-lg text-slate-900 dark:text-slate-100 font-bold">Building Patient Trust</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-baseline border-b border-outline-variant/30 dark:border-white/10 pb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">Lead / Body LG</span>
            <p className="md:col-span-3 font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 leading-relaxed">
              This lead text establishes hierarchy for introductory paragraphs and emphasizes readability in dense healthcare contexts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-baseline border-b border-outline-variant/30 dark:border-white/10 pb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">Body MD</span>
            <p className="md:col-span-3 font-body-md text-body-md text-slate-800 dark:text-slate-350 leading-relaxed">
              Our body text is optimized for the Inter typeface, providing excellent legibility across all medical dashboard environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-baseline">
            <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">Labels / Small</span>
            <p className="md:col-span-3 font-label-md text-label-md uppercase tracking-wider text-slate-900 dark:text-slate-100 font-bold">System Action Buttons</p>
          </div>
        </div>
      </motion.section>

      {/* Glass Cards */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        id="cards"
      >
        <h2 className="font-headline-lg text-headline-lg mb-lg text-slate-900 dark:text-slate-100 font-bold">Component: Glass Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Standard */}
          <div className="glass p-md rounded-2xl flex flex-col gap-sm bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="flex justify-between items-center">
              <span className="material-symbols-outlined text-primary dark:text-inverse-primary">medical_information</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">STATIC</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-100 font-bold">Standard Card</h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Deep blur backdrop with a subtle white border stroke.</p>
          </div>
          
          {/* Interactive */}
          <div className="glass p-md rounded-2xl flex flex-col gap-sm cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-all transform hover:-translate-y-1 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="flex justify-between items-center">
              <span className="material-symbols-outlined text-secondary dark:text-inverse-primary">monitor_heart</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 font-bold">INTERACTIVE</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-100 font-bold">Hover Variant</h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Responds to user interaction with opacity shifts and lift.</p>
          </div>
          
          {/* Glow */}
          <div className="glass glass-glow p-md rounded-2xl flex flex-col gap-sm border-primary/40 relative overflow-hidden bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-center">
              <span className="material-symbols-outlined text-primary dark:text-inverse-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-label-sm text-label-sm text-primary dark:text-inverse-primary font-bold">ACTIVE STATE</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-100 font-bold">Glow Variant</h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Enhanced presence with a primary-colored outer glow.</p>
          </div>
        </div>
      </motion.section>

      {/* Buttons & Inputs */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        id="form-elements"
        className="mb-10"
      >
        <h2 className="font-headline-lg text-headline-lg mb-lg text-slate-900 dark:text-slate-100 font-bold">Buttons & Forms</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* Buttons Matrix */}
          <div className="flex flex-col gap-md">
            <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-450 uppercase tracking-widest font-bold">Button Matrix</p>
            <div className="grid grid-cols-2 gap-md">
              <button className="px-lg py-md bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant rounded-xl font-label-md text-label-md hover:bg-primary-container dark:hover:bg-primary-fixed hover:shadow transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center font-bold">
                Primary
              </button>
              <button className="px-lg py-md border-2 border-primary text-primary dark:text-inverse-primary dark:border-inverse-primary rounded-xl font-label-md text-label-md hover:bg-primary hover:text-white dark:hover:bg-inverse-primary dark:hover:text-on-primary-fixed-variant transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center font-bold">
                Secondary
              </button>
              <button className="px-lg py-md glass rounded-xl font-label-md text-label-md flex items-center justify-center gap-xs border-outline-variant/30 dark:border-white/10 dark:text-white hover:bg-white/60 dark:hover:bg-white/10 active:scale-[0.98] cursor-pointer font-bold">
                Ghost
              </button>
              <div className="flex gap-sm items-center justify-center">
                <button className="w-12 h-12 rounded-full bg-secondary dark:bg-inverse-primary text-on-secondary dark:text-on-primary-fixed-variant flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="w-12 h-12 rounded-full glass text-on-surface-variant dark:text-white flex items-center justify-center hover:bg-error/20 hover:text-error dark:hover:bg-error/25 dark:hover:text-red-400 transition-colors cursor-pointer border border-white/20 dark:border-white/10">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="flex flex-col gap-md">
            <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-450 uppercase tracking-widest font-bold">Form Inputs</p>
            <div className="space-y-sm">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface dark:text-slate-300 ml-1">Patient Full Name</label>
                <input 
                  className="w-full bg-white/40 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                  placeholder="John Doe" 
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-sm text-label-sm text-on-surface dark:text-slate-300 ml-1">Select Specialty</label>
                  <select className="w-full bg-white/40 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all outline-none text-slate-900 dark:text-white appearance-none cursor-pointer">
                    <option className="dark:bg-slate-900">Cardiology</option>
                    <option className="dark:bg-slate-900">Neurology</option>
                    <option className="dark:bg-slate-900">Pediatrics</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-sm text-label-sm text-on-surface dark:text-slate-300 ml-1">Appointment Date</label>
                  <input 
                    className="w-full bg-white/40 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all outline-none text-slate-900 dark:text-white cursor-pointer" 
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
