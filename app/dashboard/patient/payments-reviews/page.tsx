"use client";

import { useState } from 'react';

interface Transaction {
  id: string;
  invoice: string;
  title: string;
  dept: string;
  amount: number;
  status: 'Completed' | 'Action Required';
}

interface Review {
  id: string;
  rating: number;
  date: string;
  title: string;
  desc: string;
}

export default function PatientPaymentsReviewsPage() {
  // Transactions State
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', invoice: 'INV-98234', title: 'Consultation: Dr. Emily Carter', dept: 'Cardiology Department', amount: 145.00, status: 'Completed' },
    { id: '2', invoice: 'INV-98211', title: 'Pharmacy: Atorvastatin Refill', dept: 'MediFlow Pharmacy', amount: 42.50, status: 'Completed' },
    { id: '3', invoice: 'INV-98105', title: 'Lab Services: Blood Work Panel', dept: 'Diagnostics North', amount: 210.00, status: 'Action Required' },
  ]);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', rating: 5, date: 'Oct 12, 2026', title: 'Excellent Care - Cardiology', desc: 'Dr. Carter was incredibly thorough during my checkup. The staff made me feel at ease throughout the entire process.' },
    { id: '2', rating: 4, date: 'Sep 28, 2026', title: 'Telehealth Experience', desc: 'Connection was stable and the interface was very easy to use. I saved so much time compared to driving to the clinic.' },
  ]);

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ title: '', desc: '', rating: 5 });

  const handlePayTransaction = (id: string, amount: number) => {
    if (confirm(`Do you want to pay $${amount.toFixed(2)} for this invoice?`)) {
      setTransactions(transactions.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
      alert("Payment processed successfully.");
    }
  };

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleUpdateReview = (id: string) => {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    const newTitle = prompt("Update Title:", review.title);
    const newDesc = prompt("Update Review Content:", review.desc);
    if (newTitle && newDesc) {
      setReviews(reviews.map(r => r.id === id ? { ...r, title: newTitle, desc: newDesc } : r));
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.title || !newReview.desc) return;

    const reviewToAdd: Review = {
      id: Date.now().toString(),
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      title: newReview.title,
      desc: newReview.desc
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ title: '', desc: '', rating: 5 });
    setShowAddReviewModal(false);
  };

  return (
    <div className="space-y-lg">
      {/* Payment History Section */}
      <section className="space-y-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 dark:border-white/10 pb-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tight">Payment History</h1>
            <p className="text-on-surface-variant dark:text-slate-400 text-sm font-semibold">Manage your clinical transactions, outstanding invoices, and copays.</p>
          </div>
          <button 
            onClick={() => alert("Simulating transaction history statement download...")}
            className="flex items-center gap-1.5 px-4 py-2 bg-surface-container-low/60 dark:bg-slate-900 border border-outline-variant/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-800 text-on-surface dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span> Export Statements
          </button>
        </div>

        {/* Transaction Cards List */}
        <div className="space-y-2">
          {transactions.map((t) => (
            <div 
              key={t.id}
              onClick={() => t.status === 'Action Required' && handlePayTransaction(t.id, t.amount)}
              className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 glass-card rounded-2xl transition-all border border-white/20 dark:border-white/10 shadow-sm ${
                t.status === 'Action Required' 
                  ? 'border-l-4 border-l-error cursor-pointer hover:border-l-error bg-error/5' 
                  : 'hover:bg-primary/5 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-md">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                  t.status === 'Action Required' ? 'bg-error/10 text-error' : 'bg-primary-container/20 text-primary dark:text-inverse-primary'
                }`}>
                  <span className="material-symbols-outlined text-lg">
                    {t.dept.includes('Pharmacy') ? 'medication' : t.dept.includes('Diagnostics') ? 'science' : 'receipt_long'}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface dark:text-white">{t.title}</h4>
                  <p className="text-xs text-on-surface-variant/70 dark:text-slate-400 mt-0.5">{t.invoice} • {t.dept}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end border-t border-outline-variant/10 sm:border-0 pt-2 sm:pt-0">
                <div className="text-right">
                  <p className="font-bold text-sm text-on-surface dark:text-white">${t.amount.toFixed(2)}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    t.status === 'Action Required' 
                      ? 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50' 
                      : 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900/50'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-on-surface-variant/60 dark:text-slate-400">
                  <span className="material-symbols-outlined">
                    {t.status === 'Action Required' ? 'payment' : 'chevron_right'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="space-y-md pt-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white tracking-tight">My Reviews</h3>
            <p className="text-on-surface-variant dark:text-slate-400 text-sm font-semibold">Your experiences help us improve our care delivery.</p>
          </div>
          <button 
            onClick={() => setShowAddReviewModal(true)}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-full text-xs font-bold flex items-center gap-1 hover:bg-primary-container shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> Write Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {reviews.map((rev) => (
            <div key={rev.id} className="glass-card p-5 rounded-3xl flex flex-col h-full border border-outline-variant/15 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] bg-white/10 dark:bg-slate-950/10">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center text-secondary animate-pulse-slow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className="material-symbols-outlined text-sm font-extrabold"
                      style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-on-surface-variant/60 dark:text-slate-400 font-bold">{rev.date}</span>
              </div>
              <h4 className="font-bold text-sm text-on-surface dark:text-white mb-1.5">{rev.title}</h4>
              <p className="text-xs text-on-surface-variant dark:text-slate-300 flex-grow leading-relaxed">
                {rev.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-outline-variant/10 flex gap-4">
                <button 
                  onClick={() => handleUpdateReview(rev.id)}
                  className="text-primary dark:text-inverse-primary text-xs font-bold hover:underline cursor-pointer"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDeleteReview(rev.id)}
                  className="text-error text-xs font-bold hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add New Visual Card */}
          <div 
            onClick={() => setShowAddReviewModal(true)}
            className="border-2 border-dashed border-outline-variant/30 rounded-3xl flex flex-col items-center justify-center h-full min-h-[175px] p-5 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="w-11 h-11 rounded-full bg-surface-container-low dark:bg-slate-900 flex items-center justify-center mb-3 group-hover:scale-115 transition-transform duration-200">
              <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
            </div>
            <p className="text-xs text-on-surface-variant/80 dark:text-slate-300 font-bold text-center">Write another feedback?</p>
            <p className="text-[10px] text-primary font-extrabold mt-1">Review medical services</p>
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddReviewModal(false)}></div>
          <div className="relative bg-surface-container-lowest dark:bg-slate-900 border border-white/20 dark:border-white/10 w-full max-w-[448px] rounded-3xl p-6 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-primary dark:text-inverse-primary">Write Service Review</h3>
              <button onClick={() => setShowAddReviewModal(false)} className="text-on-surface-variant hover:text-primary dark:text-slate-400 dark:hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant/80 dark:text-slate-300 mb-1">Star Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="text-secondary p-1 hover:scale-110 transition-transform"
                    >
                      <span 
                        className="material-symbols-outlined text-2xl font-extrabold"
                        style={{ fontVariationSettings: star <= newReview.rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant/80 dark:text-slate-300 mb-1">Review Title</label>
                <input 
                  required
                  type="text" 
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-container-low dark:bg-slate-950 border border-outline-variant/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface dark:text-slate-100"
                  placeholder="e.g. Excellent care in Orthopedics"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant/80 dark:text-slate-300 mb-1">Feedback Description</label>
                <textarea 
                  required
                  value={newReview.desc}
                  onChange={(e) => setNewReview({...newReview, desc: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-surface-container-low dark:bg-slate-950 border border-outline-variant/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface dark:text-slate-100 resize-none"
                  placeholder="Write your review message..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 bg-surface-container-low dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container shadow-md transition-colors"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
