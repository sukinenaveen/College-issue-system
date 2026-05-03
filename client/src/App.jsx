import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import AdminPanel from './pages/AdminPanel';
import ReportIssue from './pages/ReportIssue';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route element={<MainLayout requiredRole="admin" />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* Student Routes */}
        <Route element={<MainLayout requiredRole="student" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportIssue />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
