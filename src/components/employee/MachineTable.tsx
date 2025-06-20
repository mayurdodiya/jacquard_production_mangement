
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, UserPlus, Play, Pause, Settings, Activity } from 'lucide-react';

interface Machine {
  id: number;
  machineId: string;
  name: string;
  type: string;
  status: string;
  currentProgramme: string;
  assignedTo: string;
  estimatedCompletion: string;
  efficiency: number;
  lastMaintenanceDate: string;
  operatingHours: string;
}

interface MachineTableProps {
  machines: Machine[];
  onEdit: (machine: Machine) => void;
  onDelete: (id: number) => void;
  onAssign: (machineId: number) => void;
}

const MachineTable = ({ machines, onEdit, onDelete, onAssign }: MachineTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-800 border-green-200';
      case 'Idle': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Maintenance': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running': return <Play className="w-4 h-4 text-green-600" />;
      case 'Idle': return <Pause className="w-4 h-4 text-blue-600" />;
      case 'Maintenance': return <Settings className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600 font-semibold';
    if (efficiency >= 85) return 'text-blue-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left p-3 font-semibold text-slate-700">Machine</th>
            <th className="text-left p-3 font-semibold text-slate-700">Type</th>
            <th className="text-left p-3 font-semibold text-slate-700">Status</th>
            <th className="text-left p-3 font-semibold text-slate-700">Programme</th>
            <th className="text-left p-3 font-semibold text-slate-700">Assigned To</th>
            <th className="text-left p-3 font-semibold text-slate-700">Efficiency</th>
            <th className="text-left p-3 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${machine.assignedTo === 'You' ? 'bg-blue-50/50' : ''}`}>
              <td className="p-3">
                <div className="flex items-center">
                  {getStatusIcon(machine.status)}
                  <div className="ml-3">
                    <div className="font-medium text-slate-800">{machine.name}</div>
                    <div className="text-sm text-slate-500">{machine.machineId}</div>
                  </div>
                </div>
              </td>
              <td className="p-3 text-slate-700">{machine.type}</td>
              <td className="p-3">
                <Badge className={getStatusColor(machine.status)}>
                  {machine.status}
                </Badge>
              </td>
              <td className="p-3 text-slate-700">{machine.currentProgramme || 'None'}</td>
              <td className="p-3">
                <span className={machine.assignedTo === 'You' ? 'font-medium text-blue-600' : 'text-slate-700'}>
                  {machine.assignedTo}
                </span>
              </td>
              <td className="p-3">
                <span className={getEfficiencyColor(machine.efficiency)}>
                  {machine.efficiency}%
                </span>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(machine)}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onAssign(machine.id)}
                    className="border-green-200 text-green-600 hover:bg-green-50"
                    disabled={machine.assignedTo === 'You'}
                  >
                    <UserPlus className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDelete(machine.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineTable;
