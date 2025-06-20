
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Companies",
      value: "24",
      change: "+3 this month",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+12% growth",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "Excellent",
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      title: "Monthly Revenue",
      value: "$45,280",
      change: "+8.2% growth",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const recentCompanies = [
    { name: "TechCorp Industries", status: "Active", employees: 156, joinDate: "2024-01-15" },
    { name: "Global Textiles Ltd", status: "Pending", employees: 89, joinDate: "2024-01-18" },
    { name: "Innovation Hub", status: "Active", employees: 234, joinDate: "2024-01-20" },
    { name: "Future Solutions", status: "Review", employees: 67, joinDate: "2024-01-22" }
  ];

  const systemAlerts = [
    { type: "info", message: "System backup completed successfully", time: "2 hours ago" },
    { type: "warning", message: "High CPU usage detected on Server 2", time: "4 hours ago" },
    { type: "success", message: "Database optimization completed", time: "6 hours ago" },
    { type: "error", message: "Failed login attempts from IP 192.168.1.100", time: "8 hours ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600">System overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`${stat.borderColor} shadow-lg bg-white/95 backdrop-blur-sm border-2`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <p className={`text-xs ${stat.color} font-medium`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Companies */}
          <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">Recent Companies</CardTitle>
                <CardDescription className="text-slate-600">Latest company registrations</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Company
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{company.name}</p>
                          <p className="text-sm text-slate-500">{company.employees} employees • {company.joinDate}</p>
                        </div>
                        <Badge className={getStatusColor(company.status)}>
                          {company.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">System Alerts</CardTitle>
                <CardDescription className="text-slate-600">Recent system notifications</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm text-slate-800">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm mt-6">
          <CardHeader>
            <CardTitle className="text-slate-800">Quick Actions</CardTitle>
            <CardDescription className="text-slate-600">System administration tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Building2 className="w-5 h-5 mb-1" />
                <span className="text-xs">Manage Companies</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">User Management</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Activity className="w-5 h-5 mb-1" />
                <span className="text-xs">System Monitor</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <TrendingUp className="w-5 h-5 mb-1" />
                <span className="text-xs">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
