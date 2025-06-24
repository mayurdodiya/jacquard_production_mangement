
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    image: ''
  });

  const categories = ['Apparel', 'Accessories', 'Outerwear', 'Knitwear', 'Footwear', 'Other'];

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Please fill all required fields');
      return;
    }

    const newProduct = {
      id: `PRD-${String(Date.now()).slice(-3)}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: parseInt(formData.stock) > 0 ? 'Active' : 'Out of Stock',
      image: formData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
    };

    onAdd(newProduct);
    setFormData({ name: '', description: '', category: '', price: '', stock: '', status: 'Active', image: '' });
    onClose();
    toast.success('Product added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Product Name *</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label>Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Price *</Label>
              <Input 
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Stock *</Label>
              <Input 
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <Label>Image URL</Label>
            <Input 
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter product description"
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
