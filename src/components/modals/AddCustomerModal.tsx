
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customer: any) => void;
}

const AddCustomerModal = ({ isOpen, onClose, onAdd }: AddCustomerModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    const newCustomer = {
      id: `CUST-${String(Date.now()).slice(-4)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      address: formData.address,
      notes: formData.notes,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    onAdd(newCustomer);
    setFormData({ name: '', email: '', phone: '', company: '', address: '', notes: '' });
    onClose();
    toast.success('Customer added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Customer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Customer Name *</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <Label>Email *</Label>
            <Input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label>Phone *</Label>
            <Input 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label>Company</Label>
            <Input 
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Textarea 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter address"
              rows={2}
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
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerModal;
