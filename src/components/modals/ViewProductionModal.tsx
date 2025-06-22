
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package, Calendar, Users, FileText } from 'lucide-react';

interface ViewProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  production: any;
}

const ViewProductionModal = ({ isOpen, onClose, production }: ViewProductionModalProps) => {
  if (!production) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Production Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              <h3 className="font-semibold text-slate-800 text-lg">{production.productName}</h3>
              <p className="text-sm text-slate-600">ID: {production.id}</p>
              <div className="flex justify-center space-x-2 mt-2">
                <Badge className={getStatusColor(production.status)} variant="outline">
                  {production.status}
                </Badge>
                <Badge className={getPriorityColor(production.priority)} variant="outline">
                  {production.priority}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Batch: {production.batchNumber}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4 text-green-600" />
              <span className="text-sm">Quantity: {production.quantity}</span>
            </div>
            
            {production.targetDate && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Target Date: {production.targetDate}</span>
              </div>
            )}
            
            {production.assignedTeam && (
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-orange-600" />
                <span className="text-sm">Team: {production.assignedTeam}</span>
              </div>
            )}
            
            {production.notes && (
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 text-gray-600 mt-1" />
                <span className="text-sm">{production.notes}</span>
              </div>
            )}
            
            {production.createdDate && (
              <div className="text-xs text-gray-500 border-t pt-2">
                Created: {production.createdDate}
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

export default ViewProductionModal;
