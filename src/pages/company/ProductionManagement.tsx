
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Plus, 
  Search, 
  Play,
  Pause,
  CheckCircle,
  Clock,
  Eye,
  Edit
} from 'lucide-react';
import AddProductionModal from '@/components/modals/AddProductionModal';
import EditProductionModal from '@/components/modals/EditProductionModal';
import ViewProductionModal from '@/components/modals/ViewProductionModal';
import { toast } from 'sonner';

const ProductionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState(null);

  const [productions, setProductions] = useState([
    {
      id: 'PROD-001',
      productName: 'Cotton T-Shirts',
      batchNumber: 'CT-001',
      quantity: 500,
      targetDate: '2024-01-25',
      priority: 'High',
      assignedTeam: 'Team Alpha',
      status: 'In Progress',
      progress: 65,
      createdDate: '2024-01-20',
      notes: 'Rush order for premium cotton t-shirts'
    },
    {
      id: 'PROD-002',
      productName: 'Silk Scarves',
      batchNumber: 'SS-002',
      quantity: 200,
      targetDate: '2024-01-28',
      priority: 'Medium',
      assignedTeam: 'Team Beta',
      status: 'Planned',
      progress: 0,
      createdDate: '2024-01-22',
      notes: 'Elegant silk scarves collection'
    },
    {
      id: 'PROD-003',
      productName: 'Denim Jackets',
      batchNumber: 'DJ-003',
      quantity: 100,
      targetDate: '2024-01-30',
      priority: 'Low',
      assignedTeam: 'Team Gamma',
      status: 'Completed',
      progress: 100,
      createdDate: '2024-01-15',
      notes: 'Classic denim jacket production'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress': return <Play className="w-4 h-4" />;
      case 'On Hold': return <Pause className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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

  const handleAddProduction = (newProduction: any) => {
    setProductions([newProduction, ...productions]);
  };

  const handleEditProduction = (production: any) => {
    setSelectedProduction(production);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduction = (updatedProduction: any) => {
    setProductions(productions.map(prod => 
      prod.id === updatedProduction.id ? updatedProduction : prod
    ));
  };

  const handleViewProduction = (production: any) => {
    setSelectedProduction(production);
    setIsViewModalOpen(true);
  };

  const filteredProductions = productions.filter(production =>
    production.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    production.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    production.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production Management</h1>
          <p className="text-gray-600">Manage your production orders</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Production
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Factory className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productions.length}</div>
            <p className="text-xs text-muted-foreground">Production orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productions.filter(p => p.status === 'In Progress').length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productions.filter(p => p.status === 'Completed').length}</div>
            <p className="text-xs text-muted-foreground">Finished orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productions.filter(p => p.status === 'Planned').length}</div>
            <p className="text-xs text-muted-foreground">Upcoming orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Orders</CardTitle>
          <CardDescription>View and manage all production orders</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search production orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProductions.map((production) => (
              <div 
                key={production.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewProduction(production)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    {getStatusIcon(production.status)}
                  </div>
                  <div>
                    <h3 className="font-medium">{production.productName}</h3>
                    <p className="text-sm text-gray-600">ID: {production.id}</p>
                    <p className="text-sm text-gray-500">Batch: {production.batchNumber}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        Target: {production.targetDate}
                      </span>
                      <span className="text-xs text-gray-500">
                        Qty: {production.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${production.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{production.progress}%</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(production.status)}>
                      {production.status}
                    </Badge>
                    <Badge className={getPriorityColor(production.priority)}>
                      {production.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProduction(production);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddProductionModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduction}
      />
      
      <EditProductionModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleUpdateProduction}
        production={selectedProduction}
      />
      
      <ViewProductionModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        production={selectedProduction}
      />
    </div>
  );
};

export default ProductionManagement;
