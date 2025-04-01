import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/axiosConfig';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single product by ID
  const getProductById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/products/${id}`);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product');
      console.error('Error fetching product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    try {
      let config = {};
      
      // If productData is FormData, we need to set the correct headers
      if (productData instanceof FormData) {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
      } else {
        // Convert empty strings to undefined for required fields
        const cleanedData = Object.fromEntries(
          Object.entries(productData).map(([key, value]) => [
            key,
            value === '' ? undefined : value
          ])
        );
        
        // Ensure numeric fields are numbers
        cleanedData.price = Number(cleanedData.price);
        cleanedData.stock = Number(cleanedData.stock);
        cleanedData.cogs = cleanedData.cogs ? Number(cleanedData.cogs) : 0;
        cleanedData.discount = cleanedData.discount ? Number(cleanedData.discount) : 0;
        cleanedData.margin = cleanedData.margin ? Number(cleanedData.margin) : 0;
        
        productData = cleanedData;
      }
  
      const response = await apiClient.post('/products', productData, config);
      console.log('Product created response:', response.data); // Add this log
      
      // Make sure we're getting the full product data with imageUrl from the server
      const newProduct = response.data;
      
      // Explicitly check if we have an imageUrl in the response
      if (!newProduct.imageUrl && productData instanceof FormData) {
        console.warn('No imageUrl in response data, this might cause display issues');
      }
      
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create product';
      setError(errorMessage);
      console.error('Error creating product:', errorMessage);
      throw err; 
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === id ? response.data : product))
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      console.error('Error updating product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(`/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
      console.error('Error deleting product:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Record a product sale
  const recordProductSale = useCallback(async (id, saleData) => {
    setLoading(true);
    try {
      const response = await apiClient.post(`/products/${id}/record-sale`, saleData);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === id ? response.data : product))
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record sale');
      console.error('Error recording sale:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load products on initial render
  useEffect(() => {
    if (currentUser) {
      fetchProducts();
    }
  }, [fetchProducts, currentUser]);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    recordProductSale,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export default ProductContext; 