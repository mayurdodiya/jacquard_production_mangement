
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  Search, 
  CheckCircle,
  XCircle,
  DollarSign,
  FileText,
  Timer
} from 'lucide-react';

const EmployeeAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  const attendanceRecords = [
    {
      id: 1,
      date: '2024-01-20',
      punchIn: '08:00',
      punchOut: '16:30',
      totalHours: '8.5',
      status: 'Present',
      overtime: '0.5',
      notes: 'Regular shift'
    },
    {
      id: 2,
      date: '2024-01-19',
      punchIn: '08:15',
      punchOut: '16:45',
      totalHours: '8.5',
      status: 'Present',
      overtime: '0.5',
      notes: 'Late arrival due to traffic'
    },
    {
      id: 3,
      date: '2024-01-18',
      punchIn: '08:00',
      punchOut: '16:00',
      totalHours: '8.0',
      status: 'Present',
      overtime: '0',
      notes: 'Regular shift'
    },
    {
      id: 4,
      date: '2024-01-17',
      punchIn: '-',
      punchOut: '-',
      totalHours: '0',
      status: 'Sick Leave',
      overtime: '0',
      notes: 'Medical leave approved'
    },
    {
      id: 5,
      date: '2024-01-16',
      punchIn: '08:00',
      punchOut: '16:00',
      totalHours: '8.0',
      status: 'Present',
      overtime: '0',
      notes: 'Regular shift'
    }
  ];

  const salaryData = {
    basicSalary: 3500,
    overtimeRate: 20,
    totalOvertimeHours: 2.5,
    overtimePay: 50,
    totalSalary: 3550,
    deductions: 150,
    netSalary: 3400
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Sick Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Absent': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const handlePunchIn = () => {
    setIsPunchedIn(true);
    console.log('Punched In at:', new Date().toLocaleTimeString());
  };

  const handlePunchOut = () => {
    setIsPunchedIn(false);
    console.log('Punched Out at:', new Date().toLocaleTimeString());
  };

  const presentDays = attendanceRecords.filter(record => record.status === 'Present').length;
  const totalDays = attendanceRecords.length;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);
  const totalHours = attendanceRecords
    .filter(record => record.status === 'Present')
    .reduce((sum, record) => sum + parseFloat(record.totalHours), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600">Track your attendance, salary, and leaves</p>
      </div>

      {/* Punch In/Out Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Timer className="w-5 h-5 mr-2" />
            Daily Punch In/Out
          </CardTitle>
          <CardDescription>Check in and out for your work shift</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Status:</p>
              <p className="text-lg font-semibold">
                {isPunchedIn ? 'Checked In' : 'Checked Out'}
              </p>
              <p className="text-sm text-gray-500">
                {isPunchedIn ? 'Since 08:00 AM' : 'Last punch out: 16:30 PM'}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handlePunchIn} 
                disabled={isPunchedIn}
                variant={isPunchedIn ? "outline" : "default"}
              >
                <Clock className="w-4 h-4 mr-2" />
                Punch In
              </Button>
              <Button 
                onClick={handlePunchOut} 
                disabled={!isPunchedIn}
                variant={!isPunchedIn ? "outline" : "default"}
              >
                <Clock className="w-4 h-4 mr-2" />
                Punch Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentDays}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Overall rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}</div>
            <p className="text-xs text-muted-foreground">Hours worked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salaryData.netSalary}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Salary Information
            </CardTitle>
            <CardDescription>Your monthly salary breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Basic Salary</span>
                <span className="font-medium">${salaryData.basicSalary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Overtime Hours</span>
                <span className="font-medium">{salaryData.totalOvertimeHours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Overtime Pay (@${salaryData.overtimeRate}/hr)</span>
                <span className="font-medium">${salaryData.overtimePay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Gross Salary</span>
                <span className="font-medium">${salaryData.totalSalary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Deductions</span>
                <span className="font-medium text-red-600">-${salaryData.deductions}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Net Salary</span>
                <span className="text-lg font-bold text-green-600">${salaryData.netSalary}</span>
              </div>
              <Button className="w-full" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Download Salary Slip
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
            <CardDescription>Your available leave days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Annual Leave</span>
                <span className="font-medium">12 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sick Leave</span>
                <span className="font-medium">8 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Personal Leave</span>
                <span className="font-medium">3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Emergency Leave</span>
                <span className="font-medium">2 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>View your attendance history with date filters</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search records..."
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
                  <th className="text-left p-2">Punch In</th>
                  <th className="text-left p-2">Punch Out</th>
                  <th className="text-left p-2">Total Hours</th>
                  <th className="text-left p-2">Overtime</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {record.date}
                      </div>
                    </td>
                    <td className="p-2">{record.punchIn}</td>
                    <td className="p-2">{record.punchOut}</td>
                    <td className="p-2">{record.totalHours} hrs</td>
                    <td className="p-2">{record.overtime} hrs</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        {getStatusIcon(record.status)}
                        <Badge className={`${getStatusColor(record.status)} ml-2`}>
                          {record.status}
                        </Badge>
                      </div>
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

export default EmployeeAttendance;
