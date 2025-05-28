
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Building2, Users, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import AddCompanyModal from '@/components/modals/AddCompanyModal';

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // For now using mock data, replace with actual API call
      const mockCompanies = [
        {
          id: 1,
          name: 'Textile Manufacturing Co.',
          contactPerson: 'John Smith',
          email: 'john@textile.com',
          phone: '+1 (555) 123-4567',
          address: '123 Industrial Ave, City, State',
          industry: 'Textile Manufacturing',
          status: 'Active',
          employees: 85,
          createdAt: '2023-01-15'
        },
        {
          id: 2,
          name: 'Global Fashion Ltd.',
          contactPerson: 'Sarah Johnson',
          email: 'sarah@globalfashion.com',
          phone: '+1 (555) 987-6543',
          address: '456 Business Blvd, City, State',
          industry: 'Fashion',
          status: 'Active',
          employees: 120,
          createdAt: '2023-02-20'
        },
        {
          id: 3,
          name: 'Premium Garments Inc.',
          contactPerson: 'Mike Wilson',
          email: 'mike@premium.com',
          phone: '+1 (555) 456-7890',
          address: '789 Commerce St, City, State',
          industry: 'Garment Manufacturing',
          status: 'Inactive',
          employees: 65,
          createdAt: '2022-11-30'
        }
      ];
      setCompanies(mockCompanies);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch companies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await apiService.deleteCompany(id.toString());
        toast({
          title: "Success",
          description: "Company deleted successfully",
        });
        fetchCompanies();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete company",
          variant: "destructive",
        });
      }
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
          <p className="text-gray-600">Manage all companies in the system</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">Registered companies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {companies.filter(c => c.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {companies.reduce((total, company) => total + company.employees, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all companies</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Companies List</CardTitle>
          <CardDescription>View and manage all companies</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Company Name</th>
                  <th className="text-left p-3">Contact Person</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Employees</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.industry}</div>
                      </div>
                    </td>
                    <td className="p-3">{company.contactPerson}</td>
                    <td className="p-3">{company.email}</td>
                    <td className="p-3">{company.phone}</td>
                    <td className="p-3">{company.employees}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(company.status)}>
                        {company.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleDeleteCompany(company.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddCompanyModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onCompanyAdded={fetchCompanies}
      />
    </div>
  );
};

export default AdminCompanies;
