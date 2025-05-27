
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
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CompanyDashboard from "@/pages/company/CompanyDashboard";
import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import StockManagement from "@/pages/company/StockManagement";
import EmployeeManagement from "@/pages/company/EmployeeManagement";
import OrderManagement from "@/pages/company/OrderManagement";
import ProductionSchedule from "@/pages/company/ProductionSchedule";
import CompanyReports from "@/pages/company/CompanyReports";
import CompanySettings from "@/pages/company/CompanySettings";
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
            </Route>
            
            {/* Company Routes */}
            <Route path="/company" element={
              <ProtectedRoute allowedRoles={['company']}>
                <CompanyLayout />
              </ProtectedRoute>
            }>
              <Route index element={<CompanyDashboard />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="stock" element={<StockManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="production" element={<ProductionSchedule />} />
              <Route path="reports" element={<CompanyReports />} />
              <Route path="settings" element={<CompanySettings />} />
            </Route>
            
            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout />
              </ProtectedRoute>
            }>
              <Route index element={<EmployeeDashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
