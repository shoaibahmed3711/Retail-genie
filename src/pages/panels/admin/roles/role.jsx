import React, { useState } from 'react';
import {
    Users, Search, Filter, SortAsc, Edit2,
    Trash2, Shield, CheckCircle, XCircle, UserPlus,
    Activity, Clock, BarChart2, Mail, Phone,
    UserCheck, UserX, Lock, Unlock, ChevronDown,
    Settings, Eye, Plus, Upload, Calendar
} from 'lucide-react';

const initialTeamMembers = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "System Admin",
        email: "alex.j@company.com",
        phone: "+1 (555) 123-4567",
        status: "Active",
        department: "Engineering",
        avatar: "/api/placeholder/64/64",
        activity: {
            lastLogin: "2024-02-18 09:45 AM",
            completedTasks: 42,
            pendingTasks: 3,
            upcomingMeetings: 2
        },
        joinDate: "2022-05-15"
    },
    {
        id: 2,
        name: "Sarah Chen",
        role: "Brand Manager",
        email: "sarah.c@company.com",
        phone: "+1 (555) 987-6543",
        status: "Active",
        department: "Marketing",
        avatar: "/api/placeholder/64/64",
        activity: {
            lastLogin: "2024-02-19 08:30 AM",
            completedTasks: 27,
            pendingTasks: 5,
            upcomingMeetings: 1
        },
        joinDate: "2023-01-10"
    }
];

const rolePermissions = {
    "System Admin": ["all_access", "user_management", "role_management", "system_settings"],
    "Brand Owner": ["brand_management", "content_approval", "analytics_access", "team_management"],
    "Brand Manager": ["content_creation", "basic_analytics", "product_management"],
    "Content Creator": ["content_creation", "basic_analytics"],
    "Analyst": ["analytics_access", "report_generation"],
    "Customer Support": ["ticket_management", "customer_communication"]
};

const MemberForm = ({ onClose, onSubmit, editMember = null }) => {
    const [formData, setFormData] = useState(editMember || {
        name: '',
        email: '',
        phone: '',
        role: 'Brand Manager',
        department: '',
        status: 'Pending',
        avatar: '/api/placeholder/64/64',
        activity: {
            lastLogin: 'N/A',
            completedTasks: 0,
            pendingTasks: 0,
            upcomingMeetings: 0
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            id: editMember ? editMember.id : Date.now(),
            joinDate: editMember ? editMember.joinDate : new Date().toISOString().split('T')[0]
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{editMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <input
                                type="text"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="System Admin">System Admin</option>
                                <option value="Brand Owner">Brand Owner</option>
                                <option value="Brand Manager">Brand Manager</option>
                                <option value="Content Creator">Content Creator</option>
                                <option value="Analyst">Analyst</option>
                                <option value="Customer Support">Customer Support</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            <img src={formData.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Upload size={20} />
                                Upload Picture
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <UserPlus size={20} />
                        {editMember ? 'Update Team Member' : 'Add Team Member'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const TeamMemberCard = ({ member, onEdit, onDelete, onStatusChange, showPermissions }) => {
    const [showPermissionDetails, setShowPermissionDetails] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-50';
            case 'Pending': return 'text-yellow-600 bg-yellow-50';
            case 'Suspended': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <Shield size={14} className="mr-1" />
                            {member.role}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onStatusChange(member.id)}
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(member.status)}`}
                    >
                        {member.status}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={14} className="text-gray-400" />
                    <span>{member.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Joined {member.joinDate}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm">Last active: {member.activity.lastLogin}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-gray-400" />
                    <span className="text-sm">{member.activity.completedTasks} Tasks completed</span>
                </div>
            </div>

            {showPermissions && (
                <div className="mb-6">
                    <button
                        onClick={() => setShowPermissionDetails(!showPermissionDetails)}
                        className="flex items-center text-blue-600 text-sm gap-1"
                    >
                        <Lock size={14} />
                        Permissions
                        <ChevronDown size={14} className={`transition-transform ${showPermissionDetails ? 'rotate-180' : ''}`} />
                    </button>

                    {showPermissionDetails && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                            <div className="grid grid-cols-2 gap-2">
                                {rolePermissions[member.role]?.map(permission => (
                                    <div key={permission} className="flex items-center gap-1 text-sm">
                                        <CheckCircle size={14} className="text-green-500" />
                                        {permission.split('_').join(' ')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(member)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="Edit member"
                    >
                        <Edit2 size={20} />
                    </button>
                    <button
                        onClick={() => onDelete(member.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete member"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
                <button className="text-gray-400 hover:text-blue-500 transition-colors p-2" title="View activity">
                    <Activity size={20} />
                </button>
            </div>
        </div>
    );
};

const MemberTableView = ({ members, onEdit, onDelete, onStatusChange }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Role</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Department</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Contact</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Join Date</th>
                        <th className="py-4 px-6 text-right text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {members.map(member => (
                        <tr key={member.id} className="hover:bg-gray-50">
                            <td className="py-4 px-6">
                                <div className="flex items-center space-x-3">
                                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-medium">{member.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">{member.role}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{member.department}</td>
                            <td className="py-4 px-6">
                                <span className={`px-3 py-1 inline-flex text-xs rounded-full ${member.status === 'Active' ? 'bg-green-50 text-green-600' :
                                        member.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                            'bg-red-50 text-red-600'
                                    }`}>
                                    {member.status}
                                </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">
                                <div>{member.email}</div>
                                <div>{member.phone}</div>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">{member.joinDate}</td>
                            <td className="py-4 px-6 text-right">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => onEdit(member)}
                                        className="p-1 text-gray-400 hover:text-blue-500"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => onStatusChange(member.id)}
                                        className="p-1 text-gray-400 hover:text-yellow-500"
                                        title="Change status"
                                    >
                                        {member.status === 'Active' ?
                                            <UserCheck size={18} /> :
                                            <UserX size={18} />
                                        }
                                    </button>
                                    <button
                                        onClick={() => onDelete(member.id)}
                                        className="p-1 text-gray-400 hover:text-red-500"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



// Missing Building2 component for the analytics section
const Building2 = ({ size, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 22V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v20" />
            <path d="M6 12H4a1 1 0 0 0-1 1v9h4" />
            <path d="M22 12h-2a1 1 0 0 0-1 1v9h4" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
        </svg>
    );
};

// Missing Grid component for view mode toggle
const Grid = ({ size, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    );
};

// Missing List component for view mode toggle
const List = ({ size, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
    );
};

// Missing Download component for export button
const Download = ({ size, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
};

const AdminRole = () => {
    const [members, setMembers] = useState(initialTeamMembers);
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
    const [showPermissions, setShowPermissions] = useState(false);

    const handleAddMember = (newMember) => {
        if (editingMember) {
            setMembers(members.map(m => m.id === newMember.id ? newMember : m));
            setEditingMember(null);
        } else {
            setMembers([...members, newMember]);
        }
    };

    const handleStatusChange = (memberId) => {
        setMembers(members.map(member => {
            if (member.id === memberId) {
                const statusCycle = { 'Active': 'Suspended', 'Suspended': 'Pending', 'Pending': 'Active' };
                return { ...member, status: statusCycle[member.status] };
            }
            return member;
        }));
    };

    // Get unique departments for filter
    const departments = [...new Set(members.map(member => member.department))];

    const filteredMembers = members
        .filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(member =>
            filterRole ? member.role === filterRole : true
        )
        .filter(member =>
            filterStatus ? member.status === filterStatus : true
        )
        .filter(member =>
            filterDepartment ? member.department === filterDepartment : true
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'role': return a.role.localeCompare(b.role);
                case 'status': return a.status.localeCompare(b.status);
                case 'department': return a.department.localeCompare(b.department);
                case 'joinDate': return new Date(b.joinDate) - new Date(a.joinDate);
                default: return a.name.localeCompare(b.name);
            }
        });

    // Batch actions
    const activateAllFiltered = () => {
        setMembers(members.map(member =>
            filteredMembers.some(fm => fm.id === member.id)
                ? { ...member, status: 'Active' }
                : member
        ));
    };

    const exportTeamData = () => {
        alert('Exporting team data as CSV...');
        // Implementation would go here
    };

    return (
        <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
            <div className="container-fluid">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Team Management</h1>
                        <p className="text-gray-500">Manage team members, roles and permissions</p>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            <UserPlus size={20} />
                            <span>Add Member</span>
                        </button>

                        <button
                            onClick={() => setShowPermissions(!showPermissions)}
                            className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <Lock size={20} />
                            <span>{showPermissions ? 'Hide Permissions' : 'Show Permissions'}</span>
                        </button>
                    </div>
                </div>

                {/* Analytics Summary Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Members</p>
                                <h4 className="text-2xl font-bold">{members.length}</h4>
                            </div>
                            <Users className="text-blue-500" size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Active Members</p>
                                <h4 className="text-2xl font-bold">
                                    {members.filter(m => m.status === 'Active').length}
                                </h4>
                            </div>
                            <UserCheck className="text-green-500" size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Departments</p>
                                <h4 className="text-2xl font-bold">
                                    {departments.length}
                                </h4>
                            </div>
                            <Building2 className="text-purple-500" size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Admin Users</p>
                                <h4 className="text-2xl font-bold">
                                    {members.filter(m => m.role === 'System Admin').length}
                                </h4>
                            </div>
                            <Shield className="text-red-500" size={24} />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`p-2 ${viewMode === 'card' ? 'text-blue-600 bg-blue-50 rounded-lg' : 'text-gray-500'}`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 ${viewMode === 'table' ? 'text-blue-600 bg-blue-50 rounded-lg' : 'text-gray-500'}`}
                            >
                                <List size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={activateAllFiltered}
                                className="flex items-center space-x-2 border border-gray-200 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                            >
                                <CheckCircle size={16} />
                                <span>Activate Selected</span>
                            </button>

                            <button
                                onClick={exportTeamData}
                                className="flex items-center space-x-2 border border-gray-200 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                            >
                                <Download size={16} />
                                <span>Export Data</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="">All Roles</option>
                                {Object.keys(rolePermissions).map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>

                        <div className="relative">
                            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="role">Sort by Role</option>
                                <option value="department">Sort by Department</option>
                                <option value="status">Sort by Status</option>
                                <option value="joinDate">Sort by Join Date</option>
                            </select>
                        </div>
                    </div>
                </div>

                {viewMode === 'card' ? (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMembers.map((member) => (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                onEdit={(member) => {
                                    setEditingMember(member);
                                    setShowForm(true);
                                }}
                                onDelete={(memberId) => setMembers(members.filter(m => m.id !== memberId))}
                                onStatusChange={handleStatusChange}
                                showPermissions={showPermissions}
                            />
                        ))}
                        {filteredMembers.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600">No team members found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="mt-4 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors mx-auto"
                                >
                                    <UserPlus size={20} />
                                    <span>Add New Member</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <MemberTableView
                        members={filteredMembers}
                        onEdit={(member) => {
                            setEditingMember(member);
                            setShowForm(true);
                        }}
                        onDelete={(memberId) => setMembers(members.filter(m => m.id !== memberId))}
                        onStatusChange={handleStatusChange}
                    />
                )}

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">1</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">2</a>
                        <a href="#" className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">3</a>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>
                        <a href="#" className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">8</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">9</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">10</a>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <MemberForm
                        onClose={() => {
                            setShowForm(false);
                            setEditingMember(null);
                        }}
                        onSubmit={handleAddMember}
                        editMember={editingMember}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminRole;