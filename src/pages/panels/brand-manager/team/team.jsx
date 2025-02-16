import React, { useState } from 'react';
import {
  Settings, Edit, Trash2, UserPlus, Search, Filter,
  Download, Mail, Phone, Shield, AlertTriangle,
  Save, X, MoreHorizontal, CheckCircle, XCircle,
  Users, User, Building, Lock
} from 'lucide-react';

const BrandManagerTeam = () => {
  // State for team members list
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com', 
      phone: '+1 (555) 123-4567', 
      role: 'Administrator', 
      status: 'active',
      joinDate: '2023-01-15',
      assignedBrands: ['EcoFresh', 'FitLife'],
      avatar: null
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      email: 'michael.c@example.com', 
      phone: '+1 (555) 987-6543', 
      role: 'Brand Manager', 
      status: 'active',
      joinDate: '2023-02-20',
      assignedBrands: ['TechNova', 'HomeComfort'],
      avatar: null
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      email: 'emily.r@example.com', 
      phone: '+1 (555) 234-5678', 
      role: 'Content Creator', 
      status: 'active',
      joinDate: '2023-03-10',
      assignedBrands: ['UrbanStyle'],
      avatar: null
    },
    { 
      id: 4, 
      name: 'David Kim', 
      email: 'david.k@example.com', 
      phone: '+1 (555) 876-5432', 
      role: 'Analyst', 
      status: 'inactive',
      joinDate: '2023-04-05',
      assignedBrands: [],
      avatar: null
    },
    { 
      id: 5, 
      name: 'Jessica Patel', 
      email: 'jessica.p@example.com', 
      phone: '+1 (555) 345-6789', 
      role: 'Brand Manager', 
      status: 'active',
      joinDate: '2023-05-25',
      assignedBrands: ['FitLife'],
      avatar: null
    }
  ]);

  // State for search, filter, and sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Available roles
  const availableRoles = [
    'Administrator',
    'Brand Manager',
    'Content Creator',
    'Analyst',
    'Viewer'
  ];

  // Available brands
  const availableBrands = [
    'EcoFresh',
    'TechNova',
    'UrbanStyle',
    'HomeComfort',
    'FitLife'
  ];

  // State for form
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Brand Manager',
    status: 'active',
    assignedBrands: [],
    avatar: null
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

  // Handle brand selection in the form
  const handleBrandSelection = (brand) => {
    const updatedBrands = formData.assignedBrands.includes(brand)
      ? formData.assignedBrands.filter(b => b !== brand)
      : [...formData.assignedBrands, brand];
    
    setFormData({ ...formData, assignedBrands: updatedBrands });
  };

  // Handle team member editing
  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      role: member.role,
      status: member.status,
      assignedBrands: member.assignedBrands || [],
      avatar: member.avatar || null
    });
    setShowForm(true);
  };

  // Handle team member creation/update
  const handleSaveMember = (e) => {
    e.preventDefault();
    
    if (editingMember) {
      // Update existing member
      setTeamMembers(teamMembers.map(member => 
        member.id === editingMember.id ? {
          ...member,
          ...formData
        } : member
      ));
    } else {
      // Create new member
      const newMember = {
        id: teamMembers.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setTeamMembers([...teamMembers, newMember]);
    }
    
    // Reset form
    setShowForm(false);
    setEditingMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Brand Manager',
      status: 'active',
      assignedBrands: [],
      avatar: null
    });
  };

  // Handle toggling member status
  const toggleMemberStatus = (id) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? 
        {...member, status: member.status === 'active' ? 'inactive' : 'active'} : 
        member
    ));
  };

  // Handle member deletion
  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  // Filter and sort team members
  const filteredMembers = teamMembers
    .filter(member => 
      (filterRole === 'all' || member.role === filterRole) &&
      (filterStatus === 'all' || member.status === filterStatus) &&
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       member.email.toLowerCase().includes(searchTerm.toLowerCase()))
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

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'Administrator':
        return <Shield className="w-4 h-4 mr-1" />;
      case 'Brand Manager':
        return <Building className="w-4 h-4 mr-1" />;
      case 'Content Creator':
        return <Edit className="w-4 h-4 mr-1" />;
      case 'Analyst':
        return <Settings className="w-4 h-4 mr-1" />;
      default:
        return <User className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="Container-fluid mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Team Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage team members, roles, and brand assignments</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Team Member
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white  mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50">
                <Download className="w-5 h-5 text-gray-500" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Team Members Table */}
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
                      Team Member
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? 
                        <span>↑</span> : 
                        <span>↓</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('role')}
                    >
                      Role
                      {sortField === 'role' && (
                        sortDirection === 'asc' ? 
                        <span>↑</span> : 
                        <span>↓</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => handleSort('joinDate')}
                    >
                      Join Date
                      {sortField === 'joinDate' && (
                        sortDirection === 'asc' ? 
                        <span>↑</span> : 
                        <span>↓</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Brands
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {member.avatar ? 
                            <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full" /> : 
                            <span className="text-gray-500 font-medium">{member.name.charAt(0)}</span>
                          }
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{
                            member.id === 1 ? 'Owner' : `Member ID: ${member.id}`
                          }</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center mb-1">
                        <Mail className="w-4 h-4 text-gray-400 mr-1" />
                        {member.email}
                      </div>
                      {member.phone && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-1" />
                          {member.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleMemberStatus(member.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                        disabled={member.id === 1} // Cannot deactivate owner
                      >
                        {member.status === 'active' ? 
                          <CheckCircle className="w-4 h-4 mr-1" /> : 
                          <XCircle className="w-4 h-4 mr-1" />
                        }
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {member.assignedBrands && member.assignedBrands.length > 0 ? (
                          member.assignedBrands.map((brand) => (
                            <span 
                              key={brand}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {brand}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm italic">No brands assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <button 
                          onClick={() => handleEditMember(member)}
                          className="text-blue-600 hover:text-blue-900"
                          disabled={member.id === 1 && !editingMember} // Can edit owner but not change role
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={member.id === 1} // Cannot delete owner
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                            <div className="py-1">
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Activity</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reset Password</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Send Message</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="w-10 h-10 text-gray-400 mb-4" />
                        <p className="text-lg font-medium">No team members found</p>
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
                Showing <span className="font-medium">{filteredMembers.length}</span> of <span className="font-medium">{teamMembers.length}</span> team members
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

        {/* Add/Edit Team Member Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
                <button 
                  onClick={() => {
                    setShowForm(false);
                    setEditingMember(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSaveMember} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                      <div className="mt-1 flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-full overflow-hidden">
                          {formData.avatar ? (
                            <img
                              src={formData.avatar instanceof File ? URL.createObjectURL(formData.avatar) : formData.avatar}
                              alt="Profile picture preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">{formData.name ? formData.name.charAt(0) : 'A'}</span>
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
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role *</label>
                      <select
                        id="role"
                        name="role"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.role}
                        onChange={handleInputChange}
                        disabled={editingMember && editingMember.id === 1} // Cannot change owner's role
                      >
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-2 space-x-4 flex items-center">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="active"
                            checked={formData.status === 'active'}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            disabled={editingMember && editingMember.id === 1} // Cannot change owner's status
                          />
                          <span className="ml-2 text-sm text-gray-700">Active</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="inactive"
                            checked={formData.status === 'inactive'}
                            onChange={handleInputChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            disabled={editingMember && editingMember.id === 1} // Cannot change owner's status
                          />
                          <span className="ml-2 text-sm text-gray-700">Inactive</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Brands</label>
                  <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableBrands.map((brand) => (
                        <label key={brand} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.assignedBrands.includes(brand)}
                            onChange={() => handleBrandSelection(brand)}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Select the brands this team member will be responsible for
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMember(null);
                    }}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
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

export default BrandManagerTeam;