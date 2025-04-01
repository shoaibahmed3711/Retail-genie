import React, { useState, useEffect, useRef } from 'react';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductForm = ({ onClose, onAddProduct, editProduct = null }) => {
    const [formData, setFormData] = useState(editProduct || {
        name: '',
        description: '',
        detailedDescription: '',
        category: '',
        price: '',
        cogs: '',
        margin: '',
        stock: '',
        discount: '',
        status: 'In Stock',
        tags: [],
        salesCount: 0,
        revenue: 0,
        rating: 0,
        imageUrl: '/api/placeholder/300/300',
        packaging: '',
        distributors: [],
        brokers: [],
        marketingChannels: []
    });
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(editProduct?.imageUrl || null);
    const fileInputRef = useRef(null);
    
    // Predefined categories
    const categories = [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Beauty',
        'Sports'
    ];

    useEffect(() => {
        if (editProduct) {
            setFormData(editProduct);
            setImagePreview(editProduct.imageUrl);
        }
    }, [editProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Validate required fields
            if (!formData.name?.trim()) {
                toast.error('Product name is required');
                return;
            }
            if (!formData.description?.trim()) {
                toast.error('Product description is required');
                return;
            }
            if (!formData.price || formData.price <= 0) {
                toast.error('Valid product price is required');
                return;
            }
            if (!formData.category?.trim()) {
                toast.error('Product category is required');
                return;
            }
            if (!formData.stock || formData.stock < 0) {
                toast.error('Valid stock quantity is required');
                return;
            }
            
            // Convert price and other numeric fields to proper numbers
            const numericFormData = {
                ...formData,
                price: Number(formData.price),
                cogs: formData.cogs ? Number(formData.cogs) : 0,
                stock: Number(formData.stock),
                discount: formData.discount ? Number(formData.discount) : 0
            };
    
            const calculatedMargin = numericFormData.price && numericFormData.cogs
                ? ((numericFormData.price - numericFormData.cogs) / numericFormData.price * 100).toFixed(2)
                : 0;
            
            // Create FormData for the image upload
            const formDataToSubmit = new FormData();
            
            // Add all the form fields to FormData, including calculated margin
            Object.entries({...numericFormData, margin: calculatedMargin}).forEach(([key, value]) => {
                // For arrays, we need to stringify them
                if (Array.isArray(value)) {
                    formDataToSubmit.append(key, JSON.stringify(value));
                } else {
                    formDataToSubmit.append(key, value);
                }
            });
            
            // Add the image file if selected
            if (selectedImage) {
                formDataToSubmit.append('productImage', selectedImage);
            }
            // Log the object content for debugging
            console.log('Submitting product:', Object.fromEntries(formDataToSubmit.entries()));
            
            // Submit the product data
            await onAddProduct(formDataToSubmit);
            
            toast.success(editProduct ? 'Product updated successfully!' : 'Product created successfully!');
            onClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to save product';
            toast.error(errorMessage);
            console.error('Error saving product:', error);
        }
    };

    const handleTagInput = (e, field) => {
        if (e.key === 'Enter' && e.target.value) {
            e.preventDefault();
            setFormData({
                ...formData,
                [field]: [...(formData[field] || []), e.target.value]
            });
            e.target.value = '';
        }
    };

    const handlePriceOrCogsChange = (field, value) => {
        const updatedData = { ...formData, [field]: value };

        // Auto-calculate margin when both price and COGS are available
        if (updatedData.price && updatedData.cogs) {
            const margin = ((updatedData.price - updatedData.cogs) / updatedData.price * 100).toFixed(2);
            updatedData.margin = margin;
        }

        setFormData(updatedData);
    };

    const removeTag = (field, index) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload Section */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                        <div 
                            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={triggerFileInput}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            
                            {imagePreview ? (
                                <div className="relative">
                                    <img 
                                        src={imagePreview} 
                                        alt="Product preview" 
                                        className="max-h-[200px] mx-auto rounded-lg object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <div className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
                                            <p className="text-white font-medium">Change Image</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6">
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500 mb-1">Click to upload product image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Short Description*</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                        <textarea
                            value={formData.detailedDescription}
                            onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)*</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => handlePriceOrCogsChange('price', e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                                step="0.01"
                                min="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">COGS ($)</label>
                            <input
                                type="number"
                                value={formData.cogs}
                                onChange={(e) => handlePriceOrCogsChange('cogs', e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                step="0.01"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Margin (%)</label>
                            <input
                                type="number"
                                value={formData.margin}
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock*</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                                min="0"
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                                <option value="Discontinued">Discontinued</option>
                                <option value="Coming Soon">Coming Soon</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Packaging</label>
                        <textarea
                            value={formData.packaging}
                            onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            rows="2"
                        />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                            <input
                                type="text"
                                placeholder="Press Enter to add tags"
                                onKeyPress={(e) => handleTagInput(e, 'tags')}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags?.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                        {tag}
                                        <button
                                            type="button"
                                            className="ml-1 text-blue-600 hover:text-blue-800"
                                            onClick={() => removeTag('tags', index)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Distributors</label>
                            <input
                                type="text"
                                placeholder="Press Enter to add distributors"
                                onKeyPress={(e) => handleTagInput(e, 'distributors')}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.distributors?.map((distributor, index) => (
                                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                        {distributor}
                                        <button
                                            type="button"
                                            className="ml-1 text-green-600 hover:text-green-800"
                                            onClick={() => removeTag('distributors', index)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brokers</label>
                            <input
                                type="text"
                                placeholder="Press Enter to add brokers"
                                onKeyPress={(e) => handleTagInput(e, 'brokers')}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.brokers?.map((broker, index) => (
                                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                        {broker}
                                        <button
                                            type="button"
                                            className="ml-1 text-purple-600 hover:text-purple-800"
                                            onClick={() => removeTag('brokers', index)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Channels</label>
                            <input
                                type="text"
                                placeholder="Press Enter to add marketing channels"
                                onKeyPress={(e) => handleTagInput(e, 'marketingChannels')}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.marketingChannels?.map((channel, index) => (
                                    <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                        {channel}
                                        <button
                                            type="button"
                                            className="ml-1 text-orange-600 hover:text-orange-800"
                                            onClick={() => removeTag('marketingChannels', index)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
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

export default ProductForm;