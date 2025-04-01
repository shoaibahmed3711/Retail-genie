import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/axiosConfig';

// Create context
const MeetingsContext = createContext();

// Create provider component
export const MeetingsProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch all meetings
  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/meetings');
      setMeetings(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meetings');
      console.error('Error fetching meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch upcoming meetings
  const fetchUpcomingMeetings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/meetings/filter/upcoming');
      setUpcomingMeetings(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch upcoming meetings');
      console.error('Error fetching upcoming meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch past meetings
  const fetchPastMeetings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/meetings/filter/past');
      setPastMeetings(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch past meetings');
      console.error('Error fetching past meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new meeting
  const createMeeting = async (meetingData) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/meetings', meetingData);
      setMeetings([...meetings, response.data]);
      fetchUpcomingMeetings(); // Refresh upcoming meetings
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create meeting');
      console.error('Error creating meeting:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a meeting
  const updateMeeting = async (id, meetingData) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/meetings/${id}`, meetingData);
      setMeetings(meetings.map(meeting => 
        meeting._id === id ? response.data : meeting
      ));
      fetchUpcomingMeetings(); // Refresh upcoming meetings
      fetchPastMeetings(); // Refresh past meetings
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update meeting');
      console.error('Error updating meeting:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a meeting
  const deleteMeeting = async (id) => {
    try {
      setLoading(true);
      await apiClient.delete(`/meetings/${id}`);
      setMeetings(meetings.filter(meeting => meeting._id !== id));
      fetchUpcomingMeetings(); // Refresh upcoming meetings
      fetchPastMeetings(); // Refresh past meetings
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete meeting');
      console.error('Error deleting meeting:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get meetings by date range
  const getMeetingsByDateRange = async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/meetings/filter/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meetings by date range');
      console.error('Error fetching meetings by date range:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get meeting by ID
  const getMeetingById = async (id) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/meetings/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meeting');
      console.error('Error fetching meeting:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchMeetings();
    fetchUpcomingMeetings();
    fetchPastMeetings();
  }, []);

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        upcomingMeetings,
        pastMeetings,
        loading,
        error,
        selectedDate,
        setSelectedDate,
        fetchMeetings,
        fetchUpcomingMeetings,
        fetchPastMeetings,
        createMeeting,
        updateMeeting,
        deleteMeeting,
        getMeetingsByDateRange,
        getMeetingById
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};

// Custom hook to use the meetings context
export const useMeetings = () => {
  const context = useContext(MeetingsContext);
  if (!context) {
    throw new Error('useMeetings must be used within a MeetingsProvider');
  }
  return context;
};