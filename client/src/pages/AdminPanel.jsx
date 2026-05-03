import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { AlertCircle, CheckCircle2, Clock, Layers } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import IssueCard from '../components/IssueCard';

export default function AdminPanel() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchIssues = async () => {
    try {
      const res = await api.get('/issues');
      setIssues(res.data);
    } catch (err) {
      toast.error('Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const handleStatusUpdate = async (id, status) => {
    // Optimistic update
    setIssues(prev => prev.map(i => (i._id || i.id) === id ? { ...i, status } : i));
    try {
      await api.put(`/issues/${id}`, { status });
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
      fetchIssues(); // Revert on failure
    }
  };

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'Pending').length,
    progress: issues.filter(i => i.status === 'In Progress').length,
    completed: issues.filter(i => i.status === 'Completed').length,
  };

  const filtered = issues.filter(i => {
    const matchesFilter = filter === 'All' || i.status === filter;
    const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="h-10 bg-white/10 rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-white/10 rounded-3xl animate-pulse"></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-white/10 rounded-2xl animate-pulse"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 relative text-white">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div>
        <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Admin Command Center</h1>
        <p className="text-lg text-white/50">Manage, track, and resolve campus issues efficiently.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Reports" value={stats.total} icon={Layers} colorClass="bg-blue-500/20 text-blue-400 border border-blue-500/20" />
        <StatsCard title="Pending" value={stats.pending} icon={AlertCircle} colorClass="bg-yellow-500/20 text-yellow-500 border border-yellow-500/20" />
        <StatsCard title="In Progress" value={stats.progress} icon={Clock} colorClass="bg-blue-500/20 text-blue-400 border border-blue-400/20" />
        <StatsCard title="Resolved" value={stats.completed} icon={CheckCircle2} colorClass="bg-green-500/20 text-green-400 border border-green-400/20" />
      </div>

      <div className="bg-white/[0.03] backdrop-blur-xl p-5 rounded-3xl shadow-lg border border-white/10 flex flex-col sm:flex-row justify-between gap-4">
        <input 
          type="text" 
          placeholder="Search issues..." 
          className="px-5 py-3 border border-white/10 rounded-2xl w-full sm:w-96 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm bg-white/5 text-white placeholder-white/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="px-5 py-3 border border-white/10 rounded-2xl bg-white/5 outline-none focus:ring-4 focus:ring-purple-500/20 shadow-sm transition-all font-medium text-white/70 cursor-pointer appearance-none"
        >
          <option value="All" className="bg-black text-white">All Statuses</option>
          <option value="Pending" className="bg-black text-white">Pending</option>
          <option value="In Progress" className="bg-black text-white">In Progress</option>
          <option value="Completed" className="bg-black text-white">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((issue, index) => (
          <div key={issue._id || issue.id} className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both" style={{ animationDelay: `${index * 100}ms`, animationDuration: '600ms' }}>
            <IssueCard 
              issue={issue} 
              isAdmin={true} 
              onStatusUpdate={handleStatusUpdate} 
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/30 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10">
            No issues found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
