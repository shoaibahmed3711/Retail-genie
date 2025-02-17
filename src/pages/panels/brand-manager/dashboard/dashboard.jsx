
import React from 'react';
import {
  Activity, DollarSign, TrendingUp, Globe, PieChart, Share2, Bell, Clock, AlertCircle, ShoppingBag
} from 'lucide-react';

const BrandManagerDashboard = () => {
  // Aggregate Performance Metrics
  const performanceMetrics = [
    { title: 'Total Sales', value: '$248.5K', icon: <DollarSign className="w-6 h-6" />, trend: '+12%', color: 'blue' },
    { title: 'Market Share', value: '32.7%', icon: <PieChart className="w-6 h-6" />, trend: '+3.5%', color: 'green' },
    { title: 'Brand Growth', value: '18.2%', icon: <TrendingUp className="w-6 h-6" />, trend: '+5.4%', color: 'purple' }
  ];

  const recentActivities = [
    { 
      type: 'Product Launch', 
      brand: 'EcoFresh', 
      description: 'New organic product line released', 
      timestamp: '2 hours ago',
      icon: <ShoppingBag className="w-5 h-5 text-green-500" />
    },
    { 
      type: 'Marketing Campaign', 
      brand: 'TechNova', 
      description: 'Social media campaign went live', 
      timestamp: '4 hours ago',
      icon: <Globe className="w-5 h-5 text-blue-500" /> 
    },
    { 
      type: 'Team Collaboration', 
      brand: 'UrbanStyle', 
      description: 'Design team finalized Q3 concepts', 
      timestamp: 'Yesterday',
      icon: <Share2 className="w-5 h-5 text-purple-500" /> 
    },
    { 
      type: 'Update', 
      brand: 'HomeComfort', 
      description: 'Updated pricing strategy approved', 
      timestamp: '2 days ago',
      icon: <Activity className="w-5 h-5 text-orange-500" /> 
    }
  ];

  const notifications = [
    { 
      type: 'critical', 
      message: 'NatureFresh inventory running low', 
      action: 'Review stock levels',
      icon: <AlertCircle className="w-5 h-5" />
    },
    { 
      type: 'reminder', 
      message: 'TechPro product launch in 2 days', 
      action: 'Final approval needed',
      icon: <Clock className="w-5 h-5" />
    },
    { 
      type: 'approval', 
      message: 'Marketing budget increase request', 
      action: 'Pending your review',
      icon: <Bell className="w-5 h-5" />
    }
  ];

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Brand Management Hub</h1>
            <p className="text-sm text-gray-500 mt-1">Managing 8 brands across 3 market segments</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 inline mr-2" />
              Notifications (5)
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New Brand
            </button>
          </div>
        </div>

        {/* Aggregate Performance Metrics */}
        <h2 className="text-xl font-medium text-gray-800 mb-4">Portfolio Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-semibold mt-2">{metric.value}</h3>
                  <span className="text-green-500 text-sm font-medium mt-2 inline-block">
                    {metric.trend} this quarter
                  </span>
                </div>
                <div className={`bg-${metric.color}-50 p-3 rounded-lg`}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className={`h-2 bg-${metric.color}-500 rounded-full w-[78%]`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid - Recent Activities and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities Section - Takes up 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">Recent Activities</h3>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="bg-gray-100 p-3 rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{activity.type}</h4>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm font-medium text-blue-600">{activity.brand}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Load more activities
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">5 New</span>
            </div>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-4 p-4 rounded-lg ${
                    notification.type === 'critical' ? 'bg-red-50' : 
                    notification.type === 'reminder' ? 'bg-yellow-50' : 'bg-blue-50'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    notification.type === 'critical' ? 'bg-red-100 text-red-600' : 
                    notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{notification.action}</span>
                      <button className="text-xs font-medium text-blue-600 hover:underline">Take action</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                View All Notifications
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-800 mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                  <ShoppingBag className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-gray-700">New Product</span>
                </button>
                <button className="flex flex-col items-center justify-center bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors">
                  <Globe className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-xs font-medium text-gray-700">Launch Campaign</span>
                </button>
                <button className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors">
                  <PieChart className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-xs font-medium text-gray-700">View Reports</span>
                </button>
                <button className="flex flex-col items-center justify-center bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors">
                  <Share2 className="w-6 h-6 text-orange-600 mb-2" />
                  <span className="text-xs font-medium text-gray-700">Share Updates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandManagerDashboard;