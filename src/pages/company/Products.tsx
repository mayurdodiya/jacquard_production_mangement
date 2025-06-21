
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { 
  Package2, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 'PRD-001',
      name: 'Cotton Fabric',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
      description: 'High quality cotton fabric for textile manufacturing',
      category: 'Raw Material',
      price: 25.50,
      stock: 500,
      unit: 'yards'
    },
    {
      id: 'PRD-002',
      name: 'Polyester Thread',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      description: 'Durable polyester thread for industrial sewing',
      category: 'Material',
      price: 12.00,
      stock: 200,
      unit: 'spools'
    },
    {
      id: 'PRD-003',
      name: 'Dye Solution',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      description: 'Premium textile dye for fabric coloring',
      category: 'Chemical',
      price: 45.75,
      stock: 150,
      unit: 'liters'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    unit: ''
  });

  const handleAddProduct = () => {
    const newProduct = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };
    setProducts([...products, newProduct]);
    setFormData({ name: '', image: '', description: '', category: '', price: '', stock: '', unit: '' });
    setIsAddDialogOpen(false);
    toast.success('Product added successfully');
  };

  const handleEditProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id
        ? { ...product, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
        : product
    );
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
    setFormData({ name: '', image: '', description: '', category: '', price: '', stock: '', unit: '' });
    toast.success('Product updated successfully');
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    toast.success('Product deleted successfully');
  };

  const openEditDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit
    });
    setIsEditDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Product Management</h1>
          <p className="text-slate-600 mt-1">Manage your product catalog and inventory</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search products by name, ID, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-white/90 backdrop-blur-sm border-blue-100 hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-4">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-slate-800">{product.name}</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">{product.id}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">{product.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-slate-600 mb-4">
                {product.description}
              </CardDescription>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold text-slate-800">${product.price}</p>
                  <p className="text-sm text-slate-500">per {product.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Stock: {product.stock}</p>
                  <p className="text-xs text-slate-500">{product.unit}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openEditDialog(product)}
                  className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input 
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="Enter category"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input 
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Input 
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="e.g., pieces, kg"
                />
              </div>
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input 
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                placeholder="Enter stock quantity"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct} className="bg-gradient-to-r from-blue-600 to-indigo-700">
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input 
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="Enter category"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input 
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Input 
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="e.g., pieces, kg"
                />
              </div>
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input 
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                placeholder="Enter stock quantity"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditProduct} className="bg-gradient-to-r from-blue-600 to-indigo-700">
              Update Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
