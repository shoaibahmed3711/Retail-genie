import React, { useState } from 'react';
import {
  Search,
  Package,
  Building,
  Calendar,
  MessageSquare,
  Clock,
  Filter,
  ChevronDown,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

const BuyerHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample history data - in real app, this would come from an API
  const [historyData] = useState([
    {
      id: 1,
      type: 'product_view',
      timestamp: '2025-02-18T10:30:00',
      details: {
        productName: 'Organic Cotton T-Shirt',
        brand: 'EcoStyle Apparel',
        category: 'Apparel'
      }
    },
    {
      id: 2,
      type: 'brand_view',
      timestamp: '2025-02-18T11:15:00',
      details: {
        brandName: 'Sustainable Basics',
        category: 'Accessories'
      }
    },
    {
      id: 3,
      type: 'search',
      timestamp: '2025-02-18T12:00:00',
      details: {
        query: 'sustainable denim manufacturers',
        filters: ['Location: Asia', 'MOQ: 500-1000']
      }
    },
    {
      id: 4,
      type: 'meeting',
      timestamp: '2025-02-18T14:00:00',
      details: {
        brandName: 'EcoStyle Apparel',
        meetingType: 'Video Call',
        status: 'Completed'
      }
    },
    {
      id: 5,
      type: 'message',
      timestamp: '2025-02-18T15:30:00',
      details: {
        brandName: 'Green Textiles Co',
        messageType: 'Sample Request',
        status: 'Sent'
      }
    }
  ]);

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return `${minutes} minutes ago`;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'product_view':
        return <Package className="w-5 h-5" />;
      case 'brand_view':
        return <Building className="w-5 h-5" />;
      case 'search':
        return <Search className="w-5 h-5" />;
      case 'meeting':
        return <Calendar className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const FilterDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Time Period</h3>
        <div className="space-y-2">
          {['Today', 'Last 7 days', 'Last 30 days', 'All time'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter.toLowerCase())}
              className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                timeFilter === filter.toLowerCase() 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute overflow-y-auto bg-gray-50 min-h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">History</h1>
            <p className="text-sm text-gray-500 mt-1">Track your platform activities and interactions</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showFilters && <FilterDropdown />}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex p-4">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Activity
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'brands' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('brands')}
              >
                Brands
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'searches' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('searches')}
              >
                Searches
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'interactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('interactions')}
              >
                Interactions
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {historyData.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-lg bg-gray-100 p-3 mr-4">
                    {getIcon(item.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        {item.type === 'product_view' && (
                          <>
                            <h3 className="font-medium text-gray-900">
                              Viewed Product: {item.details.productName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Brand: {item.details.brand} • Category: {item.details.category}
                            </p>
                          </>
                        )}
                        
                        {item.type === 'brand_view' && (
                          <>
                            <h3 className="font-medium text-gray-900">
                              Viewed Brand: {item.details.brandName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Category: {item.details.category}
                            </p>
                          </>
                        )}
                        
                        {item.type === 'search' && (
                          <>
                            <h3 className="font-medium text-gray-900">
                              Search: "{item.details.query}"
                            </h3>
                            <p className="text-sm text-gray-500">
                              Filters: {item.details.filters.join(' • ')}
                            </p>
                          </>
                        )}
                        
                        {item.type === 'meeting' && (
                          <>
                            <h3 className="font-medium text-gray-900">
                              Meeting with {item.details.brandName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.details.meetingType} • {item.details.status}
                            </p>
                          </>
                        )}
                        
                        {item.type === 'message' && (
                          <>
                            <h3 className="font-medium text-gray-900">
                              Message to {item.details.brandName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.details.messageType} • {item.details.status}
                            </p>
                          </>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {getTimeAgo(item.timestamp)}
                      </span>
                    </div>
                    
                    <div className="mt-3 flex space-x-4">
                      <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                        <RotateCcw className="w-4 h-4" />
                        <span>Repeat Action</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHistory;

