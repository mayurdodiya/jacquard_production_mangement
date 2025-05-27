
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  Package
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CompanyReports = () => {
  const productionData = [
    { month: 'Jan', production: 2400, orders: 2200 },
    { month: 'Feb', production: 1398, orders: 1800 },
    { month: 'Mar', production: 9800, orders: 8900 },
    { month: 'Apr', production: 3908, orders: 3500 },
    { month: 'May', production: 4800, orders: 4200 },
    { month: 'Jun', production: 3800, orders: 3600 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 120000 },
    { month: 'Feb', revenue: 98000 },
    { month: 'Mar', revenue: 156000 },
    { month: 'Apr', revenue: 134000 },
    { month: 'May', revenue: 145000 },
    { month: 'Jun', revenue: 167000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Reports</h1>
          <p className="text-gray-600">Analytics and insights for your business</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$167,000</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Output</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,800</div>
            <p className="text-xs text-blue-600">Units produced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee Efficiency</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-purple-600">+2% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Fulfillment</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-orange-600">On-time delivery</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production vs Orders</CardTitle>
            <CardDescription>Monthly production output compared to orders received</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="production" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Monthly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Quality Rate</div>
              <div className="text-xs text-green-600">+1.2% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2.1</div>
              <div className="text-sm text-gray-600">Avg. Defects per 1000</div>
              <div className="text-xs text-blue-600">-0.3 improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">91.8%</div>
              <div className="text-sm text-gray-600">Employee Attendance</div>
              <div className="text-xs text-purple-600">+0.5% improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyReports;
