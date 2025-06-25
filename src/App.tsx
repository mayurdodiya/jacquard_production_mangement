
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import CompanyLayout from './components/layout/CompanyLayout';
import EmployeeLayout from './components/layout/EmployeeLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminCompanies from './pages/admin/AdminCompanies';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyProfile from './pages/company/CompanyProfile';
import EmployeeManagement from './pages/company/EmployeeManagement';
import EmployeeDetails from './pages/company/EmployeeDetails';
import Products from './pages/company/Products';
import PurchaseOrders from './pages/company/PurchaseOrders';
import StockManagement from './pages/company/StockManagement';
import DailyConsumption from './pages/company/DailyConsumption';
import CustomerManagement from './pages/company/CustomerManagement';
import ProductionManagement from './pages/company/ProductionManagement';
import MachineManagement from './pages/company/MachineManagement';
import ProgrammeManagement from './pages/company/ProgrammeManagement';
import ActivityHistory from './pages/company/ActivityHistory';
import CompanySettings from './pages/company/CompanySettings';

// Employee Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeeMachines from './pages/employee/EmployeeMachines';
import EmployeeOrders from './pages/employee/EmployeeOrders';
import EmployeeProduction from './pages/employee/EmployeeProduction';
import EmployeeProgrammes from './pages/employee/EmployeeProgrammes';
import EmployeeStock from './pages/employee/EmployeeStock';

import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="companies" element={<AdminCompanies />} />
            </Route>

            {/* Company Routes */}
            <Route path="/company" element={
              <ProtectedRoute requiredRole="company">
                <CompanyLayout />
              </ProtectedRoute>
            }>
              <Route index element={<CompanyDashboard />} />
              <Route path="profile" element={<CompanyProfile />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="employees/:id" element={<EmployeeDetails />} />
              <Route path="products" element={<Products />} />
              <Route path="purchase-orders" element={<PurchaseOrders />} />
              <Route path="stock" element={<StockManagement />} />
              <Route path="consumption" element={<DailyConsumption />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="production" element={<ProductionManagement />} />
              <Route path="machines" element={<MachineManagement />} />
              <Route path="programmes" element={<ProgrammeManagement />} />
              <Route path="activity" element={<ActivityHistory />} />
              <Route path="settings" element={<CompanySettings />} />
              <Route path="settings/calendar" element={<CompanySettings />} />
              <Route path="settings/holidays" element={<CompanySettings />} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeLayout />
              </ProtectedRoute>
            }>
              <Route index element={<EmployeeDashboard />} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
              <Route path="machines" element={<EmployeeMachines />} />
              <Route path="orders" element={<EmployeeOrders />} />
              <Route path="production" element={<EmployeeProduction />} />
              <Route path="programmes" element={<EmployeeProgrammes />} />
              <Route path="stock" element={<EmployeeStock />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
