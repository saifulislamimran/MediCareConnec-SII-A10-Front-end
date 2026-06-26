"use client";

import { useState } from 'react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export default function DoctorPrescriptionsPage() {
  const [patientName, setPatientName] = useState('Benjamin Sterling');
  const [dateOfIssue, setDateOfIssue] = useState('2026-06-25');
  const [diagnosis, setDiagnosis] = useState('Essential Hypertension');
  const [notes, setNotes] = useState('Take with meals. Check blood pressure twice weekly.');
  const [urgent, setUrgent] = useState(false);
  const [refill, setRefill] = useState(true);

  // Medications state
  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: 'Lisinopril 10mg', dosage: '1 Tablet', frequency: 'Once Daily' },
  ]);

  const handleAddMedication = () => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: 'Once Daily'
    };
    setMedications([...medications, newMed]);
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map(med => med.id === id ? { ...med, [field]: value } : med));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || medications.some(m => !m.name)) {
      alert("Please fill out all patient information and medication details.");
      return;
    }
    alert(`Prescription finalized and transmitted for ${patientName}.\nItems: ${medications.map(m => m.name).join(', ')}`);
  };

  // Check if Lisinopril is in medications to show warning
  const hasLisinopril = medications.some(m => m.name.toLowerCase().includes('lisinopril'));

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tight">Prescription Manager</h1>
          <p className="text-on-surface-variant dark:text-on-surface-variant/80 text-sm">Review, authorize, and issue digital prescriptions securely.</p>
        </div>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => alert("Simulating prescription history retrieval...")}
            className="flex items-center gap-1.5 px-4 py-2 bg-surface-container-low/60 dark:bg-slate-900 border border-outline-variant/20 hover:bg-white/40 text-on-surface text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">history</span> History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Prescription Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 glass-card p-6 md:p-8 rounded-3xl border-white/20 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/10">
            <span className="material-symbols-outlined text-primary text-xl">post_add</span>
            <h3 className="font-bold text-base text-on-surface dark:text-white">Create Digital Script</h3>
          </div>

          {/* Patient Search and Issue Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface-variant/70">Search Patient</label>
              <input 
                required
                type="text" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="bg-transparent border-0 border-b border-outline-variant/30 py-2 focus:ring-0 focus:border-primary transition-all text-sm text-on-surface dark:text-white outline-none"
                placeholder="Enter patient name..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface-variant/70">Date of Issue</label>
              <input 
                required
                type="date" 
                value={dateOfIssue}
                onChange={(e) => setDateOfIssue(e.target.value)}
                className="bg-transparent border-0 border-b border-outline-variant/30 py-2 focus:ring-0 focus:border-primary transition-all text-sm text-on-surface dark:text-white outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Diagnosis */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-on-surface-variant/70">Clinical Diagnosis</label>
            <textarea 
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={2}
              className="bg-transparent border-0 border-b border-outline-variant/30 py-2 focus:ring-0 focus:border-primary transition-all text-sm text-on-surface dark:text-white outline-none resize-none"
              placeholder="Enter diagnosis findings..."
            />
          </div>

          {/* Medications list */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-on-surface-variant/70">Medications List</label>
              <button 
                type="button"
                onClick={handleAddMedication}
                className="text-primary dark:text-inverse-primary text-xs font-bold flex items-center gap-1 hover:opacity-80 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Medication
              </button>
            </div>

            <div className="space-y-2">
              {medications.map((med, index) => (
                <div key={med.id} className="flex flex-col md:flex-row items-stretch md:items-end gap-3 p-4 bg-surface-container-low/40 dark:bg-slate-900/40 rounded-2xl border border-white/20 dark:border-white/10">
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase">Drug Name & Strength</span>
                    <input 
                      required
                      type="text" 
                      value={med.name}
                      onChange={(e) => handleMedicationChange(med.id, 'name', e.target.value)}
                      className="bg-transparent border-0 border-b border-outline-variant/30 py-1 text-sm text-on-surface dark:text-white focus:ring-0 focus:border-primary outline-none"
                      placeholder="e.g. Lisinopril 10mg"
                    />
                  </div>
                  <div className="w-full md:w-32 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase">Dosage</span>
                    <input 
                      required
                      type="text" 
                      value={med.dosage}
                      onChange={(e) => handleMedicationChange(med.id, 'dosage', e.target.value)}
                      className="bg-transparent border-0 border-b border-outline-variant/30 py-1 text-sm text-on-surface dark:text-white focus:ring-0 focus:border-primary outline-none text-center"
                      placeholder="e.g. 1 Tablet"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase">Frequency</span>
                    <select 
                      value={med.frequency}
                      onChange={(e) => handleMedicationChange(med.id, 'frequency', e.target.value)}
                      className="bg-transparent border-0 border-b border-outline-variant/30 py-1 text-sm text-on-surface dark:text-white focus:ring-0 focus:border-primary outline-none cursor-pointer"
                    >
                      <option value="Once Daily" className="text-on-surface">Once Daily</option>
                      <option value="Twice Daily" className="text-on-surface">Twice Daily</option>
                      <option value="Bedtime" className="text-on-surface">Bedtime</option>
                      <option value="As Needed (PRN)" className="text-on-surface">As Needed (PRN)</option>
                    </select>
                  </div>
                  {medications.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveMedication(med.id)}
                      className="p-1 text-error/60 hover:text-error hover:bg-error/10 rounded-lg transition-all cursor-pointer self-end md:self-auto"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Instructions */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-on-surface-variant/70">Clinical Instructions & Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="bg-transparent border-0 border-b border-outline-variant/30 py-2 focus:ring-0 focus:border-primary transition-all text-sm text-on-surface dark:text-white outline-none resize-none"
              placeholder="Instructions for patient and pharmacist..."
            />
          </div>

          {/* Controls */}
          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/10">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface-variant/80">
                <input 
                  type="checkbox" 
                  checked={urgent} 
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="rounded text-primary focus:ring-primary/20 bg-white/50 border-white/40"
                />
                Urgent Processing
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface-variant/80">
                <input 
                  type="checkbox" 
                  checked={refill} 
                  onChange={(e) => setRefill(e.target.checked)}
                  className="rounded text-primary focus:ring-primary/20 bg-white/50 border-white/40"
                />
                Refill Authorized
              </label>
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button 
                type="button"
                onClick={() => alert("Prescription saved to drafts.")}
                className="px-4 py-2 bg-surface-container-low dark:bg-slate-800 text-on-surface-variant rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Save Draft
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Finalize & Transmit
              </button>
            </div>
          </div>
        </form>

        {/* Patient Profile Sidebar */}
        <div className="lg:col-span-4 space-y-gutter">
          {/* Patient Overview */}
          <div className="glass-card p-6 rounded-3xl border-white/20 dark:border-white/10 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img className="w-14 h-14 rounded-2xl object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt3Anj3r2ILW4NYRerbDULTSDWpguvtuy3Ez3GwwWT8nZ_lVp8Od17kLDl2jAab1vitz8LQohPwgCkjJZJkcueatYXH65VYAjtJdX-hou6_4MsLjjpcLdxFqZVJ9Bwqy2RMIiyPl-DJAW7CLG9kkJD6XQMzjBE2iEIfK0MJyVr2awuIqw6h_AyPAvJYuIi8XKaI4ulraw3lClWTWRFiW2ug83SWKwSkIrjDP5_CD4iSe5bOWePVi840Vb4a1O9zMUxXfldaw5ra_vg" alt={patientName} />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface dark:text-white">{patientName}</h4>
                  <p className="text-[10px] text-on-surface-variant font-bold">PID: 8849-W2</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => alert("Opening profile menu...")}
                className="p-1 rounded-lg hover:bg-white/40 text-on-surface-variant transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-3 bg-white/20 dark:bg-slate-900/30 rounded-xl border border-white/10">
                <p className="text-[9px] font-bold text-on-surface-variant/60 uppercase">Age / Sex</p>
                <p className="text-xs font-semibold text-on-surface dark:text-white">68 / Male</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-slate-900/30 rounded-xl border border-white/10">
                <p className="text-[9px] font-bold text-on-surface-variant/60 uppercase">Blood Type</p>
                <p className="text-xs font-semibold text-on-surface dark:text-white">A+ Positive</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Known Allergies</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2.5 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded-full">Penicillin</span>
                <span className="px-2.5 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded-full">Latex</span>
                <span className="px-2.5 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full">+2 others</span>
              </div>
            </div>
          </div>

          {/* Current Vitals */}
          <div className="glass-card p-6 rounded-3xl border-white/20 dark:border-white/10 shadow-lg space-y-4">
            <h5 className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Current Vitals</h5>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-primary">
                    <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
                    <span>Heart Rate</span>
                  </div>
                  <span>72 <span className="text-[10px] text-on-surface-variant font-normal">BPM</span></span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[72%]"></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-[18px]">compress</span>
                    <span>Blood Pressure</span>
                  </div>
                  <span>128/84 <span className="text-[10px] text-on-surface-variant font-normal">mmHg</span></span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Alert */}
          {hasLisinopril && (
            <div className="p-4 bg-surface-container-high rounded-2xl border border-primary/20 animate-pulse-slow">
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-primary text-lg">info</span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary">Drug Interaction Warning</p>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Lisinopril may interact with the patient's current potassium supplements. Please verify dosage levels carefully.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
