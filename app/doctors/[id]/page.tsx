"use client";

import { use, useState, useEffect } from 'react';
import Image from 'next/image';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  rating: string;
  reviewsCount: string;
  experience: string;
  patients: string;
  successRate: string;
  fee: string;
  bio: string;
  image: string;
  education: string[];
  competencies: string[];
  slots: string[];
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen, MD",
    specialty: "Specialist Cardiologist & Cardiovascular Surgeon",
    degree: "Cardiologist",
    rating: "4.9",
    reviewsCount: "1,248",
    experience: "15+",
    patients: "5k+",
    successRate: "98%",
    fee: "$150.00",
    bio: "Dr. Sarah Chen is an internationally recognized cardiologist specializing in advanced cardiovascular surgery and non-invasive heart diagnostics. With over 15 years of experience at the World Health Institute, she brings a precision-focused approach to patient care, leveraging the latest medical technologies to ensure optimal outcomes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiR5RYTGvSTO29od2n487K8uvvRxjLO9tYt1Piz_3Le5JPzRo5tWkJjaP-1qcVOAJmZAut9PNOF8eDTGD5UvqpO-q2HjqmV6CXviOjtAqpctFIwQxJ5X1CvW7h9wac0E86rZx2QrQ8FdLVEmYBxfW4dtKB02F7KDJLuqLrCFmF0XB2Y0B6INMeD-pupa_EkR7S84-cXyvAFsylO0gqYkeFUW1LpIa8skhF7m8PV8b-6uosRHQP-DwKjMYY9JMr2BLCJ4dkk4Ithm7x",
    education: [
      "Ph.D. in Cardiovascular Medicine - Johns Hopkins University",
      "Board Certified in Thoracic and Cardiac Surgery",
      "Member of the American College of Cardiology"
    ],
    competencies: ["Echocardiography", "Arrhythmia Management", "Heart Failure Therapy", "Robotic Heart Surgery"],
    slots: ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"]
  },
  {
    id: "2",
    name: "Dr. Alex Mercer, MD",
    specialty: "Consultant Neurologist & Neurosurgeon",
    degree: "Neurologist",
    rating: "4.8",
    reviewsCount: "982",
    experience: "12+",
    patients: "3.5k+",
    successRate: "95%",
    fee: "$180.00",
    bio: "Dr. Alex Mercer is a distinguished neurologist who has led groundbreaking research in neural regeneration and micro-neurosurgery. Committed to patient-centric neurological health, he works closely with rehabilitation clinics globally to provide comprehensive stroke and spinal care.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9bsjStBNw8sxA8C3XxdaW3Nc3svv8g-3S6l6VvFzLCPO5d7f0_gvpcuBml4S1xwLAEuVsinGP4dFmTACKYhPp6G6AxwUJmmUAdNo4agrgoTZQT49IcAcZJHH7v4gEPYQjhKR8taKi2knexaJ1Hlpq5CsTihMcbFcBtWQsLpdygiTM4DXyQqQXxdhliLMTw3z8OGk5itftFmBYA4Qltqj-WnvLcmYwOrQYxTk2V0oyN9DnzpmHTvvCg2Kcupvq03By6jOBLgtjZtUD",
    education: [
      "M.D. in Neurosurgery - Harvard Medical School",
      "Fellowship in Neuro-Oncology - Mayo Clinic",
      "Member of the American Academy of Neurology"
    ],
    competencies: ["Brain Tumor Resection", "Spinal Decompression", "Neuropathy Diagnostics", "Stroke Rehabilitation"],
    slots: ["08:30 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"]
  }
];

export default function DoctorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;

  // Find doctor or default to Sarah Chen
  const doctor = mockDoctors.find(d => d.id === doctorId) || mockDoctors[0];

  const dates = [
    { day: "Mon", date: "14 May" },
    { day: "Tue", date: "15 May" },
    { day: "Wed", date: "16 May" }
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(doctor.slots[1]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);

  // Trigger Toast Notification
  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleBookAppointment = () => {
    setBookingSuccessModal(true);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Doctor profile link copied to clipboard!", "info");
    }
  };

  return (
    <main className="pt-24 pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto text-left relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border text-white font-bold text-sm ${
            toast.type === 'success' 
              ? 'bg-emerald-600 border-emerald-500' 
              : 'bg-sky-600 border-sky-500'
          }`}>
            <span className="material-symbols-outlined">
              {toast.type === 'success' ? 'check_circle' : 'info'}
            </span>
            {toast.message}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Doctor Profile Card */}
        <div className="lg:col-span-8">
          <div className="glass dark:bg-slate-900/60 dark:border-white/10 rounded-xl p-md md:p-lg flex flex-col md:flex-row gap-lg shadow-2xl overflow-hidden relative border border-white/20">
            {/* Profile Image */}
            <div className="w-full md:w-64 h-80 flex-shrink-0 rounded-lg overflow-hidden border border-white/30 relative">
              <img 
                className="w-full h-full object-cover" 
                alt={doctor.name}
                src={doctor.image}
              />
            </div>
            {/* Profile Header Details */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-xs mb-xs">
                  <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed text-label-sm font-label-sm rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Verified Provider
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-background dark:text-white mb-xs font-bold leading-tight">{doctor.name}</h1>
                <p className="font-body-lg text-body-lg text-secondary dark:text-secondary-fixed mb-md font-medium">{doctor.specialty}</p>
                <div className="flex items-center gap-xs mb-lg">
                  <div className="flex text-yellow-500">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0.5" }}>star_half</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface dark:text-slate-100">{doctor.rating}/5</span>
                  <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400">({doctor.reviewsCount} Reviews)</span>
                </div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-base">
                <div className="glass dark:bg-slate-900/40 p-md rounded-lg text-center border border-white/10 dark:border-white/5">
                  <span className="block font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold">{doctor.experience}</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant dark:text-slate-400">Years Exp.</span>
                </div>
                <div className="glass dark:bg-slate-900/40 p-md rounded-lg text-center border border-white/10 dark:border-white/5">
                  <span className="block font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold">{doctor.patients}</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant dark:text-slate-400">Patients</span>
                </div>
                <div className="glass dark:bg-slate-900/40 p-md rounded-lg text-center border border-white/10 dark:border-white/5">
                  <span className="block font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold">{doctor.successRate}</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant dark:text-slate-400">Success</span>
                </div>
              </div>
            </div>
          </div>
          {/* Bio Section */}
          <div className="mt-lg glass dark:bg-slate-900/60 dark:border-white/10 rounded-xl p-md md:p-lg border border-white/20">
            <h3 className="font-headline-md text-headline-md text-on-background dark:text-white mb-md font-semibold">Professional Biography</h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 leading-relaxed mb-md">
              {doctor.bio}
            </p>
            <div className="space-y-md">
              <div>
                <h4 className="font-label-md text-label-md font-bold text-primary dark:text-primary-fixed mb-xs uppercase tracking-widest">Education & Qualifications</h4>
                <ul className="list-disc list-inside font-body-md text-body-md text-on-surface-variant dark:text-slate-300 space-y-1 ml-xs">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-label-md text-label-md font-bold text-primary dark:text-primary-fixed mb-xs uppercase tracking-widest">Core Competencies</h4>
                <div className="flex flex-wrap gap-xs">
                  {doctor.competencies.map((comp, idx) => (
                    <span key={idx} className="px-3 py-1 bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-slate-300 rounded-full text-label-sm font-semibold">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Side Booking Panel */}
        <div className="lg:col-span-4 sticky top-24 w-full">
          <div className="glass dark:bg-slate-900/60 dark:border-white/10 rounded-xl p-md md:p-lg shadow-2xl border border-primary/20">
            <div className="flex justify-between items-center mb-md">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">Consultation Fee</span>
                <p className="font-headline-md text-headline-md text-on-background dark:text-white font-bold">{doctor.fee}</p>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">Duration</span>
                <p className="font-label-md text-label-md text-primary dark:text-primary-fixed font-bold">30 Mins Visit</p>
              </div>
            </div>
            <div className="h-px bg-outline-variant/30 dark:bg-white/10 mb-md"></div>
            {/* Availability */}
            <div className="mb-md">
              <label className="font-label-md text-label-md font-bold block mb-sm text-on-surface dark:text-slate-100">Select Date</label>
              <div className="grid grid-cols-3 gap-xs">
                {dates.map((d, idx) => {
                  const isActive = selectedDate.date === d.date;
                  return (
                    <button 
                      key={idx}
                      className={`p-xs text-center border rounded-lg transition-all cursor-pointer font-bold ${
                        isActive 
                          ? 'border-primary bg-primary/10 text-primary dark:text-primary-fixed dark:border-primary-fixed'
                          : 'border-outline-variant dark:border-white/10 bg-white/5 text-on-surface dark:text-slate-300 hover:border-primary'
                      }`}
                      onClick={() => setSelectedDate(d)}
                    >
                      <span className="block font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">{d.day}</span>
                      <span className="block font-label-md text-label-md">{d.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-lg">
              <label className="font-label-md text-label-md font-bold block mb-sm text-on-surface dark:text-slate-100">Available Slots</label>
              <div className="grid grid-cols-2 gap-xs">
                {doctor.slots.map((slot, idx) => {
                  const isActive = selectedSlot === slot;
                  return (
                    <button 
                      key={idx}
                      className={`py-2 text-center border rounded-lg font-label-md transition-all cursor-pointer font-semibold ${
                        isActive
                          ? 'bg-primary text-white border-primary dark:bg-primary-fixed-dim dark:text-slate-900 dark:border-primary-fixed-dim'
                          : 'border-outline-variant dark:border-white/10 text-on-surface dark:text-slate-300 hover:bg-primary hover:text-white dark:hover:bg-primary-fixed-dim dark:hover:text-slate-900'
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
            <button 
              onClick={handleBookAppointment}
              className="w-full py-md bg-primary text-on-primary dark:bg-primary-fixed dark:text-slate-900 font-headline-md text-headline-md rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              Book Appointment
            </button>
            <p className="text-center mt-md font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">
              Free cancellation up to 24h before
            </p>
          </div>
          {/* Secondary Actions */}
          <div className="mt-md flex gap-base">
            <button 
              onClick={() => triggerToast("Direct messaging setup dynamically.", "info")}
              className="flex-grow py-xs glass dark:bg-slate-900/60 dark:border-white/10 rounded-lg font-label-md flex items-center justify-center gap-1 text-on-surface dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10 transition-colors border border-white/20 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-sm">chat</span> Message
            </button>
            <button 
              onClick={handleShare}
              className="flex-grow py-xs glass dark:bg-slate-900/60 dark:border-white/10 rounded-lg font-label-md flex items-center justify-center gap-1 text-on-surface dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10 transition-colors border border-white/20 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-sm">share</span> Share
            </button>
          </div>
        </div>
      </section>

      {/* Booking Success Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-outline-variant/20 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h4 className="text-headline-md font-semibold text-on-surface dark:text-white">Appointment Reserved!</h4>
            <p className="text-sm text-on-surface-variant dark:text-slate-400">
              Your appointment request with <span className="font-bold text-on-surface dark:text-slate-200">{doctor.name}</span> has been locked successfully.
            </p>
            <div className="p-3 bg-on-surface/5 dark:bg-white/5 rounded-xl text-left space-y-1 text-xs text-on-surface-variant dark:text-slate-300 font-mono">
              <p><span className="font-bold">Date:</span> {selectedDate.day}, {selectedDate.date}</p>
              <p><span className="font-bold">Time Slot:</span> {selectedSlot}</p>
              <p><span className="font-bold">Consultation Fee:</span> {doctor.fee}</p>
              <p><span className="font-bold">Estimated Duration:</span> 30 Minutes</p>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => setBookingSuccessModal(false)}
                className="w-full py-2 bg-primary text-white hover:bg-primary-container dark:bg-primary-fixed dark:text-slate-900 rounded-xl text-sm font-bold cursor-pointer transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
