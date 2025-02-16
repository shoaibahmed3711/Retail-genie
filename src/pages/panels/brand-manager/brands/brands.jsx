import React, { useState } from 'react';
import {
  Settings, Edit, Trash2, Eye, EyeOff,
  Plus, Search, Filter, Download, Upload,
  CheckCircle, XCircle, ArrowUp, ArrowDown,
  Save, X, MoreHorizontal, AlertTriangle
} from 'lucide-react';

const BrandManagerBrands = () => {
  // State for brand list
  const [brands, setBrands] = useState([
    { id: 1, name: 'EcoFresh', category: 'Organic Food', status: 'active', visibility: 'public', revenue: '$1.45M', growth: '+12%', products: 24 },
    { id: 2, name: 'TechNova', category: 'Electronics', status: 'active', visibility: 'public', revenue: '$3.78M', growth: '+8%', products: 42 },
    { id: 3, name: 'UrbanStyle', category: 'Fashion', status: 'active', visibility: 'private', revenue: '$2.12M', growth: '+5%', products: 78 },
    { id: 4, name: 'HomeComfort', category: 'Home Goods', status: 'inactive', visibility: 'public', revenue: '$0.92M', growth: '-2%', products: 36 },
    { id: 5, name: 'FitLife', category: 'Fitness', status: 'active', visibility: 'public', revenue: '$1.28M', growth: '+15%', products: 29 },
  ]);

  // State for search, filter and sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  // State for form
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'active',
    visibility: 'public',
    description: '',
    website: '',
    contactEmail: '',
    logo: null
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle brand editing
  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      category: brand.category,
      status: brand.status,
      visibility: brand.visibility,
      description: brand.description || '',
      website: brand.website || '',
      contactEmail: brand.contactEmail || '',
      logo: brand.logo || null
    });
    setShowForm(true);
  };

  // Handle brand creation/update
  const handleSaveBrand = (e) => {
    e.preventDefault();
    if (editingBrand) {
      // Update existing brand
      setBrands(brands.map(brand =>
        brand.id === editingBrand.id ? { ...brand, ...formData } : brand
      ));
    } else {
      // Create new brand
      const newBrand = {
        id: brands.length + 1,
        ...formData,
        revenue: '$0',
        growth: '0%',
        products: 0
      };
      setBrands([...brands, newBrand]);
    }

    // Reset form
    setShowForm(false);
    setEditingBrand(null);
    setFormData({
      name: '',
      category: '',
      status: 'active',
      visibility: 'public',
      description: '',
      website: '',
      contactEmail: '',
      logo: null
    });
  };

  // Handle toggling brand status
  const toggleBrandStatus = (id) => {
    setBrands(brands.map(brand =>
      brand.id === id ?
        { ...brand, status: brand.status === 'active' ? 'inactive' : 'active' } :
        brand
    ));
  };

  // Handle toggling brand visibility
  const toggleBrandVisibility = (id) => {
    setBrands(brands.map(brand =>
      brand.id === id ?
        { ...brand, visibility: brand.visibility === 'public' ? 'private' : 'public' } :
        brand
    ));
  };

  // Handle brand deletion
  const handleDeleteBrand = (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      setBrands(brands.filter(brand => brand.id !== id));
    }
  };

  // Filter and sort brands
  const filteredBrands = brands
    .filter(brand =>
      (filterStatus === 'all' || brand.status === filterStatus) &&
      (brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Brand Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all your brands in one place</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Brand
          </button>
        </div>

        {/* Search and Filters */}
        <div className="rounded-xl mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search brands by name or category..."
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <button className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-500" />
                <span>More Filters</span>
              </button>
              <button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50">
                <Download className="w-5 h-5 text-gray-500" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('name')}
                    >
                      Brand Name
                      {sortField === 'name' && (
                        sortDirection === 'asc' ?
                          <ArrowUp className="w-4 h-4" /> :
                          <ArrowDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('category')}
                    >
                      Category
                      {sortField === 'category' && (
                        sortDirection === 'asc' ?
                          <ArrowUp className="w-4 h-4" /> :
                          <ArrowDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visibility
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('revenue')}
                    >
                      Revenue
                      {sortField === 'revenue' && (
                        sortDirection === 'asc' ?
                          <ArrowUp className="w-4 h-4" /> :
                          <ArrowDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('growth')}
                    >
                      Growth
                      {sortField === 'growth' && (
                        sortDirection === 'asc' ?
                          <ArrowUp className="w-4 h-4" /> :
                          <ArrowDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('products')}
                    >
                      Products
                      {sortField === 'products' && (
                        sortDirection === 'asc' ?
                          <ArrowUp className="w-4 h-4" /> :
                          <ArrowDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {brand.logo ?
                            <img src={brand.logo} alt={brand.name} className="h-10 w-10 rounded-full" /> :
                            <span className="text-gray-500 font-medium">{brand.name.charAt(0)}</span>
                          }
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                          <div className="text-sm text-gray-500">{brand.website || 'No website'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{brand.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleBrandStatus(brand.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${brand.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {brand.status === 'active' ?
                          <CheckCircle className="w-4 h-4 mr-1" /> :
                          <XCircle className="w-4 h-4 mr-1" />
                        }
                        {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleBrandVisibility(brand.id)}
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        {brand.visibility === 'public' ?
                          <><Eye className="w-4 h-4 mr-1" /> Public</> :
                          <><EyeOff className="w-4 h-4 mr-1" /> Private</>
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {brand.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center text-sm font-medium ${brand.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {brand.growth.startsWith('+') ?
                          <ArrowUp className="w-4 h-4 mr-1" /> :
                          <ArrowDown className="w-4 h-4 mr-1" />
                        }
                        {brand.growth}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {brand.products}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <button
                          onClick={() => handleEditBrand(brand)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                            <div className="py-1">
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Details</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Duplicate Brand</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Generate Report</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBrands.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="w-10 h-10 text-gray-400 mb-4" />
                        <p className="text-lg font-medium">No brands found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredBrands.length}</span> of <span className="font-medium">{brands.length}</span> brands
              </div>
              <div className="flex gap-2">
                <button className="border border-gray-300 rounded px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Brand Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingBrand ? 'Edit Brand' : 'Add New Brand'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingBrand(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSaveBrand} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Brand Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.category}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website URL</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Brand Logo</label>
                    <div className="mt-1 flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                        {formData.logo ? (
                          <img
                            src={formData.logo instanceof File ? URL.createObjectURL(formData.logo) : formData.logo}
                            alt="Brand logo preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Logo</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 relative">
                        <button
                          type="button"
                          className="bg-white py-2 px-3 border border-gray-300 rounded-md  text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Change
                        </button>
                        <input
                          type="file"
                          id="logo"
                          name="logo"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingBrand(null);
                    }}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingBrand ? 'Update Brand' : 'Create Brand'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandManagerBrands;