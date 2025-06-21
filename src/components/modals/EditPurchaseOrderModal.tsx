
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface EditPurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (order: any) => void;
  order: any;
}

const EditPurchaseOrderModal = ({ isOpen, onClose, onEdit, order }: EditPurchaseOrderModalProps) => {
  const [formData, setFormData] = useState({
    supplier: '',
    products: '',
    totalAmount: '',
    priority: 'Medium',
    expectedDate: '',
    status: 'Pending'
  });

  useEffect(() => {
    if (order) {
      setFormData({
        supplier: order.supplier || '',
        products: Array.isArray(order.products) ? order.products.join(', ') : '',
        totalAmount: order.totalAmount?.toString() || '',
        priority: order.priority || 'Medium',
        expectedDate: order.expectedDate || '',
        status: order.status || 'Pending'
      });
    }
  }, [order]);

  const handleSubmit = () => {
    if (!formData.supplier || !formData.products || !formData.totalAmount) {
      toast.error('Please fill all required fields');
      return;
    }

    const updatedOrder = {
      ...order,
      supplier: formData.supplier,
      products: formData.products.split(',').map(p => p.trim()),
      totalAmount: parseInt(formData.totalAmount),
      priority: formData.priority,
      expectedDate: formData.expectedDate,
      status: formData.status
    };

    onEdit(updatedOrder);
    onClose();
    toast.success('Purchase order updated successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Purchase Order</DialogTitle>
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
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Stored">Stored</SelectItem>
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
            <Edit className="w-4 h-4 mr-2" />
            Update Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPurchaseOrderModal;
