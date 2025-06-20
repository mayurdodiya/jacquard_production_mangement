
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home,
  User,
  ShoppingCart,
  Package,
  Settings,
  Calendar,
  Factory,
  Clock,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const EmployeeLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/employee', gradient: 'from-indigo-500 to-purple-600' },
    { icon: User, label: 'Profile', path: '/employee/profile', gradient: 'from-pink-500 to-rose-600' },
    { icon: ShoppingCart, label: 'Orders', path: '/employee/orders', gradient: 'from-orange-500 to-amber-600' },
    { icon: Package, label: 'Stock', path: '/employee/stock', gradient: 'from-green-500 to-emerald-600' },
    { icon: Settings, label: 'Machines', path: '/employee/machines', gradient: 'from-gray-500 to-slate-600' },
    { icon: Calendar, label: 'Programmes', path: '/employee/programmes', gradient: 'from-violet-500 to-indigo-600' },
    { icon: Factory, label: 'Production', path: '/employee/production', gradient: 'from-blue-500 to-cyan-600' },
    { icon: Clock, label: 'Attendance', path: '/employee/attendance', gradient: 'from-teal-500 to-green-600' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative lg:translate-x-0 z-50 w-72 h-full bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col transition-all duration-300 ease-in-out`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 animate-pulse"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent animate-fade-in">
              Employee Panel
            </h1>
            <p className="text-indigo-100 text-sm mt-1 animate-fade-in delay-100">Workforce Dashboard</p>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 transform ${
                isActive(item.path)
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-indigo-500/25`
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-indigo-50 hover:text-indigo-700'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                isActive(item.path) 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-indigo-100'
              }`}>
                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive(item.path) ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'
                }`} />
              </div>
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-indigo-50">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Employee Panel
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeLayout;
