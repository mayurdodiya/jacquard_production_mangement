
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Package,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const OrderManagement = () => {
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'ABC Manufacturing',
      product: 'Industrial Widget A',
      quantity: 500,
      status: 'In Production',
      priority: 'High',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      value: 25000
    },
    {
      id: 'ORD-002',
      customerName: 'XYZ Corp',
      product: 'Component B',
      quantity: 200,
      status: 'Pending',
      priority: 'Medium',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-30',
      value: 15000
    },
    {
      id: 'ORD-003',
      customerName: 'Tech Solutions Ltd',
      product: 'Custom Assembly',
      quantity: 50,
      status: 'Completed',
      priority: 'Low',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-20',
      value: 35000
    },
    {
      id: 'ORD-004',
      customerName: 'Global Industries',
      product: 'Standard Kit',
      quantity: 1000,
      status: 'Quality Check',
      priority: 'High',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-22',
      value: 45000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Production': return 'bg-blue-100 text-blue-800';
      case 'Quality Check': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'In Production': return <Package className="w-4 h-4" />;
      case 'Quality Check': return <AlertCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <Button>
          <ShoppingCart className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Active orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Production</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently being produced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.product} × {order.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${order.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Due: {order.deliveryDate}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
