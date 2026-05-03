import React, { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ReportIssue() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return toast.error("All fields are required");
    
    setLoading(true);
    try {
      await api.post('/issues', form);
      toast.success('Issue reported successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to submit issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Report an Issue</h1>
        <p className="text-lg text-white/50">Help us keep the campus clean and functional by reporting maintenance issues.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-8 relative z-10">
        <div>
          <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">Issue Title</label>
          <input 
            type="text" 
            placeholder="e.g. Broken projector in Room 301"
            className="w-full px-5 py-4 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-sm bg-white/5 text-white placeholder-white/20 hover:bg-white/10"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">Detailed Description</label>
          <textarea 
            rows="5"
            placeholder="Describe the issue in detail..."
            className="w-full px-5 py-4 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-sm bg-white/5 text-white placeholder-white/20 hover:bg-white/10 resize-y"
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
