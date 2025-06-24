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
  Plus,
  BarChart3,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

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

  const chartData = [
    { month: 'Jan', companies: 12, users: 450 },
    { month: 'Feb', companies: 15, users: 620 },
    { month: 'Mar', companies: 18, users: 780 },
    { month: 'Apr', companies: 20, users: 920 },
    { month: 'May', companies: 22, users: 1100 },
    { month: 'Jun', companies: 24, users: 1247 }
  ];

  const pieData = [
    { name: 'Active', value: 18, color: '#10B981' },
    { name: 'Pending', value: 4, color: '#F59E0B' },
    { name: 'Inactive', value: 2, color: '#EF4444' }
  ];

  const recentCompanies = [
    { name: "TechCorp Industries", status: "Active", employees: 156, joinDate: "2024-01-15" },
    { name: "Global Textiles Ltd", status: "Pending", employees: 89, joinDate: "2024-01-18" },
    { name: "Innovation Hub", status: "Active", employees: 234, joinDate: "2024-01-20" },
    { name: "Future Solutions", status: "Review", employees: 67, joinDate: "2024-01-22" },
    { name: "Digital Dynamics", status: "Active", employees: 145, joinDate: "2024-01-25" },
    { name: "Smart Systems Inc", status: "Pending", employees: 78, joinDate: "2024-01-28" }
  ];

  const systemAlerts = [
    { type: "info", message: "System backup completed successfully", time: "2 hours ago" },
    { type: "warning", message: "High CPU usage detected on Server 2", time: "4 hours ago" },
    { type: "success", message: "Database optimization completed", time: "6 hours ago" },
    { type: "error", message: "Failed login attempts from IP 192.168.1.100", time: "8 hours ago" },
    { type: "info", message: "New user registration from TechCorp", time: "1 day ago" },
    { type: "warning", message: "Storage capacity at 85%", time: "1 day ago" }
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
    <div className="space-y-6 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive system overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.borderColor} shadow-sm bg-white border`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className={`text-xs ${stat.color} font-medium mt-1`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Growth Trends
            </CardTitle>
            <CardDescription className="text-gray-600">Monthly companies and user growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="companies" fill="#3B82F6" name="Companies" />
                  <Bar dataKey="users" fill="#10B981" name="Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Company Status Distribution
            </CardTitle>
            <CardDescription className="text-gray-600">Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <Card className="shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Recent Companies</CardTitle>
              <CardDescription className="text-gray-600">Latest company registrations</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-1" />
              Add Company
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.employees} employees • {company.joinDate}</p>
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
        <Card className="shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">System Alerts</CardTitle>
              <CardDescription className="text-gray-600">Recent system notifications</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
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
      <Card className="shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">System administration tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 bg-blue-600 hover:bg-blue-700 text-white flex flex-col">
              <Building2 className="w-5 h-5 mb-1" />
              <span className="text-xs">Manage Companies</span>
            </Button>
            <Button className="h-16 bg-green-600 hover:bg-green-700 text-white flex flex-col">
              <Users className="w-5 h-5 mb-1" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button className="h-16 bg-purple-600 hover:bg-purple-700 text-white flex flex-col">
              <Activity className="w-5 h-5 mb-1" />
              <span className="text-xs">System Monitor</span>
            </Button>
            <Button className="h-16 bg-indigo-600 hover:bg-indigo-700 text-white flex flex-col">
              <TrendingUp className="w-5 h-5 mb-1" />
              <span className="text-xs">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Content for Scroll Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Server Uptime</span>
                <span className="text-sm font-medium">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium">120ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="text-sm font-medium">0.01%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm font-medium">2.4 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Files</span>
                <span className="text-sm font-medium">1.8 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Backups</span>
                <span className="text-sm font-medium">5.2 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">SSL Certificate</span>
                <span className="text-sm font-medium text-green-600">Valid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Firewall</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Scan</span>
                <span className="text-sm font-medium">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
