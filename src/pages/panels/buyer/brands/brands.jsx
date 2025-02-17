import React, { useState } from 'react';
import {
  Search, Filter, MapPin, Calendar,
  Grid, List, ChevronDown, X,
  Star, Globe, Building, Tag
} from 'lucide-react';

const BuyerBrands = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    locations: [],
    dateRanges: []
  });

  // Sample Categories
  const categories = [
    { id: 1, name: 'Electronics', count: 156 },
    { id: 2, name: 'Apparel', count: 243 },
    { id: 3, name: 'Home Goods', count: 189 },
    { id: 4, name: 'Beauty', count: 167 },
    { id: 5, name: 'Food & Beverage', count: 145 }
  ];

  // Sample Locations
  const locations = [
    { id: 1, name: 'New York', count: 234 },
    { id: 2, name: 'Los Angeles', count: 189 },
    { id: 3, name: 'Chicago', count: 145 },
    { id: 4, name: 'Toronto', count: 167 },
    { id: 5, name: 'Vancouver', count: 98 }
  ];

  // Sample Date Ranges
  const dateRanges = [
    { id: 1, name: 'Last Week', value: '7d' },
    { id: 2, name: 'Last Month', value: '30d' },
    { id: 3, name: 'Last 3 Months', value: '90d' },
    { id: 4, name: 'Last Year', value: '365d' }
  ];

  // Sample Search Results
  const searchResults = [
    {
      id: 1,
      name: 'TechNova',
      category: 'Electronics',
      location: 'New York',
      rating: 4.8,
      reviews: 235,
      joinDate: '2024-12-01',
      image: 'https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg',
      description: 'Leading innovation in consumer electronics'
    },
    {
      id: 2,
      name: 'EcoStyle',
      category: 'Apparel',
      location: 'Los Angeles',
      rating: 4.6,
      reviews: 189,
      joinDate: '2025-01-15',
      image: 'https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg',
      description: 'Sustainable fashion for the conscious consumer'
    },
    {
      id: 3,
      name: 'HomeHarmony',
      category: 'Home Goods',
      location: 'Chicago',
      rating: 4.7,
      reviews: 156,
      joinDate: '2025-02-01',
      image: 'https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg',
      description: 'Quality home essentials for modern living'
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
          <h1 className="text-2xl font-semibold text-gray-800">Search Brands</h1>
          <p className="text-sm text-gray-500 mt-1">Discover and connect with brands that match your interests</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for brands by name, category, or location..."
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

            {/* Location Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </h3>
              <div className="space-y-2">
                {locations.map(location => (
                  <label key={location.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={() => toggleFilter('locations', location.id)}
                      checked={selectedFilters.locations.includes(location.id)}
                    />
                    <span className="text-sm text-gray-600">{location.name}</span>
                    <span className="text-xs text-gray-400">({location.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Added Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Date Added
              </h3>
              <div className="space-y-2">
                {dateRanges.map(range => (
                  <label key={range.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={() => toggleFilter('dateRanges', range.id)}
                      checked={selectedFilters.dateRanges.includes(range.id)}
                    />
                    <span className="text-sm text-gray-600">{range.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Found 245 brands</h2>
                  <p className="text-sm text-gray-500">Showing results 1-10</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Sort by: Relevance</option>
                    <option>Sort by: Newest</option>
                    <option>Sort by: Rating</option>
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

            {/* Results Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
              {searchResults.map(brand => (
                <div key={brand.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img src={brand.image} alt={brand.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-800">{brand.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{brand.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({brand.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        {brand.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {brand.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
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

export default BuyerBrands;