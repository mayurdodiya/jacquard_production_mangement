
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserCheck, Building2, Users } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      // Navigate based on role
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'company':
          navigate('/company');
          break;
        case 'employee':
          navigate('/employee');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (roleValue: string) => {
    switch (roleValue) {
      case 'admin': return <UserCheck className="w-4 h-4" />;
      case 'company': return <Building2 className="w-4 h-4" />;
      case 'employee': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  const getRoleGradient = (roleValue: string) => {
    switch (roleValue) {
      case 'admin': return 'from-blue-500 to-purple-600';
      case 'company': return 'from-emerald-500 to-teal-600';
      case 'employee': return 'from-indigo-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover"
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzODVmZjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+"
        >
          <source src="https://player.vimeo.com/external/195919230.sd.mp4?s=e059bd9a1c96da5892ca7db4c1a4dcc7df4e13bd&profile_id=164" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-indigo-900/70"></div>
      </div>

      {/*  Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 bg-white/90 backdrop-blur-xl shadow-2xl border-0 z-20 animate-fade-in">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 animate-scale-in shadow-lg">
            <div className="text-white text-3xl font-bold">J</div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">Select Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className={`h-12 border-2 transition-all duration-300 ${
                  role ? `border-transparent bg-gradient-to-r ${getRoleGradient(role)} text-white` : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(role)}
                    <SelectValue placeholder="Choose your role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="company" className="hover:bg-emerald-50">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span>Company</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="employee" className="hover:bg-purple-50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>Employee</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '300ms' }}>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '400ms' }}>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className={`w-full h-12 text-white font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl animate-slide-in-right ${
                role ? `bg-gradient-to-r ${getRoleGradient(role)} hover:opacity-90` : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}
              style={{ animationDelay: '500ms' }}
              disabled={isLoading || !role}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {getRoleIcon(role)}
                  Sign In
                </div>
              )}
            </Button>
          </form>
          
          <div className="text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '600ms' }}>
            Secure login powered by Jacquard System
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
