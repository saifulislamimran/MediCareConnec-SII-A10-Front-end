"use client";

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  avatarText: string;
  avatarUrl?: string;
  email: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  dateJoined: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Elena Wright', avatarText: 'EW', email: 'elena.w@clinical.com', status: 'Verified', dateJoined: 'Oct 24, 2023' },
  { id: '2', name: 'Marcus Chen', avatarText: 'MC', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3EZibs2aRSmpnCRRXjyBqmNhmpKLPU4H1M4ZbfVfQdRywlCg2zmAYgSGReYR59gGx-gngtwZTMPRJgGCPNMzw8Wghv1xi-vaYgJoKXMlBYnljH2_1eljpf8_MSiSyj0fmCJM2yVy69T9a1GJmCJNCS6-e-oa9Y9D8FZl2uHNIQxs2Rvq-zr-JlvS72vbOtu3-LZIQYdKZ1a64sH54A__gx6GprQnAlO0AA00Ggm1ZaG7rPWcDGvzWKgRTUwzhM0ZWxYWiYRTTIp8V', email: 'm.chen@healthmail.org', status: 'Pending', dateJoined: 'Nov 02, 2023' },
  { id: '3', name: 'Sarah Kepler', avatarText: 'SK', email: 'sarah.k@biotech.io', status: 'Rejected', dateJoined: 'Oct 29, 2023' },
  { id: '4', name: 'David Miller', avatarText: 'DM', email: 'd.miller@medicare.com', status: 'Verified', dateJoined: 'Dec 05, 2023' },
  { id: '5', name: 'Sophia Patel', avatarText: 'SP', email: 's.patel@health.org', status: 'Pending', dateJoined: 'Dec 12, 2023' },
  { id: '6', name: 'James Wilson', avatarText: 'JW', email: 'j.wilson@clinic.com', status: 'Verified', dateJoined: 'Nov 18, 2023' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'Pending' as const });

  // Filter users based on search & status select
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: 'Verified' | 'Pending' | 'Rejected') => {
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userToAdd: User = {
      id: Date.now().toString(),
      name: newUser.name,
      avatarText: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
      email: newUser.email,
      status: newUser.status,
      dateJoined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    setUsers([userToAdd, ...users]);
    setNewUser({ name: '', email: '', status: 'Pending' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-lg">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md border-b border-white/20 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tight">User Directory</h1>
          <p className="text-on-surface-variant dark:text-on-surface-variant/80 text-sm">Manage platform user credentials, access controls, and security profiles.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all duration-200 cursor-pointer text-xs"
        >
          <span className="material-symbols-outlined text-sm">person_add</span> Add New User
        </button>
      </div>

      {/* Stats and Search Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-low/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex gap-2 w-full md:w-auto">
          <span className="px-3 py-1.5 bg-primary/10 text-primary dark:text-inverse-primary rounded-full text-xs font-bold flex items-center gap-1.5 border border-primary/10">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> {users.length} Total Users
          </span>
          <span className="px-3 py-1.5 bg-secondary/10 text-secondary dark:text-secondary-container rounded-full text-xs font-bold flex items-center gap-1.5 border border-secondary/10">
            <span className="material-symbols-outlined text-[14px]">fiber_new</span> {users.filter(u => u.status === 'Pending').length} Pending
          </span>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-sm">search</span>
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white/50 dark:bg-slate-950/50 border border-outline-variant/20 rounded-full text-xs focus:ring-2 focus:ring-primary/20 w-full md:w-48 outline-none text-on-surface placeholder:text-on-surface-variant/50" 
              placeholder="Search users..." 
              type="text"
            />
          </div>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white/50 dark:bg-slate-950/50 text-on-surface-variant dark:text-on-primary-container px-3 py-1.5 rounded-full text-xs font-semibold border border-outline-variant/20 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* User Directory Table View */}
      <div className="glass-card rounded-2xl overflow-hidden border-white/20 dark:border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/80 dark:bg-slate-900/60 text-on-surface-variant/80 border-b border-outline-variant/10">
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">User Name</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Date Joined</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 bg-white/10 dark:bg-slate-950/10">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatarUrl ? (
                          <img className="w-8 h-8 rounded-full object-cover border border-outline-variant/30 animate-pulse-slow" src={user.avatarUrl} alt={user.name} />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary font-bold text-xs">
                            {user.avatarText}
                          </div>
                        )}
                        <span className="font-semibold text-sm text-on-surface dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        user.status === 'Verified' 
                          ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900/50' 
                          : user.status === 'Pending' 
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50' 
                          : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.status === 'Verified' ? 'bg-green-500' : user.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></span> 
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{user.dateJoined}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {user.status !== 'Verified' && (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'Verified')}
                            className="p-1 rounded-md hover:bg-green-500/20 text-green-600 dark:hover:bg-green-500/30 transition-all cursor-pointer animate-pulse-slow"
                            title="Verify User"
                          >
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                          </button>
                        )}
                        {user.status === 'Verified' && (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'Rejected')}
                            className="p-1 rounded-md hover:bg-red-500/20 text-red-600 dark:hover:bg-red-500/30 transition-all cursor-pointer"
                            title="Block / Reject User"
                          >
                            <span className="material-symbols-outlined text-[18px]">block</span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-1 rounded-md hover:bg-error/20 text-error transition-all cursor-pointer"
                          title="Delete User"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-on-surface-variant/60 font-semibold text-sm">
                    No users found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Details */}
        <div className="bg-surface-container-low/60 dark:bg-slate-900/60 px-6 py-4 flex items-center justify-between border-t border-outline-variant/10 text-xs">
          <span className="text-on-surface-variant/80">Showing 1-{filteredUsers.length} of {filteredUsers.length} entries</span>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 rounded border border-outline-variant/20 hover:bg-white/30 dark:hover:bg-slate-800 transition-colors cursor-pointer">Prev</button>
            <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-bold">1</button>
            <button className="px-2.5 py-1 rounded border border-outline-variant/20 hover:bg-white/30 dark:hover:bg-slate-800 transition-colors cursor-pointer">Next</button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-surface-container-lowest dark:bg-slate-900 border border-white/20 dark:border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-primary dark:text-inverse-primary">Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant/80 mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-container-low dark:bg-slate-950 border border-outline-variant/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
                  placeholder="Elena Wright"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant/80 mb-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-container-low dark:bg-slate-950 border border-outline-variant/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
                  placeholder="name@company.com"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant/80 mb-1">Status</label>
                <select 
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
                  className="w-full px-4 py-2.5 bg-surface-container-low dark:bg-slate-950 border border-outline-variant/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm cursor-pointer text-on-surface dark:text-white"
                >
                  <option value="Pending" className="text-on-surface dark:text-white">Pending</option>
                  <option value="Verified" className="text-on-surface dark:text-white">Verified</option>
                  <option value="Rejected" className="text-on-surface dark:text-white">Rejected</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-surface-container-low dark:bg-slate-800 text-on-surface-variant rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container shadow-md transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
