
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import LandingPage from "@/components/LandingPage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import AllJobs from "./pages/AllJobs";
import AllProjects from "./pages/AllProjects";
import AllMentors from "./pages/AllMentors";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMentors from "./pages/AdminMentors";
import AdminProjects from "./pages/AdminProjects";
import AdminJobs from "./pages/AdminJobs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AdminAuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={<AllJobs />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/mentors" element={<AllMentors />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/mentors" element={
                <AdminProtectedRoute>
                  <AdminMentors />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/projects" element={
                <AdminProtectedRoute>
                  <AdminProjects />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/jobs" element={
                <AdminProtectedRoute>
                  <AdminJobs />
                </AdminProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
