
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  TrendingUp,
  Target
} from 'lucide-react';

const EmployeeProduction = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const productionRecords = [
    {
      id: 1,
      date: '2024-01-20',
      machineId: 'M001',
      machineName: 'Weaving Machine 1',
      programme: 'Cotton Fabric Pattern A',
      quantity: 150,
      unit: 'meters',
      startTime: '08:00',
      endTime: '16:00',
      quality: 'A Grade',
      notes: 'Smooth operation, no issues',
      addedBy: 'You'
    },
    {
      id: 2,
      date: '2024-01-19',
      machineId: 'M001',
      machineName: 'Weaving Machine 1',
      programme: 'Cotton Fabric Pattern A',
      quantity: 145,
      unit: 'meters',
      startTime: '08:00',
      endTime: '16:30',
      quality: 'A Grade',
      notes: 'Minor adjustment needed at 2 PM',
      addedBy: 'You'
    },
    {
      id: 3,
      date: '2024-01-18',
      machineId: 'M003',
      machineName: 'Cutting Machine 1',
      programme: 'Shirt Pattern Cut',
      quantity: 280,
      unit: 'pieces',
      startTime: '07:00',
      endTime: '15:00',
      quality: 'A Grade',
      notes: 'Excellent cutting precision',
      addedBy: 'John Smith'
    },
    {
      id: 4,
      date: '2024-01-17',
      machineId: 'M001',
      machineName: 'Weaving Machine 1',
      programme: 'Cotton Fabric Pattern A',
      quantity: 140,
      unit: 'meters',
      startTime: '08:15',
      endTime: '16:15',
      quality: 'B Grade',
      notes: 'Thread tension adjustment required',
      addedBy: 'You'
    }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A Grade': return 'bg-green-100 text-green-800';
      case 'B Grade': return 'bg-yellow-100 text-yellow-800';
      case 'C Grade': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = productionRecords.filter(record =>
    record.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.programme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myRecords = productionRecords.filter(record => record.addedBy === 'You');
  const todayProduction = productionRecords.filter(record => record.date === '2024-01-20');
  const weekProduction = productionRecords.length;
  const avgQuality = 92; // Calculate from actual data

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production Management</h1>
          <p className="text-gray-600">View production data and add daily records</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Production
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Production</CardTitle>
            <Factory className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayProduction.length}</div>
            <p className="text-xs text-muted-foreground">Records added today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Records</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myRecords.length}</div>
            <p className="text-xs text-muted-foreground">Records by you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weekProduction}</div>
            <p className="text-xs text-muted-foreground">Total records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quality</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgQuality}%</div>
            <p className="text-xs text-muted-foreground">A Grade products</p>
          </CardContent>
        </Card>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Production Record</CardTitle>
            <CardDescription>Record your daily machine production</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label htmlFor="machine">Machine</Label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Select Machine</option>
                  <option value="M001">Weaving Machine 1</option>
                  <option value="M002">Dyeing Machine 1</option>
                  <option value="M003">Cutting Machine 1</option>
                </select>
              </div>
              <div>
                <Label htmlFor="programme">Programme</Label>
                <Input id="programme" placeholder="Programme name" />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="Production quantity" />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Select Unit</option>
                  <option value="meters">Meters</option>
                  <option value="pieces">Pieces</option>
                  <option value="kg">Kg</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
              <div>
                <Label htmlFor="quality">Quality Grade</Label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Select Quality</option>
                  <option value="A Grade">A Grade</option>
                  <option value="B Grade">B Grade</option>
                  <option value="C Grade">C Grade</option>
                </select>
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="time" />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="time" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="notes">Notes</Label>
              <textarea 
                id="notes" 
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Add any notes about the production..."
              ></textarea>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button>Save Production Record</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Production Records</CardTitle>
          <CardDescription>View machine production data with date filters</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search production..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="max-w-xs"
            />
            <Input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Machine</th>
                  <th className="text-left p-2">Programme</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Time</th>
                  <th className="text-left p-2">Quality</th>
                  <th className="text-left p-2">Added By</th>
                  <th className="text-left p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className={`border-b hover:bg-gray-50 ${record.addedBy === 'You' ? 'bg-blue-50' : ''}`}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {record.date}
                      </div>
                    </td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{record.machineName}</div>
                        <div className="text-sm text-gray-500">{record.machineId}</div>
                      </div>
                    </td>
                    <td className="p-2">{record.programme}</td>
                    <td className="p-2">{record.quantity} {record.unit}</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {record.startTime} - {record.endTime}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={getQualityColor(record.quality)}>
                        {record.quality}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <span className={record.addedBy === 'You' ? 'font-medium text-blue-600' : ''}>
                        {record.addedBy}
                      </span>
                    </td>
                    <td className="p-2 text-sm text-gray-600">{record.notes}</td>
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

export default EmployeeProduction;
