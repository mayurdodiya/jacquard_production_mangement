import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Search, 
  Activity,
  Clock,
  Play,
  Pause,
  Plus,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';

const EmployeeMachines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [machines, setMachines] = useState([
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
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [formData, setFormData] = useState({
    machineId: '',
    name: '',
    type: '',
    status: 'Idle',
    currentProgramme: '',
    assignedTo: '',
    efficiency: 0
  });

  const handleAdd = () => {
    const newMachine = {
      id: Date.now(),
      ...formData,
      estimatedCompletion: 'N/A',
      lastMaintenanceDate: new Date().toISOString().split('T')[0],
      operatingHours: '0 hrs today'
    };
    setMachines([...machines, newMachine]);
    setIsAddDialogOpen(false);
    setFormData({
      machineId: '',
      name: '',
      type: '',
      status: 'Idle',
      currentProgramme: '',
      assignedTo: '',
      efficiency: 0
    });
  };

  const handleEdit = (machine) => {
    setSelectedMachine(machine);
    setFormData(machine);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setMachines(machines.map(machine => 
      machine.id === selectedMachine.id ? { ...machine, ...formData } : machine
    ));
    setIsEditDialogOpen(false);
    setSelectedMachine(null);
  };

  const handleDelete = (id) => {
    setMachines(machines.filter(machine => machine.id !== id));
  };

  const handleAssign = (machineId) => {
    setMachines(machines.map(machine =>
      machine.id === machineId ? { ...machine, assignedTo: 'You' } : machine
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-800 border-green-200';
      case 'Idle': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Maintenance': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Running': return <Play className="w-4 h-4 text-green-600" />;
      case 'Idle': return <Pause className="w-4 h-4 text-blue-600" />;
      case 'Maintenance': return <Settings className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 95) return 'text-green-600 font-semibold';
    if (efficiency >= 85) return 'text-blue-600 font-semibold';
    return 'text-red-600 font-semibold';
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
    <div className="space-y-6 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Machine Management</h1>
        <p className="text-slate-600">View and manage all production machines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Machines</CardTitle>
            <Settings className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{machines.length}</div>
            <p className="text-xs text-slate-500">All machines</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Running</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{runningMachines}</div>
            <p className="text-xs text-slate-500">Currently active</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">My Machines</CardTitle>
            <Activity className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{myMachines}</div>
            <p className="text-xs text-slate-500">Assigned to you</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Idle/Maintenance</CardTitle>
            <Pause className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{idleMachines + maintenanceMachines}</div>
            <p className="text-xs text-slate-500">Not in production</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-slate-800">Machine Status</CardTitle>
              <CardDescription className="text-slate-600">Current status of all production machines</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Machine
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Machine</DialogTitle>
                  <DialogDescription>Add a new machine to the system</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="machineId" className="text-right">Machine ID</Label>
                    <Input
                      id="machineId"
                      value={formData.machineId}
                      onChange={(e) => setFormData({...formData, machineId: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weaving">Weaving</SelectItem>
                        <SelectItem value="Dyeing">Dyeing</SelectItem>
                        <SelectItem value="Cutting">Cutting</SelectItem>
                        <SelectItem value="Stitching">Stitching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                    Add Machine
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search machines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm border-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Machine</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Type</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Status</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Programme</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Assigned To</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Efficiency</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMachines.map((machine) => (
                  <tr key={machine.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${machine.assignedTo === 'You' ? 'bg-blue-50/50' : ''}`}>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getStatusIcon(machine.status)}
                        <div className="ml-3">
                          <div className="font-medium text-slate-800">{machine.name}</div>
                          <div className="text-sm text-slate-500">{machine.machineId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-700">{machine.type}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(machine.status)}>
                        {machine.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-700">{machine.currentProgramme || 'None'}</td>
                    <td className="p-3">
                      <span className={machine.assignedTo === 'You' ? 'font-medium text-blue-600' : 'text-slate-700'}>
                        {machine.assignedTo}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={getEfficiencyColor(machine.efficiency)}>
                        {machine.efficiency}%
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(machine)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAssign(machine.id)}
                          className="border-green-200 text-green-600 hover:bg-green-50"
                          disabled={machine.assignedTo === 'You'}
                        >
                          <UserPlus className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(machine.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Machine</DialogTitle>
            <DialogDescription>Update machine information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Running">Running</SelectItem>
                  <SelectItem value="Idle">Idle</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-programme" className="text-right">Programme</Label>
              <Input
                id="edit-programme"
                value={formData.currentProgramme}
                onChange={(e) => setFormData({...formData, currentProgramme: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
              Update Machine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeMachines;
