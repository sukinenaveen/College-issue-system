import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    'Pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-400/20',
    'Completed': 'bg-green-500/10 text-green-400 border-green-400/20',
  };

  const defaultStyle = 'bg-white/5 text-white/50 border-white/10';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
}
