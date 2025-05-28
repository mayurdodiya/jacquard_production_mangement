
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Plus, 
  Search, 
  Download,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';

const ProductionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const productions = [
    {
      id: 1,
      machineId: 'M001',
      machineName: 'Weaving Machine 1',
      programme: 'Cotton Fabric Pattern A',
      employeeName: 'John Doe',
      quantity: 150,
      unit: 'meters',
      startTime: '08:00',
      endTime: '16:00',
      date: '2024-01-20',
      status: 'Completed',
      quality: 'A Grade'
    },
    {
      id: 2,
      machineId: 'M002',
      machineName: 'Dyeing Machine 1',
      programme: 'Blue Dye Process',
      employeeName: 'Jane Smith',
      quantity: 200,
      unit: 'kg',
      startTime: '09:00',
      endTime: '17:00',
      date: '2024-01-20',
      status: 'In Progress',
      quality: 'Pending'
    },
    {
      id: 3,
      machineId: 'M003',
      machineName: 'Cutting Machine 1',
      programme: 'Shirt Pattern Cut',
      employeeName: 'Mike Johnson',
      quantity: 300,
      unit: 'pieces',
      startTime: '07:00',
      endTime: '15:00',
      date: '2024-01-19',
      status: 'Completed',
      quality: 'A Grade'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProductions = productions.filter(production =>
    production.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    production.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production Management</h1>
          <p className="text-gray-600">Monitor daily production across all machines</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Production
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Production</CardTitle>
            <Factory className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">650</div>
            <p className="text-xs text-muted-foreground">Units produced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Machines</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/12</div>
            <p className="text-xs text-muted-foreground">Machines running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Overall efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Rate</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">A Grade products</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Records</CardTitle>
          <CardDescription>Daily production data from all machines</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search production records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Machine</th>
                  <th className="text-left p-2">Programme</th>
                  <th className="text-left p-2">Employee</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Time</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Quality</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProductions.map((production) => (
                  <tr key={production.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{production.machineName}</div>
                        <div className="text-sm text-gray-500">{production.machineId}</div>
                      </div>
                    </td>
                    <td className="p-2">{production.programme}</td>
                    <td className="p-2">{production.employeeName}</td>
                    <td className="p-2">{production.quantity} {production.unit}</td>
                    <td className="p-2">{production.startTime} - {production.endTime}</td>
                    <td className="p-2">{production.date}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(production.status)}>
                        {production.status}
                      </Badge>
                    </td>
                    <td className="p-2">{production.quality}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">View</Button>
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

export default ProductionManagement;
