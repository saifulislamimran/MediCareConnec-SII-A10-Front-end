"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Doctor {
  _id: string;
  doctorName?: string;
  specialization?: string;
  qualifications?: string;
  consultationFee?: number;
  experience?: number;
  averageRating?: number;
  location?: string;
  userId?: {
    name?: string;
    photo?: string;
  };
  // fallbacks for UI
  nextSlot?: string;
  online?: boolean;
  hospital?: string;
  distance?: number;
}

export default function FindDoctorsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [feeFilter, setFeeFilter] = useState('All');
  const [expFilter, setExpFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Highest Rated');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // FETCH REAL DOCTORS (Server-Side Paginated)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        let url = `${process.env.NEXT_PUBLIC_API_URL || 'https://medi-care-connec-sii-a10-back-end.vercel.app'}/api/doctors?page=${currentPage}&limit=${itemsPerPage}`;
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success && result.data) {
          setDoctors(result.data);
          if (result.total) {
             setTotalPages(Math.ceil(result.total / itemsPerPage) || 1);
          }
        } else {
          toast.error("Failed to load doctors.");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("An error occurred while fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage, searchQuery]);

  const handleBookAppointment = async (doctorId: string, nextSlot: string = 'Soon') => {
    try {
      let token = '';
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') || '';
        if (!token) {
           const cookies = document.cookie.split(';');
           const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
           if (tokenCookie) token = tokenCookie.split('=')[1];
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://medi-care-connec-sii-a10-back-end.vercel.app'}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
        body: JSON.stringify({
          doctorId,
          appointmentDate: new Date().toISOString().split('T')[0],
          appointmentTime: nextSlot,
          symptoms: 'Standard Consultation'
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Appointment booked successfully!");
      } else {
        toast.error(data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("BOOKING ERROR:", error);
      toast.error("An error occurred while booking the appointment.");
    }
  };

  // Apply filters and sorting (Client-side for fee, exp, rating, sort since backend doesn't explicitly handle these mappings yet)
  useEffect(() => {
    let result = [...doctors];

    // Fee range filter
    if (feeFilter !== 'All' && feeFilter !== 'Consultation Fee') {
      if (feeFilter === '$0 - $50') {
        result = result.filter((doc) => (doc.consultationFee || 0) <= 50);
      } else if (feeFilter === '$50 - $100') {
        result = result.filter((doc) => (doc.consultationFee || 0) > 50 && (doc.consultationFee || 0) <= 100);
      } else if (feeFilter === '$100+') {
        result = result.filter((doc) => (doc.consultationFee || 0) > 100);
      }
    }

    // Experience filter
    if (expFilter !== 'All' && expFilter !== 'Experience') {
      if (expFilter === '1-5 Years') {
        result = result.filter((doc) => (doc.experience || 0) >= 1 && (doc.experience || 0) <= 5);
      } else if (expFilter === '5-10 Years') {
        result = result.filter((doc) => (doc.experience || 0) > 5 && (doc.experience || 0) <= 10);
      } else if (expFilter === '10+ Years') {
        result = result.filter((doc) => (doc.experience || 0) > 10);
      }
    }

    // Rating filter
    if (ratingFilter !== 'All' && ratingFilter !== 'Highest Rating') {
      if (ratingFilter === '4.5+ Stars') {
        result = result.filter((doc) => (doc.averageRating || 0) >= 4.5);
      } else if (ratingFilter === '4.0+ Stars') {
        result = result.filter((doc) => (doc.averageRating || 0) >= 4.0);
      }
    }

    // Sorting
    if (sortBy === 'Highest Rated') {
      result.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (sortBy === 'Most Experienced') {
      result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    } else if (sortBy === 'Nearest to Me') {
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (sortBy === 'Fee: Low to High') {
      result.sort((a, b) => (a.consultationFee || 0) - (b.consultationFee || 0));
    } else if (sortBy === 'Fee: High to Low') {
      result.sort((a, b) => (b.consultationFee || 0) - (a.consultationFee || 0));
    }

    setFilteredDoctors(result);
  }, [doctors, feeFilter, expFilter, ratingFilter, sortBy]);

  const currentDoctors = filteredDoctors;

  return (
    <main className="pt-32 pb-xl min-h-screen">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Hero Header */}
        <header className="mb-lg">
          <h1 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 mb-2">Find Your Specialist</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-2xl">Connect with world-class healthcare professionals tailored to your specific clinical needs. Precision care, just a click away.</p>
        </header>

        {/* Advanced Search Bar (Sticky Glass) */}
        <div className="sticky top-20 z-40 mb-md">
          <div className="glass-card rounded-2xl p-4 md:p-2 shadow-lg flex flex-col md:flex-row items-center gap-2 border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="w-full md:flex-1 relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">search</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest/50 dark:bg-slate-800/40 border-transparent focus:border-primary focus:ring-0 rounded-xl font-body-md transition-all text-on-surface dark:text-slate-100 placeholder-on-surface-variant/70 dark:placeholder-slate-400" 
                placeholder="Specialty, Doctor name, location..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
              <select 
                className="bg-white/50 dark:bg-slate-850 dark:bg-slate-900/90 border border-outline-variant/30 dark:border-white/10 rounded-lg px-md py-sm focus:ring-2 focus:ring-primary text-label-md min-w-[140px] text-on-surface dark:text-slate-100"
                value={feeFilter}
                onChange={(e) => setFeeFilter(e.target.value)}
              >
                <option value="All" className="dark:bg-slate-900">All Fees</option>
                <option value="$0 - $50" className="dark:bg-slate-900">$0 - $50</option>
                <option value="$50 - $100" className="dark:bg-slate-900">$50 - $100</option>
                <option value="$100+" className="dark:bg-slate-900">$100+</option>
              </select>
              <select 
                className="bg-white/50 dark:bg-slate-900/90 border border-outline-variant/30 dark:border-white/10 rounded-lg px-md py-sm focus:ring-2 focus:ring-primary text-label-md min-w-[140px] text-on-surface dark:text-slate-100"
                value={expFilter}
                onChange={(e) => setExpFilter(e.target.value)}
              >
                <option value="All" className="dark:bg-slate-900">All Experience</option>
                <option value="1-5 Years" className="dark:bg-slate-900">1-5 Years</option>
                <option value="5-10 Years" className="dark:bg-slate-900">5-10 Years</option>
                <option value="10+ Years" className="dark:bg-slate-900">10+ Years</option>
              </select>
              <select 
                className="bg-white/50 dark:bg-slate-900/90 border border-outline-variant/30 dark:border-white/10 rounded-lg px-md py-sm focus:ring-2 focus:ring-primary text-label-md min-w-[140px] text-on-surface dark:text-slate-100"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="All" className="dark:bg-slate-900">All Ratings</option>
                <option value="4.5+ Stars" className="dark:bg-slate-900">4.5+ Stars</option>
                <option value="4.0+ Stars" className="dark:bg-slate-900">4.0+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sorting & View Toggles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-md gap-4">
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant dark:text-slate-400 font-label-md">
              Showing <span className="font-bold text-on-surface dark:text-slate-100">{filteredDoctors.length}</span> available doctors
            </span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Option 4: Card to Table layout toggle */}
            <div className="flex items-center glass-card rounded-lg p-1 border-white/20 dark:border-white/10 bg-white/20 dark:bg-slate-900/40">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5'}`}
                id="viewGrid"
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded flex items-center justify-center transition-all ${viewMode === 'table' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5'}`}
                id="viewList"
              >
                <span className="material-symbols-outlined text-[20px]">list</span>
              </button>
            </div>
            
            <div className="relative w-full md:w-48">
              <select 
                className="w-full appearance-none bg-surface-container-low dark:bg-slate-900 border border-outline-variant/50 dark:border-white/10 rounded-lg px-4 py-2 font-label-md text-on-surface dark:text-slate-100 focus:border-primary focus:ring-0 cursor-pointer pr-10"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Highest Rated" className="dark:bg-slate-900">Highest Rated</option>
                <option value="Most Experienced" className="dark:bg-slate-900">Most Experienced</option>
                <option value="Nearest to Me" className="dark:bg-slate-900">Nearest to Me</option>
                <option value="Fee: Low to High" className="dark:bg-slate-900">Fee: Low to High</option>
                <option value="Fee: High to Low" className="dark:bg-slate-900">Fee: High to Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline dark:text-slate-400 text-sm">expand_more</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Doctor List Content */}
        {!loading && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300" id="doctorGrid">
            {currentDoctors.map((doc) => {
              const displayName = doc.doctorName || doc.userId?.name || 'Dr. Unknown';
              const displayImage = doc.userId?.photo || 'https://via.placeholder.com/150';
              const displaySpecialty = doc.specialization || 'General';
              
              return (
              <div key={doc._id} className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border-white/20 dark:border-white/10 flex flex-col justify-between bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl">
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                      style={{ backgroundImage: `url('${displayImage}')` }}
                    ></div>
                    <div className="absolute top-4 right-4 bg-primary/90 text-on-primary px-3 py-1 rounded-full text-label-sm backdrop-blur-md flex items-center gap-1 shadow-md font-bold">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {(doc.averageRating || 0).toFixed(1)}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-secondary-container/90 dark:bg-slate-800 text-on-secondary-container dark:text-slate-200 px-3 py-1 rounded-full text-label-sm backdrop-blur-md font-bold">{displaySpecialty}</span>
                    </div>
                  </div>
                  
                  <div className="p-md space-y-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100">{displayName}</h3>
                        <p className="text-label-md text-on-surface-variant dark:text-slate-400">{doc.hospital || 'Medical Center'}</p>
                      </div>
                      <div 
                        className={`w-3 h-3 rounded-full ${doc.online !== false ? 'bg-primary status-glow' : 'bg-outline'}`} 
                        title={doc.online !== false ? "Online now" : "Offline"}
                      ></div>
                    </div>
                    
                    <div className="space-y-2 mb-md">
                      <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">work</span>
                        <span className="text-label-md">{doc.experience || 0} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        <span className="text-label-md">{doc.location || 'Local'} ({doc.distance || 0} miles)</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">payments</span>
                        <span className="text-label-md">${doc.consultationFee || 0} / Consultation</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-md pt-0">
                  <div className="flex items-center justify-between gap-4 border-t border-outline-variant/30 dark:border-white/10 pt-4">
                    <div className="flex flex-col">
                      <span className="text-label-sm text-outline dark:text-slate-450 uppercase tracking-wider">Next Slot</span>
                      <span className="text-label-md font-bold text-primary dark:text-inverse-primary">{doc.nextSlot || 'Tomorrow, 10:00 AM'}</span>
                    </div>
                    <button onClick={() => handleBookAppointment(doc._id, doc.nextSlot || 'Tomorrow, 10:00 AM')} className="bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant px-5 py-2 rounded-xl font-label-md hover:bg-primary-container dark:hover:bg-primary-fixed transition-all active:scale-95 shadow">Book Now</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {!loading && viewMode === 'table' && (
          <div className="glass-card rounded-xl overflow-hidden border-white/20 dark:border-white/10 shadow-xl transition-all duration-300 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 dark:bg-slate-900/60">
                    <th className="p-md font-label-md text-on-surface-variant dark:text-slate-200 border-b border-outline-variant/30 dark:border-white/10">Doctor</th>
                    <th className="p-md font-label-md text-on-surface-variant dark:text-slate-200 border-b border-outline-variant/30 dark:border-white/10">Specialization</th>
                    <th className="p-md font-label-md text-on-surface-variant dark:text-slate-200 border-b border-outline-variant/30 dark:border-white/10">Qualifications</th>
                    <th className="p-md font-label-md text-on-surface-variant dark:text-slate-200 border-b border-outline-variant/30 dark:border-white/10 text-center">Rating</th>
                    <th className="p-md font-label-md text-on-surface-variant dark:text-slate-200 border-b border-outline-variant/30 dark:border-white/10 text-center">Fee</th>
                    <th className="p-md font-label-md text-on-surface-variant dark:text-slate-200 border-b border-outline-variant/30 dark:border-white/10">Availability</th>
                    <th className="p-md border-b border-outline-variant/30 dark:border-white/10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 dark:divide-white/5">
                  {currentDoctors.map((doc) => {
                    const displayName = doc.doctorName || doc.userId?.name || 'Dr. Unknown';
                    const displayImage = doc.userId?.photo || 'https://via.placeholder.com/150';
                    const displaySpecialty = doc.specialization || 'General';

                    return (
                    <tr key={doc._id} className="hover:bg-white/30 dark:hover:bg-white/5 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 shrink-0">
                            <img className="w-full h-full object-cover" alt={displayName} src={displayImage} />
                          </div>
                          <div>
                            <p className="font-label-md text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-inverse-primary transition-colors">{displayName}</p>
                            <p className="text-[12px] text-on-surface-variant dark:text-slate-400">{doc.experience || 0} Years Exp | {doc.location || 'Local'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-md font-label-md text-primary dark:text-inverse-primary">{displaySpecialty}</td>
                      <td className="p-md text-label-sm text-on-surface-variant dark:text-slate-400">{doc.qualifications || 'N/A'}</td>
                      <td className="p-md text-center">
                        <div className="inline-flex items-center gap-xs bg-yellow-50 dark:bg-yellow-950/20 px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-900/40">
                          <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="text-label-sm text-on-surface dark:text-slate-200 font-bold">{(doc.averageRating || 0).toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="p-md text-center font-label-md text-on-surface dark:text-slate-100">${doc.consultationFee || 0}</td>
                      <td className="p-md">
                        <span className="text-label-sm font-medium text-secondary dark:text-inverse-primary">{doc.nextSlot || 'Tomorrow, 10:00 AM'}</span>
                      </td>
                      <td className="p-md text-right">
                        <button onClick={() => handleBookAppointment(doc._id, doc.nextSlot || 'Tomorrow, 10:00 AM')} className="bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant px-4 py-1.5 rounded-lg text-label-sm hover:bg-primary-container dark:hover:bg-primary-fixed transition-all active:scale-95 shadow">Book</button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Apple-Style Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-xl flex justify-center items-center gap-xs">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high dark:hover:bg-white/5 transition-colors text-on-surface-variant dark:text-slate-450 disabled:opacity-30"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-md transition-all ${currentPage === page ? 'bg-primary dark:bg-inverse-primary text-on-primary dark:text-on-primary-fixed-variant shadow' : 'hover:bg-surface-container-high dark:hover:bg-white/5 text-on-surface-variant dark:text-slate-400'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high dark:hover:bg-white/5 transition-colors text-on-surface-variant dark:text-slate-450 disabled:opacity-30"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
