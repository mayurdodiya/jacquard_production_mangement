import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Package,
  TrendingUp,
  Clock,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import AddPurchaseOrderModal from "@/components/modals/AddPurchaseOrderModal";
import EditPurchaseOrderModal from "@/components/modals/EditPurchaseOrderModal";
import { toast } from 'sonner';

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  status: "Active" | "Inactive" | "Pending";
  employees: number;
  joinedDate: string;
}

const PurchaseOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    industry: "",
    status: "Active" as "Active" | "Inactive" | "Pending",
    product: "",
  });
  const handleAdd = () => {
    const newCompany: Company = {
      id: Date.now().toString(),
      ...formData,
      employees: 0,
      joinedDate: new Date().toISOString().split("T")[0],
    };
    // setCompanies([...companies, newCompany]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      industry: "",
      status: "Active",
      product: "",
    });
    setIsAddDialogOpen(false);
  };

  const [orders, setOrders] = useState([
    {
      id: "PO-001",
      supplier: "Raw Material Suppliers Ltd.",
      products: ["Cotton Thread", "Polyester Fabric"],
      totalAmount: 15000,
      status: "Pending",
      orderDate: "2024-01-15",
      expectedDate: "2024-01-25",
      priority: "High",
    },
    {
      id: "PO-002",
      supplier: "Chemical Industries Inc.",
      products: ["Dye Solution", "Bleach Powder"],
      totalAmount: 8500,
      status: "In Progress",
      orderDate: "2024-01-14",
      expectedDate: "2024-01-22",
      priority: "Medium",
    },
    {
      id: "PO-003",
      supplier: "Machinery Parts Co.",
      products: ["Loom Parts", "Motor Components"],
      totalAmount: 25000,
      status: "Stored",
      orderDate: "2024-01-10",
      expectedDate: "2024-01-20",
      priority: "Low",
    },
    {
      id: "PO-004",
      supplier: "Packaging Solutions",
      products: ["Boxes", "Labels", "Tape"],
      totalAmount: 3200,
      status: "Stored",
      orderDate: "2024-01-12",
      expectedDate: "2024-01-18",
      priority: "Medium",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stored":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const handleAddOrder = () => {
    console.log("Add new purchase order");
  };

  const handleUpdateOrder = (updatedOrder: any) => {
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const handleEditOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleGenerateInvoice = (orderId: string) => {
    console.log("Generate invoice for:", orderId);
    toast.success("Invoice generated successfully");
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log("Delete order:", orderId);
  };

  const handleViewOrder = (orderId: string) => {
    console.log("View order details:", orderId);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesDate = !dateFilter || order.orderDate.includes(dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Purchase Orders</h1>
          <p className="text-slate-600 mt-1">
            Manage your purchase orders and inventory
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Purchase Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Orders
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {orders.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Orders
            </CardTitle>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">
              {orders.filter((o) => o.status === "Pending").length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              In Progress
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {orders.filter((o) => o.status === "In Progress").length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Being processed</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Value
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              $
              {orders
                .reduce((sum, o) => sum + o.totalAmount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">
            Purchase Orders
          </CardTitle>
          <CardDescription className="text-slate-600">
            Track and manage your purchase orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search orders by ID or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md focus:border-blue-500 focus:ring-blue-500/20"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Stored">Stored</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800">
                        {order.id}
                      </h3>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-1">{order.supplier}</p>
                    <p className="text-sm text-slate-500">
                      Products: {order.products.join(", ")}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span>Ordered: {order.orderDate}</span>
                      <span>Expected: {order.expectedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 lg:mt-0">
                  <div className="text-right">
                    <p className="font-semibold text-lg text-slate-800">
                      ${order.totalAmount.toLocaleString()}
                    </p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order.id)}
                      className="border-slate-200 hover:bg-slate-50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditOrder(order.id)}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateInvoice(order.id)}
                      className="border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      {/* {
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[525px] rounded-lg bg-white shadow-xl p-6">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Add Employee
              </DialogTitle>
              <DialogDescription>
                Register a new employee in the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Company Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Enter company name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="company@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="+1-555-0123"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Company address"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Active" | "Inactive" | "Pending") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Product
                </Label>
                <Select
                  value={formData.product}
                  onValueChange={(value) =>
                    setFormData({ ...formData, product: value })
                  }
                >
                  <SelectTrigger
                    id="product"
                    className="col-span-3 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 rounded-md shadow-lg">
                    <SelectItem
                      value="Cotton Thread"
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                    >
                      Cotton Thread
                    </SelectItem>
                    <SelectItem
                      value="Polyester Fabric"
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                    >
                      Polyester Fabric
                    </SelectItem>
                    <SelectItem
                      value="Dye Solution"
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                    >
                      Dye Solution
                    </SelectItem>
                    <SelectItem
                      value="Motor Components"
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                    >
                      Motor Components
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      } */}

      {/* PopUp Modals */}
      <AddPurchaseOrderModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddOrder}
      />

      <EditPurchaseOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleUpdateOrder}
        order={selectedOrder}
      />
    </div>
  );
};

export default PurchaseOrders;
