import React from 'react';
import {
  Folder, Video, Heart, Activity,
  DollarSign, TrendingUp, Globe,
  Camera, MessageSquare, Share2,
  CheckCircle, Clock, AlertCircle,
  Users, Package, Building2, Bell
} from 'lucide-react';

const AdminOverview = () => {
  // Stats cards data
  const statsCards = [
    { title: 'Total Brands', value: '0', icon: <Building2 className="w-6 h-6" />, trend: '+0%' },
    { title: 'Total Products', value: '0', icon: <Package className="w-6 h-6" />, trend: '+0%' },
    { title: 'Active Buyers', value: '0', icon: <Users className="w-6 h-6" />, trend: '+0%' }
  ];

  // Latest updates data
  const latestUpdates = [
    { platform: 'Brand Registration', status: 'in-progress', icon: <Building2 className="w-5 h-5" /> },
    { platform: 'Product Listing', status: 'in-progress', icon: <Package className="w-5 h-5" /> },
    { platform: 'Sample Request', status: 'in-progress', icon: <Clock className="w-5 h-5" /> },
    { platform: 'User Report', status: 'in-progress', icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Admin Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Last updated: 2 hours ago</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Send Announcement
          </button>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="text-2xl font-semibold mt-2">{card.value}</h3>
                  <span className="text-green-500 text-sm font-medium mt-2 inline-block">
                    {card.trend} this month
                  </span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistics Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium">System Alerts</h3>
                <p className="text-sm text-gray-500">Important notifications</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-red-700">High Priority</p>
                    <p className="text-sm text-red-600">5 products flagged for review</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Bell className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-700">Pending Reviews</p>
                    <p className="text-sm text-yellow-600">12 brand registrations waiting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 text-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-blue-400/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Review & Approve</p>
              <p className="text-xs text-blue-100 mt-1">Process pending items</p>
            </div>
            <div className="bg-indigo-500 text-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-indigo-400/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Send Message</p>
              <p className="text-xs text-indigo-100 mt-1">Contact users</p>
            </div>
          </div>

          {/* Latest Updates */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-medium mb-6">Latest Updates</h3>
            <div className="space-y-4">
              {latestUpdates.map((update, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">
                      {update.icon}
                    </div>
                    <span className="font-medium text-gray-700">{update.platform}</span>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    update.status === 'completed' ? 'text-green-600 bg-green-50' :
                    update.status === 'pending' ? 'text-yellow-600 bg-yellow-50' :
                    'text-blue-600 bg-blue-50'
                  }`}>
                    {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Platform Overview</h3>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-sm mt-1 opacity-90">Active Brands</p>
                <div className="flex items-center gap-2 mt-4">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Export Report</span>
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-6">
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-2 bg-white rounded-full w-1/24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;