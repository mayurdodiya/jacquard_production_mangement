
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Settings, 
  Plus, 
  Edit,
  Trash2,
  Calendar,
  Building,
  User,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';

const CompanySettings = () => {
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [holidayFormData, setHolidayFormData] = useState({
    name: '',
    date: '',
    type: 'National',
    description: ''
  });

  const [holidays, setHolidays] = useState([
    {
      id: 1,
      name: 'New Year\'s Day',
      date: '2024-01-01',
      type: 'National',
      description: 'New Year celebration'
    },
    {
      id: 2,
      name: 'Independence Day',
      date: '2024-07-04',
      type: 'National',
      description: 'National Independence Day'
    },
    {
      id: 3,
      name: 'Company Anniversary',
      date: '2024-03-15',
      type: 'Company',
      description: 'Company founding anniversary'
    },
    {
      id: 4,
      name: 'Christmas Day',
      date: '2024-12-25',
      type: 'National',
      description: 'Christmas celebration'
    }
  ]);

  const handleAddHoliday = () => {
    if (!holidayFormData.name || !holidayFormData.date) {
      toast.error('Please fill all required fields');
      return;
    }

    const newHoliday = {
      id: Date.now(),
      name: holidayFormData.name,
      date: holidayFormData.date,
      type: holidayFormData.type,
      description: holidayFormData.description
    };

    setHolidays([...holidays, newHoliday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setHolidayFormData({ name: '', date: '', type: 'National', description: '' });
    setIsHolidayModalOpen(false);
    toast.success('Holiday added successfully');
  };

  const handleDeleteHoliday = (holidayId: number) => {
    setHolidays(holidays.filter(h => h.id !== holidayId));
    toast.success('Holiday deleted successfully');
  };

  const getTypeColor = (type: string) => {
    return type === 'National' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
          <p className="text-gray-600">Manage your company settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="w-4 h-4" />
            <span>Company</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="holidays" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Holidays</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Textile Manufacturing Co." />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Textile Manufacturing" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Industrial Avenue, Manufacturing District, City 12345" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1-555-0123" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@company.com" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">User management features will be available in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holidays">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Holiday Management</CardTitle>
                  <CardDescription>Manage company holidays and observances</CardDescription>
                </div>
                <Button onClick={() => setIsHolidayModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Holiday
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holidays.map((holiday) => (
                  <div key={holiday.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{holiday.name}</h3>
                        <p className="text-sm text-gray-600">{holiday.date}</p>
                        {holiday.description && (
                          <p className="text-sm text-gray-500">{holiday.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getTypeColor(holiday.type)}>
                        {holiday.type}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteHoliday(holiday.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Notification settings will be available in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Holiday Modal */}
      <Dialog open={isHolidayModalOpen} onOpenChange={setIsHolidayModalOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Holiday</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Holiday Name *</Label>
              <Input 
                value={holidayFormData.name}
                onChange={(e) => setHolidayFormData({...holidayFormData, name: e.target.value})}
                placeholder="Enter holiday name"
              />
            </div>
            <div>
              <Label>Date *</Label>
              <Input 
                type="date"
                value={holidayFormData.date}
                onChange={(e) => setHolidayFormData({...holidayFormData, date: e.target.value})}
              />
            </div>
            <div>
              <Label>Type</Label>
              <select 
                value={holidayFormData.type}
                onChange={(e) => setHolidayFormData({...holidayFormData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500/20"
              >
                <option value="National">National</option>
                <option value="Company">Company</option>
              </select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={holidayFormData.description}
                onChange={(e) => setHolidayFormData({...holidayFormData, description: e.target.value})}
                placeholder="Enter description (optional)"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHolidayModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddHoliday} className="bg-gradient-to-r from-blue-600 to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Holiday
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanySettings;
