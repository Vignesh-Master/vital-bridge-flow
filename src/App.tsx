import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public Pages
import PublicHome from './pages/public/PublicHome.jsx';
import PublicFAQs from './pages/public/FAQs.jsx';
import NotFound from './pages/public/NotFound.tsx';
import Index from './pages/Index.tsx';

// Hospital Pages
import Login from './pages/hospital/Login.jsx';
import HospitalForgotPassword from './pages/hospital/HospitalForgotPassword.jsx';
import Dashboard from './pages/hospital/Dashboard.jsx';
import RegisterDonor from './pages/hospital/RegisterDonor.jsx';
import RegisterPatient from './pages/hospital/RegisterPatient.jsx';
import DonorStatus from './pages/hospital/DonorStatus.jsx';
import PatientStatus from './pages/hospital/PatientStatus.jsx';
import MatchingDashboard from './pages/hospital/MatchingDashboard.jsx';
import HospitalFAQs from './pages/hospital/FAQs.jsx';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import HospitalManagement from './pages/admin/HospitalManagement.jsx';
import CreateHospital from './pages/admin/CreateHospital.jsx';
import CreateOrganization from './pages/admin/CreateOrganization.jsx';
import OrganizationManagement from './pages/admin/OrganizationManagement.jsx';
import Statistics from './pages/admin/Statistics.jsx';
import ViewLocations from './pages/admin/ViewLocations.jsx';
import ResetPassword from './pages/admin/ResetPassword.jsx';

// Organization Pages
import OrgLogin from './pages/org/OrgLogin.jsx';
import OrgPolicies from './pages/org/OrgPolicies.jsx';
import OrgForgotPassword from './pages/org/OrgForgotPassword.jsx';
import ProposePolicy from './pages/org/ProposePolicy.jsx';
import VotePolicy from './pages/org/VotePolicy.jsx';

// Utility Pages
import Unauthorized from './pages/utility/Unauthorized.jsx';
import SessionExpired from './pages/utility/SessionExpired.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Site */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/faqs" element={<PublicFAQs />} />
          <Route path="/index" element={<Index />} />
          <Route path="*" element={<NotFound />} />


          {/* Hospital Module */}
          <Route path="/hospital/login" element={<Login />} />
          <Route path="/hospital/forgot-password" element={<HospitalForgotPassword />} />
          <Route path="/hospital/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/hospital/donor-register" element={<ProtectedRoute><RegisterDonor /></ProtectedRoute>} />
          <Route path="/hospital/patient-register" element={<ProtectedRoute><RegisterPatient /></ProtectedRoute>} />
          <Route path="/hospital/donor-status" element={<ProtectedRoute><DonorStatus /></ProtectedRoute>} />
          <Route path="/hospital/patient-status" element={<ProtectedRoute><PatientStatus /></ProtectedRoute>} />
          <Route path="/hospital/match-dashboard" element={<ProtectedRoute><MatchingDashboard /></ProtectedRoute>} />
          <Route path="/hospital/faq" element={<HospitalFAQs />} />

          {/* Legacy Routes (for backward compatibility)
          Optionally, you can remove these if not needed
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/register-donor" element={<ProtectedRoute><RegisterDonor /></ProtectedRoute>} />
          <Route path="/register-patient" element={<ProtectedRoute><RegisterPatient /></ProtectedRoute>} />
          <Route path="/donor-status" element={<ProtectedRoute><DonorStatus /></ProtectedRoute>} />
          <Route path="/patient-status" element={<ProtectedRoute><PatientStatus /></ProtectedRoute>} />
          <Route path="/matching-dashboard" element={<ProtectedRoute><MatchingDashboard /></ProtectedRoute>} />
          <Route path="/faqs" element={<PublicFAQs />} /> */}

          {/* Admin Module */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-hospital" element={<CreateHospital />} />
          <Route path="/admin/create-organization" element={<CreateOrganization />} />
          <Route path="/admin/hospitals" element={<HospitalManagement />} />
          <Route path="/admin/organizations" element={<OrganizationManagement />} />
          <Route path="/admin/statistics" element={<Statistics />} />
          <Route path="/admin/locations" element={<ViewLocations />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />

          {/* Organization Module */}
          <Route path="/org/login" element={<OrgLogin />} />
          <Route path="/org/policies" element={<OrgPolicies />} />
          <Route path="/org/propose" element={<ProposePolicy />} />
          <Route path="/org/vote" element={<VotePolicy />} />
          <Route path="/org/history" element={<OrgPolicies />} />
          <Route path="/org/forgot-password" element={<OrgForgotPassword />} />

          {/* Utility Pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/session-expired" element={<SessionExpired />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
