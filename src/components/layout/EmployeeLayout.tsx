
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
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Employee Panel</h1>
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

export default EmployeeLayout;
