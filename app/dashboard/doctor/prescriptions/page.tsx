"use client";

import { useState, useEffect } from 'react';

interface MedRow {
  id: string;
  name: string;
  frequency: string;
  duration: string;
}

interface ActivityCard {
  id: string;
  patientName: string;
  initials: string;
  condition: string;
  medsSummary: string;
  timeAgo: string;
  status: 'Active' | 'Pending' | 'Completed';
  date: string;
  diagnosis?: string;
  notes?: string;
  medsList?: MedRow[];
}

export default function DoctorPrescriptionsPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Form states
  const [patientSearch, setPatientSearch] = useState("");
  const [prescriptionDate, setPrescriptionDate] = useState("2023-10-27");
  const [clinicalDiagnosis, setClinicalDiagnosis] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Med Rows
  const [medRows, setMedRows] = useState<MedRow[]>([
    { id: '1', name: 'Amoxicillin 500mg', frequency: '3x Daily', duration: '10 Days' },
    { id: '2', name: '', frequency: '', duration: 'Duration' }
  ]);

  // Activities
  const [activities, setActivities] = useState<ActivityCard[]>([
    {
      id: '1',
      patientName: 'Sarah Jenkins',
      initials: 'SJ',
      condition: 'Hypertension',
      medsSummary: 'Hypertension - Lisinopril',
      timeAgo: '2h ago',
      status: 'Active',
      date: '2023-10-27',
      diagnosis: 'Primary hypertension stage 1',
      notes: 'Patient should monitor blood pressure daily at home.',
      medsList: [
        { id: 'sj-1', name: 'Lisinopril 10mg', frequency: '1x Daily', duration: '30 Days' }
      ]
    },
    {
      id: '2',
      patientName: 'Marcus Thorne',
      initials: 'MT',
      condition: 'Post-op Recovery Plan',
      medsSummary: 'Post-op Recovery Plan',
      timeAgo: '5h ago',
      status: 'Pending',
      date: '2023-10-26',
      diagnosis: 'Knee arthroscopy post-op recovery',
      notes: 'Wound looks clean. Prescribed pain relief and physical therapy recommendations.',
      medsList: [
        { id: 'mt-1', name: 'Ibuprofen 600mg', frequency: 'As needed', duration: '7 Days' }
      ]
    },
    {
      id: '3',
      patientName: 'Elena Rodriguez',
      initials: 'ER',
      condition: 'Seasonal Allergy Regimen',
      medsSummary: 'Seasonal Allergy Regimen',
      timeAgo: 'Yesterday',
      status: 'Completed',
      date: '2023-10-25',
      diagnosis: 'Severe allergic rhinitis',
      notes: 'Avoid outdoor pollen during peak hours. Use nasal spray consistently.',
      medsList: [
        { id: 'er-1', name: 'Fluticasone nasal spray', frequency: '2x Daily', duration: '30 Days' },
        { id: 'er-2', name: 'Cetirizine 10mg', frequency: '1x Daily at night', duration: '30 Days' }
      ]
    }
  ]);

  // Tab Filtering (Active vs History)
  const [currentFilterTab, setCurrentFilterTab] = useState<'Active' | 'History'>('Active');

  // Selected Activity for Modal Details
  const [selectedActivity, setSelectedActivity] = useState<ActivityCard | null>(null);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Med Row Actions
  const handleAddMedRow = () => {
    const newRow: MedRow = {
      id: Date.now().toString(),
      name: '',
      frequency: '',
      duration: 'Duration'
    };
    setMedRows(prev => [...prev, newRow]);
  };

  const handleRemoveMedRow = (id: string) => {
    if (medRows.length <= 1) {
      triggerToast("A prescription needs at least one medication entry.", "error");
      return;
    }
    setMedRows(prev => prev.filter(row => row.id !== id));
  };

  const handleMedRowChange = (id: string, field: keyof MedRow, value: string) => {
    setMedRows(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // Submit Prescription
  const handleIssuePrescription = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientSearch.trim()) {
      triggerToast("Please search and select a patient.", "error");
      return;
    }

    if (!clinicalDiagnosis.trim()) {
      triggerToast("Please provide a clinical diagnosis.", "error");
      return;
    }

    // Verify at least one medication is filled out
    const validMeds = medRows.filter(row => row.name.trim() !== "");
    if (validMeds.length === 0) {
      triggerToast("Please add at least one medication with a valid name.", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const initials = patientSearch.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      const medsSummary = validMeds.map(m => m.name).join(', ');

      const newActivity: ActivityCard = {
        id: Date.now().toString(),
        patientName: patientSearch,
        initials: initials || "PT",
        condition: clinicalDiagnosis,
        medsSummary: `${clinicalDiagnosis} - ${validMeds[0].name}`,
        timeAgo: 'Just now',
        status: 'Active',
        date: prescriptionDate,
        diagnosis: clinicalDiagnosis,
        notes: clinicalNotes,
        medsList: validMeds
      };

      setActivities(prev => [newActivity, ...prev]);
      
      // Reset form
      setPatientSearch("");
      setClinicalDiagnosis("");
      setClinicalNotes("");
      setMedRows([
        { id: '1', name: '', frequency: '', duration: 'Duration' }
      ]);

      triggerToast("Prescription issued and logged successfully!");
    }, 1500);
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard this draft?")) {
      setPatientSearch("");
      setClinicalDiagnosis("");
      setClinicalNotes("");
      setMedRows([
        { id: '1', name: '', frequency: '', duration: 'Duration' }
      ]);
      triggerToast("Draft discarded.", "info");
    }
  };

  // Filter activities
  const filteredActivities = activities.filter(act => {
    if (currentFilterTab === 'Active') {
      return act.status === 'Active' || act.status === 'Pending';
    } else {
      return act.status === 'Completed';
    }
  });

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

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
        <div>
          <h2 className="text-3xl font-bold dark:text-slate-100 tracking-tight">Prescription Management</h2>
          <p className="text-on-surface-variant dark:text-slate-400 mt-1">Manage, issue, and track patient medications</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-black/5 dark:bg-white/5 p-1 rounded-2xl flex items-center border border-black/5 dark:border-white/10">
            <button 
              onClick={() => setCurrentFilterTab('Active')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentFilterTab === 'Active'
                  ? 'bg-white dark:bg-teal-400 text-primary dark:text-[#0b1120] shadow-sm'
                  : 'text-on-surface-variant dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setCurrentFilterTab('History')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentFilterTab === 'History'
                  ? 'bg-white dark:bg-teal-400 text-primary dark:text-[#0b1120] shadow-sm'
                  : 'text-on-surface-variant dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              History
            </button>
          </div>
          <button 
            onClick={handleAddMedRow}
            className="bg-primary dark:bg-teal-400 text-on-primary dark:text-[#0b1120] px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-lg hover:opacity-90 transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            New Prescription
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Main Form Column */}
        <section className="lg:col-span-8">
          <div className="p-6 bg-white dark:bg-slate-900/60 backdrop-blur-[20px] rounded-2xl border border-black/5 dark:border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 dark:bg-teal-400/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-teal-400/10 flex items-center justify-center text-primary dark:text-teal-400">
                  <span className="material-symbols-outlined">edit_note</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold dark:text-slate-100">Prescription Details</h4>
                  <p className="text-sm text-on-surface-variant dark:text-slate-400">Complete the clinical directive below</p>
                </div>
              </div>

              <form onSubmit={handleIssuePrescription} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-slate-300">Patient Search</label>
                    <div className="relative group/input">
                      <input 
                        className="w-full px-4 py-3 rounded-2xl border border-outline-variant dark:border-white/10 bg-white dark:bg-white/5 text-on-surface dark:text-slate-100 focus:border-primary dark:focus:border-teal-400 focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none" 
                        placeholder="Start typing patient name..." 
                        type="text"
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        required
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-lg">person_search</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-slate-300">Prescription Date</label>
                    <input 
                      className="w-full px-4 py-3 rounded-2xl border border-outline-variant dark:border-white/10 bg-white dark:bg-white/5 text-on-surface dark:text-slate-100 focus:border-primary dark:focus:border-teal-400 transition-all text-sm outline-none [color-scheme:light] dark:[color-scheme:dark]" 
                      type="date"
                      value={prescriptionDate}
                      onChange={(e) => setPrescriptionDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-slate-300">Clinical Diagnosis</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-2xl border border-outline-variant dark:border-white/10 bg-white dark:bg-white/5 text-on-surface dark:text-slate-100 focus:border-primary dark:focus:border-teal-400 transition-all text-sm resize-none outline-none" 
                    placeholder="Describe the primary medical condition..." 
                    rows={2}
                    value={clinicalDiagnosis}
                    onChange={(e) => setClinicalDiagnosis(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold dark:text-slate-300">Medications &amp; Dosage</label>
                    <button 
                      onClick={handleAddMedRow}
                      className="text-primary dark:text-teal-400 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">add_circle</span> Add Medication
                    </button>
                  </div>

                  <div className="space-y-3">
                    {medRows.map((row) => (
                      <div 
                        key={row.id} 
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10"
                      >
                        <div className="md:col-span-5">
                          <input 
                            className="w-full px-4 py-2.5 rounded-xl border-none bg-white dark:bg-white/10 text-sm text-on-surface dark:text-white focus:ring-2 focus:ring-primary/20 outline-none" 
                            placeholder="Medication Name" 
                            type="text" 
                            value={row.name}
                            onChange={(e) => handleMedRowChange(row.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <input 
                            className="w-full px-4 py-2.5 rounded-xl border-none bg-white dark:bg-white/10 text-sm text-on-surface dark:text-white focus:ring-2 focus:ring-primary/20 outline-none" 
                            placeholder="Frequency" 
                            type="text" 
                            value={row.frequency}
                            onChange={(e) => handleMedRowChange(row.id, 'frequency', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <select 
                            className="w-full px-4 py-2.5 rounded-xl border-none bg-white dark:bg-white/10 text-sm text-on-surface dark:text-white focus:ring-2 focus:ring-primary/20 outline-none"
                            value={row.duration}
                            onChange={(e) => handleMedRowChange(row.id, 'duration', e.target.value)}
                          >
                            <option value="Duration" className="dark:bg-[#1a2236]">Duration</option>
                            <option value="7 Days" className="dark:bg-[#1a2236]">7 Days</option>
                            <option value="10 Days" className="dark:bg-[#1a2236]">10 Days</option>
                            <option value="14 Days" className="dark:bg-[#1a2236]">14 Days</option>
                            <option value="30 Days" className="dark:bg-[#1a2236]">30 Days</option>
                            <option value="Refillable" className="dark:bg-[#1a2236]">Refillable</option>
                          </select>
                        </div>
                        <div className="md:col-span-1 flex justify-center">
                          <button 
                            type="button"
                            onClick={() => handleRemoveMedRow(row.id)}
                            className="material-symbols-outlined text-error opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-slate-300">Internal Clinical Notes</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-2xl border border-outline-variant dark:border-white/10 bg-white dark:bg-white/5 text-on-surface dark:text-slate-100 focus:border-primary dark:focus:border-teal-400 transition-all text-sm resize-none outline-none" 
                    placeholder="Additional observations..." 
                    rows={3}
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-md pt-6 border-t border-black/5 dark:border-white/10">
                  <button 
                    onClick={handleDiscard}
                    className="text-on-surface-variant dark:text-slate-400 font-bold hover:text-on-surface dark:hover:text-white transition-colors text-sm cursor-pointer" 
                    type="button"
                  >
                    Discard Draft
                  </button>
                  <button 
                    disabled={isSubmitting}
                    className="bg-primary dark:bg-teal-400 text-on-primary dark:text-[#0b1120] px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-75" 
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        Issuing...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        Issue Prescription
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Sidebar Panel */}
        <aside className="lg:col-span-4 w-full">
          <div className="flex flex-col bg-white/20 dark:bg-slate-900/40 backdrop-blur-[10px] rounded-2xl border border-black/5 dark:border-white/10 p-6 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold dark:text-slate-100">Recent Activity</h4>
              <button 
                onClick={() => triggerToast("Recent medication records synchronized.", "info")}
                className="text-primary dark:text-teal-400 material-symbols-outlined hover:rotate-180 transition-transform duration-500 cursor-pointer"
              >
                sync
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto glass-scroll flex-grow pr-1 text-left">
              {filteredActivities.map(act => (
                <div 
                  key={act.id} 
                  className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary/30 dark:hover:border-teal-400/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      act.status === 'Active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' 
                        : act.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-slate-300'
                    }`}>
                      {act.status}
                    </span>
                    <span className="text-[10px] text-on-surface-variant dark:text-slate-500 font-medium">{act.timeAgo}</span>
                  </div>
                  <h5 className="text-sm font-bold dark:text-white group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">{act.patientName}</h5>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 line-clamp-1">{act.medsSummary}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-[10px] font-bold text-teal-700 dark:text-teal-300">
                      {act.initials}
                    </div>
                    <button 
                      onClick={() => setSelectedActivity(act)}
                      className="text-primary dark:text-teal-400 text-xs font-bold flex items-center cursor-pointer hover:underline"
                    >
                      Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => triggerToast("Full prescription list filters loaded.", "info")}
              className="mt-6 w-full py-3.5 rounded-2xl border border-primary/20 dark:border-teal-400/20 text-primary dark:text-teal-400 font-bold hover:bg-primary dark:hover:bg-teal-400 hover:text-white dark:hover:text-[#0b1120] transition-all text-sm cursor-pointer"
            >
              View All Records
            </button>
          </div>
        </aside>
      </div>

      {/* Prescription Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-teal-400">medication</span>
                Issued Prescription Details
              </h4>
              <button 
                onClick={() => setSelectedActivity(null)}
                className="text-on-surface-variant dark:text-slate-400 hover:opacity-85"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-on-surface-variant dark:text-slate-300">
                <p><span className="font-bold text-on-surface dark:text-slate-100">Patient:</span> {selectedActivity.patientName}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-100">Date:</span> {selectedActivity.date}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-100">Clinical Status:</span> {selectedActivity.status}</p>
                <p><span className="font-bold text-on-surface dark:text-slate-100">Initials:</span> {selectedActivity.initials}</p>
              </div>

              <div className="h-px bg-outline-variant/20 dark:bg-white/10"></div>

              <div>
                <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-tight mb-1">Clinical Diagnosis</p>
                <p className="text-sm font-semibold text-on-surface dark:text-white">{selectedActivity.diagnosis || selectedActivity.condition}</p>
              </div>

              <div className="bg-surface-variant/20 dark:bg-white/5 p-4 rounded-xl space-y-2">
                <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-tight mb-1">Prescribed Medications</p>
                <ul className="space-y-2">
                  {selectedActivity.medsList?.map((med, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs bg-white dark:bg-white/5 p-2 rounded border border-black/5 dark:border-white/5">
                      <span className="font-bold text-on-surface dark:text-slate-200">{med.name}</span>
                      <span className="text-on-surface-variant dark:text-slate-400">{med.frequency} | {med.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedActivity.notes && (
                <div>
                  <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-tight mb-1">Clinical Notes</p>
                  <p className="text-xs italic text-on-surface-variant dark:text-slate-300 leading-relaxed bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-black/5 dark:border-white/5">
                    "{selectedActivity.notes}"
                  </p>
                </div>
              )}
            </div>
            <div className="pt-3 border-t border-outline-variant/10 flex justify-end">
              <button 
                onClick={() => setSelectedActivity(null)}
                className="w-full py-2 bg-primary text-white hover:bg-primary-container dark:bg-teal-400 dark:text-[#0b1120] rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
