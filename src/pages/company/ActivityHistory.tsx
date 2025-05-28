
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Search, 
  Calendar,
  User,
  Package,
  Settings,
  ShoppingCart,
  Users
} from 'lucide-react';

const ActivityHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const activities = [
    {
      id: 1,
      type: 'Production',
      action: 'Production record added',
      details: 'Machine M001 completed Cotton Fabric Pattern A - 150 meters',
      user: 'John Doe',
      timestamp: '2024-01-20 16:30:00',
      category: 'Production'
    },
    {
      id: 2,
      type: 'Stock',
      action: 'Stock updated',
      details: 'Raw Material A quantity reduced by 50kg for production',
      user: 'System',
      timestamp: '2024-01-20 14:15:00',
      category: 'Inventory'
    },
    {
      id: 3,
      type: 'Employee',
      action: 'Employee checked in',
      details: 'Jane Smith checked in at 09:00 AM',
      user: 'Jane Smith',
      timestamp: '2024-01-20 09:00:00',
      category: 'Attendance'
    },
    {
      id: 4,
      type: 'Order',
      action: 'Order status changed',
      details: 'Order #PO001 status changed from In Progress to Stored',
      user: 'Admin',
      timestamp: '2024-01-20 11:45:00',
      category: 'Orders'
    },
    {
      id: 5,
      type: 'Machine',
      action: 'Programme assigned',
      details: 'Blue Dye Process assigned to Dyeing Machine 1',
      user: 'Admin',
      timestamp: '2024-01-20 08:30:00',
      category: 'Machines'
    },
    {
      id: 6,
      type: 'Customer',
      action: 'New customer added',
      details: 'ABC Textiles Ltd added as new customer',
      user: 'Admin',
      timestamp: '2024-01-19 16:20:00',
      category: 'Customers'
    },
    {
      id: 7,
      type: 'Stock',
      action: 'Low stock alert',
      details: 'Packaging Material quantity below minimum threshold (5 boxes)',
      user: 'System',
      timestamp: '2024-01-19 14:00:00',
      category: 'Alerts'
    },
    {
      id: 8,
      type: 'Production',
      action: 'Machine maintenance',
      details: 'Cutting Machine 1 scheduled for maintenance',
      user: 'Admin',
      timestamp: '2024-01-19 10:15:00',
      category: 'Maintenance'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Production': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'Stock': return <Package className="w-4 h-4 text-green-600" />;
      case 'Employee': return <User className="w-4 h-4 text-purple-600" />;
      case 'Order': return <ShoppingCart className="w-4 h-4 text-orange-600" />;
      case 'Machine': return <Settings className="w-4 h-4 text-red-600" />;
      case 'Customer': return <Users className="w-4 h-4 text-pink-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Production': return 'bg-blue-100 text-blue-800';
      case 'Inventory': return 'bg-green-100 text-green-800';
      case 'Attendance': return 'bg-purple-100 text-purple-800';
      case 'Orders': return 'bg-orange-100 text-orange-800';
      case 'Machines': return 'bg-red-100 text-red-800';
      case 'Customers': return 'bg-pink-100 text-pink-800';
      case 'Alerts': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity History</h1>
        <p className="text-gray-600">Track all system activities and changes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Activities</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Activities logged today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Activities</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Production related</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Automatic alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Actions</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">Manual actions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Complete history of all system activities</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{activity.action}</h4>
                    <Badge className={getCategoryColor(activity.category)}>
                      {activity.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">By: {activity.user}</span>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityHistory;
