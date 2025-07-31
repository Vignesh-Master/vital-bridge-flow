import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import RegisterDonor from "./pages/RegisterDonor";
import RegisterPatient from "./pages/RegisterPatient";
import DonorStatus from "./pages/DonorStatus";
import PatientStatus from "./pages/PatientStatus";
import FAQs from "./pages/FAQs";
import MatchingDashboard from "./pages/MatchingDashboard";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register-donor" element={<RegisterDonor />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/donor-status" element={<DonorStatus />} />
          <Route path="/patient-status" element={<PatientStatus />} />
          <Route path="/matching-dashboard" element={<MatchingDashboard />} />
          <Route path="/faqs" element={<FAQs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
