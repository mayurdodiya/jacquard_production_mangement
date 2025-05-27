
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, Calendar } from 'lucide-react';

const CompanyDashboard = () => {
  const stats = [
    {
      title: "Employees",
      value: "85",
      description: "Active employees",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Stock Items",
      value: "342",
      description: "Items in inventory",
      icon: Package,
      color: "text-green-600"
    },
    {
      title: "Orders",
      value: "28",
      description: "Pending orders",
      icon: ShoppingCart,
      color: "text-purple-600"
    },
    {
      title: "Production",
      value: "12",
      description: "Jobs scheduled today",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-gray-600">Manage your business operations</p>
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
                <p className="text-sm">Order #1234 completed</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm">Order #1235 in production</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">Order #1236 received</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
