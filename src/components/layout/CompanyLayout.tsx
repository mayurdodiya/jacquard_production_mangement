
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation, matchPath } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Home,
  User,
  Users, 
  ShoppingCart,
  Package, 
  UserCheck,
  Factory,
  Settings,
  Calendar,
  Activity,
  LogOut,
  Menu,
  X,
  Package2,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  Zap,
  ChevronLeft
} from 'lucide-react';

const CompanyLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: ["/company"], exact: true },
    { icon: User, label: "Profile", path: ["/company/profile"] },
    { icon: Users, label: "Employees", path: ["/company/employees", "/company/employees/view-details", "/company/employees/:id"] },
    { icon: Package2, label: "Products", path: ["/company/products"] },
    { icon: ShoppingCart, label: "Purchase Orders", path: ["/company/purchase-orders"] },
    { icon: Package, label: "Stock", path: ["/company/stock"] },
    { icon: Zap, label: "Daily Consumption", path: ["/company/consumption"] },
    { icon: UserCheck, label: "Customers", path: ["/company/customers"] },
    { icon: Factory, label: "Production", path: ["/company/production"] },
    { icon: Settings, label: "Machines", path: ["/company/machines"] },
    { icon: Calendar, label: "Programmes", path: ["/company/programmes"] },
    { icon: Activity, label: "Activity History", path: ["/company/activity"] },
  ];

  const settingsItems = [
    { label: "Calendar Settings", path: "/company/settings/calendar" },
    { label: "Holiday Management", path: "/company/settings/holidays" },
  ];

  const isActive = (item) => {
    return item.path.some(path =>
      !!matchPath({ path, end: item.exact ?? false }, location.pathname)
    );
  };

  return (
    <div className="min-h-screen flex bg-background w-full relative transition-colors duration-300">
      {/* Background Image with theme-aware opacity */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03] dark:opacity-[0.02] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar with theme support */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-16'
      } fixed lg:relative z-50 h-screen bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black shadow-2xl flex flex-col transition-all duration-300 ease-in-out flex-shrink-0`}>
        
        {/* Header with theme toggle */}
        <div className={`${sidebarOpen ? 'p-6' : 'p-4'} border-b border-slate-700 dark:border-slate-600 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white flex-shrink-0`}>
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-bold">Company Panel</h1>
                  <ThemeToggle />
                </div>
                <p className="text-blue-100 text-sm">Business Management</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Factory className="w-5 h-5" />
                </div>
                <ThemeToggle />
              </div>
            )}
            
            {/* Desktop Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex text-white hover:bg-white/20 p-2 rounded-lg transition-colors ml-2"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation - Scrollable with enhanced dark mode */}
        <nav className="flex-1 py-6 px-4 space-y-2 bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black overflow-y-auto sidebar-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path[0]}
              className={`group flex items-center ${sidebarOpen ? 'px-4 py-3' : 'px-2 py-3 justify-center'} rounded-xl transition-all duration-300 ${
                isActive(item)
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20"
                  : "text-slate-300 dark:text-slate-400 hover:bg-slate-700/50 dark:hover:bg-slate-700/70 hover:text-white"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <div
                className={`p-2 rounded-lg ${sidebarOpen ? 'mr-3' : ''} transition-all duration-300 ${
                  isActive(item)
                    ? "bg-white/20 dark:bg-white/30"
                    : "bg-slate-700/50 dark:bg-slate-600/50 group-hover:bg-slate-600/50 dark:group-hover:bg-slate-500/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive(item) && (
                    <div className="ml-auto w-2 h-2 bg-white dark:bg-blue-200 rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </Link>
          ))}

          {/* Settings Dropdown - Enhanced dark mode */}
          {sidebarOpen && (
            <div className="space-y-1">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="group flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 text-slate-300 dark:text-slate-400 hover:bg-slate-700/50 dark:hover:bg-slate-700/70 hover:text-white"
              >
                <div className="p-2 rounded-lg mr-3 transition-all duration-300 bg-slate-700/50 dark:bg-slate-600/50 group-hover:bg-slate-600/50 dark:group-hover:bg-slate-500/50">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm flex-1 text-left">Settings</span>
                {settingsOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {settingsOpen && (
                <div className="ml-4 space-y-1">
                  {settingsItems.map((setting) => (
                    <Link
                      key={setting.label}
                      to={setting.path}
                      className="group flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-slate-400 dark:text-slate-500 hover:bg-slate-700/30 dark:hover:bg-slate-700/50 hover:text-white dark:hover:text-slate-200 text-sm"
                    >
                      <CalendarDays className="w-4 h-4 mr-3" />
                      {setting.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Footer with enhanced styling */}
        <div className={`${sidebarOpen ? 'p-4' : 'p-2'} border-t border-slate-700 dark:border-slate-600 bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black flex-shrink-0`}>
          <Button 
            onClick={handleLogout} 
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white border-0 shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 ${
              !sidebarOpen ? 'px-2' : ''
            }`}
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Main Content with enhanced dark mode */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Mobile Header with theme support */}
        <div className="lg:hidden bg-background/95 backdrop-blur-sm shadow-sm border-b border-border p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Company Panel</h1>
            <ThemeToggle />
          </div>
        </div>

        {/* Content Area - Enhanced theming */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm custom-scrollbar transition-colors duration-300">
          <div className="p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyLayout;
