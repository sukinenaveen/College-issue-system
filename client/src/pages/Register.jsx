import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/register', form);
      toast.success('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Create a new account
        </h2>
        <p className="mt-2 text-white/50">Join the next generation of campus management</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/[0.03] backdrop-blur-xl py-8 px-4 shadow-2xl border border-white/10 sm:rounded-[2.5rem] sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">Full Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-2xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/5 text-white transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-2xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/5 text-white transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-2xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/5 text-white transition-all"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">Role</label>
              <div className="mt-1">
                <select
                  className="block w-full px-4 py-3 border border-white/10 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/5 text-white transition-all appearance-none cursor-pointer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="student" className="bg-black text-white">Student</option>
                  <option value="admin" className="bg-black text-white">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <Link to="/login" className="text-sm text-primary hover:text-primaryHover font-bold transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
