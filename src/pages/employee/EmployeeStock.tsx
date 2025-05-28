
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Search, 
  AlertTriangle,
  Box,
  Layers,
  Archive
} from 'lucide-react';

const EmployeeStock = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stockItems = [
    {
      id: 1,
      name: 'Raw Cotton',
      category: 'Raw Materials',
      quantity: 150,
      unit: 'kg',
      location: 'Warehouse A - Section 1',
      status: 'Available',
      lastUpdated: '2024-01-20',
      minThreshold: 50
    },
    {
      id: 2,
      name: 'Blue Dye Concentrate',
      category: 'Chemicals',
      quantity: 25,
      unit: 'liters',
      location: 'Chemical Storage - Bay 2',
      status: 'Low Stock',
      lastUpdated: '2024-01-19',
      minThreshold: 30
    },
    {
      id: 3,
      name: 'Polyester Thread',
      category: 'Thread & Yarn',
      quantity: 200,
      unit: 'spools',
      location: 'Warehouse B - Section 3',
      status: 'Available',
      lastUpdated: '2024-01-20',
      minThreshold: 100
    },
    {
      id: 4,
      name: 'Fabric Softener',
      category: 'Chemicals',
      quantity: 80,
      unit: 'bottles',
      location: 'Chemical Storage - Bay 1',
      status: 'Available',
      lastUpdated: '2024-01-18',
      minThreshold: 40
    },
    {
      id: 5,
      name: 'Cardboard Boxes',
      category: 'Packaging',
      quantity: 5,
      unit: 'boxes',
      location: 'Packaging Area',
      status: 'Critical',
      lastUpdated: '2024-01-17',
      minThreshold: 20
    },
    {
      id: 6,
      name: 'Cotton Yarn - White',
      category: 'Thread & Yarn',
      quantity: 300,
      unit: 'kg',
      location: 'Warehouse A - Section 2',
      status: 'Available',
      lastUpdated: '2024-01-20',
      minThreshold: 150
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Low Stock': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableItems = stockItems.filter(item => item.status === 'Available').length;
  const lowStockItems = stockItems.filter(item => item.status === 'Low Stock').length;
  const criticalItems = stockItems.filter(item => item.status === 'Critical').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stock View</h1>
        <p className="text-gray-600">View available inventory in the warehouse</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockItems.length}</div>
            <p className="text-xs text-muted-foreground">Different products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Box className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableItems}</div>
            <p className="text-xs text-muted-foreground">Items in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <Archive className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalItems}</div>
            <p className="text-xs text-muted-foreground">Urgent restock</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Inventory</CardTitle>
          <CardDescription>View all available stock items in the warehouse</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search inventory..."
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
                  <th className="text-left p-2">Item Name</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Location</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <span className="font-medium ml-2">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">
                      <div>
                        <span className="font-medium">{item.quantity} {item.unit}</span>
                        {item.quantity <= item.minThreshold && (
                          <div className="text-xs text-red-600">
                            Below threshold ({item.minThreshold} {item.unit})
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Layers className="w-4 h-4 mr-1 text-gray-400" />
                        {item.location}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-2">{item.lastUpdated}</td>
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

export default EmployeeStock;
