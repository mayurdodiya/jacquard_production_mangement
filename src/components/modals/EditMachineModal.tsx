
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface EditMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (machine: any) => void;
  machine: any;
}

const EditMachineModal = ({ isOpen, onClose, onEdit, machine }: EditMachineModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    type: '',
    status: 'Active',
    location: '',
    assignedOperator: '',
    maintenanceDate: '',
    notes: ''
  });

  useEffect(() => {
    if (machine) {
      setFormData({
        name: machine.name || '',
        model: machine.model || '',
        type: machine.type || '',
        status: machine.status || 'Active',
        location: machine.location || '',
        assignedOperator: machine.assignedOperator || '',
        maintenanceDate: machine.maintenanceDate || '',
        notes: machine.notes || ''
      });
    }
  }, [machine]);

  const handleSubmit = () => {
    if (!formData.name || !formData.model || !formData.type) {
      toast.error('Please fill all required fields');
      return;
    }

    const updatedMachine = {
      ...machine,
      name: formData.name,
      model: formData.model,
      type: formData.type,
      status: formData.status,
      location: formData.location,
      assignedOperator: formData.assignedOperator,
      maintenanceDate: formData.maintenanceDate,
      notes: formData.notes
    };

    onEdit(updatedMachine);
    onClose();
    toast.success('Machine updated successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Machine</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Machine Name *</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter machine name"
            />
          </div>
          <div>
            <Label>Model *</Label>
            <Input 
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              placeholder="Enter model"
            />
          </div>
          <div>
            <Label>Type *</Label>
            <Input 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              placeholder="Enter machine type"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Input 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter location"
              />
            </div>
          </div>
          <div>
            <Label>Assigned Operator</Label>
            <Input 
              value={formData.assignedOperator}
              onChange={(e) => setFormData({...formData, assignedOperator: e.target.value})}
              placeholder="Enter operator name"
            />
          </div>
          <div>
            <Label>Next Maintenance Date</Label>
            <Input 
              type="date"
              value={formData.maintenanceDate}
              onChange={(e) => setFormData({...formData, maintenanceDate: e.target.value})}
            />
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter any notes"
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700">
            <Edit className="w-4 h-4 mr-2" />
            Update Machine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMachineModal;
