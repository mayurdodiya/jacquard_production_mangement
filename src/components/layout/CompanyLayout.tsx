
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Home
} from 'lucide-react';

const CompanyLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/company' },
    { icon: Users, label: 'Employee Management', path: '/company/employees' },
    { icon: Package, label: 'Stock Management', path: '/company/stock' },
    { icon: ShoppingCart, label: 'Order Management', path: '/company/orders' },
    { icon: Calendar, label: 'Production Schedule', path: '/company/production' },
    { icon: BarChart3, label: 'Reports', path: '/company/reports' },
    { icon: Settings, label: 'Settings', path: '/company/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Company Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;
