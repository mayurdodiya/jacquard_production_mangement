
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Clock,
  Package,
  Settings,
  Activity,
  Calendar,
  Factory,
  TrendingUp
} from 'lucide-react';

const EmployeeDashboard = () => {
  const stats = [
    {
      title: "Tasks Completed",
      value: "18",
      change: "+5 today",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Hours Worked",
      value: "6.5",
      change: "Today",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "My Machines",
      value: "3",
      change: "Active",
      icon: Settings,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      title: "Efficiency",
      value: "94%",
      change: "+2% this week",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const myTasks = [
    { id: "T001", title: "Complete Cotton Weaving", machine: "Weaving Machine 1", deadline: "Today 3:00 PM", status: "In Progress" },
    { id: "T002", title: "Quality Check Batch #45", machine: "Quality Station", deadline: "Today 4:30 PM", status: "Pending" },
    { id: "T003", title: "Machine Maintenance Check", machine: "Dyeing Machine 2", deadline: "Tomorrow 9:00 AM", status: "Scheduled" },
    { id: "T004", title: "Stock Count - Raw Materials", machine: "Warehouse", deadline: "Tomorrow 11:00 AM", status: "Pending" }
  ];

  const myMachines = [
    { name: "Weaving Machine 1", status: "Running", programme: "Cotton Fabric Pattern A", completion: "85%" },
    { name: "Cutting Machine 3", status: "Idle", programme: "None", completion: "N/A" },
    { name: "Stitching Machine 2", status: "Running", programme: "Shirt Pattern Cut", completion: "62%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': case 'Running': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': case 'Idle': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Scheduled': return 'bg-amber-100 text-amber-800 border-amber-200';
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
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back!</h1>
          <p className="text-slate-600">Here's your daily work overview and tasks</p>
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
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Tasks */}
          <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">My Tasks</CardTitle>
                <CardDescription className="text-slate-600">Your assigned work items</CardDescription>
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
                {myTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{task.title}</p>
                          <p className="text-sm text-slate-500">{task.machine}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {task.deadline}
                          </p>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Machines */}
          <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">My Machines</CardTitle>
                <CardDescription className="text-slate-600">Machines assigned to you</CardDescription>
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
                {myMachines.map((machine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        machine.status === 'Running' ? 'bg-green-400' : 'bg-blue-400'
                      }`}></div>
                      <div>
                        <p className="font-medium text-slate-800">{machine.name}</p>
                        <p className="text-sm text-slate-500">{machine.programme}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(machine.status)}>
                        {machine.status}
                      </Badge>
                      {machine.completion !== 'N/A' && (
                        <p className="text-xs text-slate-500 mt-1">{machine.completion} complete</p>
                      )}
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
            <CardDescription className="text-slate-600">Frequently used tools and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Clock className="w-5 h-5 mb-1" />
                <span className="text-xs">Clock In/Out</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Settings className="w-5 h-5 mb-1" />
                <span className="text-xs">My Machines</span>
              </Button>
              <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col">
                <Package className="w-5 h-5 mb-1" />
                <span className="text-xs">Check Stock</span>
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

export default EmployeeDashboard;
