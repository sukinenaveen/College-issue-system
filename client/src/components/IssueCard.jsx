import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Clock, MessageSquare, ChevronRight, X } from 'lucide-react';

export default function IssueCard({ issue, isAdmin, onStatusUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date = new Date(issue.createdAt || issue.created_at).toLocaleDateString();

  return (
    <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full text-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-purple-500 transition-colors">{issue.title}</h3>
        {isAdmin ? (
          <select 
            value={issue.status}
            onChange={(e) => onStatusUpdate(issue._id || issue.id, e.target.value)}
            className="text-sm border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl py-1.5 px-3 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/20 outline-none transition-all cursor-pointer font-medium text-white"
          >
            <option value="Pending" className="bg-black text-white">Pending</option>
            <option value="In Progress" className="bg-black text-white">In Progress</option>
            <option value="Completed" className="bg-black text-white">Completed</option>
          </select>
        ) : (
          <StatusBadge status={issue.status} />
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{issue.description}</p>
      
      <div className="flex items-center justify-between text-xs font-medium text-gray-400 mt-auto border-t border-white/10 pt-4">
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          <Clock size={14} className="text-gray-400" />
          <span>{date}</span>
        </div>
        
        {issue.resolution ? (
          <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-500/30 transition-colors border border-blue-500/20" onClick={() => setIsModalOpen(true)}>
            <MessageSquare size={14} />
            <span className="truncate max-w-[120px]">Resolved</span>
          </div>
        ) : (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-blue-400 font-bold hover:text-blue-300"
          >
            Details <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] backdrop-blur-2xl rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200 text-white">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white">Issue Details</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <p className="text-sm font-bold text-white/30 uppercase tracking-wider mb-2">Title</p>
                <h3 className="text-2xl font-extrabold text-white leading-tight">{issue.title}</h3>
              </div>
              <div>
                <p className="text-sm font-bold text-white/30 uppercase tracking-wider mb-2">Description</p>
                <p className="text-lg text-white/70 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5">{issue.description}</p>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-6">
                <div>
                  <p className="text-sm font-bold text-white/30 uppercase tracking-wider mb-2">Status</p>
                  <StatusBadge status={issue.status} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/30 uppercase tracking-wider mb-2">Date</p>
                  <p className="text-white/80 font-medium">{date}</p>
                </div>
              </div>
              {issue.resolution && (
                <div className="pt-4">
                  <p className="text-sm font-bold text-purple-500 uppercase tracking-wider mb-3 flex items-center gap-2"><MessageSquare size={16} /> Admin Resolution</p>
                  <p className="text-lg text-white/90 font-medium bg-purple-500/10 p-5 rounded-2xl border border-purple-500/20">{issue.resolution}</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
