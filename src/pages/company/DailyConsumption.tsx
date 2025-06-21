
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Zap, 
  Plus, 
  Search, 
  Calendar,
  Package,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';

const DailyConsumption = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock stock products data
  const [stockProducts] = useState([
    { id: 'PRD-001', name: 'Cotton Fabric', currentStock: 500, unit: 'yards' },
    { id: 'PRD-002', name: 'Polyester Thread', currentStock: 200, unit: 'spools' },
    { id: 'PRD-003', name: 'Dye Solution', currentStock: 150, unit: 'liters' },
  ]);

  // Mock consumption history
  const [consumptionHistory, setConsumptionHistory] = useState([
    {
      id: 1,
      date: '2024-01-20',
      productId: 'PRD-001',
      productName: 'Cotton Fabric',
      consumedQuantity: 50,
      unit: 'yards',
      consumedBy: 'Production Team A',
      remainingStock: 450
    },
    {
      id: 2,  
      date: '2024-01-20',
      productId: 'PRD-002',
      productName: 'Polyester Thread',
      consumedQuantity: 10,
      unit: 'spools',
      consumedBy: 'Production Team B',
      remainingStock: 190
    }
  ]);

  const [formData, setFormData] = useState({
    productId: '',
    consumedQuantity: '',
    consumedBy: ''
  });

  const handleAddConsumption = () => {
    const selectedProduct = stockProducts.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    const consumedQty = parseInt(formData.consumedQuantity);
    if (consumedQty > selectedProduct.currentStock) {
      toast.error('Consumption quantity exceeds available stock!');
      return;
    }

    const newConsumption = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      consumedQuantity: consumedQty,
      unit: selectedProduct.unit,
      consumedBy: formData.consumedBy,
      remainingStock: selectedProduct.currentStock - consumedQty
    };

    setConsumptionHistory([newConsumption, ...consumptionHistory]);
    setFormData({ productId: '', consumedQuantity: '', consumedBy: '' });
    setIsAddDialogOpen(false);
    toast.success('Daily consumption recorded successfully');
  };

  const filteredHistory = consumptionHistory.filter(record =>
    record.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.consumedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Daily Consumption</h1>
          <p className="text-slate-600 mt-1">Track daily material consumption from godown stock</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Consumption
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by product name or consumed by..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Consumption History */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Consumption History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Consumed Quantity</TableHead>
                <TableHead>Consumed By</TableHead>
                <TableHead>Remaining Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.productName}</p>
                      <p className="text-sm text-slate-500">{record.productId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <Minus className="w-3 h-3 mr-1" />
                      {record.consumedQuantity} {record.unit}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.consumedBy}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      {record.remainingStock} {record.unit}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Consumption Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Record Daily Consumption</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Product</Label>
              <Select value={formData.productId} onValueChange={(value) => setFormData({...formData, productId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose product from stock" />
                </SelectTrigger>
                <SelectContent>
                  {stockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Available: {product.currentStock} {product.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Consumed Quantity</Label>
              <Input 
                type="number"
                value={formData.consumedQuantity}
                onChange={(e) => setFormData({...formData, consumedQuantity: e.target.value})}
                placeholder="Enter quantity consumed"
              />
            </div>
            <div>
              <Label>Consumed By</Label>
              <Input 
                value={formData.consumedBy}
                onChange={(e) => setFormData({...formData, consumedBy: e.target.value})}
                placeholder="Enter team/employee name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddConsumption} className="bg-gradient-to-r from-blue-600 to-indigo-700">
              Record Consumption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyConsumption;
