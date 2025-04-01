import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/axiosConfig';
import { toast } from 'react-hot-toast';

// Create the context
const TeamContext = createContext();

// Custom hook to use the context
export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};

// Provider component
export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available roles and brands for the app
  const availableRoles = [
    'Administrator',
    'Brand Manager',
    'Content Creator',
    'Analyst',
    'Viewer'
  ];

  const availableBrands = [
    'EcoFresh',
    'TechNova',
    'UrbanStyle',
    'HomeComfort',
    'FitLife'
  ];



  // Fetch all team members
  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/team');
      setTeamMembers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching team members:', err);
      
      // Only use mock data in development or when API is unavailable
      setError('Failed to load team members. Please try again.');
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  }, ['/team']);

  // Load team members on initial render
  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  // Create a new team member
  const createTeamMember = async (memberData) => {
    try {
      console.log('Sending POST request to:', '/team', memberData);
      const response = await apiClient.post('/team', memberData);
      console.log('Response received:', response.data);
      setTeamMembers([...teamMembers, response.data]);
      toast.success('Team member added successfully');
      return response.data;
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      
      // If 404 error, create a mock response
      if (err.response?.status === 404) {
        const mockMember = {
          _id: `mock-${Date.now()}`,
          ...memberData,
          joinDate: new Date().toISOString().split('T')[0]
        };
        setTeamMembers([...teamMembers, mockMember]);
        toast.success('Team member added (mock)');
        return mockMember;
      } else {
        toast.error(err.response?.data?.message || 'Failed to add team member');
        throw err;
      }
    }
  };

  // Update an existing team member
  const updateTeamMember = async (id, memberData) => {
    try {
      const response = await apiClient.put(`${'/team'}/${id}`, memberData);
      setTeamMembers(teamMembers.map(member => 
        member._id === id ? response.data : member
      ));
      toast.success('Team member updated successfully');
      return response.data;
    } catch (err) {
      console.error('Error updating team member:', err);
      
      // If 404 error, update locally
      if (err.response?.status === 404) {
        const updatedMembers = teamMembers.map(member => 
          member._id === id ? { ...member, ...memberData } : member
        );
        setTeamMembers(updatedMembers);
        toast.success('Team member updated (mock)');
        return { ...teamMembers.find(m => m._id === id), ...memberData };
      } else {
        toast.error(err.response?.data?.message || 'Failed to update team member');
        throw err;
      }
    }
  };

  // Delete a team member
  const deleteTeamMember = async (id) => {
    try {
      await apiClient.delete(`${'/team'}/${id}`);
      setTeamMembers(teamMembers.filter(member => member._id !== id));
      toast.success('Team member removed successfully');
      return true;
    } catch (err) {
      console.error('Error deleting team member:', err);
      
      // If 404 error, delete locally
      if (err.response?.status === 404) {
        setTeamMembers(teamMembers.filter(member => member._id !== id));
        toast.success('Team member removed (mock)');
        return true;
      } else {
        toast.error('Failed to delete team member');
        throw err;
      }
    }
  };

  // Toggle team member status
  const toggleMemberStatus = async (id) => {
    try {
      const response = await apiClient.patch(`${'/team'}/${id}/toggle-status`);
      setTeamMembers(teamMembers.map(member => 
        member._id === id ? response.data : member
      ));
      toast.success(`Status updated to ${response.data.status}`);
      return response.data;
    } catch (err) {
      console.error('Error toggling status:', err);
      
      // If 404 error, toggle locally
      if (err.response?.status === 404) {
        const updatedMembers = teamMembers.map(member => {
          if (member._id === id) {
            const newStatus = member.status === 'active' ? 'inactive' : 'active';
            return { ...member, status: newStatus };
          }
          return member;
        });
        setTeamMembers(updatedMembers);
        const updatedMember = updatedMembers.find(m => m._id === id);
        toast.success(`Status updated to ${updatedMember.status} (mock)`);
        return updatedMember;
      } else {
        toast.error('Failed to update status');
        throw err;
      }
    }
  };

  // Export team members to CSV
  const exportTeamMembersToCSV = (filteredMembers) => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Status', 'Join Date', 'Assigned Brands'];
    
    // Filter members based on current filters
    const dataToExport = filteredMembers.map(member => [
      member.name,
      member.email,
      member.phone || '',
      member.role,
      member.status,
      new Date(member.joinDate).toLocaleDateString(),
      (member.assignedBrands || []).join(', ')
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `team-members-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Team data exported successfully');
  };

  // Value provided by the context
  const value = {
    teamMembers,
    loading,
    error,
    availableRoles,
    availableBrands,
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    toggleMemberStatus,
    exportTeamMembersToCSV
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext; 