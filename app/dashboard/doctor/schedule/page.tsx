"use client";

import { useState, useEffect } from 'react';

interface ScheduleSlot {
  id: string;
  dayIndex: number; // 0: Mon, 1: Tue, ..., 6: Sun
  timeIndex: number; // Index in times array
  title: string;
  subtitle?: string;
  type: 'appointment' | 'block' | 'break';
  colorType: 'primary' | 'secondary' | 'tertiary' | 'error';
  colSpan?: number;
}

interface RecurringBreak {
  id: string;
  title: string;
  time: string;
}

export default function DoctorSchedulePage() {
  const days = [
    { name: 'Mon', date: '12' },
    { name: 'Tue', date: '13', active: true },
    { name: 'Wed', date: '14' },
    { name: 'Thu', date: '15' },
    { name: 'Fri', date: '16' },
    { name: 'Sat', date: '17', weekend: true },
    { name: 'Sun', date: '18', weekend: true },
  ];

  const times = [
    { label: '08:00', value: 8 },
    { label: '09:00', value: 9 },
    { label: '10:00', value: 10 },
    { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    { label: '13:00', value: 13 },
    { label: '14:00', value: 14 },
    { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    { label: '17:00', value: 17 },
  ];

  // Initial states
  const [slots, setSlots] = useState<ScheduleSlot[]>([
    { id: '1', dayIndex: 0, timeIndex: 0, title: 'Sarah Jenkins', subtitle: 'Follow-up', type: 'appointment', colorType: 'primary' },
    { id: '2', dayIndex: 2, timeIndex: 0, title: 'Clinic Rounds', type: 'appointment', colorType: 'secondary' },
    { id: '3', dayIndex: 0, timeIndex: 1, title: 'Mark R.', subtitle: 'Consultation', type: 'appointment', colorType: 'primary' },
    { id: '4', dayIndex: 1, timeIndex: 1, title: 'L. Thompson', subtitle: 'Check-up', type: 'appointment', colorType: 'primary' },
    { id: '5', dayIndex: 3, timeIndex: 1, title: 'A. Wu', subtitle: 'Follow-up', type: 'appointment', colorType: 'primary' },
    { id: '6', dayIndex: 0, timeIndex: 2, title: 'Medical Staff Meeting', type: 'break', colorType: 'tertiary', colSpan: 3 },
    { id: '7', dayIndex: 0, timeIndex: 4, title: 'Lunch Break', type: 'break', colorType: 'error', colSpan: 7 },
  ]);

  const [recurringBreaks, setRecurringBreaks] = useState<RecurringBreak[]>([
    { id: '1', title: 'Lunch Hour', time: '12:00 - 13:00' },
    { id: '2', title: 'Lab Sync', time: '15:30 - 16:00' },
  ]);

  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("20:00");
  const [slotDuration, setSlotDuration] = useState("30 Minutes");

  // Notification Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Add Slot Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newColorType, setNewColorType] = useState<'primary' | 'secondary' | 'tertiary' | 'error'>("primary");
  const [newColSpan, setNewColSpan] = useState(1);

  // Delete Slot Modal State
  const [selectedSlotForDelete, setSelectedSlotForDelete] = useState<ScheduleSlot | null>(null);

  // Add Break Modal State
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [newBreakTitle, setNewBreakTitle] = useState("");
  const [newBreakStart, setNewBreakStart] = useState("12:00");
  const [newBreakEnd, setNewBreakEnd] = useState("13:00");

  // Show Toast Helper
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Compute Occupancy Map to avoid rendering overlapping cells for colSpans
  const occupancyMap: { [key: string]: boolean } = {};
  slots.forEach(slot => {
    const colSpan = slot.colSpan || 1;
    for (let c = 0; c < colSpan; c++) {
      const key = `${slot.dayIndex + c}-${slot.timeIndex}`;
      occupancyMap[key] = true;
    }
  });

  // Actions
  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      triggerToast("Please enter a title.", "error");
      return;
    }

    // Verify bounds of colSpan
    if (selectedDayIndex + newColSpan > 7) {
      triggerToast("The slot spans outside the calendar week.", "error");
      return;
    }

    // Check if any destination cells are already occupied
    for (let c = 0; c < newColSpan; c++) {
      const targetKey = `${selectedDayIndex + c}-${selectedTimeIndex}`;
      if (occupancyMap[targetKey]) {
        triggerToast("This time slot overlaps with an existing event.", "error");
        return;
      }
    }

    const newSlot: ScheduleSlot = {
      id: Date.now().toString(),
      dayIndex: selectedDayIndex,
      timeIndex: selectedTimeIndex,
      title: newTitle,
      subtitle: newSubtitle.trim() ? newSubtitle : undefined,
      type: 'appointment',
      colorType: newColorType,
      colSpan: newColSpan > 1 ? newColSpan : undefined
    };

    setSlots(prev => [...prev, newSlot]);
    setShowAddModal(false);
    triggerToast("Slot added successfully!");
  };

  const handleDeleteSlot = () => {
    if (!selectedSlotForDelete) return;
    setSlots(prev => prev.filter(s => s.id !== selectedSlotForDelete.id));
    setSelectedSlotForDelete(null);
    triggerToast("Slot removed successfully.", "info");
  };

  const handleAddBreak = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBreakTitle.trim()) {
      triggerToast("Please enter break name.", "error");
      return;
    }

    const newBreak: RecurringBreak = {
      id: Date.now().toString(),
      title: newBreakTitle,
      time: `${newBreakStart} - ${newBreakEnd}`
    };

    setRecurringBreaks(prev => [...prev, newBreak]);
    setShowBreakModal(false);
    setNewBreakTitle("");
    triggerToast("Recurring break added.");
  };

  const handleDeleteBreak = (id: string) => {
    setRecurringBreaks(prev => prev.filter(b => b.id !== id));
    triggerToast("Recurring break removed.", "info");
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Availability configuration saved successfully!");
  };

  const renderSlotContent = (slot: ScheduleSlot) => {
    let colorClasses = "";
    if (slot.colorType === 'primary') {
      colorClasses = "bg-primary/20 dark:bg-primary-fixed-dim/20 border border-primary/30 dark:border-primary-fixed-dim/30 text-primary dark:text-primary-fixed-dim hover:bg-primary/30 dark:hover:bg-primary-fixed-dim/30";
    } else if (slot.colorType === 'secondary') {
      colorClasses = "bg-secondary-container/20 dark:bg-secondary-fixed/20 border border-secondary/30 dark:border-secondary-fixed-dim/30 text-secondary dark:text-secondary-fixed-dim hover:bg-secondary/30 dark:hover:bg-secondary-fixed-dim/30";
    } else if (slot.colorType === 'tertiary') {
      colorClasses = "bg-tertiary-container/10 dark:bg-white/10 border border-tertiary/20 dark:border-white/20 text-tertiary dark:text-slate-300 hover:bg-tertiary/20 dark:hover:bg-white/20";
    } else if (slot.colorType === 'error') {
      colorClasses = "bg-error/10 dark:bg-error/20 border border-error/30 dark:border-error/40 text-error hover:bg-error/20 dark:hover:bg-error/30";
    }

    if (slot.title === 'Medical Staff Meeting') {
      return (
        <div 
          onClick={() => setSelectedSlotForDelete(slot)}
          className="h-full w-full rounded-lg bg-tertiary-container/10 dark:bg-white/10 border border-tertiary/20 dark:border-white/20 backdrop-blur-sm p-4 flex items-center justify-center gap-4 cursor-pointer hover:bg-tertiary-container/20 transition-all"
        >
          <span className="material-symbols-outlined text-tertiary dark:text-slate-300">group</span>
          <span className="text-sm font-semibold text-tertiary dark:text-slate-300 uppercase tracking-widest">{slot.title}</span>
        </div>
      );
    }

    if (slot.title === 'Lunch Break') {
      return (
        <div 
          onClick={() => setSelectedSlotForDelete(slot)}
          className="h-full w-full bg-error/5 dark:bg-error/10 flex items-center justify-center cursor-pointer hover:bg-error/10 transition-all border border-error/20 rounded-lg"
        >
          <span className="text-xs font-bold text-error uppercase tracking-widest opacity-60">{slot.title}</span>
        </div>
      );
    }

    return (
      <div 
        onClick={() => setSelectedSlotForDelete(slot)}
        className={`h-full w-full rounded-lg p-2 flex flex-col justify-between group cursor-pointer transition-all ${colorClasses}`}
      >
        <p className="text-[10px] font-bold leading-none">{slot.title}</p>
        {slot.subtitle && <p className="text-[9px] opacity-70 dark:text-slate-300">{slot.subtitle}</p>}
      </div>
    );
  };

  const renderEmptyCell = (dayIndex: number, timeIndex: number) => {
    const isWeekend = dayIndex >= 5;
    const bgClass = isWeekend ? "bg-on-surface/5 dark:bg-white/5" : "";

    return (
      <div className={`border-b border-r border-white/10 dark:border-white/5 p-1 ${bgClass}`} key={dayIndex}>
        <div 
          onClick={() => {
            setSelectedDayIndex(dayIndex);
            setSelectedTimeIndex(timeIndex);
            setNewTitle("");
            setNewSubtitle("");
            setNewColorType("primary");
            setNewColSpan(1);
            setShowAddModal(true);
          }}
          className="h-full w-full rounded-lg border-2 border-dashed border-outline-variant/30 dark:border-white/10 group cursor-pointer hover:border-primary/50 transition-all flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-outline-variant dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">add</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left relative">
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

      {/* Atmospheric Glow Effect */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Quick Actions Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2">
        <div className="space-y-1">
          <h2 className="font-headline-lg text-headline-lg text-on-background dark:text-slate-100 font-semibold">Schedule Management</h2>
          <p className="text-on-surface-variant dark:text-slate-400 opacity-80">Manage your clinical hours and patient consultation slots.</p>
        </div>
        <div className="flex items-center gap-sm">
          <button 
            onClick={() => triggerToast("Calendar sync link copied to clipboard!", "info")}
            className="bg-surface/60 dark:bg-white/5 backdrop-blur-glass border border-white/20 dark:border-white/10 px-md py-2 rounded-xl text-primary dark:text-primary-fixed-dim font-label-md flex items-center gap-2 hover:bg-primary/5 dark:hover:bg-white/10 transition-all active:scale-95 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">link</span> Generate Link
          </button>
          <button 
            onClick={() => {
              setSelectedDayIndex(0);
              setSelectedTimeIndex(0);
              setNewTitle("Vacation Block");
              setNewSubtitle("Out of office");
              setNewColorType("error");
              setNewColSpan(7);
              setShowAddModal(true);
            }}
            className="bg-surface/60 dark:bg-white/5 backdrop-blur-glass border border-white/20 dark:border-white/10 px-md py-2 rounded-xl text-error font-label-md flex items-center gap-2 hover:bg-error/5 dark:hover:bg-white/10 transition-all active:scale-95 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">beach_access</span> Mark Vacation
          </button>
          <button 
            onClick={() => {
              setSelectedDayIndex(0);
              setSelectedTimeIndex(0);
              setNewTitle("");
              setNewSubtitle("");
              setNewColorType("primary");
              setNewColSpan(1);
              setShowAddModal(true);
            }}
            className="bg-primary hover:bg-primary-container text-white px-md py-2 rounded-xl font-label-md flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> Add New Slot
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-gutter items-start">
        {/* Main Calendar Canvas */}
        <div className="flex-1 min-w-0 w-full">
          <div className="bg-surface/40 dark:bg-white/5 backdrop-blur-glass rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-xl">
            {/* Calendar Header Days */}
            <div 
              className="bg-on-surface/5 dark:bg-white/10 border-b border-white/10 dark:border-white/5"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px repeat(7, 1fr)',
              }}
            >
              <div className="flex items-center justify-center border-r border-white/10 dark:border-white/5 p-2">
                <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400">schedule</span>
              </div>
              {days.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center justify-center p-4 border-r border-white/10 dark:border-white/5 last:border-r-0 ${
                    day.active ? 'bg-primary/5 dark:bg-primary-fixed-dim/10' : ''
                  }`}
                >
                  <span className={`text-[11px] font-bold uppercase tracking-tighter ${
                    day.active 
                      ? 'text-primary dark:text-primary-fixed-dim' 
                      : day.weekend 
                        ? 'text-on-surface-variant dark:text-slate-500 opacity-50' 
                        : 'text-on-surface-variant dark:text-slate-400'
                  }`}>
                    {day.name}
                  </span>
                  <span className={`text-lg font-bold ${
                    day.active 
                      ? 'text-primary dark:text-primary-fixed-dim' 
                      : day.weekend 
                        ? 'text-on-surface-variant dark:text-slate-500 opacity-50' 
                        : 'dark:text-slate-100'
                  }`}>
                    {day.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Body (Scrollable) */}
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px repeat(7, 1fr)',
                  gridAutoRows: '100px',
                }}
              >
                {times.map((time, timeIdx) => {
                  const renderedCells: React.ReactNode[] = [];

                  // Add Time label first column
                  renderedCells.push(
                    <div 
                      key={`time-${timeIdx}`}
                      className="flex items-start justify-center pt-4 border-r border-b border-white/10 dark:border-white/5 text-xs font-medium text-on-surface-variant dark:text-slate-400"
                    >
                      {time.label}
                    </div>
                  );

                  for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
                    const startSlot = slots.find(s => s.dayIndex === dayIdx && s.timeIndex === timeIdx);

                    if (startSlot) {
                      const colSpan = startSlot.colSpan || 1;
                      renderedCells.push(
                        <div 
                          key={dayIdx} 
                          className="border-b border-r border-white/10 dark:border-white/5 p-1"
                          style={{ gridColumnEnd: `span ${colSpan}` }}
                        >
                          {renderSlotContent(startSlot)}
                        </div>
                      );
                      // Skip iteration columns for this colSpan
                      dayIdx += colSpan - 1;
                    } else {
                      const occupiedKey = `${dayIdx}-${timeIdx}`;
                      if (!occupancyMap[occupiedKey]) {
                        renderedCells.push(renderEmptyCell(dayIdx, timeIdx));
                      }
                    }
                  }

                  return renderedCells;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Availability Config */}
        <aside className="w-full xl:w-80 flex flex-col gap-gutter shrink-0">
          {/* Config Card */}
          <div className="bg-surface/40 dark:bg-white/5 backdrop-blur-glass rounded-3xl border border-white/20 dark:border-white/10 p-md shadow-lg w-full">
            <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-2 dark:text-slate-100 font-semibold">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">settings_suggest</span>
              Availability
            </h3>
            <form onSubmit={handleSaveConfig} className="space-y-md text-left">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 mb-2 block uppercase tracking-wider font-bold">Weekly Work Hours</label>
                <div className="grid grid-cols-2 gap-sm">
                  <div className="relative">
                    <input 
                      className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary transition-all outline-none [color-scheme:light] dark:[color-scheme:dark]" 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-on-surface-variant dark:text-slate-500 pointer-events-none">Start</span>
                  </div>
                  <div className="relative">
                    <input 
                      className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary transition-all outline-none [color-scheme:light] dark:[color-scheme:dark]" 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-on-surface-variant dark:text-slate-500 pointer-events-none">End</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 mb-2 block uppercase tracking-wider font-bold">Slot Duration</label>
                <select 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:ring-primary focus:border-primary outline-none"
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(e.target.value)}
                >
                  <option className="dark:bg-[#1e293b] text-on-surface dark:text-slate-100" value="15 Minutes">15 Minutes</option>
                  <option className="dark:bg-[#1e293b] text-on-surface dark:text-slate-100" value="30 Minutes">30 Minutes</option>
                  <option className="dark:bg-[#1e293b] text-on-surface dark:text-slate-100" value="45 Minutes">45 Minutes</option>
                  <option className="dark:bg-[#1e293b] text-on-surface dark:text-slate-100" value="1 Hour">1 Hour</option>
                </select>
              </div>
              <div className="pt-2 border-t border-white/10 dark:border-white/5">
                <label className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 mb-3 block uppercase tracking-wider font-bold">Recurring Breaks</label>
                <div className="space-y-sm">
                  {recurringBreaks.map(brk => (
                    <div key={brk.id} className="flex items-center justify-between bg-on-surface/5 dark:bg-white/5 p-3 rounded-xl border border-white/5">
                      <div>
                        <p className="text-xs font-bold dark:text-slate-200">{brk.title}</p>
                        <p className="text-[10px] opacity-60 dark:text-slate-400">{brk.time}</p>
                      </div>
                      <span 
                        onClick={() => handleDeleteBreak(brk.id)}
                        className="material-symbols-outlined text-error cursor-pointer hover:scale-110 transition-transform text-[18px]"
                      >
                        delete
                      </span>
                    </div>
                  ))}
                  <button 
                    onClick={() => setShowBreakModal(true)}
                    className="w-full py-2 border border-dashed border-primary/40 dark:border-primary-fixed-dim/30 rounded-xl text-primary dark:text-primary-fixed-dim text-xs font-bold flex items-center justify-center gap-1 hover:bg-primary/5 dark:hover:bg-white/10 transition-all cursor-pointer" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span> Add Break
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button 
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold text-label-md shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 cursor-pointer" 
                  type="submit"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>

          {/* Statistics Card */}
          <div className="bg-surface/40 dark:bg-white/5 backdrop-blur-glass rounded-3xl border border-white/20 dark:border-white/10 p-md shadow-lg relative overflow-hidden group w-full text-left">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[60px] dark:text-slate-300">analytics</span>
            </div>
            <h4 className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-widest mb-4 font-bold">Weekly Pulse</h4>
            <div className="grid grid-cols-2 gap-md">
              <div>
                <p className="text-2xl font-bold text-primary dark:text-primary-fixed-dim">84%</p>
                <p className="text-[10px] font-medium opacity-60 uppercase dark:text-slate-400">Capacity</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary dark:text-secondary-fixed-dim">32</p>
                <p className="text-[10px] font-medium opacity-60 uppercase dark:text-slate-400 font-semibold">Booked</p>
              </div>
            </div>
            <div className="mt-md h-1.5 w-full bg-on-surface/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary dark:bg-primary-fixed-dim rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-slate-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                Add Consultation Slot
              </h4>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-on-surface-variant dark:text-slate-400 hover:opacity-85"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSlot} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Time Slot Details</label>
                <div className="p-3 bg-on-surface/5 dark:bg-white/5 rounded-xl text-xs text-on-surface-variant dark:text-slate-300 font-mono">
                  Day: {days[selectedDayIndex].name} ({days[selectedDayIndex].date}) | Time: {times[selectedTimeIndex].label}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Patient Name / Title *</label>
                <input 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  type="text" 
                  placeholder="e.g. John Doe / Clinic Rounds"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Appointment Type / Subtitle</label>
                <input 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  type="text" 
                  placeholder="e.g. Follow-up / Routine"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Color / Priority</label>
                  <select 
                    className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                    value={newColorType}
                    onChange={(e) => setNewColorType(e.target.value as any)}
                  >
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value="primary">Primary (Teal)</option>
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value="secondary">Secondary (Blue)</option>
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value="tertiary">Tertiary (Slate)</option>
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value="error">Error (Red)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Span Days</label>
                  <select 
                    className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                    value={newColSpan}
                    onChange={(e) => setNewColSpan(Number(e.target.value))}
                  >
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value={1}>1 Day</option>
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value={2}>2 Days</option>
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value={3}>3 Days</option>
                    <option className="dark:bg-[#1a2236] text-on-surface dark:text-slate-100" value={7}>Full Week</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-on-surface/5 dark:bg-white/5 hover:bg-on-surface/10 dark:hover:bg-white/10 text-on-surface-variant dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold cursor-pointer"
                >
                  Add Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Slot Confirmation Modal */}
      {selectedSlotForDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-error">
              <span className="material-symbols-outlined text-[32px]">warning</span>
              <h4 className="text-headline-md font-semibold dark:text-slate-100">Delete Schedule Slot?</h4>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-slate-400">
              Are you sure you want to remove the slot <span className="font-bold text-on-surface dark:text-slate-200">"{selectedSlotForDelete.title}"</span> from your calendar? This action cannot be undone.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedSlotForDelete(null)}
                className="px-4 py-2 bg-on-surface/5 dark:bg-white/5 hover:bg-on-surface/10 dark:hover:bg-white/10 text-on-surface-variant dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteSlot}
                className="px-4 py-2 bg-error text-white hover:opacity-90 rounded-xl text-xs font-bold cursor-pointer"
              >
                Delete Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Break Modal */}
      {showBreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h4 className="text-headline-md font-semibold text-on-surface dark:text-slate-100">Add Recurring Break</h4>
              <button onClick={() => setShowBreakModal(false)} className="text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddBreak} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Break Name</label>
                <input 
                  className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                  type="text" 
                  placeholder="e.g. Tea Break / Review Time"
                  value={newBreakTitle}
                  onChange={(e) => setNewBreakTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">Start Time</label>
                  <input 
                    className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                    type="time" 
                    value={newBreakStart}
                    onChange={(e) => setNewBreakStart(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant dark:text-slate-400 block mb-1">End Time</label>
                  <input 
                    className="w-full bg-on-surface/5 dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-label-md dark:text-slate-100 focus:border-primary outline-none"
                    type="time" 
                    value={newBreakEnd}
                    onChange={(e) => setNewBreakEnd(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowBreakModal(false)}
                  className="px-4 py-2 bg-on-surface/5 dark:bg-white/5 text-on-surface-variant dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Add Break
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
