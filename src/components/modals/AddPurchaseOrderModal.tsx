
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddPurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (order: any) => void;
}

const AddPurchaseOrderModal = ({ isOpen, onClose, onAdd }: AddPurchaseOrderModalProps) => {
  const [formData, setFormData] = useState({
    supplier: '',
    products: '',
    totalAmount: '',
    priority: 'Medium',
    expectedDate: ''
  });

  const handleSubmit = () => {
    if (!formData.supplier || !formData.products || !formData.totalAmount) {
      toast.error('Please fill all required fields');
      return;
    }

    const newOrder = {
      id: `PO-${String(Date.now()).slice(-3)}`,
      supplier: formData.supplier,
      products: formData.products.split(',').map(p => p.trim()),
      totalAmount: parseInt(formData.totalAmount),
      status: 'Pending',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: formData.expectedDate,
      priority: formData.priority
    };

    onAdd(newOrder);
    setFormData({ supplier: '', products: '', totalAmount: '', priority: 'Medium', expectedDate: '' });
    onClose();
    toast.success('Purchase order created successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Purchase Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Supplier Name *</Label>
            <Input 
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
              placeholder="Enter supplier name"
            />
          </div>
          <div>
            <Label>Products (comma separated) *</Label>
            <Input 
              value={formData.products}
              onChange={(e) => setFormData({...formData, products: e.target.value})}
              placeholder="Product 1, Product 2, Product 3"
            />
          </div>
          <div>
            <Label>Total Amount *</Label>
            <Input 
              type="number"
              value={formData.totalAmount}
              onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
              placeholder="Enter total amount"
            />
          </div>
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
            <Label>Expected Date</Label>
            <Input 
              type="date"
              value={formData.expectedDate}
              onChange={(e) => setFormData({...formData, expectedDate: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchaseOrderModal;
