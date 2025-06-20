
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FormData {
  machineId: string;
  name: string;
  type: string;
  status: string;
  currentProgramme: string;
  assignedTo: string;
  efficiency: number;
}

interface MachineFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onSubmit: () => void;
  submitButtonText: string;
  isEdit?: boolean;
}

const MachineFormDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  formData,
  onFormDataChange,
  onSubmit,
  submitButtonText,
  isEdit = false
}: MachineFormDialogProps) => {
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isEdit && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="machineId" className="text-right">Machine ID</Label>
              <Input
                id="machineId"
                value={formData.machineId}
                onChange={(e) => handleInputChange('machineId', e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weaving">Weaving</SelectItem>
                <SelectItem value="Dyeing">Dyeing</SelectItem>
                <SelectItem value="Cutting">Cutting</SelectItem>
                <SelectItem value="Stitching">Stitching</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isEdit && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Running">Running</SelectItem>
                    <SelectItem value="Idle">Idle</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="programme" className="text-right">Programme</Label>
                <Input
                  id="programme"
                  value={formData.currentProgramme}
                  onChange={(e) => handleInputChange('currentProgramme', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MachineFormDialog;
