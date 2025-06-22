import React, { useState } from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
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
  Zap,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  LucideProps,
} from "lucide-react";

const CompanyLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
   const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: ["/company"], exact: true },
    { icon: User, label: "Profile", path: ["/company/profile"] },
    {
      icon: Users,
      label: "Employees",
      path: [
        "/company/employees",
        "/company/employees/view-details",
        "/company/employees/:id",
      ],
    },
    { icon: Package2, label: "Products", path: ["/company/products"] },
    {
      icon: ShoppingCart,
      label: "Purchase Orders",
      path: ["/company/purchase-orders"],
    },
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

  const isActive = (item: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; label: string; path: string[]; exact: boolean; } | { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; label: string; path: string[]; exact?: undefined; }) => {
    return item.path.some(
      (path) =>
        !!matchPath({ path, end: item.exact ?? false }, location.pathname)
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 w-full relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 z-50 w-72 h-screen bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Company Panel</h1>
              <p className="text-blue-100 text-sm mt-1">Business Management</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 py-6 px-4 space-y-2 bg-gradient-to-b from-slate-800 to-slate-900 overflow-y-auto sidebar-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path[0]}
              className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive(item)
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <div
                className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                  isActive(item)
                    ? "bg-white/20"
                    : "bg-slate-700/50 group-hover:bg-slate-600/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">{item.label}</span>
              {isActive(item) && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </Link>
          ))}

           {/* Settings Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="group flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <div className="p-2 rounded-lg mr-3 transition-all duration-300 bg-slate-700/50 group-hover:bg-slate-600/50">
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
                    className="group flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-slate-400 hover:bg-slate-700/30 hover:text-white text-sm"
                  >
                    <CalendarDays className="w-4 h-4 mr-3" />
                    {setting.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 flex-shrink-0">
          <Button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 shadow-lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen lg:ml-0 relative z-10">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-sm border-b p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">
              Company Panel
            </h1>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm custom-scrollbar">
          <div className="p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyLayout;
