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
import { Calendar } from '@/components/ui/calendar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Settings, 
  Plus, 
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Building,
  User,
  Bell,
  BarChart3,
  PieChart
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const CompanySettings = () => {
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'calendar', 'chart'
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
    return type === 'National' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
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
    
    // Calculate weekends
    const weekends = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(parseInt(selectedYear), monthIndex - 1, day);
      if (date.getDay() === 0 || date.getDay() === 6) {
        weekends.push(day);
      }
    }
    
    const workingDays = daysInMonth - monthHolidays.length - weekends.length;
    return { 
      total: daysInMonth, 
      holidays: monthHolidays.length, 
      working: workingDays,
      weekends: weekends.length 
    };
  };

  const getYearlyStats = () => {
    const totalDays = 365; // Assuming non-leap year for simplicity
    const yearHolidays = holidays.filter(holiday => holiday.date.includes(selectedYear));
    
    // Calculate total weekends in year
    let totalWeekends = 0;
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(parseInt(selectedYear), month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(parseInt(selectedYear), month, day);
        if (date.getDay() === 0 || date.getDay() === 6) {
          totalWeekends++;
        }
      }
    }
    
    const workingDays = totalDays - yearHolidays.length - totalWeekends;
    return { 
      total: totalDays, 
      holidays: yearHolidays.length, 
      working: workingDays,
      weekends: totalWeekends 
    };
  };

  const getChartData = () => {
    return months.slice(1).map((month, index) => {
      const stats = getMonthlyStats(index + 1);
      return {
        month: month.substring(0, 3),
        working: stats.working,
        holidays: stats.holidays,
        weekends: stats.weekends
      };
    });
  };

  const getPieChartData = () => {
    const yearStats = getYearlyStats();
    return [
      { name: 'Working Days', value: yearStats.working, color: '#10B981' },
      { name: 'Holidays', value: yearStats.holidays, color: '#EF4444' },
      { name: 'Weekends', value: yearStats.weekends, color: '#6B7280' }
    ];
  };

  const isHoliday = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return holidays.some(holiday => holiday.date === dateString);
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
            <CalendarIcon className="w-4 h-4" />
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
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>Holiday Management</span>
                  </CardTitle>
                  <CardDescription>Manage company holidays and track working days</CardDescription>
                </div>
                <Button onClick={() => setIsHolidayModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Holiday
                </Button>
              </div>
              
              {/* Controls */}
              <div className="flex flex-wrap gap-4 mt-6">
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
                <div>
                  <Label>View Mode</Label>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cards">Cards</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                      <SelectItem value="chart">Charts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Yearly Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">Total Days</p>
                      <p className="text-2xl font-bold text-blue-900">{getYearlyStats().total}</p>
                    </div>
                    <CalendarIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </Card>
                <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Working Days</p>
                      <p className="text-2xl font-bold text-green-900">{getYearlyStats().working}</p>
                    </div>
                    <Building className="w-8 h-8 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-700">Holidays</p>
                      <p className="text-2xl font-bold text-red-900">{getYearlyStats().holidays}</p>
                    </div>
                    <CalendarIcon className="w-8 h-8 text-red-600" />
                  </div>
                </Card>
                <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">Weekends</p>
                      <p className="text-2xl font-bold text-gray-900">{getYearlyStats().weekends}</p>
                    </div>
                    <CalendarIcon className="w-8 h-8 text-gray-600" />
                  </div>
                </Card>
              </div>

              {/* Content based on view mode */}
              {viewMode === 'cards' && (
                <>
                  {/* Monthly Cards */}
                  {selectedMonth === 'All' && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Monthly Overview for {selectedYear}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {months.slice(1).map((month, index) => {
                          const stats = getMonthlyStats(index + 1);
                          return (
                            <Card key={month} className="p-4 hover:shadow-lg transition-shadow">
                              <h4 className="font-semibold text-lg mb-3">{month}</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Total Days:</span>
                                  <span className="font-medium">{stats.total}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-green-600">Working:</span>
                                  <span className="font-medium text-green-700">{stats.working}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-red-600">Holidays:</span>
                                  <span className="font-medium text-red-700">{stats.holidays}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Weekends:</span>
                                  <span className="font-medium text-gray-700">{stats.weekends}</span>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Holiday List */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      {selectedMonth === 'All' ? `All Holidays in ${selectedYear}` : `${selectedMonth} ${selectedYear} Holidays`}
                    </h3>
                    
                    {selectedMonth === 'All' ? (
                      <Accordion type="single" collapsible className="space-y-2">
                        {months.slice(1).map((month, index) => {
                          const monthHolidays = holidays.filter(holiday => {
                            const holidayDate = new Date(holiday.date);
                            return holidayDate.getFullYear() === parseInt(selectedYear) && 
                                   holidayDate.getMonth() === index;
                          });
                          
                          if (monthHolidays.length === 0) return null;
                          
                          return (
                            <AccordionItem key={month} value={month} className="border rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center justify-between w-full mr-4">
                                  <span className="font-medium">{month}</span>
                                  <Badge variant="outline">{monthHolidays.length} holidays</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                <div className="space-y-3">
                                  {monthHolidays.map((holiday) => (
                                    <div key={holiday.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                          <CalendarIcon className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-sm">{holiday.name}</h4>
                                          <p className="text-xs text-gray-600">{format(new Date(holiday.date), 'MMMM d, yyyy')}</p>
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
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    ) : (
                      <div className="space-y-3">
                        {getFilteredHolidays().map((holiday) => (
                          <div key={holiday.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                <CalendarIcon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{holiday.name}</h4>
                                <p className="text-xs text-gray-600">{format(new Date(holiday.date), 'MMMM d, yyyy')}</p>
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
                    )}
                  </div>
                </>
              )}

              {viewMode === 'calendar' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-4">Holiday Calendar</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      modifiers={{
                        holiday: (date) => isHoliday(date)
                      }}
                      modifiersStyles={{
                        holiday: { 
                          backgroundColor: '#fecaca', 
                          color: '#dc2626',
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-4">Legend & Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-200 rounded"></div>
                        <span className="text-sm">Holiday</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <span className="text-sm">Weekend</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-200 rounded"></div>
                        <span className="text-sm">Working Day</span>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Current Month Stats</h4>
                        {selectedMonth !== 'All' && (
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Working Days:</span>
                              <span className="font-medium">{getMonthlyStats(months.indexOf(selectedMonth)).working}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Holidays:</span>
                              <span className="font-medium">{getMonthlyStats(months.indexOf(selectedMonth)).holidays}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {viewMode === 'chart' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Monthly Breakdown
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getChartData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="working" stackId="a" fill="#10B981" name="Working Days" />
                          <Bar dataKey="holidays" stackId="a" fill="#EF4444" name="Holidays" />
                          <Bar dataKey="weekends" stackId="a" fill="#6B7280" name="Weekends" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <PieChart className="w-5 h-5 mr-2" />
                        Yearly Distribution
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            dataKey="value"
                            data={getPieChartData()}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {getPieChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                </div>
              )}
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
                  <SelectItem value="National">National Holiday</SelectItem>
                  <SelectItem value="Company">Company Holiday</SelectItem>
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
