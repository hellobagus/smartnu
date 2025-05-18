import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Plus, Search, Filter, Heart, ShoppingBag } from 'lucide-react';

// Mock data for UMKM products
const mockProducts = [
  {
    id: '1',
    name: 'Keripik Singkong',
    image: 'https://images.pexels.com/photos/1278304/pexels-photo-1278304.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 15000,
    seller: 'UMKM Makmur Jaya',
    category: 'Makanan',
    location: 'Jakarta Selatan',
    isLiked: false
  },
  {
    id: '2',
    name: 'Tas Rajut Handmade',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 120000,
    seller: 'Rajut Berkah',
    category: 'Kerajinan',
    location: 'Jakarta Timur',
    isLiked: true
  },
  {
    id: '3',
    name: 'Sambal Bawang',
    image: 'https://images.pexels.com/photos/674484/pexels-photo-674484.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 25000,
    seller: 'Dapur Bu Siti',
    category: 'Makanan',
    location: 'Jakarta Pusat',
    isLiked: false
  },
  {
    id: '4',
    name: 'Batik Tulis',
    image: 'https://images.pexels.com/photos/2365118/pexels-photo-2365118.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 350000,
    seller: 'Batik Nusantara',
    category: 'Fashion',
    location: 'Jakarta Barat',
    isLiked: true
  },
  {
    id: '5',
    name: 'Yoghurt Homemade',
    image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 30000,
    seller: 'Yoghurt Sehat',
    category: 'Makanan',
    location: 'Jakarta Selatan',
    isLiked: false
  },
  {
    id: '6',
    name: 'Jamu Tradisional',
    image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 18000,
    seller: 'Jamu Herbal',
    category: 'Minuman',
    location: 'Jakarta Timur',
    isLiked: false
  }
];

// Categories
const categories = [
  'Semua', 
  'Makanan', 
  'Minuman', 
  'Kerajinan', 
  'Fashion', 
  'Kesehatan'
];

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [products, setProducts] = useState(mockProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    seller: '',
    location: '',
    contact: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would send to API
    console.log('Adding new product:', formData);
    setShowAddModal(false);
    // Reset form
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      seller: '',
      location: '',
      contact: '',
    });
  };
  
  const toggleLike = (id: string) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, isLiked: !product.isLiked } 
        : product
    ));
  };
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'Semua' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout title="Produk UMKM">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Produk UMKM</h2>
          <p className="text-gray-600 mt-1">Jelajahi produk-produk dari UMKM anggota koperasi</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          Tambah Produk
        </Button>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Cari produk UMKM..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              icon={<Filter size={16} />}
              className="sm:hidden"
            >
              Filter
            </Button>
            
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative pb-[60%] overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button 
                className={`absolute top-3 right-3 p-2 rounded-full ${
                  product.isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-white text-gray-500 hover:text-red-500'
                }`}
                onClick={() => toggleLike(product.id)}
              >
                <Heart 
                  size={18} 
                  fill={product.isLiked ? 'currentColor' : 'none'} 
                />
              </button>
              <Badge 
                variant="primary" 
                className="absolute bottom-3 left-3"
              >
                {product.category}
              </Badge>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-blue-600 font-medium mt-1">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <ShoppingBag size={16} className="mr-1" />
                {product.seller}
              </div>
              
              <p className="text-sm text-gray-500 mt-1">
                {product.location}
              </p>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
              >
                Lihat Detail
              </Button>
            </div>
          </Card>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Tidak ada produk ditemukan</p>
          </div>
        )}
      </div>
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={() => setShowAddModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tambah Produk UMKM</h3>
                
                <form onSubmit={handleAddProduct}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="Nama Produk"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Harga (Rp)"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Kategori"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Nama UMKM"
                      name="seller"
                      value={formData.seller}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Lokasi"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Kontak"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Deskripsi Produk"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <Button 
                      type="submit"
                      variant="primary"
                      className="w-full sm:ml-3 sm:w-auto"
                    >
                      Simpan
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      className="mt-3 w-full sm:mt-0 sm:w-auto"
                      onClick={() => setShowAddModal(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductsPage;