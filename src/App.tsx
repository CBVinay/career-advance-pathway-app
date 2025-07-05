import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import Index from '@/pages/Index';
import Account from '@/pages/Account';
import Auth from '@/pages/Auth';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import AdminJobs from '@/pages/AdminJobs';
import AdminMentors from '@/pages/AdminMentors';
import AllJobs from '@/pages/AllJobs';
import AllProjects from '@/pages/AllProjects';
import AllMentors from '@/pages/AllMentors';
import AdminProjects from '@/pages/AdminProjects';
import ProjectDetail from '@/pages/ProjectDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminAuthProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/mentors" element={<AdminMentors />} />
              <Route path="/jobs" element={<AllJobs />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/mentors" element={<AllMentors />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
