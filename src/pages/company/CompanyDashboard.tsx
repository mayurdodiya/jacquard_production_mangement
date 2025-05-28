
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, Calendar, TrendingUp, Factory } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CompanyDashboard = () => {
  const stats = [
    {
      title: "Employees",
      value: "85",
      description: "Active employees",
      icon: Users,
      color: "text-blue-600",
      change: "+5 this month"
    },
    {
      title: "Stock Items",
      value: "342",
      description: "Items in inventory",
      icon: Package,
      color: "text-green-600",
      change: "+12 new items"
    },
    {
      title: "Active Orders",
      value: "28",
      description: "Orders in progress",
      icon: ShoppingCart,
      color: "text-purple-600",
      change: "+3 since yesterday"
    },
    {
      title: "Production Jobs",
      value: "12",
      description: "Jobs scheduled today",
      icon: Calendar,
      color: "text-orange-600",
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-gray-600">Overview of your business operations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Factory className="w-5 h-5 mr-2" />
              Machine Production Report
            </CardTitle>
            <CardDescription>Monthly production vs target by machine</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="production" stroke="#2563eb" strokeWidth={2} name="Actual Production" />
                <Line type="monotone" dataKey="target" stroke="#dc2626" strokeWidth={2} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Stock Consumption Report
            </CardTitle>
            <CardDescription>Monthly stock consumption vs procurement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumption" fill="#ef4444" name="Consumption" />
                <Bar dataKey="procurement" fill="#22c55e" name="Procurement" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
  );
};

export default CompanyDashboard;
