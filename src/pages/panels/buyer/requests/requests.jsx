import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Filter,
  Search,
  ChevronDown,
  Calendar,
  MessageSquare,
  AlertCircle,
  MoreVertical,
  Eye
} from 'lucide-react';

const BuyerRequests = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample request data
  const sampleRequests = [
    {
      id: "SR001",
      productName: "Premium Cotton T-Shirt",
      brand: "EcoStyle Apparel",
      requestDate: "2025-02-15",
      status: "approved",
      quantity: 3,
      expectedDelivery: "2025-02-25",
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      trackingNumber: "1Z999AA1234567890",
      notes: "Sample requested for Spring '25 Collection",
      lastUpdate: "2025-02-16",
      priority: "high"
    },
    {
      id: "SR002",
      productName: "Sustainable Denim Jeans",
      brand: "GreenDenim Co.",
      requestDate: "2025-02-14",
      status: "pending",
      quantity: 2,
      expectedDelivery: null,
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      notes: "Requesting different washes",
      lastUpdate: "2025-02-14",
      priority: "medium"
    },
    {
      id: "SR003",
      productName: "Organic Wool Sweater",
      brand: "NatureFibers",
      requestDate: "2025-02-13",
      status: "shipped",
      quantity: 1,
      expectedDelivery: "2025-02-20",
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      trackingNumber: "1Z999AA1234567891",
      notes: "Winter collection sample",
      lastUpdate: "2025-02-15",
      priority: "normal"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-purple-100 text-purple-800",
      rejected: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <Package className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  return (
    <div className="absolute overflow-y-auto bg-gray-50 h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Sample Requests</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track your product sample requests</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            New Sample Request
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Total Requests", value: "24", change: "+3 this month", color: "blue" },
            { title: "Pending Approval", value: "8", change: "2 urgent", color: "yellow" },
            { title: "In Transit", value: "5", change: "On schedule", color: "purple" },
            { title: "Delivered", value: "11", change: "This quarter", color: "green" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
                <span className={`text-xs text-${stat.color}-600`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select className="border border-gray-200 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Brands</option>
                <option value="ecosyle">EcoStyle</option>
                <option value="greendenim">GreenDenim</option>
              </select>
              <select className="border border-gray-200 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="shipped">Shipped</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {sampleRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-6">
                <img
                  src={request.image}
                  alt={request.productName}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{request.productName}</h3>
                      <p className="text-sm text-gray-500">{request.brand}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Request Date</p>
                      <p className="text-sm font-medium text-gray-900">{new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="text-sm font-medium text-gray-900">{request.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expected Delivery</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.expectedDelivery ? new Date(request.expectedDelivery).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Update</p>
                      <p className="text-sm font-medium text-gray-900">{new Date(request.lastUpdate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                        <MessageSquare className="w-4 h-4" />
                        <span>Contact Brand</span>
                      </button>
                    </div>
                    {request.trackingNumber && (
                      <div className="text-sm text-gray-500">
                        Tracking: <span className="font-medium">{request.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerRequests;