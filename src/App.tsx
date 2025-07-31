import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RegisterDonor from "./pages/RegisterDonor.jsx";
import RegisterPatient from "./pages/RegisterPatient.jsx";
import DonorStatus from "./pages/DonorStatus.jsx";
import PatientStatus from "./pages/PatientStatus.jsx";
import FAQs from "./pages/FAQs.jsx";
import MatchingDashboard from "./pages/MatchingDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import HospitalManagement from "./pages/admin/HospitalManagement.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/register-donor" element={<ProtectedRoute><RegisterDonor /></ProtectedRoute>} />
          <Route path="/register-patient" element={<ProtectedRoute><RegisterPatient /></ProtectedRoute>} />
          <Route path="/donor-status" element={<ProtectedRoute><DonorStatus /></ProtectedRoute>} />
          <Route path="/patient-status" element={<ProtectedRoute><PatientStatus /></ProtectedRoute>} />
          <Route path="/matching-dashboard" element={<ProtectedRoute><MatchingDashboard /></ProtectedRoute>} />
          <Route path="/faqs" element={<FAQs />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/hospitals" element={<HospitalManagement />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
