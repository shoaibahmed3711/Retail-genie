
import React, { useState } from 'react';
import {
  Search, Filter, Tag, DollarSign,
  Building, Package, Grid, List,
  Star, ChevronDown, X, Check
} from 'lucide-react';

const BuyerProducts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    availability: []
  });

  // Sample Categories
  const categories = [
    { id: 1, name: 'Electronics', count: 1234 },
    { id: 2, name: 'Clothing', count: 856 },
    { id: 3, name: 'Home & Garden', count: 654 },
    { id: 4, name: 'Beauty', count: 432 },
    { id: 5, name: 'Sports', count: 321 }
  ];

  // Sample Brands
  const brands = [
    { id: 1, name: 'TechPro', count: 156 },
    { id: 2, name: 'EcoStyle', count: 123 },
    { id: 3, name: 'HomeComfort', count: 98 },
    { id: 4, name: 'FreshBeauty', count: 87 },
    { id: 5, name: 'SportFlex', count: 76 }
  ];

  // Sample Products
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      brand: 'TechPro',
      price: 199.99,
      rating: 4.8,
      reviews: 235,
      category: 'Electronics',
      image: 'https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg',
      inStock: true,
      description: 'Premium wireless headphones with noise cancellation'
    },
    {
      id: 2,
      name: 'Eco-Friendly Water Bottle',
      brand: 'EcoStyle',
      price: 29.99,
      rating: 4.6,
      reviews: 189,
      category: 'Sports',
      image: 'https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg',
      inStock: true,
      description: 'Sustainable stainless steel water bottle'
    },
    {
      id: 3,
      name: 'Smart Home Hub',
      brand: 'HomeComfort',
      price: 149.99,
      rating: 4.7,
      reviews: 156,
      category: 'Electronics',
      image: 'https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg',
      inStock: false,
      description: 'Central control for all your smart home devices'
    }
  ];

  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="absolute overflow-y-auto bg-gray-50 h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Search Products</h1>
          <p className="text-sm text-gray-500 mt-1">Find the perfect products for your needs</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products by name, description, or keywords..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 space-y-6">
            {/* Categories Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={() => toggleFilter('categories', category.id)}
                      checked={selectedFilters.categories.includes(category.id)}
                    />
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-xs text-gray-400">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Price Range
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Apply Range
                </button>
              </div>
            </div>

            {/* Brands Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={() => toggleFilter('brands', brand.id)}
                      checked={selectedFilters.brands.includes(brand.id)}
                    />
                    <span className="text-sm text-gray-600">{brand.name}</span>
                    <span className="text-xs text-gray-400">({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Availability
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={() => toggleFilter('availability', 'inStock')}
                    checked={selectedFilters.availability.includes('inStock')}
                  />
                  <span className="text-sm text-gray-600">In Stock</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={() => toggleFilter('availability', 'preOrder')}
                    checked={selectedFilters.availability.includes('preOrder')}
                  />
                  <span className="text-sm text-gray-600">Pre-order Available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Found 1,234 products</h2>
                  <p className="text-sm text-gray-500">Showing results 1-12</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Rating</option>
                  </select>
                  <div className="flex border border-gray-200 rounded-lg">
                    <button
                      className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">${product.price}</span>
                      <button 
                        className={`px-4 py-2 rounded-lg ${
                          product.inStock 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        } transition-colors`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProducts;