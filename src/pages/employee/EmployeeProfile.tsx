
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Clock
} from 'lucide-react';

const EmployeeProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Employee Profile</h1>
        <p className="text-gray-600">View and update your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" defaultValue="1990-05-15" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main St, City, State 12345" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Employment Details
              </CardTitle>
              <CardDescription>Your work-related information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" defaultValue="EMP001" disabled />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Production" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Machine Operator" disabled />
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" type="date" defaultValue="2023-01-15" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Input id="supervisor" defaultValue="Jane Smith" disabled />
                </div>
                <div>
                  <Label htmlFor="shift">Shift</Label>
                  <Input id="shift" defaultValue="Morning (8:00 AM - 4:00 PM)" disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Picture</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Working Days</span>
                  <span className="font-medium">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Present Days</span>
                  <span className="font-medium">238</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Attendance Rate</span>
                  <span className="font-medium text-green-600">97.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Current Month</span>
                  <span className="font-medium">18/20 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input id="emergencyName" defaultValue="Jane Doe" />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Phone Number</Label>
                  <Input id="emergencyPhone" defaultValue="+1 (555) 987-6543" />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input id="relationship" defaultValue="Spouse" />
                </div>
                <Button size="sm" className="w-full">Update Emergency Contact</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
