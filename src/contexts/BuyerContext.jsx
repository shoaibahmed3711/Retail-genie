import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/axiosConfig';

const BuyerContext = createContext();

export const useBuyer = () => useContext(BuyerContext);

export const BuyerProvider = ({ children }) => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState({ field: 'createdAt', direction: 'desc' });

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(product => product.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Apply filters and sorting
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    result = result.filter(
      product => 
        product.price >= priceRange.min && 
        product.price <= priceRange.max
    );

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortOption.field];
      const fieldB = b[sortOption.field];
      
      if (sortOption.field === 'price' || sortOption.field === 'rating') {
        // Numeric sorting
        return sortOption.direction === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA;
      } else {
        // String/Date sorting
        if (fieldA < fieldB) return sortOption.direction === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOption.direction === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, searchQuery, sortOption]);

  // Set category filter
  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Set price range filter
  const filterByPriceRange = (min, max) => {
    setPriceRange({ min, max });
  };

  // Set search query
  const searchProducts = (query) => {
    setSearchQuery(query);
  };

  // Set sort option
  const sortProducts = (field, direction) => {
    setSortOption({ field, direction });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000 });
    setSearchQuery('');
    setSortOption({ field: 'createdAt', direction: 'desc' });
  };

  // Get product details by ID
  const getProductById = async (productId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/products/${productId}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product details');
      setLoading(false);
      return null;
    }
  };

  // Value object to be provided to consumers
  const value = {
    products: filteredProducts,
    categories,
    loading,
    error,
    selectedCategory,
    priceRange,
    searchQuery,
    sortOption,
    filterByCategory,
    filterByPriceRange,
    searchProducts,
    sortProducts,
    resetFilters,
    getProductById,
    refreshProducts: fetchProducts
  };

  return (
    <BuyerContext.Provider value={value}>
      {children}
    </BuyerContext.Provider>
  );
};

export default BuyerContext;