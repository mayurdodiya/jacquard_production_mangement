
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddProgrammeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (programme: any) => void;
}

const AddProgrammeModal = ({ isOpen, onClose, onAdd }: AddProgrammeModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    machine: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    status: 'Push',
    description: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.machine || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    const newProgramme = {
      id: `PROG-${String(Date.now()).slice(-3)}`,
      name: formData.name,
      machine: formData.machine,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      progress: 0,
      priority: formData.priority,
      description: formData.description
    };

    onAdd(newProgramme);
    setFormData({ name: '', machine: '', startDate: '', endDate: '', priority: 'Medium', status: 'Push', description: '' });
    onClose();
    toast.success('Programme added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Programme</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Programme Name *</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter programme name"
            />
          </div>
          <div>
            <Label>Machine *</Label>
            <Select value={formData.machine} onValueChange={(value) => setFormData({...formData, machine: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Loom-A1">Loom-A1</SelectItem>
                <SelectItem value="Loom-B2">Loom-B2</SelectItem>
                <SelectItem value="Loom-C3">Loom-C3</SelectItem>
                <SelectItem value="Loom-D4">Loom-D4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Start Date *</Label>
              <Input 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label>End Date *</Label>
              <Input 
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Push">Push</SelectItem>
                  <SelectItem value="Running">Running</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter programme description"
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Programme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProgrammeModal;
