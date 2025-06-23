import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Package2, 
  Plus, 
  Search, 
  QrCode,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import QRCodeModal from '@/components/modals/QRCodeModal';
import EditProductModal from '@/components/modals/EditProductModal';
import ViewProductModal from '@/components/modals/ViewProductModal';
import AddProductModal from '@/components/modals/AddProductModal';
import { toast } from 'sonner';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 'PRD-001',
      name: 'Premium Cotton T-Shirt',
      description: 'High-quality cotton t-shirt with premium finish',
      category: 'Apparel',
      price: 29.99,
      stock: 150,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
    },
    {
      id: 'PRD-002',
      name: 'Silk Scarf Collection',
      description: 'Elegant silk scarves in various colors and patterns',
      category: 'Accessories',
      price: 45.00,
      stock: 75,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'
    },
    {
      id: 'PRD-003',
      name: 'Denim Jacket',
      description: 'Classic denim jacket with modern fit',
      category: 'Outerwear',
      price: 79.99,
      stock: 25,
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
    },
    {
      id: 'PRD-004',
      name: 'Wool Sweater',
      description: 'Warm and comfortable wool sweater',
      category: 'Knitwear',
      price: 89.99,
      stock: 0,
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewQR = (product: any) => {
    setSelectedProduct(product);
    setIsQRModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);  
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);  
    setIsViewModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log('Delete product:', productId);
    toast.info('Delete product functionality - coming soon');
  };

  const handleAddProduct = (newProduct: any) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Products in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package2 className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.status === 'Low Stock').length}</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>View and manage all products</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewProduct(product)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">ID: {product.id}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${product.price}</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewQR(product);
                        }}
                        className="flex-1"
                      >
                        <QrCode className="w-4 h-4 mr-1" />
                        QR
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product.id);
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <QRCodeModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        product={selectedProduct || { id: '', name: '', image: '' }}
      />
      
      <EditProductModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleUpdateProduct}
        product={selectedProduct}
      />
      
      <ViewProductModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        product={selectedProduct}
      />

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default Products;
