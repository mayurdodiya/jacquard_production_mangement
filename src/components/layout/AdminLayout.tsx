
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home,
  Building2,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin', gradient: 'from-blue-500 to-blue-600' },
    { icon: Building2, label: 'Companies', path: '/admin/companies', gradient: 'from-teal-500 to-teal-600' },
    { icon: User, label: 'Profile', path: '/admin/profile', gradient: 'from-indigo-500 to-indigo-600' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50 w-full">
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
      } fixed lg:relative lg:translate-x-0 z-50 w-72 h-screen bg-slate-800 shadow-2xl flex flex-col transition-all duration-300 ease-in-out overflow-y-auto`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-blue-100 text-sm mt-1">System Management</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 bg-slate-800">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                isActive(item.path) 
                  ? 'bg-white/20' 
                  : 'bg-slate-700 group-hover:bg-slate-600'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">Admin Panel</h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
