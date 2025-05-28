
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Search, 
  Clock,
  Settings,
  Play,
  CheckCircle
} from 'lucide-react';

const EmployeeProgrammes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const programmes = [
    {
      id: 1,
      name: 'Cotton Fabric Pattern A',
      description: 'Basic cotton weaving pattern for shirts',
      category: 'Weaving',
      machine: 'Weaving Machine 1',
      assignedTo: 'You',
      estimatedTime: '8 hours',
      actualTime: '7.5 hours',
      status: 'In Progress',
      progress: 75,
      startTime: '08:00',
      estimatedCompletion: '16:00',
      difficulty: 'Medium',
      productionTarget: 150,
      currentProduction: 112
    },
    {
      id: 2,
      name: 'Blue Dye Process',
      description: 'Standard blue dyeing procedure',
      category: 'Dyeing',
      machine: 'Dyeing Machine 1',
      assignedTo: 'Available',
      estimatedTime: '6 hours',
      actualTime: 'N/A',
      status: 'Scheduled',
      progress: 0,
      startTime: '09:00',
      estimatedCompletion: '15:00',
      difficulty: 'Easy',
      productionTarget: 200,
      currentProduction: 0
    },
    {
      id: 3,
      name: 'Shirt Pattern Cut',
      description: 'Precision cutting pattern for dress shirts',
      category: 'Cutting',
      machine: 'Cutting Machine 1',
      assignedTo: 'John Smith',
      estimatedTime: '4 hours',
      actualTime: '4.2 hours',
      status: 'Completed',
      progress: 100,
      startTime: '07:00',
      estimatedCompletion: '11:00',
      difficulty: 'Hard',
      productionTarget: 300,
      currentProduction: 300
    },
    {
      id: 4,
      name: 'Premium Silk Weave',
      description: 'Complex silk weaving pattern',
      category: 'Weaving',
      machine: 'Weaving Machine 2',
      assignedTo: 'Jane Doe',
      estimatedTime: '12 hours',
      actualTime: '6 hours (ongoing)',
      status: 'In Progress',
      progress: 50,
      startTime: '06:00',
      estimatedCompletion: '18:00',
      difficulty: 'Hard',
      productionTarget: 100,
      currentProduction: 50
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'In Progress': return <Play className="w-4 h-4 text-blue-600" />;
      case 'Scheduled': return <Calendar className="w-4 h-4 text-purple-600" />;
      default: return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProgrammes = programmes.filter(programme =>
    programme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    programme.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    programme.machine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProgrammes = programmes.length;
  const activeProgrammes = programmes.filter(p => p.status === 'In Progress').length;
  const completedProgrammes = programmes.filter(p => p.status === 'Completed').length;
  const myProgrammes = programmes.filter(p => p.assignedTo === 'You').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Programme List</h1>
        <p className="text-gray-600">View all machine programs and production data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programmes</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgrammes}</div>
            <p className="text-xs text-muted-foreground">All programmes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProgrammes}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Programmes</CardTitle>
            <Settings className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myProgrammes}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProgrammes}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programme Status</CardTitle>
          <CardDescription>View all machine programmes and their current status</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search programmes..."
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
                  <th className="text-left p-2">Programme</th>
                  <th className="text-left p-2">Machine</th>
                  <th className="text-left p-2">Assigned To</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Progress</th>
                  <th className="text-left p-2">Time</th>
                  <th className="text-left p-2">Production</th>
                  <th className="text-left p-2">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgrammes.map((programme) => (
                  <tr key={programme.id} className={`border-b hover:bg-gray-50 ${programme.assignedTo === 'You' ? 'bg-blue-50' : ''}`}>
                    <td className="p-2">
                      <div className="flex items-center">
                        {getStatusIcon(programme.status)}
                        <div className="ml-2">
                          <div className="font-medium">{programme.name}</div>
                          <div className="text-sm text-gray-500">{programme.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{programme.machine}</td>
                    <td className="p-2">
                      <span className={programme.assignedTo === 'You' ? 'font-medium text-blue-600' : ''}>
                        {programme.assignedTo}
                      </span>
                    </td>
                    <td className="p-2">
                      <Badge className={getStatusColor(programme.status)}>
                        {programme.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${programme.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{programme.progress}%</span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        <div>
                          <div className="text-sm">{programme.estimatedTime}</div>
                          <div className="text-xs text-gray-500">Actual: {programme.actualTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{programme.currentProduction}/{programme.productionTarget}</div>
                        <div className="text-xs text-gray-500">units</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={getDifficultyColor(programme.difficulty)}>
                        {programme.difficulty}
                      </Badge>
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

export default EmployeeProgrammes;
