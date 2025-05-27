
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock,
  Users,
  Settings,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';

const ProductionSchedule = () => {
  const schedules = [
    {
      id: 1,
      jobId: 'JOB-001',
      product: 'Industrial Widget A',
      quantity: 500,
      startTime: '08:00',
      endTime: '16:00',
      status: 'In Progress',
      machine: 'Machine Line A',
      operator: 'John Smith',
      progress: 65
    },
    {
      id: 2,
      jobId: 'JOB-002',
      product: 'Component B',
      quantity: 200,
      startTime: '16:30',
      endTime: '23:30',
      status: 'Scheduled',
      machine: 'Machine Line B',
      operator: 'Sarah Johnson',
      progress: 0
    },
    {
      id: 3,
      jobId: 'JOB-003',
      product: 'Custom Assembly',
      quantity: 50,
      startTime: '00:00',
      endTime: '07:30',
      status: 'Completed',
      machine: 'Assembly Line',
      operator: 'Mike Davis',
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'In Progress': return <Play className="w-4 h-4" />;
      case 'Scheduled': return <Clock className="w-4 h-4" />;
      case 'Paused': return <Pause className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production Schedule</h1>
          <p className="text-gray-600">Manage your production timeline</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Jobs scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lines</CardTitle>
            <Settings className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Production lines running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Overall efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <p className="text-xs text-muted-foreground">Jobs on track</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Production Schedule</CardTitle>
          <CardDescription>Current production jobs and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    {getStatusIcon(schedule.status)}
                  </div>
                  <div>
                    <h3 className="font-medium">{schedule.jobId}</h3>
                    <p className="text-sm text-gray-600">{schedule.product}</p>
                    <p className="text-sm text-gray-500">Qty: {schedule.quantity} units</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Machine</p>
                    <p className="text-sm text-gray-600">{schedule.machine}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Operator</p>
                    <p className="text-sm text-gray-600">{schedule.operator}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Progress</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${schedule.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">{schedule.progress}%</p>
                  </div>
                  <Badge className={getStatusColor(schedule.status)}>
                    {schedule.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionSchedule;
