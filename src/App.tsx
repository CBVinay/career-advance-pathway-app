
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import AllProjects from '@/pages/AllProjects';
import AdminProjects from '@/pages/AdminProjects';
import ProjectDetail from '@/pages/ProjectDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
