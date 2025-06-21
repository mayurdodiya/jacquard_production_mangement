
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pencil, 
  Calendar as CalendarIcon, 
  Filter, 
  Trash2, 
  ArrowLeft,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'present' | 'absent'>('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSalaryDialogOpen, setIsSalaryDialogOpen] = useState(false);
  const [isAttendanceEditOpen, setIsAttendanceEditOpen] = useState(false);

  // Mock employee data
  const employee = {
    id: 1,
    name: "Richard Davis",
    email: "richard.davis@company.com",
    phone: "+1 123 456 7890",
    position: "Senior Developer",
    department: "Engineering",
    joinDate: "2023-01-15",
    status: "Active",
    monthlySalary: 5000,
    location: "Floor A",
    todayStatus: "present", // present, absent, late
  };

  // Mock attendance data
  const attendanceHistory = [
    { date: "2024-01-20", status: "present", checkIn: "09:00", checkOut: "18:00", hours: 9 },
    { date: "2024-01-19", status: "present", checkIn: "09:15", checkOut: "18:30", hours: 9.25 },
    { date: "2024-01-18", status: "absent", checkIn: null, checkOut: null, hours: 0 },
    { date: "2024-01-17", status: "present", checkIn: "08:45", checkOut: "17:45", hours: 9 },
    { date: "2024-01-16", status: "late", checkIn: "10:30", checkOut: "18:30", hours: 8 },
  ];

  // Mock salary data
  const salaryHistory = [
    { month: "January 2024", totalDays: 31, presentDays: 28, absentDays: 3, baseSalary: 5000, deductions: 484, netSalary: 4516, status: "paid" },
    { month: "December 2023", totalDays: 31, presentDays: 31, absentDays: 0, baseSalary: 5000, deductions: 0, netSalary: 5000, status: "paid" },
  ];

  const [editForm, setEditForm] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    position: employee.position,
    department: employee.department,
    monthlySalary: employee.monthlySalary,
  });

  const handleStatusChange = () => {
    setIsActive((prev) => !prev);
    toast.success(`Employee ${!isActive ? 'activated' : 'deactivated'} successfully`);
  };

  const handleEditSubmit = () => {
    // Here you would typically make an API call
    toast.success("Employee updated successfully");
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    // Here you would typically make an API call
    toast.success("Employee deleted successfully");
    setIsDeleteDialogOpen(false);
    navigate('/company/employees');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTodayStatusIcon = () => {
    switch (employee.todayStatus) {
      case "present":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "absent":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "late":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredAttendance = attendanceHistory.filter(record => {
    if (attendanceFilter === 'all') return true;
    return record.status === attendanceFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-indigo-50/30 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/company/employees')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 hover:from-blue-700 hover:to-indigo-800 shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Employees
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Details</h1>
              <p className="text-gray-600">Manage employee information and attendance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getTodayStatusIcon()}
            <span className="text-sm font-medium">Today's Status</span>
          </div>
        </div>

        {/* Employee Profile Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-xl">
          <div 
            className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-lg"
            style={{
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              backgroundSize: 'cover'
            }}
          ></div>
          <CardContent className="relative -mt-16 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src="/placeholder.svg"
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                  <Badge className={`${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{employee.position} - {employee.department}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold">Email:</span> {employee.email}</div>
                  <div><span className="font-semibold">Phone:</span> {employee.phone}</div>
                  <div><span className="font-semibold">Join Date:</span> {employee.joinDate}</div>
                  <div><span className="font-semibold">Location:</span> {employee.location}</div>
                  <div><span className="font-semibold">Monthly Salary:</span> ${employee.monthlySalary}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Switch checked={isActive} onCheckedChange={handleStatusChange} />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 hover:from-blue-700 hover:to-indigo-800 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-blue-100">
            <TabsTrigger value="attendance">Attendance History</TabsTrigger>
            <TabsTrigger value="salary">Salary Management</TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Attendance History
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Date Range Picker */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="bg-white/80 border-blue-200">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                              </>
                            ) : (
                              format(dateRange.from, "MMM dd, yyyy")
                            )
                          ) : (
                            <span>Pick date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>

                    {/* Status Filter */}
                    <Select value={attendanceFilter} onValueChange={(value: 'all' | 'present' | 'absent') => setAttendanceFilter(value)}>
                      <SelectTrigger className="w-40 bg-white/80 border-blue-200">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button 
                      onClick={() => setIsAttendanceEditOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Attendance
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.checkIn || '-'}</TableCell>
                        <TableCell>{record.checkOut || '-'}</TableCell>
                        <TableCell>{record.hours}h</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary Tab */}
          <TabsContent value="salary" className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Salary Management
                  </CardTitle>
                  <Button 
                    onClick={() => setIsSalaryDialogOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Process Salary
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Present Days</TableHead>
                      <TableHead>Absent Days</TableHead>
                      <TableHead>Base Salary</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.month}</TableCell>
                        <TableCell>{record.presentDays}</TableCell>
                        <TableCell>{record.absentDays}</TableCell>
                        <TableCell>${record.baseSalary}</TableCell>
                        <TableCell className="text-red-600">${record.deductions}</TableCell>
                        <TableCell className="font-semibold">${record.netSalary}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Employee Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input 
                    value={editForm.position}
                    onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input 
                    value={editForm.department}
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Monthly Salary</Label>
                  <Input 
                    type="number"
                    value={editForm.monthlySalary}
                    onChange={(e) => setEditForm({...editForm, monthlySalary: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle>Delete Employee</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Attendance Edit Dialog */}
        <Dialog open={isAttendanceEditOpen} onOpenChange={setIsAttendanceEditOpen}>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle>Edit Attendance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Pick a date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar mode="single" className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAttendanceEditOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700">
                Update Attendance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeeDetails;
