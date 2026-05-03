import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import IssueCard from '../components/IssueCard';

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await api.get(`/issues/student/${user.id || user._id}`);
        setIssues(res.data);
      } catch (err) {
        toast.error('Failed to load issues');
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-white">
          My Reports
        </h2>
        <p className="text-gray-400">
          Track the status of your submitted issues in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {issues.map(issue => (
          <IssueCard 
            key={issue._id || issue.id} 
            issue={issue} 
            isAdmin={false} 
          />
        ))}
        {issues.length === 0 && (
          <div className="col-span-full py-16 text-center text-white/30 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/10">
            You haven't reported any issues yet.
          </div>
        )}
      </div>
    </div>
  );
}
