import React from 'react';
import {
  Heart, TrendingUp, Bell, 
  Search, Globe, Star,
  ShoppingBag, Tag, Bookmark,
  Calendar, MessageSquare, AlertCircle
} from 'lucide-react';

const BuyerOverview = () => {
  // Personalized Recommendations Data
  const recommendations = [
    {
      id: 1,
      brand: "EcoStyle",
      category: "Sustainable Fashion",
      matchScore: "92%",
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      description: "Eco-friendly fashion accessories",
      price: "$50-200",
    },
    {
      id: 2,
      brand: "TechWear",
      category: "Smart Clothing",
      matchScore: "88%",
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      description: "Innovative wearable technology",
      price: "$100-500",
    },
    {
      id: 3,
      brand: "ArtisanCraft",
      category: "Handmade Goods",
      matchScore: "85%",
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg",
      description: "Unique handcrafted items",
      price: "$30-150",
    }
  ];

  // Recent Brand Additions
  const newBrands = [
    {
      id: 1,
      name: "NatureLux",
      joinDate: "2 days ago",
      category: "Organic Beauty",
      followers: 1243,
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg"
    },
    {
      id: 2,
      name: "UrbanPulse",
      joinDate: "5 days ago",
      category: "Street Fashion",
      followers: 892,
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg"
    },
    {
      id: 3,
      name: "HomeHarmony",
      joinDate: "1 week ago",
      category: "Home Decor",
      followers: 2156,
      image: "https://m.media-amazon.com/images/I/71DsnuiX0lL._AC_SX466_.jpg"
    }
  ];

  // Announcements
  const announcements = [
    {
      id: 1,
      title: "Spring Collection Launch Event",
      date: "March 15, 2025",
      type: "Event",
      description: "Join us for the exclusive preview of spring collections from top brands",
      icon: <Calendar className="w-5 h-5 text-purple-500" />
    },
    {
      id: 2,
      title: "New Feature: Advanced Brand Filtering",
      type: "Update",
      date: "Coming Soon",
      description: "Find your perfect brand match with our enhanced search capabilities",
      icon: <Star className="w-5 h-5 text-blue-500" />
    },
    {
      id: 3,
      title: "Holiday Season Shopping Guide",
      type: "Guide",
      date: "Available Now",
      description: "Discover curated collections and exclusive deals for the season",
      icon: <ShoppingBag className="w-5 h-5 text-green-500" />
    }
  ];

  return (
    <div className="absolute overflow-y-auto bg-gray-50 h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back, Alex</h1>
            <p className="text-sm text-gray-500 mt-1">Discover new brands and products tailored for you</p>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands..."
                className="w-64 px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">Recommended for You</h2>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img src={item.image} alt={item.brand} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">{item.brand}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {item.matchScore} Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{item.price}</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Brand Additions and Announcements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Brand Additions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">New Brands on Platform</h2>
              <button className="text-blue-600 text-sm hover:underline">Explore All</button>
            </div>
            <div className="space-y-6">
              {newBrands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <img src={brand.image} alt={brand.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{brand.name}</h3>
                        <p className="text-sm text-gray-500">{brand.category}</p>
                      </div>
                      <span className="text-xs text-gray-500">Joined {brand.joinDate}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{brand.followers} followers</span>
                      <button className="text-blue-600 text-sm hover:underline">Follow</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">Announcements</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">3 New</span>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-white">
                      {announcement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                        <span className="text-xs text-gray-500">{announcement.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{announcement.description}</p>
                      <button className="text-blue-600 text-sm mt-2 hover:underline">Learn more</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              View All Announcements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOverview;