
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (machine: any) => void;
}

const AddMachineModal = ({ isOpen, onClose, onAdd }: AddMachineModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    model: '',
    manufacturer: '',
    serialNumber: '',
    location: '',
    capacity: '',
    status: 'Active',
    notes: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.model) {
      toast.error('Please fill all required fields');
      return;
    }

    const newMachine = {
      id: `MCH-${String(Date.now()).slice(-4)}`,
      name: formData.name,
      type: formData.type,
      model: formData.model,
      manufacturer: formData.manufacturer,
      serialNumber: formData.serialNumber,
      location: formData.location,
      capacity: formData.capacity,
      status: formData.status,
      notes: formData.notes,
      installDate: new Date().toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0]
    };

    onAdd(newMachine);
    setFormData({ name: '', type: '', model: '', manufacturer: '', serialNumber: '', location: '', capacity: '', status: 'Active', notes: '' });
    onClose();
    toast.success('Machine added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Machine</DialogTitle>
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
            <Label>Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select machine type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Loom">Loom</SelectItem>
                <SelectItem value="Cutting">Cutting</SelectItem>
                <SelectItem value="Dyeing">Dyeing</SelectItem>
                <SelectItem value="Printing">Printing</SelectItem>
                <SelectItem value="Finishing">Finishing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Model *</Label>
            <Input 
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              placeholder="Enter model number"
            />
          </div>
          <div>
            <Label>Manufacturer</Label>
            <Input 
              value={formData.manufacturer}
              onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
              placeholder="Enter manufacturer"
            />
          </div>
          <div>
            <Label>Serial Number</Label>
            <Input 
              value={formData.serialNumber}
              onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
              placeholder="Enter serial number"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter location"
            />
          </div>
          <div>
            <Label>Capacity</Label>
            <Input 
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              placeholder="Enter capacity"
            />
          </div>
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
            <Plus className="w-4 h-4 mr-2" />
            Add Machine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMachineModal;
