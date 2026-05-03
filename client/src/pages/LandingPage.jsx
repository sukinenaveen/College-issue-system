import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-purple-500/30 selection:text-white relative">
      
      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-tight">CampusIMS</span>
          <span className="text-[10px] uppercase tracking-widest border border-white/20 rounded-full px-2 py-0.5 text-white/70">Beta</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2.5 rounded-full bg-white text-black font-medium hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:20px_20px]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tighter">
            Resolve campus issues <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              at the speed of thought
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-400 max-w-2xl font-light tracking-wide">
            Transform physical problems into digital resolutions instantly.
          </p>

          <div className="mt-16 w-full max-w-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(124,58,237,0.15)] flex flex-col items-start group hover:border-white/20 transition-all duration-500">
            <p className="text-white/50 text-xl mb-12 font-light">
              What issue shall we resolve today?
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/register" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm hover:bg-white/10 cursor-pointer transition-colors">
                Broken projector
              </Link>
              <Link to="/register" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm hover:bg-white/10 cursor-pointer transition-colors">
                WiFi down
              </Link>
            </div>

            <div className="w-full flex justify-end">
              <Link to="/register" className="bg-blue-500 text-white px-10 py-5 rounded-full font-semibold shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
                Report Now <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights (Dark Mode) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Instant Generation", desc: "Tickets are created and dispatched to administrators instantly." },
            { icon: ShieldCheck, title: "Secure & Trackable", desc: "Every issue maintains a transparent, immutable log of resolution." },
            { icon: BarChart3, title: "Real-time Metrics", desc: "Watch campus health improve through powerful analytics dashboards." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <feature.icon className="text-purple-400 mb-6" size={32} />
              <h4 className="text-xl font-medium mb-3">{feature.title}</h4>
              <p className="text-white/50 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10 text-center py-8 border-t border-white/5 text-white/30 text-sm">
        © 2026 CampusIMS. Built at the speed of thought.
      </footer>
    </div>
  );
}
