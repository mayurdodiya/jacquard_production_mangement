
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package, DollarSign, Calendar, AlertTriangle } from 'lucide-react';

interface ViewStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItem: any;
}

const ViewStockModal = ({ isOpen, onClose, stockItem }: ViewStockModalProps) => {
  if (!stockItem) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Stock Item Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-square mb-4 overflow-hidden rounded-lg">
            <img 
              src={stockItem.image} 
              alt={stockItem.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              <h3 className="font-semibold text-slate-800 text-lg">{stockItem.name}</h3>
              <p className="text-sm text-slate-600">ID: {stockItem.productId}</p>
              <Badge className={getStatusColor(stockItem.status)} variant="outline">
                {stockItem.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Category: {stockItem.category}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4 text-green-600" />
              <span className="text-sm">Quantity: {stockItem.quantity} {stockItem.unit}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm">Min Stock: {stockItem.minStock} {stockItem.unit}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span className="text-sm">Unit Price: ${stockItem.price}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 w-4 text-gray-600" />
              <span className="text-sm">Last Updated: {stockItem.lastUpdated}</span>
            </div>
            
            <div className="text-xs text-gray-500 border-t pt-2">
              Total Value: ${(stockItem.quantity * stockItem.price).toFixed(2)}
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

export default ViewStockModal;
