
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface EditProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (production: any) => void;
  production: any;
}

const EditProductionModal = ({ isOpen, onClose, onEdit, production }: EditProductionModalProps) => {
  const [formData, setFormData] = useState({
    productName: '',
    batchNumber: '',
    quantity: '',
    targetDate: '',
    priority: 'Medium',
    assignedTeam: '',
    notes: '',
    status: 'Planned'
  });

  useEffect(() => {
    if (production) {
      setFormData({
        productName: production.productName || '',
        batchNumber: production.batchNumber || '',
        quantity: production.quantity?.toString() || '',
        targetDate: production.targetDate || '',
        priority: production.priority || 'Medium',
        assignedTeam: production.assignedTeam || '',
        notes: production.notes || '',
        status: production.status || 'Planned'
      });
    }
  }, [production]);

  const handleSubmit = () => {
    if (!formData.productName || !formData.batchNumber || !formData.quantity) {
      toast.error('Please fill all required fields');
      return;
    }

    const updatedProduction = {
      ...production,
      productName: formData.productName,
      batchNumber: formData.batchNumber,
      quantity: parseInt(formData.quantity),
      targetDate: formData.targetDate,
      priority: formData.priority,
      assignedTeam: formData.assignedTeam,
      notes: formData.notes,
      status: formData.status
    };

    onEdit(updatedProduction);
    onClose();
    toast.success('Production order updated successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Production Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Product Name *</Label>
            <Input 
              value={formData.productName}
              onChange={(e) => setFormData({...formData, productName: e.target.value})}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label>Batch Number *</Label>
            <Input 
              value={formData.batchNumber}
              onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
              placeholder="Enter batch number"
            />
          </div>
          <div>
            <Label>Quantity *</Label>
            <Input 
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <Label>Target Date</Label>
            <Input 
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
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
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Assigned Team</Label>
            <Input 
              value={formData.assignedTeam}
              onChange={(e) => setFormData({...formData, assignedTeam: e.target.value})}
              placeholder="Enter team name"
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
            Update Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductionModal;
