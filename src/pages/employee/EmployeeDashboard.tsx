
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const EmployeeDashboard = () => {
  const handlePunchIn = () => {
    // Implement punch in functionality
    console.log('Punch in clicked');
  };

  const handlePunchOut = () => {
    // Implement punch out functionality
    console.log('Punch out clicked');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="text-gray-600">Welcome back! Manage your work activities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>Check in/out for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Status:</span>
              <span className="text-green-600 text-sm font-medium">Checked In</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Check-in Time:</span>
              <span className="text-sm">09:15 AM</span>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handlePunchIn} size="sm" variant="outline">
                Punch In
              </Button>
              <Button onClick={handlePunchOut} size="sm">
                Punch Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-sm">Morning production meeting - Completed</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-yellow-500" />
                <p className="text-sm">Order #1235 processing - In Progress</p>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-blue-500" />
                <p className="text-sm">Quality check - Scheduled 2:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
            <CardDescription>Your weekly summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hours Worked</span>
                <span className="text-sm font-medium">38.5 hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Orders Completed</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Attendance Rate</span>
                <span className="text-green-600 text-sm font-medium">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <p className="text-sm">New order assigned to you</p>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-sm">Your timesheet was approved</p>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-purple-500" />
                <p className="text-sm">Schedule updated for next week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
