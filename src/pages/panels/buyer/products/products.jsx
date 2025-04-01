import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Tag, DollarSign,
  Building, Package, Grid, List,
  Star, ChevronDown, X, Check
} from 'lucide-react';
import { useBuyer } from '../../../../contexts/BuyerContext';

const BuyerProducts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchInput, setSearchInput] = useState('');
  const [localPriceRange, setLocalPriceRange] = useState({ min: 0, max: 1000 });
  
  // Get all context values and functions
  const { 
    products, 
    categories,
    loading, 
    filterByCategory,
    filterByPriceRange,
    searchProducts,
    sortProducts,
    priceRange,
    selectedCategory,
    resetFilters
  } = useBuyer();

  // Track selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Apply category filter when selections change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      // If no categories selected, clear the filter
      filterByCategory('');
    } else if (selectedCategories.length === 1) {
      // If only one category selected, use that
      filterByCategory(selectedCategories[0]);
    }
    // If multiple categories selected, we'd need to enhance our context to handle this
    // For now, we'll just use the first selected category
  }, [selectedCategories, filterByCategory]);

  // Handle category toggle
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle search submission
  const handleSearch = () => {
    searchProducts(searchInput);
  };

  // Handle price range application
  const applyPriceRange = () => {
    filterByPriceRange(localPriceRange.min, localPriceRange.max);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    switch(value) {
      case 'featured':
        sortProducts('createdAt', 'desc');
        break;
      case 'price-asc':
        sortProducts('price', 'asc');
        break;
      case 'price-desc':
        sortProducts('price', 'desc');
        break;
      case 'newest':
        sortProducts('createdAt', 'desc');
        break;
      case 'rating':
        sortProducts('rating', 'desc');
        break;
      default:
        sortProducts('createdAt', 'desc');
    }
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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSearch}
            >
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
                {categories && categories.length > 0 ? (
                  categories.map((category, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={() => toggleCategory(category)}
                        checked={selectedCategories.includes(category)}
                      />
                      <span className="text-sm text-gray-600">{category}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No categories available</p>
                )}
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
                    value={localPriceRange.min}
                    onChange={e => setLocalPriceRange({...localPriceRange, min: parseInt(e.target.value) || 0})}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    value={localPriceRange.max}
                    onChange={e => setLocalPriceRange({...localPriceRange, max: parseInt(e.target.value) || 0})}
                  />
                </div>
                <button 
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  onClick={applyPriceRange}
                >
                  Apply Range
                </button>
              </div>
            </div>

            {/* Reset Filters Button */}
            <button 
              className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center justify-center"
              onClick={resetFilters}
            >
              <X className="w-4 h-4 mr-2" /> Reset Filters
            </button>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    Found {loading ? '...' : products.length} products
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedCategory && `Category: ${selectedCategory}`}
                    {priceRange.min > 0 || priceRange.max < 1000 ? 
                      ` • Price: $${priceRange.min} - $${priceRange.max}` : ''}
                  </p>
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <select 
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
                    onChange={handleSortChange}
                  >
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Best Rating</option>
                  </select>
                  <div className="hidden sm:flex border border-gray-200 rounded-lg">
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

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* No Results State */}
            {!loading && products.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img 
                        src={product.imageUrl || '/api/placeholder/300/300'} 
                        alt={product.name} 
                        className="w-full h-48 object-cover" 
                      />
                      {product.status !== 'In Stock' && (
                        <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {product.status}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{product.rating || '0'}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900">
                          ${product.discount > 0 
                            ? product.discountedPrice 
                            : product.price}
                        </span>
                        <button 
                          className={`px-4 py-2 rounded-lg ${
                            product.stock > 0 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          } transition-colors`}
                          disabled={product.stock <= 0}
                        >
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProducts;