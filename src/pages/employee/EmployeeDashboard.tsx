
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, CheckCircle, AlertCircle, User, Zap, Activity } from 'lucide-react';

const EmployeeDashboard = () => {
  const handlePunchIn = () => {
    console.log('Punch in clicked');
  };

  const handlePunchOut = () => {
    console.log('Punch out clicked');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-20"
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2NjZmZjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+"
        >
          <source src="https://player.vimeo.com/external/236291043.sd.mp4?s=e7eea61937e1bf073b0c4eecfe0c5ff9b5692b36&profile_id=164" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Employee Dashboard
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-lg">Welcome back! Manage your work activities and track progress</p>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 transform bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Attendance
              </CardTitle>
              <CardDescription>Check in/out for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Checked In</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">Check-in Time:</span>
                <span className="text-blue-600 text-sm font-medium">09:15 AM</span>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={handlePunchIn} 
                  size="sm" 
                  variant="outline"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Punch In
                </Button>
                <Button 
                  onClick={handlePunchOut} 
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Punch Out
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 transform bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-slide-in-right" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Today's Schedule
              </CardTitle>
              <CardDescription>Your tasks and activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Morning production meeting</p>
                    <p className="text-xs text-green-600">Completed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-300">
                  <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Order #1235 processing</p>
                    <p className="text-xs text-yellow-600">In Progress</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Quality check scheduled</p>
                    <p className="text-xs text-blue-600">2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                This Week Summary
              </CardTitle>
              <CardDescription>Your weekly performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { label: 'Hours Worked', value: '38.5 hrs', color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: 'Orders Completed', value: '12', color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'Attendance Rate', value: '100%', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                  { label: 'Performance Score', value: '94%', color: 'text-purple-600', bg: 'bg-purple-100' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 ${item.bg} ${item.color} text-sm font-medium rounded-full`}>
                        {item.value}
                      </div>
                      <Zap className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                Notifications
              </CardTitle>
              <CardDescription>Recent updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-100', text: 'New order assigned to you', time: '5 min ago' },
                  { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', text: 'Your timesheet was approved', time: '1 hour ago' },
                  { icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-100', text: 'Schedule updated for next week', time: '2 hours ago' },
                  { icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100', text: 'Monthly performance review due', time: '1 day ago' }
                ].map((notification, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <div className={`p-2 ${notification.bg} rounded-lg`}>
                      <notification.icon className={`w-4 h-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
