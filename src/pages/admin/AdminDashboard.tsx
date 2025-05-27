
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, TrendingUp, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "Active users in system",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Companies",
      value: "45",
      description: "Registered companies",
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Growth",
      value: "+12%",
      description: "From last month",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Issues",
      value: "3",
      description: "Pending resolutions",
      icon: AlertCircle,
      color: "text-red-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">New company "Tech Corp" registered</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">User "john@company.com" updated profile</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm">System maintenance scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Status</span>
                <span className="text-green-600 text-sm font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <span className="text-green-600 text-sm font-medium">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Status</span>
                <span className="text-green-600 text-sm font-medium">Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
