import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}

const AddStockModal = ({ isOpen, onClose, onAdd }: AddStockModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    price: '',
    minStock: '',
    image: 'https://images.unsplash.com/photo-1586380951230-8a2f57e8c7d9?w=400'
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.quantity || !formData.price) {
      toast.error('Please fill all required fields');
      return;
    }

    const newItem = {
      id: Date.now(),
      productId: `STK-${String(Date.now()).slice(-4)}`,
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      minStock: parseInt(formData.minStock) || 10,
      unit: formData.unit,
      price: parseFloat(formData.price),
      lastUpdated: new Date().toISOString().split('T')[0],
      status: parseInt(formData.quantity) > (parseInt(formData.minStock) || 10) ? 'In Stock' : 'Low Stock',
      image: formData.image
    };

    onAdd(newItem);
    setFormData({ name: '', category: '', quantity: '', unit: '', price: '', minStock: '', image: 'https://images.unsplash.com/photo-1586380951230-8a2f57e8c7d9?w=400' });
    onClose();
    toast.success('Stock item added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Stock Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Item Name *</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter item name"
            />
          </div>
          <div>
            <Label>Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                <SelectItem value="Components">Components</SelectItem>
                <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                <SelectItem value="Packaging">Packaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Quantity *</Label>
              <Input 
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Unit</Label>
              <Input 
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                placeholder="kg, pieces, etc"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Unit Price *</Label>
              <Input 
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Min Stock</Label>
              <Input 
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                placeholder="10"
              />
            </div>
          </div>
          <div>
            <Label>Image URL</Label>
            <Input 
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="Enter image URL"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStockModal;
