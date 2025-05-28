
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Plus, 
  Search, 
  Activity,
  Clock,
  Wrench,
  AlertTriangle
} from 'lucide-react';

const MachineManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const machines = [
    {
      id: 1,
      machineId: 'M001',
      name: 'Weaving Machine 1',
      type: 'Weaving',
      status: 'Running',
      currentProgramme: 'Cotton Fabric Pattern A',
      estimatedCompletion: '2024-01-21 14:00',
      efficiency: 95,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15'
    },
    {
      id: 2,
      machineId: 'M002',
      name: 'Dyeing Machine 1',
      type: 'Dyeing',
      status: 'Idle',
      currentProgramme: 'None',
      estimatedCompletion: 'N/A',
      efficiency: 88,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10'
    },
    {
      id: 3,
      machineId: 'M003',
      name: 'Cutting Machine 1',
      type: 'Cutting',
      status: 'Maintenance',
      currentProgramme: 'None',
      estimatedCompletion: 'N/A',
      efficiency: 92,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20'
    },
    {
      id: 4,
      machineId: 'M004',
      name: 'Stitching Machine 1',
      type: 'Stitching',
      status: 'Running',
      currentProgramme: 'Shirt Assembly Line',
      estimatedCompletion: '2024-01-21 16:30',
      efficiency: 97,
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-02-12'
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

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600';
    if (efficiency >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMachines = machines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.machineId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Machine Management</h1>
          <p className="text-gray-600">Monitor and manage all production machines</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Machine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
            <Settings className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">All machines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Under maintenance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machine List</CardTitle>
          <CardDescription>View and manage all production machines</CardDescription>
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
                  <th className="text-left p-2">Machine ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Current Programme</th>
                  <th className="text-left p-2">Estimated Completion</th>
                  <th className="text-left p-2">Efficiency</th>
                  <th className="text-left p-2">Next Maintenance</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMachines.map((machine) => (
                  <tr key={machine.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{machine.machineId}</td>
                    <td className="p-2">{machine.name}</td>
                    <td className="p-2">{machine.type}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(machine.status)}>
                        {machine.status}
                      </Badge>
                    </td>
                    <td className="p-2">{machine.currentProgramme}</td>
                    <td className="p-2">{machine.estimatedCompletion}</td>
                    <td className="p-2">
                      <span className={getEfficiencyColor(machine.efficiency)}>
                        {machine.efficiency}%
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        {new Date(machine.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                        )}
                        {machine.nextMaintenance}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Assign</Button>
                      </div>
                    </td>
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

export default MachineManagement;
