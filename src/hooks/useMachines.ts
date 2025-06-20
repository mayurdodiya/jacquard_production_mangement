
import { useState } from 'react';

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

interface FormData {
  machineId: string;
  name: string;
  type: string;
  status: string;
  currentProgramme: string;
  assignedTo: string;
  efficiency: number;
}

const initialMachines: Machine[] = [
  {
    id: 1,
    machineId: 'M001',
    name: 'Weaving Machine 1',
    type: 'Weaving',
    status: 'Running',
    currentProgramme: 'Cotton Fabric Pattern A',
    assignedTo: 'You',
    estimatedCompletion: '2024-01-21 14:00',
    efficiency: 95,
    lastMaintenanceDate: '2024-01-15',
    operatingHours: '6.5 hrs today'
  },
  {
    id: 2,
    machineId: 'M002',
    name: 'Dyeing Machine 1',
    type: 'Dyeing',
    status: 'Idle',
    currentProgramme: 'None',
    assignedTo: 'Available',
    estimatedCompletion: 'N/A',
    efficiency: 88,
    lastMaintenanceDate: '2024-01-10',
    operatingHours: '0 hrs today'
  },
  {
    id: 3,
    machineId: 'M003',
    name: 'Cutting Machine 1',
    type: 'Cutting',
    status: 'Running',
    currentProgramme: 'Shirt Pattern Cut',
    assignedTo: 'John Smith',
    estimatedCompletion: '2024-01-21 16:30',
    efficiency: 92,
    lastMaintenanceDate: '2024-01-20',
    operatingHours: '4.2 hrs today'
  },
  {
    id: 4,
    machineId: 'M004',
    name: 'Stitching Machine 1',
    type: 'Stitching',
    status: 'Maintenance',
    currentProgramme: 'None',
    assignedTo: 'Maintenance Team',
    estimatedCompletion: 'N/A',
    efficiency: 97,
    lastMaintenanceDate: '2024-01-20',
    operatingHours: '0 hrs today'
  },
  {
    id: 5,
    machineId: 'M005',
    name: 'Weaving Machine 2',
    type: 'Weaving',
    status: 'Running',
    currentProgramme: 'Silk Weaving Pattern',
    assignedTo: 'Jane Doe',
    estimatedCompletion: '2024-01-22 10:00',
    efficiency: 94,
    lastMaintenanceDate: '2024-01-12',
    operatingHours: '7.8 hrs today'
  }
];

const initialFormData: FormData = {
  machineId: '',
  name: '',
  type: '',
  status: 'Idle',
  currentProgramme: '',
  assignedTo: '',
  efficiency: 0
};

export const useMachines = () => {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleAdd = () => {
    const newMachine: Machine = {
      id: Date.now(),
      ...formData,
      estimatedCompletion: 'N/A',
      lastMaintenanceDate: new Date().toISOString().split('T')[0],
      operatingHours: '0 hrs today'
    };
    setMachines([...machines, newMachine]);
    setIsAddDialogOpen(false);
    setFormData(initialFormData);
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormData(machine);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedMachine) return;
    setMachines(machines.map(machine => 
      machine.id === selectedMachine.id ? { ...machine, ...formData } : machine
    ));
    setIsEditDialogOpen(false);
    setSelectedMachine(null);
  };

  const handleDelete = (id: number) => {
    setMachines(machines.filter(machine => machine.id !== id));
  };

  const handleAssign = (machineId: number) => {
    setMachines(machines.map(machine =>
      machine.id === machineId ? { ...machine, assignedTo: 'You' } : machine
    ));
  };

  const filteredMachines = machines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: machines.length,
    running: machines.filter(machine => machine.status === 'Running').length,
    myMachines: machines.filter(machine => machine.assignedTo === 'You').length,
    idleAndMaintenance: machines.filter(machine => machine.status === 'Idle' || machine.status === 'Maintenance').length
  };

  return {
    machines: filteredMachines,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    formData,
    setFormData,
    stats,
    handleAdd,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleAssign
  };
};
