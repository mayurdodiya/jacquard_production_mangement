import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Search, AlertTriangle, TrendingUp, TrendingDown, Edit } from "lucide-react";
import AddStockModal from "@/components/modals/AddStockModal";
import { toast } from "sonner";
import EditStockModal from "@/components/modals/EditStockModal";
import ViewStockModal from "./ViewStockModal";

const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      productId: "STK-001",
      name: "Raw Material A",
      category: "Raw Materials",
      quantity: 150,
      minStock: 50,
      unit: "kg",
      price: 25.5,
      lastUpdated: "2024-01-15",
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1586380951230-8a2f57e8c7d9?w=400",
    },
    {
      id: 2,
      productId: "STK-002",
      name: "Component B",
      category: "Components",
      quantity: 25,
      minStock: 30,
      unit: "pieces",
      price: 120.0,
      lastUpdated: "2024-01-14",
      status: "Low Stock",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    },
    {
      id: 3,
      productId: "STK-003",
      name: "Finished Product C",
      category: "Finished Goods",
      quantity: 200,
      minStock: 100,
      unit: "units",
      price: 450.0,
      lastUpdated: "2024-01-16",
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
    },
    {
      id: 4,
      productId: "STK-004",
      name: "Packaging Material",
      category: "Packaging",
      quantity: 5,
      minStock: 20,
      unit: "boxes",
      price: 15.75,
      lastUpdated: "2024-01-13",
      status: "Critical",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    },
    {
      id: 1,
      productId: "STK-001",
      name: "Raw Material A",
      category: "Raw Materials",
      quantity: 150,
      minStock: 50,
      unit: "kg",
      price: 25.5,
      lastUpdated: "2024-01-15",
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1586380951230-8a2f57e8c7d9?w=400",
    },
    {
      id: 2,
      productId: "STK-002",
      name: "Component B",
      category: "Components",
      quantity: 25,
      minStock: 30,
      unit: "pieces",
      price: 120.0,
      lastUpdated: "2024-01-14",
      status: "Low Stock",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    },
    {
      id: 3,
      productId: "STK-003",
      name: "Finished Product C",
      category: "Finished Goods",
      quantity: 200,
      minStock: 100,
      unit: "units",
      price: 450.0,
      lastUpdated: "2024-01-16",
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
    },
    {
      id: 4,
      productId: "STK-004",
      name: "Packaging Material",
      category: "Packaging",
      quantity: 5,
      minStock: 20,
      unit: "boxes",
      price: 15.75,
      lastUpdated: "2024-01-13",
      status: "Critical",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddStock = (newItem: any) => {
    setStockItems([newItem, ...stockItems]);
  };

  const handleEditStock = (itemId: number) => {
    const item = stockItems.find((item) => item.id === itemId);
    setSelectedStockItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateStock = (updatedItem: any) => {
    setStockItems(stockItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleViewStock = (item: any) => {
    setSelectedStockItem(item);
    setIsViewModalOpen(true);
  };

  const filteredItems = stockItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.productId.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-600">Monitor and manage your inventory</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Stock Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockItems.length}</div>
            <p className="text-xs text-muted-foreground">Items in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockItems.filter((item) => item.status === "Low Stock" || item.status === "Critical").length}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stockItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Total inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockItems.filter((item) => item.status === "Critical").length}</div>
            <p className="text-xs text-muted-foreground">Items critically low</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Items</CardTitle>
          <CardDescription>Manage your inventory items</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input placeholder="Search stock items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full px-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              {filteredItems.map((item) => (
                <Card key={item.id} onClick={() => handleViewStock(item)} className="w-full h-full border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-2 flex flex-col justify-between h-full">
                    {/* Top Content */}
                    <div>
                      <div className="w-full h-[120px] overflow-hidden rounded-md mb-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-gray-800 break-words w-[70%]">{item.name}</h3>
                          <Badge className={`text-xs px-2 py-0.5 whitespace-nowrap ${getStatusColor(item.status)}`}>{item.status}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">ID: {item.productId}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="mt-4">
                      {/* Price & Quantity pinned just above the button */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold">${item.price}</span>
                        <span className="text-xs text-gray-500">
                          {item.quantity} {item.unit}
                          {item.quantity <= item.minStock && <AlertTriangle className="w-3 h-3 text-yellow-600 inline ml-1" />}
                        </span>
                      </div>

                      {/* Edit Button */}
                      {
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStock(item.id);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      }
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <AddStockModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddStock} />
      <EditStockModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onEdit={handleUpdateStock} stockItem={selectedStockItem} />
      <ViewStockModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} stockItem={selectedStockItem} />
    </div>
  );
};

export default StockManagement;
