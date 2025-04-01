import React, { useState } from 'react';
import {
  Heart,
  Folder,
  Tag,
  Grid,
  List,
  Search,
  Filter,
  Plus,
  MoreVertical,
  X
} from 'lucide-react';

const BuyerFavourites = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data for favorites
  const favorites = [
    {
      id: 1,
      name: "EcoStyle",
      type: "brand",
      category: "Fashion",
      tags: ["sustainable", "accessories"],
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      dateAdded: "2025-02-10",
      description: "Eco-friendly fashion accessories brand"
    },
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: 12 },
    { id: 'fashion', name: 'Fashion', count: 5 },
    { id: 'technology', name: 'Technology', count: 3 },
    { id: 'handmade', name: 'Handmade', count: 4 }
  ];

  return (
    <div className="absolute overflow-y-auto bg-gray-50 h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">My Favorites</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your favorite brands and products</p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <Plus className="w-4 h-4" />
              <span>New Collection</span>
            </button>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search in favorites..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex space-x-6">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-medium text-gray-800 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Favorites Grid/List */}
          <div className="flex-1">
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
              {favorites.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50">
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.type}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    )}
                    {item.price && (
                      <p className="text-sm font-medium text-gray-900">{item.price}</p>
                    )}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Added {new Date(item.dateAdded).toLocaleDateString()}</span>
                      <button className="text-blue-600 text-sm hover:underline">View Details</button>
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

export default BuyerFavourites;