"use client";

import { useState, useEffect } from 'react';

interface Payment {
  id: string;
  date: string;
  provider: string;
  service: string;
  amount: string;
  status: 'Paid' | 'Refunded';
}

interface Review {
  id: string;
  doctorName: string;
  specialty: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export default function PatientPaymentsReviewsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', date: 'Oct 12, 2024', provider: 'Dr. Sarah Jenkins', service: 'Annual Wellness Exam', amount: '$150.00', status: 'Paid' },
    { id: '2', date: 'Sep 28, 2024', provider: 'City Radiology Lab', service: 'Chest X-Ray', amount: '$85.00', status: 'Paid' },
    { id: '3', date: 'Sep 15, 2024', provider: 'Dr. Michael Chen', service: 'Specialist Consultation', amount: '$210.00', status: 'Refunded' }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Jenkins',
      specialty: 'General Practitioner',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyIPP2HItnAVYrmxxlyzPUiyXCp2xwzn7Jvtne1oU7jAjScLe8DV-FWkQAFdv5FVM8VfbG7KkMbbGYlBeiSIO1r39kkE_fTx_21AjLP4n1jBlBTA7tyLJbqWq8fbmBlpXbiyriXEnwN60TBgSkqwUbGrrMeZnh0qybHrPiVPxt4pgieWTrv2pu8FTrPaFcszkkl0hfyBUoYaneEuL7X4B7rkRzFHZJlD7pK4YRIUyXs9xmIpHDu9ea96MND_jmcuMz4ZKCrOMTNbuh',
      rating: 5,
      comment: 'Excellent listener and very thorough. She took the time to answer all my questions regarding my new treatment plan.',
      date: 'Oct 15, 2024',
      verified: true
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArPPre11naTt7ZObCHC1TS3IJV1RhFq1OOZjzs7WmxmZLy6_G1DTfQbi5WfTAy476jKSxIpIEs5s-MWFvF-PtOFooUp1JL80I2ByzZWlLWyHmCDmgpQwJ0GyAVdKcNOOU5zp_CJuD6TOUcu6cZ5rnARK3h0EZAAJz-AEu6hn3656bias51xr-D_nKGlr4yVrJvEmpp6NVo8KLW29z_3eCNZBt46R7DFvKtR85qPQ_w9tobHe40Yp5ULRoW3UUPYAEZeHXiFb5Ujeud',
      rating: 4.5,
      comment: 'Wait times were a bit long, but the consultation itself was top-notch. Highly professional and knowledgeable.',
      date: 'Sep 20, 2024',
      verified: true
    }
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Filter Payments state
  const [paymentFilter, setPaymentFilter] = useState<'All' | 'Paid' | 'Refunded'>('All');

  // Modal States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Review Form Fields
  const [formDoctor, setFormDoctor] = useState("Dr. Sarah Jenkins");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Open Add Review Modal
  const openAddReview = () => {
    setEditingReview(null);
    setFormDoctor("Dr. Sarah Jenkins");
    setFormRating(5);
    setFormComment("");
    setShowReviewModal(true);
  };

  // Open Edit Review Modal
  const openEditReview = (review: Review) => {
    setEditingReview(review);
    setFormDoctor(review.doctorName);
    setFormRating(review.rating);
    setFormComment(review.comment);
    setShowReviewModal(true);
  };

  // Handle Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) {
      triggerToast("Please write a comment.", "error");
      return;
    }

    if (editingReview) {
      // Edit mode
      setReviews(prev => prev.map(rev => 
        rev.id === editingReview.id 
          ? { ...rev, doctorName: formDoctor, rating: formRating, comment: formComment }
          : rev
      ));
      triggerToast("Review updated successfully!");
    } else {
      // Add mode
      const avatar = formDoctor.includes('Jenkins')
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyIPP2HItnAVYrmxxlyzPUiyXCp2xwzn7Jvtne1oU7jAjScLe8DV-FWkQAFdv5FVM8VfbG7KkMbbGYlBeiSIO1r39kkE_fTx_21AjLP4n1jBlBTA7tyLJbqWq8fbmBlpXbiyriXEnwN60TBgSkqwUbGrrMeZnh0qybHrPiVPxt4pgieWTrv2pu8FTrPaFcszkkl0hfyBUoYaneEuL7X4B7rkRzFHZJlD7pK4YRIUyXs9xmIpHDu9ea96MND_jmcuMz4ZKCrOMTNbuh'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuArPPre11naTt7ZObCHC1TS3IJV1RhFq1OOZjzs7WmxmZLy6_G1DTfQbi5WfTAy476jKSxIpIEs5s-MWFvF-PtOFooUp1JL80I2ByzZWlLWyHmCDmgpQwJ0GyAVdKcNOOU5zp_CJuD6TOUcu6cZ5rnARK3h0EZAAJz-AEu6hn3656bias51xr-D_nKGlr4yVrJvEmpp6NVo8KLW29z_3eCNZBt46R7DFvKtR85qPQ_w9tobHe40Yp5ULRoW3UUPYAEZeHXiFb5Ujeud';
      const specialty = formDoctor.includes('Jenkins') ? 'General Practitioner' : 'Cardiologist';

      const newReview: Review = {
        id: Date.now().toString(),
        doctorName: formDoctor,
        specialty,
        avatarUrl: avatar,
        rating: formRating,
        comment: formComment,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        verified: true
      };
      setReviews(prev => [newReview, ...prev]);
      triggerToast("Review posted successfully!");
    }

    setShowReviewModal(false);
  };

  // Handle Delete Review
  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
      triggerToast("Review deleted.", "info");
    }
  };

  // Filtered Payments
  const filteredPayments = payments.filter(pay => {
    if (paymentFilter === 'All') return true;
    return pay.status === paymentFilter;
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

      {/* Page Title */}
      <section className="mb-md">
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 font-bold mb-2 tracking-tight">Billing &amp; Feedback</h2>
        <p className="font-body-md text-on-surface-variant dark:text-slate-400">Manage your clinical payments and rate your healthcare providers.</p>
      </section>

      {/* Section 1: Payment History */}
      <section className="glass dark:bg-slate-900/60 dark:border-white/10 rounded-xl overflow-hidden shadow-sm border border-white/20">
        <div className="p-md border-b border-white/20 dark:border-white/10 flex justify-between items-center bg-white/20 dark:bg-slate-900/40">
          <h3 className="font-headline-md text-headline-md font-semibold text-on-surface dark:text-slate-100">Payment History</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400">Filter:</span>
            <select 
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as any)}
              className="px-3 py-1 bg-white dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-lg text-xs font-bold text-on-surface dark:text-slate-200 focus:outline-none"
            >
              <option value="All" className="dark:bg-[#1a2236]">All</option>
              <option value="Paid" className="dark:bg-[#1a2236]">Paid</option>
              <option value="Refunded" className="dark:bg-[#1a2236]">Refunded</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50 dark:bg-white/5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant dark:text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-md py-4">Date</th>
                <th className="px-md py-4">Provider</th>
                <th className="px-md py-4">Service</th>
                <th className="px-md py-4">Amount</th>
                <th className="px-md py-4">Status</th>
                <th className="px-md py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 dark:divide-white/5">
              {filteredPayments.map(pay => (
                <tr key={pay.id} className="hover:bg-white/20 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-md py-4 font-body-md text-on-surface dark:text-slate-200">{pay.date}</td>
                  <td className="px-md py-4 font-label-md font-bold text-on-surface dark:text-slate-100">{pay.provider}</td>
                  <td className="px-md py-4 font-body-md text-on-surface-variant dark:text-slate-300">{pay.service}</td>
                  <td className="px-md py-4 font-body-md text-on-surface dark:text-slate-200 font-semibold">{pay.amount}</td>
                  <td className="px-md py-4">
                    {pay.status === 'Paid' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:text-primary-fixed border border-primary/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-fixed mr-2 animate-pulse"></span> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-variant/50 text-tertiary dark:text-slate-300 border border-outline/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-2"></span> Refunded
                      </span>
                    )}
                  </td>
                  <td className="px-md py-4 text-right">
                    <button 
                      onClick={() => triggerToast(`Downloading receipt for invoice ID #INV-${pay.id}039...`, "info")}
                      className="p-2 text-on-surface-variant hover:text-primary dark:text-slate-400 dark:hover:text-primary-fixed cursor-pointer transition-all"
                      title="Download Invoice"
                    >
                      <span className="material-symbols-outlined">receipt_long</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: My Reviews */}
      <section className="space-y-md mt-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md font-semibold text-on-surface dark:text-slate-100">My Reviews</h3>
          <button 
            onClick={openAddReview}
            className="bg-primary text-white px-6 py-2 rounded-xl font-label-md flex items-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Review
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {reviews.map(rev => (
            <div key={rev.id} className="glass dark:bg-slate-900/60 dark:border-white/10 p-md rounded-xl shadow-sm border border-white/20 flex flex-col h-full hover:scale-[1.01] transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <img className="w-12 h-12 rounded-lg object-cover" src={rev.avatarUrl} alt="" />
                  <div className="text-left">
                    <h4 className="font-label-md font-bold text-on-surface dark:text-slate-100">{rev.doctorName}</h4>
                    <p className="text-label-sm text-on-surface-variant/70 dark:text-slate-400">{rev.specialty}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => openEditReview(rev)}
                    className="p-1 text-on-surface-variant/60 hover:text-primary dark:text-slate-400 dark:hover:text-primary-fixed transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-1 text-on-surface-variant/60 hover:text-error dark:text-slate-400 dark:hover:text-error transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
              <div className="flex text-amber-400 mb-3 text-left">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const fillType = idx < Math.floor(rev.rating) ? '1' : rev.rating % 1 !== 0 && idx === Math.floor(rev.rating) ? '0.5' : '0';
                  return (
                    <span 
                      key={idx} 
                      className="material-symbols-outlined" 
                      style={{ fontVariationSettings: `'FILL' ${fillType}` }}
                    >
                      {fillType === '0.5' ? 'star_half' : 'star'}
                    </span>
                  );
                })}
              </div>
              <p className="font-body-md text-on-surface-variant dark:text-slate-300 leading-relaxed italic text-left flex-grow">
                "{rev.comment}"
              </p>
              <div className="mt-auto pt-4 flex justify-between items-center text-label-sm text-on-surface-variant/50 dark:text-slate-400 border-t border-white/5">
                <span>Posted {rev.date}</span>
                <span className="flex items-center gap-1 font-semibold"><span className="material-symbols-outlined text-xs">verified</span> Verified patient</span>
              </div>
            </div>
          ))}

          {/* Add Review Placeholder Card */}
          <div 
            onClick={openAddReview}
            className="border-2 border-dashed border-outline/20 dark:border-white/10 rounded-xl flex flex-col items-center justify-center p-md group cursor-pointer hover:border-primary/50 transition-all min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
              <span className="material-symbols-outlined text-primary">rate_review</span>
            </div>
            <p className="font-label-md font-bold text-on-surface-variant dark:text-slate-300 group-hover:text-primary">Rate your last visit</p>
            <p className="text-label-sm text-on-surface-variant/50 dark:text-slate-400 text-center">Your feedback helps improve our care quality.</p>
          </div>
        </div>
      </section>

      {/* Review Modal Form */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setShowReviewModal(false)}
          ></div>
          <div className="glass dark:bg-[#1e293b] dark:border-white/10 relative w-full max-w-xl rounded-2xl shadow-2xl p-md md:p-lg border border-white/40 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
                {editingReview ? "Edit Feedback Review" : "Add New Review"}
              </h3>
              <button 
                className="p-2 hover:bg-white/20 dark:hover:bg-white/5 rounded-full transition-all text-on-surface dark:text-slate-300" 
                onClick={() => setShowReviewModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-6 text-left">
              <div>
                <label className="block font-label-md text-on-surface-variant dark:text-slate-400 mb-2 font-bold">Select Doctor</label>
                <select 
                  className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none text-on-surface dark:text-slate-100"
                  value={formDoctor}
                  onChange={(e) => setFormDoctor(e.target.value)}
                >
                  <option className="dark:bg-[#1e293b]" value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (GP)</option>
                  <option className="dark:bg-[#1e293b]" value="Dr. Michael Chen">Dr. Michael Chen (Cardiologist)</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant dark:text-slate-400 mb-2 font-bold">Rating</label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const isLit = idx < formRating;
                    return (
                      <button 
                        key={idx}
                        className="material-symbols-outlined text-3xl text-amber-400 cursor-pointer transition-transform hover:scale-110 active:scale-95" 
                        style={{ fontVariationSettings: `'FILL' ${isLit ? '1' : '0'}` }}
                        type="button"
                        onClick={() => setFormRating(idx + 1)}
                      >
                        star
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant dark:text-slate-400 mb-2 font-bold">Your Experience</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/40" 
                  placeholder="How was your visit? Share what you liked or what we can improve..." 
                  rows={4}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  className="flex-1 py-3 border border-outline/20 dark:border-white/10 rounded-xl font-label-md text-on-surface-variant dark:text-slate-300 hover:bg-white/10 transition-all cursor-pointer font-bold" 
                  onClick={() => setShowReviewModal(false)} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-label-md hover:bg-primary-container transition-all shadow-lg shadow-primary/20 cursor-pointer font-bold" 
                  type="submit"
                >
                  {editingReview ? "Save Changes" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
