
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Play, Activity, Pause } from 'lucide-react';

interface MachineStatsCardsProps {
  totalMachines: number;
  runningMachines: number;
  myMachines: number;
  idleAndMaintenanceMachines: number;
}

const MachineStatsCards = ({ 
  totalMachines, 
  runningMachines, 
  myMachines, 
  idleAndMaintenanceMachines 
}: MachineStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Total Machines</CardTitle>
          <Settings className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{totalMachines}</div>
          <p className="text-xs text-slate-500">All machines</p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Running</CardTitle>
          <Play className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{runningMachines}</div>
          <p className="text-xs text-slate-500">Currently active</p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">My Machines</CardTitle>
          <Activity className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{myMachines}</div>
          <p className="text-xs text-slate-500">Assigned to you</p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Idle/Maintenance</CardTitle>
          <Pause className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{idleAndMaintenanceMachines}</div>
          <p className="text-xs text-slate-500">Not in production</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineStatsCards;
