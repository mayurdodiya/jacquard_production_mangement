
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Plus, 
  Search, 
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stockItems = [
    {
      id: 1,
      name: 'Raw Material A',
      category: 'Raw Materials',
      quantity: 150,
      minStock: 50,
      unit: 'kg',
      price: 25.50,
      lastUpdated: '2024-01-15',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Component B',
      category: 'Components',
      quantity: 25,
      minStock: 30,
      unit: 'pieces',
      price: 120.00,
      lastUpdated: '2024-01-14',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Finished Product C',
      category: 'Finished Goods',
      quantity: 200,
      minStock: 100,
      unit: 'units',
      price: 450.00,
      lastUpdated: '2024-01-16',
      status: 'In Stock'
    },
    {
      id: 4,
      name: 'Packaging Material',
      category: 'Packaging',
      quantity: 5,
      minStock: 20,
      unit: 'boxes',
      price: 15.75,
      lastUpdated: '2024-01-13',
      status: 'Critical'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-600">Monitor and manage your inventory</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Stock Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Items in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,230</div>
            <p className="text-xs text-muted-foreground">Total inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Items critically low</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Items</CardTitle>
          <CardDescription>Manage your inventory items</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search stock items..."
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
                  <th className="text-left p-2">Unit Price</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">
                      {item.quantity} {item.unit}
                      {item.quantity <= item.minStock && (
                        <AlertTriangle className="w-4 h-4 text-yellow-600 inline ml-1" />
                      )}
                    </td>
                    <td className="p-2">${item.price}</td>
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

export default StockManagement;
