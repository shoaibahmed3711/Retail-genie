import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/axiosConfig';
import { useAuth } from './AuthContext';

// Constants
const TEMP_OWNER_ID = 'temp-owner-123';

const BrandContext = createContext();

// Custom hook to use the brand context
export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get currentUser from auth context, or use a default temporary ID if auth is not available
  const auth = useAuth();
  const currentUser = auth?.currentUser || { id: TEMP_OWNER_ID };
  
  // Always ensure we have a valid owner ID to use
  const ownerId = currentUser?.id || TEMP_OWNER_ID;

  // Get all brands
  const getAllBrands = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/brands');
      setBrands(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch brands';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get brand by ID
  const getBrandById = useCallback(async (id) => {
    // If no ID is provided, return null
    if (!id) {
      console.log('No ID provided to getBrandById');
      setCurrentBrand(null);
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/brand/${id}`);
      setCurrentBrand(response.data);
      return response.data;
    } catch (error) {
      // Handle 404 differently - it might just mean there's no brand yet for this user
      if (error.response && error.response.status === 404) {
        setCurrentBrand(null);
        return null;
      }
      
      const errorMessage = error.response?.data?.message || 'Failed to fetch brand';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get brand by owner (current user)
  const getMyBrand = useCallback(async () => {
    try {
      console.log('BrandContext: getMyBrand called');
      setLoading(true);
      setError(null);
      
      // Use a default owner ID parameter for development when auth is not available
      const ownerId = currentUser?.id || TEMP_OWNER_ID;
      console.log('BrandContext: Fetching brand for owner:', ownerId);
      const response = await apiClient.get(`/brand/owner/${ownerId}`);
      
      setCurrentBrand(response.data);
      return response.data;
    } catch (error) {
      // Handle 404 differently - it might just mean there's no brand yet for this user
      if (error.response && error.response.status === 404) {
        console.log('BrandContext: No brand found for this owner');
        setCurrentBrand(null);
        return null;
      }
      
      const errorMessage = error.response?.data?.message || 'Failed to fetch your brand';
      console.error('BrandContext: Error in getMyBrand:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]); // Only depends on the ID, not the entire user object

  // Get brands by category
  const getBrandsByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/brand/category/${category}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch brands by category';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new brand
  const createBrand = useCallback(async (formData) => {
    try {
      const response = await apiClient.post('/brand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  // Update brand
  const updateBrand = useCallback(async (id, formData) => {
    try {
      const response = await apiClient.put(`/brand/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  // Upload brand logo separately
  const uploadBrandLogo = useCallback(async (id, logoFile) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!logoFile) {
        const errorMsg = 'No logo file provided';
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      const formData = new FormData();
      formData.append('logo', logoFile);
      
      const response = await apiClient.post(`/brand/${id}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update the brand in state with the new logo URL
      setBrands(prevBrands => 
        prevBrands.map(brand => 
          brand._id === id ? { ...brand, logo: response.data.logo } : brand
        )
      );
      
      // Update currentBrand if it's the one being edited
      if (currentBrand && currentBrand._id === id) {
        setCurrentBrand(prev => ({ ...prev, logo: response.data.logo }));
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upload brand logo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentBrand]);

  // Delete brand
  const deleteBrand = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.delete(`/brand/${id}`);
      
      // Remove the deleted brand from state
      setBrands(prevBrands => prevBrands.filter(brand => brand._id !== id));
      
      // Reset currentBrand if it's the one being deleted
      if (currentBrand && currentBrand._id === id) {
        setCurrentBrand(null);
      }
      
      return { success: true, message: 'Brand deleted successfully' };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete brand';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentBrand]);

  // Toggle brand status
  const toggleBrandStatus = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.patch(`/brand/${id}/toggle-status`);
      
      // Update the brands state with the updated brand
      setBrands(prevBrands => 
        prevBrands.map(brand => 
          brand._id === id ? response.data : brand
        )
      );
      
      // Update currentBrand if it's the one being toggled
      if (currentBrand && currentBrand._id === id) {
        setCurrentBrand(response.data);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to toggle brand status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentBrand]);

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Load current user's brand when component mounts (even with temporary user)
  useEffect(() => {
    console.log('BrandContext: useEffect for loading brand triggered');
    // Always try to load brand data, even without login
    let isMounted = true;
    let isLoading = false;
    
    const loadBrand = async () => {
      if (isLoading) return; // Prevent duplicate calls if already loading
      
      try {
        isLoading = true;
        console.log('BrandContext: Loading brand data...');
        const data = await getMyBrand();
        if (isMounted) {
          console.log('BrandContext: Brand data loaded successfully:', !!data);
        }
      } catch (error) {
        // If we get a 404, it means the user doesn't have a brand yet - that's OK
        if (error.message !== 'Brand not found' && isMounted) {
          console.error("BrandContext: Error loading user's brand:", error);
        }
      } finally {
        isLoading = false;
      }
    };
    
    loadBrand();
    
    return () => {
      isMounted = false; // Cleanup to prevent setting state after unmount
    };
  }, [getMyBrand]);

  const value = {
    brands,
    currentBrand,
    loading,
    error,
    getAllBrands,
    getBrandById,
    getMyBrand,
    getBrandsByCategory,
    createBrand,
    updateBrand,
    uploadBrandLogo,
    deleteBrand,
    toggleBrandStatus,
    clearError
  };

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
};

export default BrandContext; 