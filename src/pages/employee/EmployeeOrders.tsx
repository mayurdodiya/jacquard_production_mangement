
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Search, 
  Calendar,
  Clock,
  Package,
  AlertCircle
} from 'lucide-react';

const EmployeeOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD001',
      customerName: 'ABC Textiles Ltd',
      productName: 'Cotton Fabric - Blue',
      quantity: 500,
      unit: 'meters',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-01-25',
      assignedMachine: 'Weaving Machine 1',
      estimatedCompletion: '2024-01-24',
      notes: 'Premium quality required'
    },
    {
      id: 2,
      orderNumber: 'ORD002',
      customerName: 'Global Fashion Co',
      productName: 'Denim Fabric - Dark Blue',
      quantity: 300,
      unit: 'meters',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '2024-01-28',
      assignedMachine: 'Not Assigned',
      estimatedCompletion: 'TBD',
      notes: 'Standard quality'
    },
    {
      id: 3,
      orderNumber: 'ORD003',
      customerName: 'Premium Garments',
      productName: 'Silk Fabric - White',
      quantity: 200,
      unit: 'meters',
      priority: 'High',
      status: 'Completed',
      dueDate: '2024-01-20',
      assignedMachine: 'Weaving Machine 2',
      estimatedCompletion: '2024-01-19',
      notes: 'Delivered on time'
    },
    {
      id: 4,
      orderNumber: 'ORD004',
      customerName: 'Fashion Forward Inc',
      productName: 'Polyester Blend - Red',
      quantity: 400,
      unit: 'meters',
      priority: 'Low',
      status: 'Scheduled',
      dueDate: '2024-02-05',
      assignedMachine: 'Dyeing Machine 1',
      estimatedCompletion: '2024-02-03',
      notes: 'Color matching required'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders View</h1>
        <p className="text-gray-600">View upcoming product orders and assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">All orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Urgent orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>View all upcoming product orders</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order Number</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Priority</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Due Date</th>
                  <th className="text-left p-2">Assigned Machine</th>
                  <th className="text-left p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{order.orderNumber}</td>
                    <td className="p-2">{order.customerName}</td>
                    <td className="p-2">{order.productName}</td>
                    <td className="p-2">{order.quantity} {order.unit}</td>
                    <td className="p-2">
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {order.dueDate}
                      </div>
                    </td>
                    <td className="p-2">{order.assignedMachine}</td>
                    <td className="p-2 text-sm text-gray-600">{order.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeOrders;
