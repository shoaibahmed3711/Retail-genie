import React from 'react';
import {
  Folder, Video, Heart, Activity,
  DollarSign, TrendingUp, Globe,
  Camera, MessageSquare, Share2,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react';

const BrandOwnerOverview = () => {
  // Latest updates data
  const latestUpdates = [
    { platform: 'Snapchat', status: 'pending', icon: <Clock className="w-5 h-5" /> },
    { platform: 'Instagram', status: 'completed', icon: <Camera className="w-5 h-5" /> },
    { platform: 'Social Hub', status: 'in-progress', icon: <Globe className="w-5 h-5" /> },
    { platform: 'Messages', status: 'completed', icon: <MessageSquare className="w-5 h-5" /> }
  ];

  // Stats cards data
  const statsCards = [
    { title: 'Total Revenue', value: '$48.2K', icon: <DollarSign className="w-6 h-6" />, trend: '+22%' },
    { title: 'Total Posts', value: '2,450', icon: <MessageSquare className="w-6 h-6" />, trend: '+12%' },
    { title: 'Engagement', value: '87.5K', icon: <TrendingUp className="w-6 h-6" />, trend: '+32%' }
  ];

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className=' container-fluid'>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Your Dashboard is updated</h1>
            <p className="text-sm text-gray-500 mt-1">Last updated: 2 hours ago</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            New Report
          </button>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 ">
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
          <div className="bg-white rounded-xl shadow p-6 ">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium">Latest statistics</h3>
                <p className="text-sm text-gray-500">Performance metrics</p>
              </div>
              <button className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors">
                +
              </button>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-teal-200 rounded-full w-3/4"></div>
                  <div className="h-2 bg-teal-100 rounded-full w-1/2 mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 text-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-blue-400/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Folder className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Share Files</p>
              <p className="text-xs text-blue-100 mt-1">Quick upload & share</p>
            </div>
            <div className="bg-indigo-500 text-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-indigo-400/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Record Screen</p>
              <p className="text-xs text-indigo-100 mt-1">Start recording</p>
            </div>
          </div>

          {/* Plan Card */}
          <div className="bg-[#1a2234] text-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">What's Your Plan?</h3>
                <p className="text-sm opacity-80 mt-1">36 hours remaining</p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Upgrade Now
                  </button>
                </div>
              </div>
              <div className="bg-gray-800/50 p-2 rounded-lg">
                <Heart className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-xl shadow p-6 ">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium">Monthly Goal</h3>
                <p className="text-sm text-gray-500 mt-1">You're almost there!</p>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-orange-500"
                  strokeWidth="10"
                  strokeDasharray={`${89 * 2.83} ${100 * 2.83}`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-semibold">89%</span>
              </div>
            </div>
          </div>

          {/* Latest Updates */}
          <div className="bg-white rounded-xl shadow p-6 ">
            <h3 className="text-lg font-medium mb-6">Latest updates</h3>
            <div className="space-y-4">
              {latestUpdates.map((update, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">
                      {update.icon}
                    </div>
                    <span className="font-medium text-gray-700">{update.platform}</span>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${update.status === 'completed' ? 'text-green-600 bg-green-50' :
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
                <h3 className="text-lg font-medium">Monthly Revenue</h3>
                <p className="text-3xl font-bold mt-2">$5,280</p>
                <div className="flex items-center gap-2 mt-4">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share Report</span>
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-6">
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-2 bg-white rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandOwnerOverview;