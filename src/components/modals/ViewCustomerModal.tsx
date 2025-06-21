
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Mail, Phone, Building, MapPin, FileText } from 'lucide-react';

interface ViewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}

const ViewCustomerModal = ({ isOpen, onClose, customer }: ViewCustomerModalProps) => {
  if (!customer) return null;

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Customer Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              <h3 className="font-semibold text-slate-800 text-lg">{customer.name}</h3>
              <p className="text-sm text-slate-600">ID: {customer.id}</p>
              <Badge className={getStatusColor(customer.status)} variant="outline">
                {customer.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            {customer.email && (
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{customer.email}</span>
              </div>
            )}
            
            {customer.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-sm">{customer.phone}</span>
              </div>
            )}
            
            {customer.company && (
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-purple-600" />
                <span className="text-sm">{customer.company}</span>
              </div>
            )}
            
            {customer.address && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-600 mt-1" />
                <span className="text-sm">{customer.address}</span>
              </div>
            )}
            
            {customer.notes && (
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 text-gray-600 mt-1" />
                <span className="text-sm">{customer.notes}</span>
              </div>
            )}
            
            {customer.createdDate && (
              <div className="text-xs text-gray-500 border-t pt-2">
                Created: {customer.createdDate}
              </div>
            )}
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

export default ViewCustomerModal;
