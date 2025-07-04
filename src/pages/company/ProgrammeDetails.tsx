import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Calendar, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle,
  Clock,
  Target,
  Activity,
  Edit,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const ProgrammeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in real app this would come from API
  const [programme, setProgramme] = useState({
    id: 'PROG-001',
    name: 'Cotton Weaving Program',
    machine: 'Loom-A1',
    status: 'Running',
    startDate: '2024-01-20',
    endDate: '2024-01-25',
    progress: 65,
    priority: 'High',
    description: 'High-quality cotton fabric production for premium clothing line',
    operator: 'John Smith',
    estimatedHours: 120,
    actualHours: 78,
    efficiency: 95,
    materials: [
      { name: 'Cotton Thread', quantity: '500 kg', used: '325 kg' },
      { name: 'Dye - Blue', quantity: '50 L', used: '32 L' },
      { name: 'Chemical Softener', quantity: '25 L', used: '16 L' }
    ],
    milestones: [
      { name: 'Setup Complete', date: '2024-01-20', status: 'Completed' },
      { name: 'First Batch', date: '2024-01-21', status: 'Completed' },
      { name: 'Quality Check 1', date: '2024-01-22', status: 'Completed' },
      { name: 'Mid Production Review', date: '2024-01-23', status: 'In Progress' },
      { name: 'Final Quality Check', date: '2024-01-24', status: 'Pending' },
      { name: 'Production Complete', date: '2024-01-25', status: 'Pending' }
    ]
  });

  const [editFormData, setEditFormData] = useState(programme);

  const handleEdit = () => {
    setIsEditing(true);
    setEditFormData(programme);
  };

  const handleSave = () => {
    setProgramme(editFormData);
    setIsEditing(false);
    toast.success('Programme updated successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditFormData(programme);
  };

  const handleStatusChange = (newStatus: string) => {
    const updatedProgramme = { ...programme, status: newStatus };
    setProgramme(updatedProgramme);
    setEditFormData(updatedProgramme);
    toast.success(`Programme status changed to ${newStatus}`);
  };

  const updateProgress = (newProgress: number) => {
    const updatedProgramme = { ...programme, progress: newProgress };
    setProgramme(updatedProgramme);
    setEditFormData(updatedProgramme);
    toast.success(`Progress updated to ${newProgress}%`);
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

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/company/programmes')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programmes
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{programme.name}</h1>
            <p className="text-gray-600">Programme ID: {programme.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusChange('Running')}
              disabled={programme.status === 'Running'}
            >
              <Play className="w-4 h-4 mr-1" />
              Start
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusChange('Push')}
              disabled={programme.status === 'Push'}
            >
              <Pause className="w-4 h-4 mr-1" />
              Pause
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusChange('Completed')}
              disabled={programme.status === 'Completed'}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Complete
            </Button>
          </div>
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
          <Badge className={getStatusColor(programme.status)}>
            {getStatusIcon(programme.status)}
            <span className="ml-1">{programme.status}</span>
          </Badge>
          <Badge className={getPriorityColor(programme.priority)}>
            {programme.priority} Priority
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programme.progress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${programme.progress}%` }}
              ></div>
            </div>
            <div className="flex space-x-1 mt-2">
              <Button size="sm" variant="outline" onClick={() => updateProgress(Math.max(0, programme.progress - 10))}>
                -10%
              </Button>
              <Button size="sm" variant="outline" onClick={() => updateProgress(Math.min(100, programme.progress + 10))}>
                +10%
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programme.efficiency}%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programme.actualHours}h</div>
            <p className="text-xs text-muted-foreground">of {programme.estimatedHours}h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">days total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Programme Information</CardTitle>
            <CardDescription>Basic details and specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label>Programme Name</Label>
                  <Input 
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Machine</Label>
                    <Input 
                      value={editFormData.machine}
                      onChange={(e) => setEditFormData({...editFormData, machine: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Operator</Label>
                    <Input 
                      value={editFormData.operator}
                      onChange={(e) => setEditFormData({...editFormData, operator: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input 
                      type="date"
                      value={editFormData.startDate}
                      onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input 
                      type="date"
                      value={editFormData.endDate}
                      onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Machine</label>
                    <p className="text-sm font-semibold">{programme.machine}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Operator</label>
                    <p className="text-sm font-semibold">{programme.operator}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="text-sm font-semibold">{programme.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="text-sm font-semibold">{programme.endDate}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm">{programme.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materials Used</CardTitle>
            <CardDescription>Raw materials and consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {programme.materials.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{material.name}</h4>
                    <p className="text-xs text-gray-500">Allocated: {material.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{material.used}</p>
                    <p className="text-xs text-gray-500">Used</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
          <CardDescription>Track progress through key milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {programme.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{milestone.name}</h4>
                    <p className="text-xs text-gray-600">{milestone.date}</p>
                  </div>
                </div>
                <Badge className={getMilestoneStatusColor(milestone.status)} variant="outline">
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgrammeDetails;
