import React, { useState } from 'react';
import {
    Plus, Package, Search, Filter, SortAsc,
    Share2, Heart, Edit2, Trash2, TrendingUp,
    ShoppingCart, Tag, BarChart2, Calendar,
    Clock, DollarSign, Percent, Box
} from 'lucide-react';

// Initial product data
const initialProducts = [
    {
        id: 1,
        name: "Premium Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics",
        price: 199.99,
        stock: 45,
        discount: 10,
        status: "In Stock",
        tags: ["Featured", "New Arrival"],
        salesCount: 156,
        lastUpdated: "2024-02-12",
        revenue: 31156,
        rating: 4.5,
        imageUrl: "/api/placeholder/300/300"
    },
    // Add more sample products here
];

// ProductForm Component
const ProductForm = ({ onClose, onAddProduct, editProduct = null }) => {
    const [formData, setFormData] = useState(editProduct || {
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        discount: '',
        status: 'In Stock',
        tags: [],
        salesCount: 0,
        revenue: 0,
        rating: 0,
        imageUrl: '/api/placeholder/300/300'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProduct({
            ...formData,
            id: editProduct ? editProduct.id : Date.now(),
            lastUpdated: new Date().toISOString().split('T')[0]
        });
        onClose();
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            e.preventDefault();
            setFormData({
                ...formData,
                tags: [...(formData.tags || []), e.target.value]
            });
            e.target.value = '';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <input
                            type="text"
                            placeholder="Press Enter to add tags"
                            onKeyPress={handleTagInput}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags?.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        {editProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const ProductCard = ({ product, onEdit, onDelete }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="bg-white hover:bg-gray-100 transition-colors duration-200 rounded-2xl p-6 shadow-lg hover:shadow-xl">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-gray-500 text-sm">{product.category}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Heart
                        className={`cursor-pointer transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                        size={20}
                        onClick={() => setIsLiked(!isLiked)}
                    />
                    <Edit2
                        className="text-gray-400 hover:text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => onEdit(product)}
                    />
                    <Trash2
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => onDelete(product.id)}
                    />
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {product.tags?.map((tag, index) => (
                    <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="font-bold">${product.price}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Box size={16} className="text-gray-400" />
                    <span>{product.stock} in stock</span>
                </div>
                <div className="flex items-center gap-2">
                    <Percent size={16} className="text-gray-400" />
                    <span>{product.discount}% off</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShoppingCart size={16} className="text-gray-400" />
                    <span>{product.salesCount} sold</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex items-center text-green-500">
                    <TrendingUp size={18} />
                    <span className="ml-1 font-semibold">${product.revenue}</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>Updated {product.lastUpdated}</span>
                </div>
            </div>
        </div>
    );
};

const ProductManagement = () => {
    const [products, setProducts] = useState(initialProducts);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const handleAddProduct = (newProduct) => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
            setEditingProduct(null);
        } else {
            setProducts([...products, newProduct]);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = (productId) => {
        setProducts(products.filter(p => p.id !== productId));
    };

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(product =>
            filterCategory ? product.category === filterCategory : true
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'price': return a.price - b.price;
                case 'sales': return b.salesCount - a.salesCount;
                case 'revenue': return b.revenue - a.revenue;
                default: return a.name.localeCompare(b.name);
            }
        });

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
            <div className=' container-fluid'>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Products Overview</h1>
                        <p className="text-gray-500">Manage your product inventory</p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={20} />
                        <span>Add Product</span>
                    </button>
                </div>

                <div className=" mb-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="sales">Sort by Sales</option>
                                <option value="revenue">Sort by Revenue</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <Package size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600">No products found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {showForm && (
                    <ProductForm
                        onClose={() => {
                            setShowForm(false);
                            setEditingProduct(null);
                        }}
                        onAddProduct={handleAddProduct}
                        editProduct={editingProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductManagement;