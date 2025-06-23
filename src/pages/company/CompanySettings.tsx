import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [holidayFormData, setHolidayFormData] = useState({
    name: '',
    date: '',
    type: 'National',
    description: ''
  });

  const [holidays, setHolidays] = useState([
    // Q1 Holidays
    { id: 1, name: 'New Year\'s Day', date: '2024-01-01', type: 'National', description: 'New Year celebration' },
    { id: 2, name: 'Martin Luther King Jr. Day', date: '2024-01-15', type: 'National', description: 'Federal holiday' },
    { id: 3, name: 'Presidents Day', date: '2024-02-19', type: 'National', description: 'Federal holiday' },
    { id: 4, name: 'Company Foundation Day', date: '2024-03-15', type: 'Company', description: 'Company founding anniversary' },
    
    // Q2 Holidays
    { id: 5, name: 'Memorial Day', date: '2024-05-27', type: 'National', description: 'Federal holiday' },
    { id: 6, name: 'Juneteenth', date: '2024-06-19', type: 'National', description: 'Federal holiday' },
    
    // Q3 Holidays
    { id: 7, name: 'Independence Day', date: '2024-07-04', type: 'National', description: 'National Independence Day' },
    { id: 8, name: 'Labor Day', date: '2024-09-02', type: 'National', description: 'Federal holiday' },
    { id: 9, name: 'Company Summer Break', date: '2024-08-15', type: 'Company', description: 'Annual summer break' },
    
    // Q4 Holidays
    { id: 10, name: 'Columbus Day', date: '2024-10-14', type: 'National', description: 'Federal holiday' },
    { id: 11, name: 'Veterans Day', date: '2024-11-11', type: 'National', description: 'Federal holiday' },
    { id: 12, name: 'Thanksgiving Day', date: '2024-11-28', type: 'National', description: 'Thanksgiving celebration' },
    { id: 13, name: 'Black Friday', date: '2024-11-29', type: 'Company', description: 'Company holiday' },
    { id: 14, name: 'Christmas Eve', date: '2024-12-24', type: 'Company', description: 'Christmas Eve holiday' },
    { id: 15, name: 'Christmas Day', date: '2024-12-25', type: 'National', description: 'Christmas celebration' },
    { id: 16, name: 'New Year\'s Eve', date: '2024-12-31', type: 'Company', description: 'New Year\'s Eve holiday' }
  ]);

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const getFilteredHolidays = () => {
    const yearFiltered = holidays.filter(holiday => holiday.date.includes(selectedYear));
    
    if (selectedMonth === 'All') {
      return yearFiltered;
    }
    
    const monthIndex = months.indexOf(selectedMonth);
    return yearFiltered.filter(holiday => {
      const month = new Date(holiday.date).getMonth() + 1;
      return month === monthIndex;
    });
  };

  const getMonthlyStats = (monthIndex: number) => {
    const daysInMonth = new Date(parseInt(selectedYear), monthIndex, 0).getDate();
    const monthHolidays = holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getFullYear() === parseInt(selectedYear) && 
             holidayDate.getMonth() === monthIndex - 1;
    });
    
    const workingDays = daysInMonth - monthHolidays.length;
    return { total: daysInMonth, holidays: monthHolidays.length, working: workingDays };
  };

  const getYearlyStats = () => {
    const totalDays = 365; // Assuming non-leap year for simplicity
    const yearHolidays = holidays.filter(holiday => holiday.date.includes(selectedYear));
    const workingDays = totalDays - yearHolidays.length;
    return { total: totalDays, holidays: yearHolidays.length, working: workingDays };
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
                  <CardDescription>Manage company holidays and track working days</CardDescription>
                </div>
                <Button onClick={() => setIsHolidayModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Holiday
                </Button>
              </div>
              <div className="flex gap-4 mt-4">
                <div>
                  <Label>Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Month</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Yearly Summary */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-3">Year {selectedYear} Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Total Days:</span>
                    <span className="font-medium ml-2">{getYearlyStats().total}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Holidays:</span>
                    <span className="font-medium ml-2">{getYearlyStats().holidays}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Working Days:</span>
                    <span className="font-medium ml-2">{getYearlyStats().working}</span>
                  </div>
                </div>
              </div>

              {/* Monthly Statistics */}
              {selectedMonth === 'All' && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Monthly Statistics for {selectedYear}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {months.slice(1).map((month, index) => {
                      const stats = getMonthlyStats(index + 1);
                      return (
                        <Card key={month} className="p-3">
                          <h4 className="font-medium text-sm">{month}</h4>
                          <div className="text-xs text-gray-600 mt-1">
                            <div>Total: {stats.total} days</div>
                            <div>Holidays: {stats.holidays} days</div>
                            <div>Working: {stats.working} days</div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Holiday List */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  {selectedMonth === 'All' ? `All Holidays in ${selectedYear}` : `${selectedMonth} ${selectedYear} Holidays`}
                </h3>
                <div className="space-y-3">
                  {getFilteredHolidays().map((holiday) => (
                    <div key={holiday.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{holiday.name}</h4>
                          <p className="text-xs text-gray-600">{holiday.date}</p>
                          {holiday.description && (
                            <p className="text-xs text-gray-500">{holiday.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(holiday.type)} variant="outline">
                          {holiday.type}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteHoliday(holiday.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
              <Select 
                value={holidayFormData.type}
                onValueChange={(value) => setHolidayFormData({...holidayFormData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
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
