
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';

const EmployeeLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/employee' },
    { icon: User, label: 'Profile', path: '/employee/profile' },
    { icon: ShoppingCart, label: 'Orders', path: '/employee/orders' },
    { icon: Package, label: 'Stock', path: '/employee/stock' },
    { icon: Settings, label: 'Machines', path: '/employee/machines' },
    { icon: Calendar, label: 'Programmes', path: '/employee/programmes' },
    { icon: Factory, label: 'Production', path: '/employee/production' },
    { icon: Clock, label: 'Attendance', path: '/employee/attendance' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Employee Panel</h1>
        </div>
        <nav className="flex-1 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-700 transition-all duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button onClick={handleLogout} variant="outline" className="w-full hover:bg-red-50 hover:text-red-700 hover:border-red-300">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default EmployeeLayout;
