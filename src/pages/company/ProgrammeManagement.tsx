
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plus, 
  Search, 
  Clock,
  Settings,
  Play,
  Pause
} from 'lucide-react';

const ProgrammeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const programmes = [
    {
      id: 1,
      name: 'Cotton Fabric Pattern A',
      description: 'Basic cotton weaving pattern for shirts',
      category: 'Weaving',
      estimatedTime: '8 hours',
      difficulty: 'Medium',
      status: 'Active',
      assignedMachine: 'Weaving Machine 1',
      createdDate: '2024-01-10',
      lastUsed: '2024-01-20',
      completions: 25
    },
    {
      id: 2,
      name: 'Blue Dye Process',
      description: 'Standard blue dyeing procedure',
      category: 'Dyeing',
      estimatedTime: '6 hours',
      difficulty: 'Easy',
      status: 'Idle',
      assignedMachine: 'None',
      createdDate: '2024-01-08',
      lastUsed: '2024-01-18',
      completions: 18
    },
    {
      id: 3,
      name: 'Shirt Pattern Cut',
      description: 'Precision cutting pattern for dress shirts',
      category: 'Cutting',
      estimatedTime: '4 hours',
      difficulty: 'Hard',
      status: 'Active',
      assignedMachine: 'Cutting Machine 1',
      createdDate: '2024-01-05',
      lastUsed: '2024-01-19',
      completions: 32
    },
    {
      id: 4,
      name: 'Premium Silk Weave',
      description: 'Complex silk weaving pattern',
      category: 'Weaving',
      estimatedTime: '12 hours',
      difficulty: 'Hard',
      status: 'Draft',
      assignedMachine: 'None',
      createdDate: '2024-01-15',
      lastUsed: 'Never',
      completions: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Idle': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
    programme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programme Management</h1>
          <p className="text-gray-600">Create and manage production programmes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Programme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programmes</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">All programmes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle</CardTitle>
            <Pause className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Ready to assign</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5h</div>
            <p className="text-xs text-muted-foreground">Average completion time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programme List</CardTitle>
          <CardDescription>View and manage all production programmes</CardDescription>
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
                  <th className="text-left p-2">Programme Name</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Estimated Time</th>
                  <th className="text-left p-2">Difficulty</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Assigned Machine</th>
                  <th className="text-left p-2">Completions</th>
                  <th className="text-left p-2">Last Used</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgrammes.map((programme) => (
                  <tr key={programme.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{programme.name}</div>
                        <div className="text-sm text-gray-500">{programme.description}</div>
                      </div>
                    </td>
                    <td className="p-2">{programme.category}</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {programme.estimatedTime}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={getDifficultyColor(programme.difficulty)}>
                        {programme.difficulty}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge className={getStatusColor(programme.status)}>
                        {programme.status}
                      </Badge>
                    </td>
                    <td className="p-2">{programme.assignedMachine}</td>
                    <td className="p-2">{programme.completions}</td>
                    <td className="p-2">{programme.lastUsed}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
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

export default ProgrammeManagement;
