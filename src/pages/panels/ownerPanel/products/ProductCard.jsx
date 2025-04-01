import React, { useState } from 'react';
import { Package, Heart, Edit2, Trash2, TrendingUp, ShoppingCart, Clock, DollarSign, Box, Briefcase, Award, Share2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete, onRecordSale }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [saleQuantity, setSaleQuantity] = useState(1);
    const [salePrice, setSalePrice] = useState(product.price);
    const [showSaleForm, setShowSaleForm] = useState(false);

    const handleRecordSale = (e) => {
        e.preventDefault();
        onRecordSale(product._id, {
            quantity: Number(saleQuantity),
            salePrice: Number(salePrice)
        });
        setShowSaleForm(false);
    };

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
                        onClick={() => onDelete(product._id)}
                    />
                </div>
            </div>

            {/* Product Image */}
            <div className="mb-4 relative">
                <img
                    src={product.imageUrl && product.imageUrl !== '' ? product.imageUrl : '/api/placeholder/300/300'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                    onError={(e) => {
                        console.log('Image load error for:', product.name, 'URL was:', e.target.src);
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300';
                    }}
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-md">
                    <span className="font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                    {product.discount > 0 && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                            -{product.discount}%
                        </span>
                    )}
                </div>
                <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-lg text-xs font-medium
                    ${product.status === 'In Stock' ? 'bg-green-100 text-green-600' :
                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-600' :
                            product.status === 'Out of Stock' ? 'bg-red-100 text-red-600' :
                                product.status === 'Discontinued' ? 'bg-gray-100 text-gray-600' :
                                    'bg-purple-100 text-purple-600'}`}>
                    {product.status}
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

            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Box size={16} className="text-gray-400" />
                    <span>Stock: {product.stock}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <DollarSign size={16} className="text-gray-400" />
                    <span>Margin: {product.margin}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <ShoppingCart size={16} className="text-gray-400" />
                    <span>Sales: {product.salesCount || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <TrendingUp size={16} className="text-gray-400" />
                    <span>Revenue: ${(product.revenue || 0).toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <button
                    className="text-blue-600 text-sm flex items-center gap-1"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? 'Hide Details' : 'View Details'}
                </button>
                <button
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                    onClick={() => setShowSaleForm(!showSaleForm)}
                >
                    <ShoppingCart size={16} />
                    Record Sale
                </button>
            </div>

            {showDetails && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-medium mb-2">Product Details</h4>
                    <p className="text-sm text-gray-600 mb-3">{product.detailedDescription}</p>

                    {product.packaging && (
                        <div className="mb-3">
                            <h5 className="text-sm font-medium">Packaging</h5>
                            <p className="text-sm text-gray-600">{product.packaging}</p>
                        </div>
                    )}

                    {product.distributors?.length > 0 && (
                        <div className="mb-3">
                            <h5 className="text-sm font-medium mb-1">Distributors</h5>
                            <div className="flex flex-wrap gap-2">
                                {product.distributors.map((distributor, index) => (
                                    <span key={index} className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                                        {distributor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.brokers?.length > 0 && (
                        <div className="mb-3">
                            <h5 className="text-sm font-medium mb-1">Brokers</h5>
                            <div className="flex flex-wrap gap-2">
                                {product.brokers.map((broker, index) => (
                                    <span key={index} className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs">
                                        {broker}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.marketingChannels?.length > 0 && (
                        <div className="mb-3">
                            <h5 className="text-sm font-medium mb-1">Marketing Channels</h5>
                            <div className="flex flex-wrap gap-2">
                                {product.marketingChannels.map((channel, index) => (
                                    <span key={index} className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs">
                                        {channel}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {showSaleForm && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-medium mb-2">Record Sale</h4>
                    <form onSubmit={handleRecordSale} className="space-y-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Quantity</label>
                            <input
                                type="number"
                                value={saleQuantity}
                                onChange={(e) => setSaleQuantity(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Sale Price ($)</label>
                            <input
                                type="number"
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowSaleForm(false)}
                                className="text-gray-500 px-3 py-1.5 rounded-lg text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                            >
                                Record Sale
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductCard;