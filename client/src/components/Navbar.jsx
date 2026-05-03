import React from 'react';

export default function Navbar({ user }) {
  return (
    <header className="h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-10 text-white">
      <h2 className="text-lg font-semibold text-white/90">
        Welcome back, {user?.name.split(' ')[0]} 👋
      </h2>
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-white/50 capitalize">{user?.role}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-purple-500 font-bold border border-blue-500/30">
          {user?.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
