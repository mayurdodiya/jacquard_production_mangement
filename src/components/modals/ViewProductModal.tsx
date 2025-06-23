
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package2, DollarSign, Hash } from 'lucide-react';

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ViewProductModal = ({ isOpen, onClose, product }: ViewProductModalProps) => {
  if (!product) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Product Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-square mb-4 overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              <h3 className="font-semibold text-slate-800 text-lg">{product.name}</h3>
              <p className="text-sm text-slate-600">ID: {product.id}</p>
              <Badge className={getStatusColor(product.status)} variant="outline">
                {product.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Package2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Category: {product.category}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm">Price: ${product.price}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Hash className="w-4 h-4 text-purple-600" />
              <span className="text-sm">Stock: {product.stock}</span>
            </div>
            
            {product.description && (
              <div className="border-t pt-2">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            )}
            
            <div className="text-xs text-gray-500 border-t pt-2">
              Total Value: ${(product.price * product.stock).toFixed(2)}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-gradient-to-r from-blue-600 to-indigo-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductModal;
