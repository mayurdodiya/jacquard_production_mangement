
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, Calendar, Factory, Activity } from 'lucide-react';
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
      gradient: "from-teal-500 to-teal-600",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      change: "+12 new items"
    },
    {
      title: "Active Orders",
      value: "28",
      description: "Orders in progress",
      icon: ShoppingCart,
      gradient: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      change: "+3 since yesterday"
    },
    {
      title: "Production Jobs",
      value: "12",
      description: "Jobs scheduled today",
      icon: Calendar,
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
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
      {/* Corporate Background Video */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-10"
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzE5NzZEMjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDg5N0I7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+"
        >
          <source src="https://videos.pexels.com/video-files/3253321/3253321-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
              <Factory className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Company Dashboard</h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg">Business operations overview and analytics</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 transform bg-white shadow-lg border-0"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 mb-2">{stat.description}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Factory className="w-5 h-5 text-white" />
                </div>
                Machine Production Report
              </CardTitle>
              <CardDescription className="text-slate-600">Monthly production vs target analysis</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="production" 
                    stroke="#1976D2" 
                    strokeWidth={3} 
                    name="Actual Production"
                    dot={{ fill: '#1976D2', strokeWidth: 2, r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#00897B" 
                    strokeWidth={3} 
                    name="Target"
                    dot={{ fill: '#00897B', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                Stock Consumption Report
              </CardTitle>
              <CardDescription className="text-slate-600">Monthly consumption vs procurement trends</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={stockData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="consumption" 
                    fill="#ef4444" 
                    name="Consumption" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="procurement" 
                    fill="#22c55e" 
                    name="Procurement" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg text-slate-800">Today's Attendance</CardTitle>
              <CardDescription className="text-slate-600">Employee check-in status</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Present</span>
                  <span className="text-green-700 text-sm font-bold">78 employees</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Absent</span>
                  <span className="text-red-700 text-sm font-bold">7 employees</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Attendance Rate</span>
                  <span className="text-blue-700 text-sm font-bold">91.8%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full" style={{ width: '91.8%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg text-slate-800">Recent Orders</CardTitle>
              <CardDescription className="text-slate-600">Latest order updates</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">Order #PO001 completed</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">Order #PO002 in production</p>
                    <p className="text-xs text-slate-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">Order #PO003 received</p>
                    <p className="text-xs text-slate-500">6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg text-slate-800">Machine Status</CardTitle>
              <CardDescription className="text-slate-600">Current machine operations</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Running</span>
                  <span className="text-green-700 text-sm font-bold">8 machines</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Maintenance</span>
                  <span className="text-amber-700 text-sm font-bold">2 machines</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Idle</span>
                  <span className="text-slate-700 text-sm font-bold">2 machines</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Efficiency</span>
                  <span className="text-blue-700 text-sm font-bold">94.2%</span>
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
