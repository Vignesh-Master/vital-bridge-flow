import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Simple Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-lg">Loading...</span>
  </div>
);

// Lazy load components for better performance
const PublicHome = lazy(() => import('./pages/public/PublicHome.jsx'));
const PublicFAQs = lazy(() => import('./pages/public/FAQs.jsx'));
const NotFound = lazy(() => import('./pages/public/NotFound.tsx'));
const Index = lazy(() => import('./pages/Index.tsx'));

// Hospital Pages
const Login = lazy(() => import('./pages/hospital/Login.jsx'));
const HospitalForgotPassword = lazy(() => import('./pages/hospital/HospitalForgotPassword.jsx'));
const Dashboard = lazy(() => import('./pages/hospital/Dashboard.jsx'));
const RegisterDonor = lazy(() => import('./pages/hospital/RegisterDonor.jsx'));
const RegisterPatient = lazy(() => import('./pages/hospital/RegisterPatient.jsx'));
const DonorStatus = lazy(() => import('./pages/hospital/DonorStatus.jsx'));
const PatientStatus = lazy(() => import('./pages/hospital/PatientStatus.jsx'));
const MatchingDashboard = lazy(() => import('./pages/hospital/MatchingDashboard.jsx'));
const HospitalFAQs = lazy(() => import('./pages/hospital/FAQs.jsx'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const HospitalManagement = lazy(() => import('./pages/admin/HospitalManagement.jsx'));
const CreateHospital = lazy(() => import('./pages/admin/CreateHospital.jsx'));
const CreateOrganization = lazy(() => import('./pages/admin/CreateOrganization.jsx'));
const OrganizationManagement = lazy(() => import('./pages/admin/OrganizationManagement.jsx'));
const Statistics = lazy(() => import('./pages/admin/Statistics.jsx'));
const ViewLocations = lazy(() => import('./pages/admin/ViewLocations.jsx'));
const ResetPassword = lazy(() => import('./pages/admin/ResetPassword.jsx'));

// Organization Pages
const OrgLogin = lazy(() => import('./pages/org/OrgLogin.jsx'));
const OrgPolicies = lazy(() => import('./pages/org/OrgPolicies.jsx'));
const OrgForgotPassword = lazy(() => import('./pages/org/OrgForgotPassword.jsx'));
const ProposePolicy = lazy(() => import('./pages/org/ProposePolicy.jsx'));
const VotePolicy = lazy(() => import('./pages/org/VotePolicy.jsx'));

// Utility Pages
const Unauthorized = lazy(() => import('./pages/utility/Unauthorized.jsx'));
const SessionExpired = lazy(() => import('./pages/utility/SessionExpired.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center max-w-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Site */}
              <Route path="/" element={<PublicHome />} />
              <Route path="/faqs" element={<PublicFAQs />} />
              <Route path="/index" element={<Index />} />
              <Route path="*" element={<NotFound />} />

              {/* Hospital Module */}
              <Route path="/hospital/login" element={<Login />} />
              <Route path="/hospital/forgot-password" element={<HospitalForgotPassword />} />
              <Route path="/hospital/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/hospital/donor-register" element={
                <ProtectedRoute>
                  <RegisterDonor />
                </ProtectedRoute>
              } />
              <Route path="/hospital/patient-register" element={
                <ProtectedRoute>
                  <RegisterPatient />
                </ProtectedRoute>
              } />
              <Route path="/hospital/donor-status" element={
                <ProtectedRoute>
                  <DonorStatus />
                </ProtectedRoute>
              } />
              <Route path="/hospital/patient-status" element={
                <ProtectedRoute>
                  <PatientStatus />
                </ProtectedRoute>
              } />
              <Route path="/hospital/match-dashboard" element={
                <ProtectedRoute>
                  <MatchingDashboard />
                </ProtectedRoute>
              } />
              <Route path="/hospital/faq" element={<HospitalFAQs />} />

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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
