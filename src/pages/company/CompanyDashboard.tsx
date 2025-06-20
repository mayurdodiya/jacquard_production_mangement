
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Factory,
  ShoppingCart
} from 'lucide-react';

const CompanyDashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Active Orders",
      value: "145",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Employees",
      value: "48",
      change: "+2.1%",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      title: "Production Units",
      value: "2,340",
      change: "+15.3%",
      icon: Factory,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "ABC Textiles", amount: "$5,200", status: "Processing", date: "2024-01-20" },
    { id: "ORD-002", customer: "XYZ Fashion", amount: "$3,800", status: "Completed", date: "2024-01-19" },
    { id: "ORD-003", customer: "Fashion Hub", amount: "$7,100", status: "Pending", date: "2024-01-18" },
    { id: "ORD-004", customer: "Style Works", amount: "$4,900", status: "Processing", date: "2024-01-17" }
  ];

  const machineStatus = [
    { name: "Weaving Machine 1", status: "Running", efficiency: "95%" },
    { name: "Dyeing Machine 1", status: "Idle", efficiency: "88%" },
    { name: "Cutting Machine 1", status: "Running", efficiency: "92%" },
    { name: "Stitching Machine 1", status: "Maintenance", efficiency: "97%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Running': return 'bg-green-100 text-green-800 border-green-200';
      case 'Idle': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Maintenance': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
          <h1 className="text-3xl font-bold text-slate-800">Company Dashboard</h1>
          <p className="text-slate-600">Monitor your business performance and operations</p>
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
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">Recent Orders</CardTitle>
                <CardDescription className="text-slate-600">Latest customer orders</CardDescription>
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
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{order.customer}</p>
                          <p className="text-sm text-slate-500">{order.id} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{order.amount}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Machine Status */}
          <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">Machine Status</CardTitle>
                <CardDescription className="text-slate-600">Production equipment overview</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Manage
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {machineStatus.map((machine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        machine.status === 'Running' ? 'bg-green-400' :
                        machine.status === 'Idle' ? 'bg-blue-400' : 'bg-red-400'
                      }`}></div>
                      <div>
                        <p className="font-medium text-slate-800">{machine.name}</p>
                        <Badge className={getStatusColor(machine.status)}>
                          {machine.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Efficiency</p>
                      <p className="font-semibold text-slate-800">{machine.efficiency}</p>
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
            <CardDescription className="text-slate-600">Frequently used management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">Manage Employees</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <ShoppingCart className="w-5 h-5 mb-1" />
                <span className="text-xs">New Order</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Package className="w-5 h-5 mb-1" />
                <span className="text-xs">Check Inventory</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Activity className="w-5 h-5 mb-1" />
                <span className="text-xs">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
