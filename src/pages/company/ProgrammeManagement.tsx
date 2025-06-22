import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Settings,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';
import AddProgrammeModal from '@/components/modals/AddProgrammeModal';

const ProgrammeManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [machineFilter, setMachineFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [programmes, setProgrammes] = useState([
    {
      id: 'PROG-001',
      name: 'Cotton Weaving Program',
      machine: 'Loom-A1',
      status: 'Running',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      progress: 65,
      priority: 'High'
    },
    {
      id: 'PROG-002',
      name: 'Silk Pattern Design',
      machine: 'Loom-B2',
      status: 'Push',
      startDate: '2024-01-22',
      endDate: '2024-01-28',
      progress: 30,
      priority: 'Medium'
    },
    {
      id: 'PROG-003',
      name: 'Denim Production',
      machine: 'Loom-C3',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      progress: 100,
      priority: 'Low'
    },
    {
      id: 'PROG-004',
      name: 'Premium Fabric Series',
      machine: 'Loom-A1',
      status: 'Running',
      startDate: '2024-01-18',
      endDate: '2024-01-24',
      progress: 80,
      priority: 'High'
    }
  ]);

  const machines = ['All', 'Loom-A1', 'Loom-B2', 'Loom-C3', 'Loom-D4'];
  const statuses = ['All', 'Running', 'Push', 'Completed'];

  const handleAddProgramme = (newProgramme) => {
    setProgrammes([...programmes, newProgramme]);
  };

  const handleViewDetails = (programmeId) => {
    navigate(`/company/programmes/${programmeId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-800';
      case 'Push': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running': return <Play className="w-4 h-4" />;
      case 'Push': return <Pause className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
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

  const filteredProgrammes = programmes.filter(programme => {
    const matchesSearch = programme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         programme.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || programme.status === statusFilter;
    const matchesMachine = machineFilter === 'All' || programme.machine === machineFilter;
    return matchesSearch && matchesStatus && matchesMachine;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programme Management</h1>
          <p className="text-gray-600">Manage your production programmes</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Programme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programmes</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programmes.length}</div>
            <p className="text-xs text-muted-foreground">All programmes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programmes.filter(p => p.status === 'Running').length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Push</CardTitle>
            <Pause className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programmes.filter(p => p.status === 'Push').length}</div>
            <p className="text-xs text-muted-foreground">On hold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programmes.filter(p => p.status === 'Completed').length}</div>
            <p className="text-xs text-muted-foreground">Finished</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programmes</CardTitle>
          <CardDescription>View and manage all programmes</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search programmes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'All' ? 'All Status' : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <Select value={machineFilter} onValueChange={setMachineFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by machine" />
                </SelectTrigger>
                <SelectContent>
                  {machines.map((machine) => (
                    <SelectItem key={machine} value={machine}>
                      {machine === 'All' ? 'All Machines' : machine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProgrammes.map((programme) => (
              <div key={programme.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    {getStatusIcon(programme.status)}
                  </div>
                  <div>
                    <h3 className="font-medium">{programme.name}</h3>
                    <p className="text-sm text-gray-600">ID: {programme.id}</p>
                    <p className="text-sm text-gray-500">Machine: {programme.machine}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {programme.startDate} - {programme.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${programme.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{programme.progress}%</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(programme.status)}>
                      {programme.status}
                    </Badge>
                    <Badge className={getPriorityColor(programme.priority)}>
                      {programme.priority}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(programme.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddProgrammeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProgramme}
      />
    </div>
  );
};

export default ProgrammeManagement;
