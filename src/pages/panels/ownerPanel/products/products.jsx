import React, { useState, useEffect } from 'react';
import { Plus, Package, Search, Filter, SortAsc } from 'lucide-react';
import { useProducts } from '../../../../contexts/ProductContext';
import { toast } from 'react-hot-toast';
import ProductForm from './ProductForm';
import ProductCard from './ProductCard';

const ProductManagement = () => {
    const { 
        products, 
        loading, 
        error, 
        fetchProducts, 
        createProduct, 
        updateProduct, 
        deleteProduct, 
        recordProductSale 
    } = useProducts();
    
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddProduct = async (productData) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct._id, productData);
                toast.success('Product updated successfully!');
            } else {
                await createProduct(productData);
                toast.success('Product created successfully!');
            }
        } catch (err) {
            toast.error('Failed to save product');
        }
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                toast.success('Product deleted successfully!');
            } catch (err) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleRecordSale = async (productId, saleData) => {
        try {
            await recordProductSale(productId, saleData);
            toast.success('Sale recorded successfully!');
        } catch (err) {
            toast.error('Failed to record sale');
        }
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
                case 'margin': return b.margin - a.margin;
                default: return a.name.localeCompare(b.name);
            }
        });

    const categories = [...new Set(products.map(p => p.category))];

    if (loading && products.length === 0) {
        return (
            <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error && products.length === 0) {
        return (
            <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)] flex items-center justify-center">
                <div className="text-center bg-red-100 p-6 rounded-xl max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Products</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
            <div className='container-fluid'>
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

                <div className="mb-4">
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
                                <option value="margin">Sort by Margin</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading && products.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-lg flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                        <span>Updating products...</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onRecordSale={handleRecordSale}
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