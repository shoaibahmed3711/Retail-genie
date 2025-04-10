import React, { useState, useEffect, useRef } from 'react';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductForm = ({ onClose, onAddProduct, editProduct = null }) => {
    const [formData, setFormData] = useState(editProduct || {
        name: '',
        description: '',
        detailedDescription: '',
        category: '',
        msrp: '',
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
        packaging: {
            productBarcode: {
                hasUPC: false,
                upcCode: ''
            },
            multipleLanguages: {
                hasMultipleLanguages: false,
                languages: []
            },
            unitPackaging: {
                measurementSystem: 'Metric',
                height: '',
                width: '',
                length: '',
                weightUnit: 'Kilograms',
                weight: '',
                volume: ''
            },
            casePackaging: {
                hasCasePacking: false,
                measurementSystem: 'Metric',
                height: '',
                width: '',
                length: '',
                weightUnit: 'Kilograms',
                weight: '',
                volume: '',
                casesPerTier: '',
                tiersPerPallet: '',
                caseUPC: ''
            },
            innerCasePackaging: {
                hasInnerCase: false,
                unitsPerInnerCase: '',
                measurementSystem: 'Metric',
                height: '',
                width: '',
                length: '',
                weightUnit: 'Kilograms',
                weight: ''
            },
            callouts: {
                hasCallouts: false,
                calloutList: []
            },
            ingredients: {
                isFrozen: false,
                isRefrigerated: false,
                isShelfStable: true,
                hasIngredients: false,
                ingredientsList: [],
                ingredientsLabelImage: '',
                foreignIngredients: {
                    hasSourcedIngredients: false,
                    sourceCountries: []
                }
            },
            shelfLife: {
                hasShelfLife: false,
                unit: 'Days',
                value: ''
            },
            nutritionalInfo: {
                hasNutritionalLabel: false,
                nutritionalLabelImage: ''
            }
        },
        certifications: {
            hasCertifications: false,
            certificationList: []
        },
        allergens: {
            dairy: 'Does Not Contain',
            egg: 'Does Not Contain',
            mustard: 'Does Not Contain',
            peanuts: 'Does Not Contain',
            seafood: 'Does Not Contain',
            soy: 'Does Not Contain',
            sesame: 'Does Not Contain',
            sulfites: 'Does Not Contain',
            treeNuts: 'Does Not Contain',
            wheatGluten: 'Does Not Contain'
        },
        distribution: {
            manufactureCountry: '',
            manufactureRegion: '',
            hasDistributors: false,
            distributors: [],
            retailers: [],
            distributionComments: ''
        },
        broker: {
            hasBrokers: false,
            brokers: [],
            brokerComments: ''
        },
        marketing: {
            hasElevatorPitch: false,
            elevatorPitch: '',
            elevatorPitchFile: '',
            hasSellSheet: false,
            sellSheetFile: '',
            hasPresentation: false,
            presentationFile: ''
        },
        msrp: '',
        retailMargin: 35,
        wholesalePrice: '',
        casePackSize: 1,
        casePrice: '',
        dateAvailable: '',
        pricingComments: ''
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
            
            // Ensure wholesalePrice and casePrice are calculated
            if (editProduct.msrp && editProduct.retailMargin) {
                const wholesalePrice = (editProduct.msrp * (1 - (editProduct.retailMargin / 100))).toFixed(2);
                
                if (!editProduct.wholesalePrice) {
                    editProduct.wholesalePrice = wholesalePrice;
                }
                
                if (editProduct.casePackSize && !editProduct.casePrice) {
                    editProduct.casePrice = (wholesalePrice * editProduct.casePackSize).toFixed(2);
                }
            }
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
            if (!formData.msrp || formData.msrp <= 0) {
                toast.error('Valid MSRP is required');
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
            
            // Create a deep copy of form data to manipulate
            const productData = JSON.parse(JSON.stringify(formData));
            
            // Ensure numeric fields are numbers
            const numericFields = [
                'msrp', 'retailMargin', 'wholesalePrice', 'casePackSize', 
                'casePrice', 'cogs', 'stock', 'discount',
                'packaging.unitPackaging.height',
                'packaging.unitPackaging.width',
                'packaging.unitPackaging.length',
                'packaging.unitPackaging.weight',
                'packaging.unitPackaging.volume',
                'packaging.casePackaging.height',
                'packaging.casePackaging.width',
                'packaging.casePackaging.length',
                'packaging.casePackaging.weight',
                'packaging.casePackaging.volume',
                'packaging.casePackaging.casesPerTier',
                'packaging.casePackaging.tiersPerPallet',
                'packaging.innerCasePackaging.unitsPerInnerCase',
                'packaging.innerCasePackaging.height',
                'packaging.innerCasePackaging.width',
                'packaging.innerCasePackaging.length',
                'packaging.innerCasePackaging.weight',
                'packaging.shelfLife.value'
            ];
            
            // Convert numeric fields to numbers
            numericFields.forEach(field => {
                const fieldPath = field.split('.');
                let currentObj = productData;
                let exists = true;
                
                // Navigate to the nested property location
                for (let i = 0; i < fieldPath.length - 1; i++) {
                    if (!currentObj || !currentObj[fieldPath[i]]) {
                        exists = false;
                        break;
                    }
                    currentObj = currentObj[fieldPath[i]];
                }
                
                const lastField = fieldPath[fieldPath.length - 1];
                if (exists && currentObj && currentObj[lastField] !== undefined && currentObj[lastField] !== '') {
                    currentObj[lastField] = Number(currentObj[lastField]);
                }
            });
            
            // Ensure broker.brokers and distribution.distributors are properly structured as arrays
            if (productData.broker && !Array.isArray(productData.broker.brokers)) {
                if (!productData.broker.brokers) {
                    productData.broker.brokers = [];
                } else if (typeof productData.broker.brokers === 'string') {
                    try {
                        productData.broker.brokers = JSON.parse(productData.broker.brokers);
                    } catch (e) {
                        console.warn('Could not parse broker.brokers, using empty array', e);
                        productData.broker.brokers = [];
                    }
                }
            }

            if (productData.distribution && !Array.isArray(productData.distribution.distributors)) {
                if (!productData.distribution.distributors) {
                    productData.distribution.distributors = [];
                } else if (typeof productData.distribution.distributors === 'string') {
                    try {
                        productData.distribution.distributors = JSON.parse(productData.distribution.distributors);
                    } catch (e) {
                        console.warn('Could not parse distribution.distributors, using empty array', e);
                        productData.distribution.distributors = [];
                    }
                }
            }
            
            // Create FormData for the image upload
            const formDataToSubmit = new FormData();
            
            // Handle nested objects by flattening them with dot notation
            const flattenObject = (obj, prefix = '') => {
                Object.keys(obj).forEach(key => {
                    const value = obj[key];
                    const newKey = prefix ? `${prefix}.${key}` : key;
                    
                    if (value === null || value === undefined) {
                        return;
                    }
                    
                    // Special handling for broker.brokers and distribution.distributors
                    if ((newKey === 'broker.brokers' || newKey === 'distribution.distributors') && Array.isArray(value)) {
                        // Ensure we're sending an empty array at minimum, not a string "[]"
                        if (value.length === 0) {
                            formDataToSubmit.append(newKey, '[]');
                        } else {
                            formDataToSubmit.append(newKey, JSON.stringify(value));
                        }
                    } else if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof File)) {
                        flattenObject(value, newKey);
                    } else if (Array.isArray(value)) {
                        formDataToSubmit.append(newKey, JSON.stringify(value));
                    } else {
                        formDataToSubmit.append(newKey, value);
                    }
                });
            };
            
            // Flatten the productData object
            flattenObject(productData);
            
            // Add the image file if selected
            if (selectedImage) {
                formDataToSubmit.append('productImage', selectedImage);
            }
            
            // Handle other file uploads
            document.querySelectorAll('input[type="file"]').forEach(fileInput => {
                const dataField = fileInput.getAttribute('data-field');
                if (dataField && fileInput.files[0]) {
                    // Map the data-field to the correct field name used in backend
                    let fieldName;
                    if (dataField === 'packaging.ingredients.ingredientsLabelImage') {
                        fieldName = 'ingredientsLabel';
                    } else if (dataField === 'packaging.nutritionalInfo.nutritionalLabelImage') {
                        fieldName = 'nutritionalLabel';
                    } else if (dataField === 'marketing.elevatorPitchFile') {
                        fieldName = 'elevatorPitchFile';
                    } else if (dataField === 'marketing.sellSheetFile') {
                        fieldName = 'sellSheetFile';
                    } else if (dataField === 'marketing.presentationFile') {
                        fieldName = 'presentationFile';
                    }
                    
                    if (fieldName) {
                        formDataToSubmit.append(fieldName, fileInput.files[0]);
                    }
                }
            });
            
            // Log the form data for debugging
            console.log('Submitting form with files:');
            for (let [key, value] of formDataToSubmit.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name}, ${value.type}, ${value.size} bytes`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }
            
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

        // Auto-calculate margin when both msrp and COGS are available
        if (updatedData.msrp && updatedData.cogs) {
            const margin = ((updatedData.msrp - updatedData.cogs) / updatedData.msrp * 100).toFixed(2);
            updatedData.margin = margin;
        }

        setFormData(updatedData);
    };

    const handlePriceOrMarginChange = (field, value) => {
        const updatedData = { ...formData, [field]: value !== '' ? Number(value) : '' };

        // Calculate wholesale price when msrp and retailMargin are available
        if (updatedData.msrp && updatedData.retailMargin) {
            // Calculate wholesale price based on MSRP and retail margin
            const wholesalePrice = (updatedData.msrp * (1 - (updatedData.retailMargin / 100))).toFixed(2);
            updatedData.wholesalePrice = wholesalePrice;
            
            // Calculate case price if casePackSize is available
            if (updatedData.casePackSize) {
                updatedData.casePrice = (wholesalePrice * updatedData.casePackSize).toFixed(2);
            }
        }

        setFormData(updatedData);
    };

    const handleCasePackSizeChange = (value) => {
        const updatedData = { ...formData, casePackSize: value !== '' ? Number(value) : '' };
        
        // Calculate case price if wholesalePrice is available
        if (updatedData.wholesalePrice && updatedData.casePackSize) {
            updatedData.casePrice = (updatedData.wholesalePrice * updatedData.casePackSize).toFixed(2);
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">MSRP ($)*</label>
                            <input
                                type="number"
                                value={formData.msrp || ''}
                                onChange={(e) => handlePriceOrCogsChange('msrp', e.target.value)}
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

                    {/* Packaging Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Packaging</h3>
                        
                        {/* Product Barcode */}
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasUPC"
                                    checked={formData.packaging?.productBarcode?.hasUPC || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            packaging: {
                                                ...formData.packaging,
                                                productBarcode: {
                                                    ...formData.packaging?.productBarcode,
                                                    hasUPC: e.target.checked
                                                }
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasUPC" className="text-sm font-medium text-gray-700">
                                    Does your product have a Product UPC?
                                </label>
                            </div>
                            
                            {formData.packaging?.productBarcode?.hasUPC && (
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">UPC Code (12 digits)</label>
                                    <input
                                        type="text"
                                        value={formData.packaging?.productBarcode?.upcCode || ''}
                                        onChange={(e) => {
                                            const upcCode = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    productBarcode: {
                                                        ...formData.packaging?.productBarcode,
                                                        upcCode
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        maxLength="12"
                                        pattern="\d{12}"
                                        placeholder="Enter 12-digit UPC"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">UPC must be exactly 12 digits</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Multiple Languages */}
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasMultipleLanguages"
                                    checked={formData.packaging?.multipleLanguages?.hasMultipleLanguages || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            packaging: {
                                                ...formData.packaging,
                                                multipleLanguages: {
                                                    ...formData.packaging?.multipleLanguages,
                                                    hasMultipleLanguages: e.target.checked
                                                }
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasMultipleLanguages" className="text-sm font-medium text-gray-700">
                                    Does the product packaging have multiple languages?
                                </label>
                            </div>
                            
                            {formData.packaging?.multipleLanguages?.hasMultipleLanguages && (
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                                    <input
                                        type="text"
                                        placeholder="Press Enter to add languages"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && e.target.value) {
                                                e.preventDefault();
                                                const newLanguage = e.target.value.trim();
                                                if (newLanguage) {
                                                    const currentLanguages = formData.packaging?.multipleLanguages?.languages || [];
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            multipleLanguages: {
                                                                ...formData.packaging?.multipleLanguages,
                                                                languages: [...currentLanguages, newLanguage]
                                                            }
                                                        }
                                                    });
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.packaging?.multipleLanguages?.languages?.map((language, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                                {language}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                                    onClick={() => {
                                                        const updatedLanguages = [...(formData.packaging?.multipleLanguages?.languages || [])];
                                                        updatedLanguages.splice(index, 1);
                                                        setFormData({
                                                            ...formData,
                                                            packaging: {
                                                                ...formData.packaging,
                                                                multipleLanguages: {
                                                                    ...formData.packaging?.multipleLanguages,
                                                                    languages: updatedLanguages
                                                                }
                                                            }
                                                        });
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Unit Packaging */}
                        <div className="mb-4 border-t border-gray-200 pt-4">
                            <h4 className="text-md font-medium mb-3">Unit Packaging</h4>
                            
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement System</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            checked={formData.packaging?.unitPackaging?.measurementSystem === 'Metric'}
                                            onChange={() => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        unitPackaging: {
                                                            ...formData.packaging?.unitPackaging,
                                                            measurementSystem: 'Metric'
                                                        }
                                                    }
                                                });
                                            }}
                                            className="mr-2"
                                        />
                                        <span>Metric</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            checked={formData.packaging?.unitPackaging?.measurementSystem === 'Imperial'}
                                            onChange={() => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        unitPackaging: {
                                                            ...formData.packaging?.unitPackaging,
                                                            measurementSystem: 'Imperial'
                                                        }
                                                    }
                                                });
                                            }}
                                            className="mr-2"
                                        />
                                        <span>Imperial</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 mb-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Height ({formData.packaging?.unitPackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.unitPackaging?.height || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    unitPackaging: {
                                                        ...formData.packaging?.unitPackaging,
                                                        height: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Width ({formData.packaging?.unitPackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.unitPackaging?.width || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    unitPackaging: {
                                                        ...formData.packaging?.unitPackaging,
                                                        width: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Length ({formData.packaging?.unitPackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.unitPackaging?.length || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    unitPackaging: {
                                                        ...formData.packaging?.unitPackaging,
                                                        length: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Weight Unit</label>
                                <select
                                    value={formData.packaging?.unitPackaging?.weightUnit || 'Kilograms'}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            packaging: {
                                                ...formData.packaging,
                                                unitPackaging: {
                                                    ...formData.packaging?.unitPackaging,
                                                    weightUnit: e.target.value
                                                }
                                            }
                                        });
                                    }}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Kilograms">Kilograms</option>
                                    <option value="Pounds">Pounds</option>
                                </select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight ({formData.packaging?.unitPackaging?.weightUnit})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.unitPackaging?.weight || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    unitPackaging: {
                                                        ...formData.packaging?.unitPackaging,
                                                        weight: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Volume (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.unitPackaging?.volume || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    unitPackaging: {
                                                        ...formData.packaging?.unitPackaging,
                                                        volume: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Packaging */}
                    <div className="mb-4 border-t border-gray-200 pt-4">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="hasCasePacking"
                                checked={formData.packaging?.casePackaging?.hasCasePacking || false}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        packaging: {
                                            ...formData.packaging,
                                            casePackaging: {
                                                ...formData.packaging?.casePackaging,
                                                hasCasePacking: e.target.checked
                                            }
                                        }
                                    });
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="hasCasePacking" className="text-sm font-medium text-gray-700">
                                Are your products packed in a case?
                            </label>
                        </div>
                        
                        {formData.packaging?.casePackaging?.hasCasePacking && (
                            <div className="mt-3 pl-4 border-l-2 border-blue-100">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Measurement System</label>
                                    <div className="flex gap-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                checked={formData.packaging?.casePackaging?.measurementSystem === 'Metric'}
                                                onChange={() => {
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            casePackaging: {
                                                                ...formData.packaging?.casePackaging,
                                                                measurementSystem: 'Metric'
                                                            }
                                                        }
                                                    });
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Metric</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                checked={formData.packaging?.casePackaging?.measurementSystem === 'Imperial'}
                                                onChange={() => {
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            casePackaging: {
                                                                ...formData.packaging?.casePackaging,
                                                                measurementSystem: 'Imperial'
                                                            }
                                                        }
                                                    });
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Imperial</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Case Height ({formData.packaging?.casePackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.height || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            height: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Case Width ({formData.packaging?.casePackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.width || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            width: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Case Length ({formData.packaging?.casePackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.length || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            length: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight Unit</label>
                                    <select
                                        value={formData.packaging?.casePackaging?.weightUnit || 'Kilograms'}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    casePackaging: {
                                                        ...formData.packaging?.casePackaging,
                                                        weightUnit: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Kilograms">Kilograms</option>
                                        <option value="grams">Grams</option>
                                        <option value="Pounds">Pounds</option>
                                        <option value="ounces">Ounces</option>
                                    </select>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Case Weight ({formData.packaging?.casePackaging?.weightUnit})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.weight || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            weight: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Case Volume (Optional)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.volume || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            volume: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cases Per Tier in Pallet
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.casesPerTier || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            casesPerTier: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tiers Per Pallet
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.casePackaging?.tiersPerPallet || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        casePackaging: {
                                                            ...formData.packaging?.casePackaging,
                                                            tiersPerPallet: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Case UPC (14 digits)</label>
                                    <input
                                        type="text"
                                        value={formData.packaging?.casePackaging?.caseUPC || ''}
                                        onChange={(e) => {
                                            const caseUPC = e.target.value.replace(/[^0-9]/g, '').slice(0, 14);
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    casePackaging: {
                                                        ...formData.packaging?.casePackaging,
                                                        caseUPC
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        maxLength="14"
                                        pattern="\d{14}"
                                        placeholder="Enter 14-digit Case UPC"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Case UPC must be exactly 14 digits</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inner Case Packaging */}
                    <div className="mb-4 border-t border-gray-200 pt-4">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="hasInnerCase"
                                checked={formData.packaging?.innerCasePackaging?.hasInnerCase || false}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        packaging: {
                                            ...formData.packaging,
                                            innerCasePackaging: {
                                                ...formData.packaging?.innerCasePackaging,
                                                hasInnerCase: e.target.checked
                                            }
                                        }
                                    });
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="hasInnerCase" className="text-sm font-medium text-gray-700">
                                Do you have Inner Case Packing?
                            </label>
                        </div>
                        
                        {formData.packaging?.innerCasePackaging?.hasInnerCase && (
                            <div className="mt-3 pl-4 border-l-2 border-blue-100">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How many units per inner case?
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.innerCasePackaging?.unitsPerInnerCase || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    innerCasePackaging: {
                                                        ...formData.packaging?.innerCasePackaging,
                                                        unitsPerInnerCase: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="1"
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Measurement System</label>
                                    <div className="flex gap-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                checked={formData.packaging?.innerCasePackaging?.measurementSystem === 'Metric'}
                                                onChange={() => {
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            innerCasePackaging: {
                                                                ...formData.packaging?.innerCasePackaging,
                                                                measurementSystem: 'Metric'
                                                            }
                                                        }
                                                    });
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Metric</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                checked={formData.packaging?.innerCasePackaging?.measurementSystem === 'Imperial'}
                                                onChange={() => {
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            innerCasePackaging: {
                                                                ...formData.packaging?.innerCasePackaging,
                                                                measurementSystem: 'Imperial'
                                                            }
                                                        }
                                                    });
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Imperial</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Height ({formData.packaging?.innerCasePackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.innerCasePackaging?.height || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        innerCasePackaging: {
                                                            ...formData.packaging?.innerCasePackaging,
                                                            height: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Width ({formData.packaging?.innerCasePackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.innerCasePackaging?.width || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        innerCasePackaging: {
                                                            ...formData.packaging?.innerCasePackaging,
                                                            width: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Length ({formData.packaging?.innerCasePackaging?.measurementSystem === 'Metric' ? 'cm' : 'in'})
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.innerCasePackaging?.length || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        innerCasePackaging: {
                                                            ...formData.packaging?.innerCasePackaging,
                                                            length: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight Unit</label>
                                    <select
                                        value={formData.packaging?.innerCasePackaging?.weightUnit || 'Kilograms'}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    innerCasePackaging: {
                                                        ...formData.packaging?.innerCasePackaging,
                                                        weightUnit: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Kilograms">Kilograms</option>
                                        <option value="grams">Grams</option>
                                        <option value="Pounds">Pounds</option>
                                        <option value="ounces">Ounces</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight ({formData.packaging?.innerCasePackaging?.weightUnit})
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.packaging?.innerCasePackaging?.weight || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    innerCasePackaging: {
                                                        ...formData.packaging?.innerCasePackaging,
                                                        weight: e.target.value
                                                    }
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Packaging Callouts */}
                    <div className="mb-4 border-t border-gray-200 pt-4">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="hasCallouts"
                                checked={formData.packaging?.callouts?.hasCallouts || false}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        packaging: {
                                            ...formData.packaging,
                                            callouts: {
                                                ...formData.packaging?.callouts,
                                                hasCallouts: e.target.checked
                                            }
                                        }
                                    });
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="hasCallouts" className="text-sm font-medium text-gray-700">
                                Does your Packaging have any callouts?
                            </label>
                        </div>
                        
                        {formData.packaging?.callouts?.hasCallouts && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Add Callouts</label>
                                <input
                                    type="text"
                                    placeholder="Press Enter to add callouts"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.target.value) {
                                            e.preventDefault();
                                            const newCallout = e.target.value.trim();
                                            if (newCallout) {
                                                const currentCallouts = formData.packaging?.callouts?.calloutList || [];
                                                if (currentCallouts.length < 10) {
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            callouts: {
                                                                ...formData.packaging?.callouts,
                                                                calloutList: [...currentCallouts, newCallout]
                                                            }
                                                        }
                                                    });
                                                    e.target.value = '';
                                                } else {
                                                    toast.error('Maximum 10 callouts allowed');
                                                }
                                            }
                                        }
                                    }}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.packaging?.callouts?.calloutList?.map((callout, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                            {callout}
                                            <button
                                                type="button"
                                                className="ml-1 text-blue-600 hover:text-blue-800"
                                                onClick={() => {
                                                    const updatedCallouts = [...(formData.packaging?.callouts?.calloutList || [])];
                                                    updatedCallouts.splice(index, 1);
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            callouts: {
                                                                ...formData.packaging?.callouts,
                                                                calloutList: updatedCallouts
                                                            }
                                                        }
                                                    });
                                                }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Maximum 10 callouts allowed</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Product Ingredients */}
                    <div className="mb-4 border-t border-gray-200 pt-4">
                        <h4 className="text-md font-medium mb-3">Product Ingredients & Shelf-life</h4>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isFrozen"
                                        checked={formData.packaging?.ingredients?.isFrozen || false}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    ingredients: {
                                                        ...formData.packaging?.ingredients,
                                                        isFrozen: e.target.checked
                                                    }
                                                }
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor="isFrozen" className="text-sm font-medium text-gray-700">
                                        Is your product Frozen?
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isRefrigerated"
                                        checked={formData.packaging?.ingredients?.isRefrigerated || false}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    ingredients: {
                                                        ...formData.packaging?.ingredients,
                                                        isRefrigerated: e.target.checked
                                                    }
                                                }
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor="isRefrigerated" className="text-sm font-medium text-gray-700">
                                        Is your product Refrigerated?
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isShelfStable"
                                        checked={formData.packaging?.ingredients?.isShelfStable || false}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                packaging: {
                                                    ...formData.packaging,
                                                    ingredients: {
                                                        ...formData.packaging?.ingredients,
                                                        isShelfStable: e.target.checked
                                                    }
                                                }
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor="isShelfStable" className="text-sm font-medium text-gray-700">
                                        Is your product Shelf Stable?
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasIngredients"
                                    checked={formData.packaging?.ingredients?.hasIngredients || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            packaging: {
                                                ...formData.packaging,
                                                ingredients: {
                                                    ...formData.packaging?.ingredients,
                                                    hasIngredients: e.target.checked
                                                }
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasIngredients" className="text-sm font-medium text-gray-700">
                                    Does your product have ingredients?
                                </label>
                            </div>
                            
                            {formData.packaging?.ingredients?.hasIngredients && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Add Ingredients</label>
                                        <input
                                            type="text"
                                            placeholder="Press Enter to add ingredients"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && e.target.value) {
                                                    e.preventDefault();
                                                    const newIngredient = e.target.value.trim();
                                                    if (newIngredient) {
                                                        const currentIngredients = formData.packaging?.ingredients?.ingredientsList || [];
                                                        setFormData({
                                                            ...formData,
                                                            packaging: {
                                                                ...formData.packaging,
                                                                ingredients: {
                                                                    ...formData.packaging?.ingredients,
                                                                    ingredientsList: [...currentIngredients, newIngredient]
                                                                }
                                                            }
                                                        });
                                                        e.target.value = '';
                                                    }
                                                }
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.packaging?.ingredients?.ingredientsList?.map((ingredient, index) => (
                                                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                                    {ingredient}
                                                    <button
                                                        type="button"
                                                        className="ml-1 text-green-600 hover:text-green-800"
                                                        onClick={() => {
                                                            const updatedIngredients = [...(formData.packaging?.ingredients?.ingredientsList || [])];
                                                            updatedIngredients.splice(index, 1);
                                                            setFormData({
                                                                ...formData,
                                                                packaging: {
                                                                    ...formData.packaging,
                                                                    ingredients: {
                                                                        ...formData.packaging?.ingredients,
                                                                        ingredientsList: updatedIngredients
                                                                    }
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients Label Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    // Handle the file for form submission
                                                    const file = e.target.files[0];
                                                    // For now, we're just storing that we have a file; the actual upload will be handled later
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            ingredients: {
                                                                ...formData.packaging?.ingredients,
                                                                ingredientsLabelImage: 'placeholder_for_upload'
                                                            }
                                                        }
                                                    });
                                                }
                                            }}
                                            data-field="packaging.ingredients.ingredientsLabelImage"
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Upload an image of your ingredients label</p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                id="hasSourcedIngredients"
                                                checked={formData.packaging?.ingredients?.foreignIngredients?.hasSourcedIngredients || false}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        packaging: {
                                                            ...formData.packaging,
                                                            ingredients: {
                                                                ...formData.packaging?.ingredients,
                                                                foreignIngredients: {
                                                                    ...formData.packaging?.ingredients?.foreignIngredients,
                                                                    hasSourcedIngredients: e.target.checked
                                                                }
                                                            }
                                                        }
                                                    });
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor="hasSourcedIngredients" className="text-sm font-medium text-gray-700">
                                                Do you source ingredients from other countries?
                                            </label>
                                        </div>
                                        
                                        {formData.packaging?.ingredients?.foreignIngredients?.hasSourcedIngredients && (
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Source Countries</label>
                                                <input
                                                    type="text"
                                                    placeholder="Press Enter to add countries"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' && e.target.value) {
                                                            e.preventDefault();
                                                            const newCountry = e.target.value.trim();
                                                            if (newCountry) {
                                                                const currentCountries = formData.packaging?.ingredients?.foreignIngredients?.sourceCountries || [];
                                                                setFormData({
                                                                    ...formData,
                                                                    packaging: {
                                                                        ...formData.packaging,
                                                                        ingredients: {
                                                                            ...formData.packaging?.ingredients,
                                                                            foreignIngredients: {
                                                                                ...formData.packaging?.ingredients?.foreignIngredients,
                                                                                sourceCountries: [...currentCountries, newCountry]
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                                e.target.value = '';
                                                            }
                                                        }
                                                    }}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                                />
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {formData.packaging?.ingredients?.foreignIngredients?.sourceCountries?.map((country, index) => (
                                                        <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                                            {country}
                                                            <button
                                                                type="button"
                                                                className="ml-1 text-yellow-600 hover:text-yellow-800"
                                                                onClick={() => {
                                                                    const updatedCountries = [...(formData.packaging?.ingredients?.foreignIngredients?.sourceCountries || [])];
                                                                    updatedCountries.splice(index, 1);
                                                                    setFormData({
                                                                        ...formData,
                                                                        packaging: {
                                                                            ...formData.packaging,
                                                                            ingredients: {
                                                                                ...formData.packaging?.ingredients,
                                                                                foreignIngredients: {
                                                                                    ...formData.packaging?.ingredients?.foreignIngredients,
                                                                                    sourceCountries: updatedCountries
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Shelf Life */}
                        <div className="mb-3">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasShelfLife"
                                    checked={formData.packaging?.shelfLife?.hasShelfLife || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            packaging: {
                                                ...formData.packaging,
                                                shelfLife: {
                                                    ...formData.packaging?.shelfLife,
                                                    hasShelfLife: e.target.checked
                                                }
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasShelfLife" className="text-sm font-medium text-gray-700">
                                    Does your product have a Shelf life?
                                </label>
                            </div>
                            
                            {formData.packaging?.shelfLife?.hasShelfLife && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                        <select
                                            value={formData.packaging?.shelfLife?.unit || 'Days'}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        shelfLife: {
                                                            ...formData.packaging?.shelfLife,
                                                            unit: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Days">Days</option>
                                            <option value="Months">Months</option>
                                            <option value="Years">Years</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                                        <input
                                            type="number"
                                            value={formData.packaging?.shelfLife?.value || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        shelfLife: {
                                                            ...formData.packaging?.shelfLife,
                                                            value: e.target.value
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Nutritional Label */}
                        <div className="mb-3">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasNutritionalLabel"
                                    checked={formData.packaging?.nutritionalInfo?.hasNutritionalLabel || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            packaging: {
                                                ...formData.packaging,
                                                nutritionalInfo: {
                                                    ...formData.packaging?.nutritionalInfo,
                                                    hasNutritionalLabel: e.target.checked
                                                }
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasNutritionalLabel" className="text-sm font-medium text-gray-700">
                                    Does your product have a nutritional label?
                                </label>
                            </div>
                            
                            {formData.packaging?.nutritionalInfo?.hasNutritionalLabel && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nutritional Label Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                // Handle the file for form submission
                                                const file = e.target.files[0];
                                                // For now, we're just storing that we have a file; the actual upload will be handled later
                                                setFormData({
                                                    ...formData,
                                                    packaging: {
                                                        ...formData.packaging,
                                                        nutritionalInfo: {
                                                            ...formData.packaging?.nutritionalInfo,
                                                            nutritionalLabelImage: 'placeholder_for_upload'
                                                        }
                                                    }
                                                });
                                            }
                                        }}
                                        data-field="packaging.nutritionalInfo.nutritionalLabelImage"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload an image of your nutritional label</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Product Certifications */}
                    <div className="mb-6 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-4">Product Certifications</h3>
                        
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="hasCertifications"
                                checked={formData.certifications?.hasCertifications || false}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        certifications: {
                                            ...formData.certifications,
                                            hasCertifications: e.target.checked
                                        }
                                    });
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="hasCertifications" className="text-sm font-medium text-gray-700">
                                Does your product have certifications?
                            </label>
                        </div>
                        
                        {formData.certifications?.hasCertifications && (
                            <div className="mt-2">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Add Certification</label>
                                    <div className="flex gap-2 mt-1">
                                        <select
                                            className="flex-grow p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            onChange={(e) => {
                                                if (e.target.value && e.target.value !== 'custom') {
                                                    const currentCertifications = formData.certifications?.certificationList || [];
                                                    if (!currentCertifications.includes(e.target.value)) {
                                                        setFormData({
                                                            ...formData,
                                                            certifications: {
                                                                ...formData.certifications,
                                                                certificationList: [...currentCertifications, e.target.value]
                                                            }
                                                        });
                                                    }
                                                    e.target.value = '';
                                                }
                                            }}
                                        >
                                            <option value="">Select certification</option>
                                            <option value="Gluten Free">Gluten Free</option>
                                            <option value="Keto">Keto</option>
                                            <option value="Vegan">Vegan</option>
                                            <option value="Vegetarian">Vegetarian</option>
                                            <option value="Kosher">Kosher</option>
                                            <option value="Fair Trade">Fair Trade</option>
                                            <option value="USDA Organic">USDA Organic</option>
                                            <option value="Canadian Organic">Canadian Organic</option>
                                            <option value="Certified Naturally Grown">Certified Naturally Grown</option>
                                            <option value="Certified Vegan">Certified Vegan</option>
                                            <option value="Non-GMO Project Verified">Non-GMO Project Verified</option>
                                            <option value="Paleo Certified">Paleo Certified</option>
                                            <option value="Certified Plant-Based">Certified Plant-Based</option>
                                            <option value="GFCO">GFCO (Gluten-Free Certification Organization)</option>
                                            <option value="NSF Gluten-Free">NSF Gluten-Free</option>
                                            <option value="Beyond Celiac Certification">Beyond Celiac Certification</option>
                                            <option value="Fair Trade Certified (USA)">Fair Trade Certified (USA)</option>
                                            <option value="Fair for Life">Fair for Life</option>
                                            <option value="custom">Add Custom Certification</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Or type and press Enter to add custom certification"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && e.target.value) {
                                                e.preventDefault();
                                                const newCertification = e.target.value.trim();
                                                if (newCertification) {
                                                    const currentCertifications = formData.certifications?.certificationList || [];
                                                    if (!currentCertifications.includes(newCertification)) {
                                                        setFormData({
                                                            ...formData,
                                                            certifications: {
                                                                ...formData.certifications,
                                                                certificationList: [...currentCertifications, newCertification]
                                                            }
                                                        });
                                                    }
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 mt-2"
                                    />
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.certifications?.certificationList?.map((certification, index) => (
                                        <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                            {certification}
                                            <button
                                                type="button"
                                                className="ml-1 text-purple-600 hover:text-purple-800"
                                                onClick={() => {
                                                    const updatedCertifications = [...(formData.certifications?.certificationList || [])];
                                                    updatedCertifications.splice(index, 1);
                                                    setFormData({
                                                        ...formData,
                                                        certifications: {
                                                            ...formData.certifications,
                                                            certificationList: updatedCertifications
                                                        }
                                                    });
                                                }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Product Allergens */}
                    <div className="mb-6 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-4">Product Allergens</h3>
                        
                        <p className="text-sm text-gray-600 mb-3">For each allergen, select whether your product contains, may contain, or does not contain it.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['dairy', 'egg', 'mustard', 'peanuts', 'seafood', 'soy', 'sesame', 'sulfites', 'treeNuts', 'wheatGluten'].map((allergen) => (
                                <div key={allergen} className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                        {allergen === 'treeNuts' ? 'Tree Nuts' : allergen === 'wheatGluten' ? 'Wheat/Gluten' : allergen}
                                    </label>
                                    <select
                                        value={formData.allergens?.[allergen] || 'Does Not Contain'}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                allergens: {
                                                    ...formData.allergens,
                                                    [allergen]: e.target.value
                                                }
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Contains">Contains</option>
                                        <option value="May Contain">May Contain</option>
                                        <option value="Does Not Contain">Does Not Contain</option>
                                    </select>
                                </div>
                            ))}
                        </div>
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

                    {/* Pricing Section Update */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">MSRP ($)*</label>
                                <input
                                    type="number"
                                    value={formData.msrp || ''}
                                    onChange={(e) => handlePriceOrMarginChange('msrp', e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    required
                                    step="0.01"
                                    min="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Retail Margin (%)</label>
                                <input
                                    type="number"
                                    value={formData.retailMargin}
                                    onChange={(e) => handlePriceOrMarginChange('retailMargin', e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Wholesale Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.wholesalePrice}
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50"
                                    readOnly
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Case Pack Size*</label>
                                <input
                                    type="number"
                                    value={formData.casePackSize}
                                    onChange={(e) => handleCasePackSizeChange(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    required
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Case Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.casePrice}
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date Available</label>
                                <input
                                    type="date"
                                    value={formData.dateAvailable ? new Date(formData.dateAvailable).toISOString().substring(0, 10) : ''}
                                    onChange={(e) => setFormData({ ...formData, dateAvailable: e.target.value })}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Comments</label>
                            <textarea
                                value={formData.pricingComments}
                                onChange={(e) => setFormData({ ...formData, pricingComments: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                rows="2"
                            />
                        </div>
                    </div>

                    {/* Distribution Section */}
                    <div className="mb-6 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-4">Distribution</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Manufacturing Country
                                </label>
                                <select
                                    value={formData.distribution?.manufactureCountry || ''}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            distribution: {
                                                ...formData.distribution,
                                                manufactureCountry: e.target.value
                                            }
                                        });
                                    }}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select country</option>
                                    <option value="United States">United States</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Mexico">Mexico</option>
                                    {/* More countries can be added here */}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Manufacturing Province/State
                                </label>
                                <select
                                    value={formData.distribution?.manufactureRegion || ''}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            distribution: {
                                                ...formData.distribution,
                                                manufactureRegion: e.target.value
                                            }
                                        });
                                    }}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    disabled={!formData.distribution?.manufactureCountry}
                                >
                                    <option value="">Select region</option>
                                    {formData.distribution?.manufactureCountry === 'United States' && (
                                        <>
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alaska">Alaska</option>
                                            <option value="Arizona">Arizona</option>
                                            {/* More US states can be added here */}
                                        </>
                                    )}
                                    {formData.distribution?.manufactureCountry === 'Canada' && (
                                        <>
                                            <option value="Alberta">Alberta</option>
                                            <option value="British Columbia">British Columbia</option>
                                            <option value="Manitoba">Manitoba</option>
                                            {/* More Canadian provinces can be added here */}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasDistributors"
                                    checked={formData.distribution?.hasDistributors || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            distribution: {
                                                ...formData.distribution,
                                                hasDistributors: e.target.checked
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasDistributors" className="text-sm font-medium text-gray-700">
                                    Do you currently have a distributor or distributors?
                                </label>
                            </div>
                            
                            {formData.distribution?.hasDistributors && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                    {formData.distribution?.distributors?.map((distributor, index) => (
                                        <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex justify-between mb-2">
                                                <h4 className="font-medium">Distributor {index + 1}</h4>
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => {
                                                        const updatedDistributors = [...(formData.distribution?.distributors || [])];
                                                        updatedDistributors.splice(index, 1);
                                                        setFormData({
                                                            ...formData,
                                                            distribution: {
                                                                ...formData.distribution,
                                                                distributors: updatedDistributors
                                                            }
                                                        });
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        value={distributor.name || ''}
                                                        onChange={(e) => {
                                                            const updatedDistributors = [...(formData.distribution?.distributors || [])];
                                                            updatedDistributors[index] = {
                                                                ...updatedDistributors[index],
                                                                name: e.target.value
                                                            };
                                                            setFormData({
                                                                ...formData,
                                                                distribution: {
                                                                    ...formData.distribution,
                                                                    distributors: updatedDistributors
                                                                }
                                                            });
                                                        }}
                                                        className="w-full p-2 border border-gray-200 rounded-lg"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Percentage (%)</label>
                                                    <input
                                                        type="number"
                                                        value={distributor.percentage || ''}
                                                        onChange={(e) => {
                                                            const updatedDistributors = [...(formData.distribution?.distributors || [])];
                                                            updatedDistributors[index] = {
                                                                ...updatedDistributors[index],
                                                                percentage: e.target.value
                                                            };
                                                            setFormData({
                                                                ...formData,
                                                                distribution: {
                                                                    ...formData.distribution,
                                                                    distributors: updatedDistributors
                                                                }
                                                            });
                                                        }}
                                                        className="w-full p-2 border border-gray-200 rounded-lg"
                                                        min="0"
                                                        max="100"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="mt-2">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`doesPickup-${index}`}
                                                        checked={distributor.doesPickup || false}
                                                        onChange={(e) => {
                                                            const updatedDistributors = [...(formData.distribution?.distributors || [])];
                                                            updatedDistributors[index] = {
                                                                ...updatedDistributors[index],
                                                                doesPickup: e.target.checked
                                                            };
                                                            setFormData({
                                                                ...formData,
                                                                distribution: {
                                                                    ...formData.distribution,
                                                                    distributors: updatedDistributors
                                                                }
                                                            });
                                                        }}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`doesPickup-${index}`} className="text-sm text-gray-700">
                                                        Does this distributor pick up?
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentDistributors = formData.distribution?.distributors || [];
                                            setFormData({
                                                ...formData,
                                                distribution: {
                                                    ...formData.distribution,
                                                    distributors: [...currentDistributors, { name: '', percentage: '', doesPickup: false }]
                                                }
                                            });
                                        }}
                                        className="mt-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        + Add Distributor
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Which Retailers currently sell your product?
                            </label>
                            <input
                                type="text"
                                placeholder="Press Enter to add retailers"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                        e.preventDefault();
                                        const newRetailer = e.target.value.trim();
                                        if (newRetailer) {
                                            const currentRetailers = formData.distribution?.retailers || [];
                                            setFormData({
                                                ...formData,
                                                distribution: {
                                                    ...formData.distribution,
                                                    retailers: [...currentRetailers, newRetailer]
                                                }
                                            });
                                            e.target.value = '';
                                        }
                                    }
                                }}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.distribution?.retailers?.map((retailer, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center">
                                        {retailer}
                                        <button
                                            type="button"
                                            className="ml-1 text-blue-600 hover:text-blue-800"
                                            onClick={() => {
                                                const updatedRetailers = [...(formData.distribution?.retailers || [])];
                                                updatedRetailers.splice(index, 1);
                                                setFormData({
                                                    ...formData,
                                                    distribution: {
                                                        ...formData.distribution,
                                                        retailers: updatedRetailers
                                                    }
                                                });
                                            }}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Distribution Comments
                            </label>
                            <textarea
                                value={formData.distribution?.distributionComments || ''}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        distribution: {
                                            ...formData.distribution,
                                            distributionComments: e.target.value
                                        }
                                    });
                                }}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            />
                        </div>
                    </div>
                    
                    {/* Broker Section */}
                    <div className="mb-6 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-4">Broker</h3>
                        
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="hasBrokers"
                                checked={formData.broker?.hasBrokers || false}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        broker: {
                                            ...formData.broker,
                                            hasBrokers: e.target.checked
                                        }
                                    });
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="hasBrokers" className="text-sm font-medium text-gray-700">
                                Do you currently have a Broker or Brokers?
                            </label>
                        </div>
                        
                        {formData.broker?.hasBrokers && (
                            <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                {formData.broker?.brokers?.map((broker, index) => (
                                    <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <h4 className="font-medium">Broker {index + 1}</h4>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => {
                                                    const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                    updatedBrokers.splice(index, 1);
                                                    setFormData({
                                                        ...formData,
                                                        broker: {
                                                            ...formData.broker,
                                                            brokers: updatedBrokers
                                                        }
                                                    });
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        
                                        <div className="mb-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Broker Name</label>
                                            <input
                                                type="text"
                                                value={broker.name || ''}
                                                onChange={(e) => {
                                                    const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                    updatedBrokers[index] = {
                                                        ...updatedBrokers[index],
                                                        name: e.target.value
                                                    };
                                                    setFormData({
                                                        ...formData,
                                                        broker: {
                                                            ...formData.broker,
                                                            brokers: updatedBrokers
                                                        }
                                                    });
                                                }}
                                                className="w-full p-2 border border-gray-200 rounded-lg"
                                            />
                                        </div>
                                        
                                        <div className="mb-2">
                                            <div className="flex items-center mb-1">
                                                <input
                                                    type="checkbox"
                                                    id={`chargesCommission-${index}`}
                                                    checked={broker.chargesCommission || false}
                                                    onChange={(e) => {
                                                        const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                        updatedBrokers[index] = {
                                                            ...updatedBrokers[index],
                                                            chargesCommission: e.target.checked
                                                        };
                                                        setFormData({
                                                            ...formData,
                                                            broker: {
                                                                ...formData.broker,
                                                                brokers: updatedBrokers
                                                            }
                                                        });
                                                    }}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`chargesCommission-${index}`} className="text-sm text-gray-700">
                                                    Does the Broker charge commission?
                                                </label>
                                            </div>
                                            
                                            {broker.chargesCommission && (
                                                <div className="pl-4 mt-2 grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Commission Percentage (%)</label>
                                                        <input
                                                            type="number"
                                                            value={broker.commissionPercentage || ''}
                                                            onChange={(e) => {
                                                                const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                                updatedBrokers[index] = {
                                                                    ...updatedBrokers[index],
                                                                    commissionPercentage: e.target.value
                                                                };
                                                                setFormData({
                                                                    ...formData,
                                                                    broker: {
                                                                        ...formData.broker,
                                                                        brokers: updatedBrokers
                                                                    }
                                                                });
                                                            }}
                                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Commission Duration</label>
                                                        <input
                                                            type="text"
                                                            value={broker.commissionDuration || ''}
                                                            onChange={(e) => {
                                                                const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                                updatedBrokers[index] = {
                                                                    ...updatedBrokers[index],
                                                                    commissionDuration: e.target.value
                                                                };
                                                                setFormData({
                                                                    ...formData,
                                                                    broker: {
                                                                        ...formData.broker,
                                                                        brokers: updatedBrokers
                                                                    }
                                                                });
                                                            }}
                                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                                            placeholder="e.g., Duration of contract"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <input
                                                    type="checkbox"
                                                    id={`chargesRetainer-${index}`}
                                                    checked={broker.chargesRetainer || false}
                                                    onChange={(e) => {
                                                        const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                        updatedBrokers[index] = {
                                                            ...updatedBrokers[index],
                                                            chargesRetainer: e.target.checked
                                                        };
                                                        setFormData({
                                                            ...formData,
                                                            broker: {
                                                                ...formData.broker,
                                                                brokers: updatedBrokers
                                                            }
                                                        });
                                                    }}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`chargesRetainer-${index}`} className="text-sm text-gray-700">
                                                    Does the broker charge a retainer?
                                                </label>
                                            </div>
                                            
                                            {broker.chargesRetainer && (
                                                <div className="pl-4 mt-2 grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Retainer Amount ($)</label>
                                                        <input
                                                            type="number"
                                                            value={broker.retainerAmount || ''}
                                                            onChange={(e) => {
                                                                const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                                updatedBrokers[index] = {
                                                                    ...updatedBrokers[index],
                                                                    retainerAmount: e.target.value
                                                                };
                                                                setFormData({
                                                                    ...formData,
                                                                    broker: {
                                                                        ...formData.broker,
                                                                        brokers: updatedBrokers
                                                                    }
                                                                });
                                                            }}
                                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                                            min="0"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Retainer Duration</label>
                                                        <input
                                                            type="text"
                                                            value={broker.retainerDuration || ''}
                                                            onChange={(e) => {
                                                                const updatedBrokers = [...(formData.broker?.brokers || [])];
                                                                updatedBrokers[index] = {
                                                                    ...updatedBrokers[index],
                                                                    retainerDuration: e.target.value
                                                                };
                                                                setFormData({
                                                                    ...formData,
                                                                    broker: {
                                                                        ...formData.broker,
                                                                        brokers: updatedBrokers
                                                                    }
                                                                });
                                                            }}
                                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                                            placeholder="e.g., Monthly, Annually"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentBrokers = formData.broker?.brokers || [];
                                        setFormData({
                                            ...formData,
                                            broker: {
                                                ...formData.broker,
                                                brokers: [...currentBrokers, { 
                                                    name: '', 
                                                    chargesCommission: false,
                                                    commissionPercentage: '',
                                                    commissionDuration: '',
                                                    chargesRetainer: false,
                                                    retainerAmount: '',
                                                    retainerDuration: ''
                                                }]
                                            }
                                        });
                                    }}
                                    className="mt-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    + Add Broker
                                </button>
                            </div>
                        )}
                        
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Broker Comments
                            </label>
                            <textarea
                                value={formData.broker?.brokerComments || ''}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        broker: {
                                            ...formData.broker,
                                            brokerComments: e.target.value
                                        }
                                    });
                                }}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            />
                        </div>
                    </div>

                    {/* Marketing Section */}
                    <div className="mb-6 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-4">Marketing</h3>
                        
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasElevatorPitch"
                                    checked={formData.marketing?.hasElevatorPitch || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            marketing: {
                                                ...formData.marketing,
                                                hasElevatorPitch: e.target.checked
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasElevatorPitch" className="text-sm font-medium text-gray-700">
                                    Do you have an elevator pitch?
                                </label>
                            </div>
                            
                            {formData.marketing?.hasElevatorPitch && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Elevator Pitch</label>
                                        <textarea
                                            value={formData.marketing?.elevatorPitch || ''}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    marketing: {
                                                        ...formData.marketing,
                                                        elevatorPitch: e.target.value
                                                    }
                                                });
                                            }}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            rows="3"
                                            placeholder="Enter your 1-2 paragraph elevator pitch"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Elevator Pitch File (Optional)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    // Handle the file for form submission
                                                    const file = e.target.files[0];
                                                    // For now, we're just storing that we have a file; the actual upload will be handled later
                                                    setFormData({
                                                        ...formData,
                                                        marketing: {
                                                            ...formData.marketing,
                                                            elevatorPitchFile: 'placeholder_for_upload'
                                                        }
                                                    });
                                                }
                                            }}
                                            data-field="marketing.elevatorPitchFile"
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Upload an elevator pitch document or presentation</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasSellSheet"
                                    checked={formData.marketing?.hasSellSheet || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            marketing: {
                                                ...formData.marketing,
                                                hasSellSheet: e.target.checked
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasSellSheet" className="text-sm font-medium text-gray-700">
                                    Do you have a product sell sheet?
                                </label>
                            </div>
                            
                            {formData.marketing?.hasSellSheet && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sell Sheet File</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                // Handle the file for form submission
                                                const file = e.target.files[0];
                                                // For now, we're just storing that we have a file; the actual upload will be handled later
                                                setFormData({
                                                    ...formData,
                                                    marketing: {
                                                        ...formData.marketing,
                                                        sellSheetFile: 'placeholder_for_upload'
                                                    }
                                                });
                                            }
                                        }}
                                        data-field="marketing.sellSheetFile"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload your product sell sheet</p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="hasPresentation"
                                    checked={formData.marketing?.hasPresentation || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            marketing: {
                                                ...formData.marketing,
                                                hasPresentation: e.target.checked
                                            }
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="hasPresentation" className="text-sm font-medium text-gray-700">
                                    Do you have a product presentation?
                                </label>
                            </div>
                            
                            {formData.marketing?.hasPresentation && (
                                <div className="pl-4 border-l-2 border-blue-100 mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Presentation File</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.ppt,.pptx"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                // Handle the file for form submission
                                                const file = e.target.files[0];
                                                // For now, we're just storing that we have a file; the actual upload will be handled later
                                                setFormData({
                                                    ...formData,
                                                    marketing: {
                                                        ...formData.marketing,
                                                        presentationFile: 'placeholder_for_upload'
                                                    }
                                                });
                                            }
                                        }}
                                        data-field="marketing.presentationFile"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload your product presentation</p>
                                </div>
                            )}
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