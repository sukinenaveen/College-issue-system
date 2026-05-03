import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, LogOut } from 'lucide-react';

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const links = isAdmin ? [
    { to: '/admin', icon: LayoutDashboard, label: 'Admin Panel' }
  ] : [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/report', icon: PlusCircle, label: 'Report Issue' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col h-full text-white">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-xl font-bold text-white flex items-center gap-2">
          🎓 CampusIMS
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
