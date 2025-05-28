
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Search, 
  Activity,
  Clock,
  Play,
  Pause
} from 'lucide-react';

const EmployeeMachines = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const machines = [
    {
      id: 1,
      machineId: 'M001',
      name: 'Weaving Machine 1',
      type: 'Weaving',
      status: 'Running',
      currentProgramme: 'Cotton Fabric Pattern A',
      assignedTo: 'You',
      estimatedCompletion: '2024-01-21 14:00',
      efficiency: 95,
      lastMaintenanceDate: '2024-01-15',
      operatingHours: '6.5 hrs today'
    },
    {
      id: 2,
      machineId: 'M002',
      name: 'Dyeing Machine 1',
      type: 'Dyeing',
      status: 'Idle',
      currentProgramme: 'None',
      assignedTo: 'Available',
      estimatedCompletion: 'N/A',
      efficiency: 88,
      lastMaintenanceDate: '2024-01-10',
      operatingHours: '0 hrs today'
    },
    {
      id: 3,
      machineId: 'M003',
      name: 'Cutting Machine 1',
      type: 'Cutting',
      status: 'Running',
      currentProgramme: 'Shirt Pattern Cut',
      assignedTo: 'John Smith',
      estimatedCompletion: '2024-01-21 16:30',
      efficiency: 92,
      lastMaintenanceDate: '2024-01-20',
      operatingHours: '4.2 hrs today'
    },
    {
      id: 4,
      machineId: 'M004',
      name: 'Stitching Machine 1',
      type: 'Stitching',
      status: 'Maintenance',
      currentProgramme: 'None',
      assignedTo: 'Maintenance Team',
      estimatedCompletion: 'N/A',
      efficiency: 97,
      lastMaintenanceDate: '2024-01-20',
      operatingHours: '0 hrs today'
    },
    {
      id: 5,
      machineId: 'M005',
      name: 'Weaving Machine 2',
      type: 'Weaving',
      status: 'Running',
      currentProgramme: 'Silk Weaving Pattern',
      assignedTo: 'Jane Doe',
      estimatedCompletion: '2024-01-22 10:00',
      efficiency: 94,
      lastMaintenanceDate: '2024-01-12',
      operatingHours: '7.8 hrs today'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-800';
      case 'Idle': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running': return <Play className="w-4 h-4 text-green-600" />;
      case 'Idle': return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'Maintenance': return <Settings className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600';
    if (efficiency >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMachines = machines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const runningMachines = machines.filter(machine => machine.status === 'Running').length;
  const idleMachines = machines.filter(machine => machine.status === 'Idle').length;
  const maintenanceMachines = machines.filter(machine => machine.status === 'Maintenance').length;
  const myMachines = machines.filter(machine => machine.assignedTo === 'You').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Machine List</h1>
        <p className="text-gray-600">View all production machines and their current status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
            <Settings className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machines.length}</div>
            <p className="text-xs text-muted-foreground">All machines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runningMachines}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Machines</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myMachines}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle/Maintenance</CardTitle>
            <Pause className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{idleMachines + maintenanceMachines}</div>
            <p className="text-xs text-muted-foreground">Not in production</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machine Status</CardTitle>
          <CardDescription>Current status of all production machines</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search machines..."
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
                  <th className="text-left p-2">Machine</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Current Programme</th>
                  <th className="text-left p-2">Assigned To</th>
                  <th className="text-left p-2">Estimated Completion</th>
                  <th className="text-left p-2">Efficiency</th>
                  <th className="text-left p-2">Operating Hours</th>
                </tr>
              </thead>
              <tbody>
                {filteredMachines.map((machine) => (
                  <tr key={machine.id} className={`border-b hover:bg-gray-50 ${machine.assignedTo === 'You' ? 'bg-blue-50' : ''}`}>
                    <td className="p-2">
                      <div className="flex items-center">
                        {getStatusIcon(machine.status)}
                        <div className="ml-2">
                          <div className="font-medium">{machine.name}</div>
                          <div className="text-sm text-gray-500">{machine.machineId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{machine.type}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(machine.status)}>
                        {machine.status}
                      </Badge>
                    </td>
                    <td className="p-2">{machine.currentProgramme}</td>
                    <td className="p-2">
                      <span className={machine.assignedTo === 'You' ? 'font-medium text-blue-600' : ''}>
                        {machine.assignedTo}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {machine.estimatedCompletion}
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={getEfficiencyColor(machine.efficiency)}>
                        {machine.efficiency}%
                      </span>
                    </td>
                    <td className="p-2">{machine.operatingHours}</td>
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

export default EmployeeMachines;
