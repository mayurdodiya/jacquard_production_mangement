
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus } from 'lucide-react';
import { useMachines } from '@/hooks/useMachines';
import MachineStatsCards from '@/components/employee/MachineStatsCards';
import MachineTable from '@/components/employee/MachineTable';
import MachineFormDialog from '@/components/employee/MachineFormDialog';

const EmployeeMachines = () => {
  const {
    machines,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    formData,
    setFormData,
    stats,
    handleAdd,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleAssign
  } = useMachines();

  return (
    <div className="space-y-6 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Machine Management
        </h1>
        <p className="text-slate-600">View and manage all production machines</p>
      </div>

      <MachineStatsCards
        totalMachines={stats.total}
        runningMachines={stats.running}
        myMachines={stats.myMachines}
        idleAndMaintenanceMachines={stats.idleAndMaintenance}
      />

      <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Machine Status
              </CardTitle>
              <CardDescription className="text-slate-600">Current status of all production machines</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Machine
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search machines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm border-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent>
          <MachineTable
            machines={machines}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssign={handleAssign}
          />
        </CardContent>
      </Card>

      <MachineFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Add New Machine"
        description="Add a new machine to the system"
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleAdd}
        submitButtonText="Add Machine"
      />

      <MachineFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Machine"
        description="Update machine information"
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleUpdate}
        submitButtonText="Update Machine"
        isEdit={true}
      />
    </div>
  );
};

export default EmployeeMachines;
