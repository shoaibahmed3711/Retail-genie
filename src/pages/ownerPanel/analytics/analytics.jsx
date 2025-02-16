import React, { useState } from 'react';
import {
  BarChart2, TrendingUp, Users, ShoppingCart,
  DollarSign, Star, RefreshCcw, Eye,
  MessageSquare, Package, AlertCircle, Calendar,
  ChevronUp, ChevronDown, Filter
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Sample analytics data
const salesData = [
  { month: 'Jan', sales: 4000, returns: 400, views: 8000 },
  { month: 'Feb', sales: 4500, returns: 380, views: 8500 },
  { month: 'Mar', sales: 5200, returns: 390, views: 9000 },
  { month: 'Apr', sales: 4800, returns: 420, views: 8800 },
  { month: 'May', sales: 5500, returns: 450, views: 9500 },
  { month: 'Jun', sales: 6000, returns: 480, views: 10000 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1200, revenue: 28000, rating: 4.8 },
  { name: 'Smart Watch', sales: 950, revenue: 23750, rating: 4.6 },
  { name: 'Laptop Stand', sales: 800, revenue: 16000, rating: 4.7 },
];

const customerSegments = [
  { name: 'New', value: 30 },
  { name: 'Returning', value: 45 },
  { name: 'VIP', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6M');

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
    <div className="bg-white rounded-md p-6 shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
      <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        <span className="ml-1">{trendValue}% from last month</span>
      </div>
    </div>
  );

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className=' container-fluid'>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Analytics Overview</h1>
            <p className="text-gray-500">Track your product performance and customer engagement</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="1M">Last Month</option>
                <option value="3M">Last 3 Months</option>
                <option value="6M">Last 6 Months</option>
                <option value="1Y">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="$128,950"
            icon={DollarSign}
            trend="up"
            trendValue="12.5"
          />
          <StatCard
            title="Total Orders"
            value="3,450"
            icon={ShoppingCart}
            trend="up"
            trendValue="8.2"
          />
          <StatCard
            title="Active Customers"
            value="2,840"
            icon={Users}
            trend="up"
            trendValue="5.3"
          />
          <StatCard
            title="Return Rate"
            value="3.2%"
            icon={RefreshCcw}
            trend="down"
            trendValue="1.8"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-md p-6 shadow">
            <h3 className="text-lg font-semibold mb-6">Sales Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#0088FE" />
                  <Line type="monotone" dataKey="views" stroke="#00C49F" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-white rounded-md p-6 shadow">
            <h3 className="text-lg font-semibold mb-6">Customer Segments</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-md p-6 shadow mb-8">
          <h3 className="text-lg font-semibold mb-6">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4">Product</th>
                  <th className="text-left py-4 px-4">Sales</th>
                  <th className="text-left py-4 px-4">Revenue</th>
                  <th className="text-left py-4 px-4">Rating</th>
                  <th className="text-left py-4 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Package className="text-gray-400 mr-2" size={20} />
                        {product.name}
                      </div>
                    </td>
                    <td className="py-4 px-4">{product.sales}</td>
                    <td className="py-4 px-4">${product.revenue}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        {product.rating}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <TrendingUp className="text-green-500" size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-md p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Customer Engagement</h3>
              <Eye className="text-gray-400" size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Product Views</span>
                <span className="font-semibold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Add to Cart</span>
                <span className="font-semibold">4,320</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-semibold">3.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Customer Feedback</h3>
              <MessageSquare className="text-gray-400" size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reviews</span>
                <span className="font-semibold">1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Rating</span>
                <span className="font-semibold">4.5/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-semibold">95%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Inventory Health</h3>
              <AlertCircle className="text-gray-400" size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Low Stock Items</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Out of Stock</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reorder Needed</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;