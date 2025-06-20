
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, TrendingUp, AlertCircle, Activity, Zap } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "Active users in system",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+12% from last month"
    },
    {
      title: "Companies",
      value: "45",
      description: "Registered companies",
      icon: Building2,
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      change: "+3 new companies"
    },
    {
      title: "Growth Rate",
      value: "+12%",
      description: "From last month",
      icon: TrendingUp,
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "Trending upward"
    },
    {
      title: "Active Issues",
      value: "3",
      description: "Pending resolutions",
      icon: AlertCircle,
      gradient: "from-red-500 to-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      change: "2 resolved today"
    }
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
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzODVmZjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+"
        >
          <source src="https://player.vimeo.com/external/195919230.sd.mp4?s=e059bd9a1c96da5892ca7db4c1a4dcc7df4e13bd&profile_id=164" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-lg">System overview and management center</p>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { color: 'bg-green-500', text: 'New company "Tech Corp" registered', time: '2 minutes ago' },
                  { color: 'bg-blue-500', text: 'User "john@company.com" updated profile', time: '15 minutes ago' },
                  { color: 'bg-yellow-500', text: 'System maintenance completed', time: '1 hour ago' },
                  { color: 'bg-purple-500', text: 'Database backup successful', time: '3 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <div className={`w-3 h-3 ${activity.color} rounded-full mt-2 animate-pulse`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                System Health
              </CardTitle>
              <CardDescription>Current system status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { label: 'Server Status', status: 'Online', color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'Database Connection', status: 'Connected', color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'API Response Time', status: '120ms', color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: 'System Load', status: '34%', color: 'text-yellow-600', bg: 'bg-yellow-100' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className={`px-3 py-1 ${item.bg} ${item.color} text-sm font-medium rounded-full`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
