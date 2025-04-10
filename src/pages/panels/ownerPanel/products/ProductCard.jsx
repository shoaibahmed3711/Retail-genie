import React, { useState } from 'react';
import { Package, Heart, Edit2, Trash2, TrendingUp, ShoppingCart, Clock, DollarSign, Box, Briefcase, Award, Share2, Calendar, X } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete, onRecordSale }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [saleQuantity, setSaleQuantity] = useState(1);
    const [salePrice, setSalePrice] = useState(product.msrp || 0);
    const [showSaleForm, setShowSaleForm] = useState(false);

    const handleRecordSale = (e) => {
        e.preventDefault();
        onRecordSale(product._id, {
            quantity: Number(saleQuantity),
            salePrice: Number(salePrice)
        });
        setShowSaleForm(false);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString();
    };

    // Create a Product Details Modal component
    const ProductDetailsModal = () => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white z-10 p-6 pb-3 flex justify-between items-start border-b">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Package className="text-blue-600" size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{product.name}</h2>
                                <p className="text-gray-500">{product.category}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowDetails(false)}
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column - Image and basic details */}
                        <div>
                            <div className="mb-6 relative">
                                <img
                                    src={product.imageUrl && product.imageUrl !== '' ? product.imageUrl : '/api/placeholder/600/400'}
                                    alt={product.name}
                                    className="w-full h-auto object-cover rounded-xl shadow-md"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/600x400';
                                    }}
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-md">
                                    <span className="font-bold text-blue-600 text-lg">${parseFloat(product.msrp || 0).toFixed(2)}</span>
                                    {product.discount > 0 && (
                                        <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                                {product.detailedDescription && (
                                    <p className="text-gray-700 mt-2 whitespace-pre-line">{product.detailedDescription}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags?.map((tag, index) => (
                                        <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            {product.certifications?.hasCertifications && product.certifications.certificationList?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.certifications.certificationList.map((cert, idx) => (
                                            <span key={idx} className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right column - Detailed information */}
                        <div>
                            {/* Product Stats */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Product Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Box className="text-blue-500" />
                                            <span className="font-medium">Stock</span>
                                        </div>
                                        <p className="text-2xl font-bold">{product.stock}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <ShoppingCart className="text-green-500" />
                                            <span className="font-medium">Sales</span>
                                        </div>
                                        <p className="text-2xl font-bold">{product.salesCount || 0}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="text-purple-500" />
                                            <span className="font-medium">Revenue</span>
                                        </div>
                                        <p className="text-2xl font-bold">${(product.revenue || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign className="text-yellow-500" />
                                            <span className="font-medium">Margin</span>
                                        </div>
                                        <p className="text-2xl font-bold">{product.retailMargin || 35}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Pricing Information</h3>
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-2 divide-x divide-y divide-gray-200">
                                        <div className="p-3">
                                            <h4 className="text-sm text-gray-500">MSRP</h4>
                                            <p className="font-medium">${parseFloat(product.msrp || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-sm text-gray-500">Wholesale Price</h4>
                                            <p className="font-medium">${parseFloat(product.wholesalePrice || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-sm text-gray-500">Case Pack Size</h4>
                                            <p className="font-medium">{product.casePackSize || 1} units</p>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-sm text-gray-500">Case Price</h4>
                                            <p className="font-medium">${parseFloat(product.casePrice || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-sm text-gray-500">Date Available</h4>
                                            <p className="font-medium">{formatDate(product.dateAvailable)}</p>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-sm text-gray-500">Retail Margin</h4>
                                            <p className="font-medium">{product.retailMargin || 35}%</p>
                                        </div>
                                    </div>
                                </div>
                                {product.pricingComments && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm text-gray-500">Comments</h4>
                                        <p className="text-sm mt-1">{product.pricingComments}</p>
                                    </div>
                                )}
                            </div>

                            {/* Packaging Information */}
                            {product.packaging && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Packaging Information</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                        {product.packaging.productBarcode?.hasUPC && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">UPC</h4>
                                                <p className="font-medium">{product.packaging.productBarcode.upcCode}</p>
                                            </div>
                                        )}
                                        
                                        {product.packaging.multipleLanguages?.hasMultipleLanguages && product.packaging.multipleLanguages.languages?.length > 0 && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">Languages</h4>
                                                <p className="font-medium">{product.packaging.multipleLanguages.languages.join(', ')}</p>
                                            </div>
                                        )}
                                        
                                        {product.packaging.callouts?.hasCallouts && product.packaging.callouts.calloutList?.length > 0 && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">Callouts</h4>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {product.packaging.callouts.calloutList.map((callout, idx) => (
                                                        <span key={idx} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm">
                                                            {callout}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Storage Type */}
                                        <div>
                                            <h4 className="text-sm text-gray-500">Storage</h4>
                                            <div className="mt-1 flex gap-2">
                                                {product.packaging.ingredients?.isFrozen && 
                                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Frozen</span>
                                                }
                                                {product.packaging.ingredients?.isRefrigerated && 
                                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Refrigerated</span>
                                                }
                                                {product.packaging.ingredients?.isShelfStable && 
                                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Shelf Stable</span>
                                                }
                                                {!product.packaging.ingredients?.isFrozen && 
                                                 !product.packaging.ingredients?.isRefrigerated && 
                                                 !product.packaging.ingredients?.isShelfStable && 
                                                    <span className="text-gray-500">Not specified</span>
                                                }
                                            </div>
                                        </div>
                                        
                                        {/* Shelf Life */}
                                        {product.packaging.shelfLife?.hasShelfLife && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">Shelf Life</h4>
                                                <p className="font-medium">
                                                    {product.packaging.shelfLife.value} {product.packaging.shelfLife.unit}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Allergens */}
                            {product.allergens && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Allergens</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                            {Object.entries(product.allergens).map(([allergen, status]) => 
                                                status !== 'Does Not Contain' && (
                                                    <div key={allergen} className="flex items-center">
                                                        <span className="capitalize mr-2">{allergen === 'treeNuts' ? 'Tree Nuts' : 
                                                            allergen === 'wheatGluten' ? 'Wheat/Gluten' : allergen}</span>: 
                                                        <span className={`ml-1 font-medium ${status === 'Contains' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                            {status}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Distribution Information */}
                            {(product.distribution?.hasDistributors && product.distribution?.distributors?.length > 0) || 
                             (product.distribution?.manufactureCountry || product.distribution?.manufactureRegion) && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Distribution Information</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                        {/* Distributors */}
                                        {product.distribution?.hasDistributors && product.distribution?.distributors?.length > 0 && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">Distributors</h4>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {product.distribution.distributors.map((distributor, index) => (
                                                        <span key={index} className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-sm">
                                                            {distributor.name} {distributor.percentage && `(${distributor.percentage}%)`}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Retailers */}
                                        {product.distribution?.retailers?.length > 0 && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">Retailers</h4>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {product.distribution.retailers.map((retailer, index) => (
                                                        <span key={index} className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-sm">
                                                            {retailer}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Manufacturing Info */}
                                        {(product.distribution?.manufactureCountry || product.distribution?.manufactureRegion) && (
                                            <div>
                                                <h4 className="text-sm text-gray-500">Manufacturing</h4>
                                                <p className="font-medium">
                                                    {product.distribution.manufactureCountry && product.distribution.manufactureRegion ? 
                                                        `${product.distribution.manufactureRegion}, ${product.distribution.manufactureCountry}` : 
                                                        product.distribution.manufactureCountry || product.distribution.manufactureRegion}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Broker Information */}
                            {product.broker?.hasBrokers && product.broker?.brokers?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Broker Information</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {product.broker.brokers.map((broker, index) => (
                                                <span key={index} className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-sm">
                                                    {broker.name} {broker.commissionPercentage && `(${broker.commissionPercentage}%)`}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Marketing Information */}
                            {product.marketing?.hasElevatorPitch && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Marketing Information</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 className="text-sm text-gray-500">Elevator Pitch</h4>
                                        <p className="mt-1">{product.marketing.elevatorPitch}</p>
                                        
                                        {/* Marketing Materials */}
                                        <div className="flex mt-4 gap-2">
                                            {product.marketing.elevatorPitchFile && (
                                                <a href={product.marketing.elevatorPitchFile} target="_blank" rel="noopener noreferrer" 
                                                    className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg flex items-center">
                                                    <Briefcase size={16} className="mr-2" /> Pitch Document
                                                </a>
                                            )}
                                            {product.marketing.hasSellSheet && product.marketing.sellSheetFile && (
                                                <a href={product.marketing.sellSheetFile} target="_blank" rel="noopener noreferrer" 
                                                    className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg flex items-center">
                                                    <Calendar size={16} className="mr-2" /> Sell Sheet
                                                </a>
                                            )}
                                            {product.marketing.hasPresentation && product.marketing.presentationFile && (
                                                <a href={product.marketing.presentationFile} target="_blank" rel="noopener noreferrer" 
                                                    className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg flex items-center">
                                                    <Share2 size={16} className="mr-2" /> Presentation
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end space-x-3">
                        <button 
                            onClick={() => setShowDetails(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            Close
                        </button>
                        <button 
                            onClick={() => {
                                setShowDetails(false);
                                onEdit(product);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Edit2 size={16} className="mr-2" /> Edit Product
                        </button>
                    </div>
                </div>
            </div>
        );
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
                    <span className="font-bold text-blue-600">${parseFloat(product.msrp || 0).toFixed(2)}</span>
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
                    <span>Retail Margin: {product.retailMargin || 35}%</span>
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
                    View Details
                </button>
                <button
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                    onClick={() => setShowSaleForm(!showSaleForm)}
                >
                    <ShoppingCart size={16} />
                    Record Sale
                </button>
            </div>

            {/* Render Product Details Modal if showDetails is true */}
            {showDetails && <ProductDetailsModal />}

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