import React from 'react';

export default function StatsCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="group bg-white/[0.03] backdrop-blur-md p-6 rounded-3xl shadow-lg shadow-purple-500/5 border border-white/10 flex items-center gap-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 cursor-default text-white">
      <div className={`p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${colorClass}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-white group-hover:text-purple-400 transition-colors">{value}</h3>
      </div>
    </div>
  );
}
