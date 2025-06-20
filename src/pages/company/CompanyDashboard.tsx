import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, Calendar, TrendingUp, Factory, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CompanyDashboard = () => {
  const stats = [
    {
      title: "Employees",
      value: "85",
      description: "Active employees",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+5 this month"
    },
    {
      title: "Stock Items",
      value: "342",
      description: "Items in inventory",
      icon: Package,
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      change: "+12 new items"
    },
    {
      title: "Active Orders",
      value: "28",
      description: "Orders in progress",
      icon: ShoppingCart,
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "+3 since yesterday"
    },
    {
      title: "Production Jobs",
      value: "12",
      description: "Jobs scheduled today",
      icon: Calendar,
      gradient: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      change: "On schedule"
    }
  ];

  const productionData = [
    { month: 'Jan', production: 2400, target: 2200 },
    { month: 'Feb', production: 1398, target: 1800 },
    { month: 'Mar', production: 9800, target: 8900 },
    { month: 'Apr', production: 3908, target: 3500 },
    { month: 'May', production: 4800, target: 4200 },
    { month: 'Jun', production: 3800, target: 3600 },
  ];

  const stockData = [
    { month: 'Jan', consumption: 1200, procurement: 1500 },
    { month: 'Feb', consumption: 1100, procurement: 1300 },
    { month: 'Mar', consumption: 1400, procurement: 1600 },
    { month: 'Apr', consumption: 1300, procurement: 1400 },
    { month: 'May', consumption: 1500, procurement: 1700 },
    { month: 'Jun', consumption: 1350, procurement: 1550 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-20"
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwYjk4MTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwZDlmOGM7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+"
        >
          <source src="https://player.vimeo.com/external/267316716.sd.mp4?s=a79fd8b7f0c98a1f04dbf1c9b12fdab2e90d0c74&profile_id=164" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Factory className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Company Dashboard
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-lg">Business operations overview and analytics</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 transform bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 mb-2">{stat.description}</p>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Factory className="w-5 h-5 text-white" />
                </div>
                Machine Production Report
              </CardTitle>
              <CardDescription>Monthly production vs target analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="production" 
                    stroke="url(#productionGradient)" 
                    strokeWidth={3} 
                    name="Actual Production"
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="url(#targetGradient)" 
                    strokeWidth={3} 
                    name="Target"
                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                  />
                  <defs>
                    <linearGradient id="productionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                Stock Consumption Report
              </CardTitle>
              <CardDescription>Monthly consumption vs procurement trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="consumption" fill="url(#consumptionGradient)" name="Consumption" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="procurement" fill="url(#procurementGradient)" name="Procurement" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="consumptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="procurementGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>Employee check-in status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Present</span>
                  <span className="text-green-600 text-sm font-medium">78 employees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Absent</span>
                  <span className="text-red-600 text-sm font-medium">7 employees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Attendance Rate</span>
                  <span className="text-blue-600 text-sm font-medium">91.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '91.8%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest order updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order #PO001 completed</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order #PO002 in production</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order #PO003 received</p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Machine Status</CardTitle>
              <CardDescription>Current machine operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Running</span>
                  <span className="text-green-600 text-sm font-medium">8 machines</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maintenance</span>
                  <span className="text-yellow-600 text-sm font-medium">2 machines</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Idle</span>
                  <span className="text-gray-600 text-sm font-medium">2 machines</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Efficiency</span>
                  <span className="text-blue-600 text-sm font-medium">94.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
