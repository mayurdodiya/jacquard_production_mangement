
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LoginForm from "@/components/auth/LoginForm";
import AdminLayout from "@/components/layout/AdminLayout";
import CompanyLayout from "@/components/layout/CompanyLayout";
import EmployeeLayout from "@/components/layout/EmployeeLayout";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCompanies from "@/pages/admin/AdminCompanies";
import AdminProfile from "@/pages/admin/AdminProfile";

// Company Pages
import CompanyDashboard from "@/pages/company/CompanyDashboard";
import CompanyProfile from "@/pages/company/CompanyProfile";
import EmployeeManagement from "@/pages/company/EmployeeManagement";
import PurchaseOrders from "@/pages/company/PurchaseOrders";
import StockManagement from "@/pages/company/StockManagement";
import CustomerManagement from "@/pages/company/CustomerManagement";
import ProductionManagement from "@/pages/company/ProductionManagement";
import MachineManagement from "@/pages/company/MachineManagement";
import ProgrammeManagement from "@/pages/company/ProgrammeManagement";
import ActivityHistory from "@/pages/company/ActivityHistory";

// Employee Pages
import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import EmployeeProfile from "@/pages/employee/EmployeeProfile";
import EmployeeOrders from "@/pages/employee/EmployeeOrders";
import EmployeeStock from "@/pages/employee/EmployeeStock";
import EmployeeMachines from "@/pages/employee/EmployeeMachines";
import EmployeeProgrammes from "@/pages/employee/EmployeeProgrammes";
import EmployeeProduction from "@/pages/employee/EmployeeProduction";
import EmployeeAttendance from "@/pages/employee/EmployeeAttendance";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="companies" element={<AdminCompanies />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
            
            {/* Company Routes */}
            <Route path="/company" element={
              <ProtectedRoute allowedRoles={['company']}>
                <CompanyLayout />
              </ProtectedRoute>
            }>
              <Route index element={<CompanyDashboard />} />
              <Route path="profile" element={<CompanyProfile />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="purchase-orders" element={<PurchaseOrders />} />
              <Route path="stock" element={<StockManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="production" element={<ProductionManagement />} />
              <Route path="machines" element={<MachineManagement />} />
              <Route path="programmes" element={<ProgrammeManagement />} />
              <Route path="activity" element={<ActivityHistory />} />
            </Route>
            
            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout />
              </ProtectedRoute>
            }>
              <Route index element={<EmployeeDashboard />} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="orders" element={<EmployeeOrders />} />
              <Route path="stock" element={<EmployeeStock />} />
              <Route path="machines" element={<EmployeeMachines />} />
              <Route path="programmes" element={<EmployeeProgrammes />} />
              <Route path="production" element={<EmployeeProduction />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
