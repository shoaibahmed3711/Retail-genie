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

  // Helper to parse complex nested structures in form data
  const parseNestedObjects = (productData) => {
    // Arrays that need to be parsed from string to array
    const arrayFields = [
      'tags', 
      'certifications.certificationList', 
      'packaging.multipleLanguages.languages', 
      'packaging.ingredients.ingredientsList', 
      'packaging.ingredients.foreignIngredients.sourceCountries',
      'packaging.callouts.calloutList', 
      'distribution.retailers'
    ];
    
    // Parse array fields
    arrayFields.forEach(field => {
      const fieldPath = field.split('.');
      let currentObj = productData;
      let exists = true;
      
      // Navigate to the nested property location
      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!currentObj || !currentObj[fieldPath[i]]) {
          exists = false;
          break;
        }
        currentObj = currentObj[fieldPath[i]];
      }
      
      // Parse the JSON string to array if it exists
      const lastField = fieldPath[fieldPath.length - 1];
      if (exists && currentObj && currentObj[lastField] && typeof currentObj[lastField] === 'string') {
        try {
          currentObj[lastField] = JSON.parse(currentObj[lastField]);
        } catch (e) {
          // If not valid JSON, keep as is (might be a single string)
          if (!Array.isArray(currentObj[lastField])) {
            currentObj[lastField] = currentObj[lastField].split(',').map(item => item.trim());
          }
        }
      }
    });
    
    // Complex objects that need special handling
    const complexObjects = [
      'distribution.distributors',
      'broker.brokers',
      'allergens'
    ];
    
    complexObjects.forEach(field => {
      const fieldPath = field.split('.');
      let currentObj = productData;
      let exists = true;
      
      // Navigate to the nested property location
      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!currentObj || !currentObj[fieldPath[i]]) {
          exists = false;
          break;
        }
        currentObj = currentObj[fieldPath[i]];
      }
      
      const lastField = fieldPath[fieldPath.length - 1];
      if (exists && currentObj && typeof currentObj[lastField] === 'string') {
        try {
          currentObj[lastField] = JSON.parse(currentObj[lastField]);
        } catch (e) {
          console.warn(`Failed to parse ${field}:`, e);
        }
      }
    });
    
    return productData;
  };

  // Ensure all boolean fields are correctly set
  const processBooleanFields = (productData) => {
    const booleanFields = [
      'packaging.productBarcode.hasUPC',
      'packaging.multipleLanguages.hasMultipleLanguages',
      'packaging.casePackaging.hasCasePacking',
      'packaging.innerCasePackaging.hasInnerCase',
      'packaging.callouts.hasCallouts',
      'packaging.ingredients.isFrozen',
      'packaging.ingredients.isRefrigerated',
      'packaging.ingredients.isShelfStable',
      'packaging.ingredients.hasIngredients',
      'packaging.ingredients.foreignIngredients.hasSourcedIngredients',
      'packaging.shelfLife.hasShelfLife',
      'packaging.nutritionalInfo.hasNutritionalLabel',
      'certifications.hasCertifications',
      'distribution.hasDistributors',
      'broker.hasBrokers',
      'marketing.hasElevatorPitch',
      'marketing.hasSellSheet',
      'marketing.hasPresentation'
    ];
    
    booleanFields.forEach(field => {
      const fieldPath = field.split('.');
      let currentObj = productData;
      let exists = true;
      
      // Navigate to the nested property location
      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!currentObj || !currentObj[fieldPath[i]]) {
          exists = false;
          break;
        }
        currentObj = currentObj[fieldPath[i]];
      }
      
      const lastField = fieldPath[fieldPath.length - 1];
      if (exists && currentObj) {
        // Convert string 'true'/'false' to boolean
        if (typeof currentObj[lastField] === 'string') {
          currentObj[lastField] = currentObj[lastField].toLowerCase() === 'true';
        }
      }
    });
    
    return productData;
  };

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
        
        // Log FormData entries for debugging
        console.log('Form data entries:');
        for (let [key, value] of productData.entries()) {
          if (key !== 'productImage' && 
              key !== 'ingredientsLabel' && 
              key !== 'nutritionalLabel' && 
              key !== 'elevatorPitchFile' && 
              key !== 'sellSheetFile' && 
              key !== 'presentationFile') {
            console.log(`${key}: ${value}`);
          } else {
            console.log(`${key}: [FILE]`);
          }
        }
        
        // Add empty arrays for distributors and brokers if they don't exist
        if (!productData.has('distribution.distributors')) {
          productData.append('distribution.distributors', JSON.stringify([]));
        }
        
        if (!productData.has('broker.brokers')) {
          productData.append('broker.brokers', JSON.stringify([]));
        }
      } else {
        // Process nested JSON structures
        productData = parseNestedObjects(productData);
        productData = processBooleanFields(productData);
        
        // Ensure distributors is an array
        if (productData.distribution && productData.distribution.distributors) {
          if (typeof productData.distribution.distributors === 'string') {
            try {
              productData.distribution.distributors = JSON.parse(productData.distribution.distributors);
            } catch (e) {
              productData.distribution.distributors = [];
            }
          } else if (!Array.isArray(productData.distribution.distributors)) {
            productData.distribution.distributors = [];
          }
        } else if (productData.distribution) {
          productData.distribution.distributors = [];
        }
        
        // Ensure brokers is an array
        if (productData.broker && productData.broker.brokers) {
          if (typeof productData.broker.brokers === 'string') {
            try {
              productData.broker.brokers = JSON.parse(productData.broker.brokers);
            } catch (e) {
              productData.broker.brokers = [];
            }
          } else if (!Array.isArray(productData.broker.brokers)) {
            productData.broker.brokers = [];
          }
        } else if (productData.broker) {
          productData.broker.brokers = [];
        }
        
        // Convert empty strings to undefined for required fields
        const cleanedData = Object.fromEntries(
          Object.entries(productData).map(([key, value]) => [
            key,
            value === '' ? undefined : value
          ])
        );
        
        // Ensure numeric fields are numbers
        const numericFields = [
          'msrp', 'retailMargin', 'wholesalePrice', 'casePackSize', 
          'casePrice', 'cogs', 'stock', 'discount',
          'packaging.unitPackaging.height',
          'packaging.unitPackaging.width',
          'packaging.unitPackaging.length',
          'packaging.unitPackaging.weight',
          'packaging.casePackaging.height',
          'packaging.casePackaging.width',
          'packaging.casePackaging.length',
          'packaging.casePackaging.weight',
          'packaging.casePackaging.casesPerTier',
          'packaging.casePackaging.tiersPerPallet',
          'packaging.innerCasePackaging.unitsPerInnerCase',
          'packaging.innerCasePackaging.height',
          'packaging.innerCasePackaging.width',
          'packaging.innerCasePackaging.length',
          'packaging.innerCasePackaging.weight',
          'packaging.shelfLife.value'
        ];
        
        numericFields.forEach(field => {
          const fieldPath = field.split('.');
          let currentObj = cleanedData;
          let exists = true;
          
          // Navigate to the nested property location
          for (let i = 0; i < fieldPath.length - 1; i++) {
            if (!currentObj[fieldPath[i]]) {
              exists = false;
              break;
            }
            currentObj = currentObj[fieldPath[i]];
          }
          
          const lastField = fieldPath[fieldPath.length - 1];
          if (exists && currentObj[lastField] !== undefined && currentObj[lastField] !== '') {
            currentObj[lastField] = Number(currentObj[lastField]);
          }
        });
        
        productData = cleanedData;
        console.log('Creating product with data:', JSON.stringify(productData, null, 2));
      }
  
      const response = await apiClient.post('/products', productData, config);
      console.log('Product created response:', response.data);
      
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
      let config = {};
      
      // If productData is FormData, we need to set the correct headers
      if (productData instanceof FormData) {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        
        // Log FormData entries for debugging
        console.log('Form data entries for update:');
        for (let [key, value] of productData.entries()) {
          if (key !== 'productImage' && 
              key !== 'ingredientsLabel' && 
              key !== 'nutritionalLabel' && 
              key !== 'elevatorPitchFile' && 
              key !== 'sellSheetFile' && 
              key !== 'presentationFile') {
            console.log(`${key}: ${value}`);
          } else {
            console.log(`${key}: [FILE]`);
          }
        }
        
        // Add empty arrays for distributors and brokers if they don't exist
        if (!productData.has('distribution.distributors')) {
          productData.append('distribution.distributors', JSON.stringify([]));
        }
        
        if (!productData.has('broker.brokers')) {
          productData.append('broker.brokers', JSON.stringify([]));
        }
      } else {
        // Process nested JSON structures
        productData = parseNestedObjects(productData);
        productData = processBooleanFields(productData);
        
        // Ensure distributors is an array
        if (productData.distribution && productData.distribution.distributors) {
          if (typeof productData.distribution.distributors === 'string') {
            try {
              productData.distribution.distributors = JSON.parse(productData.distribution.distributors);
            } catch (e) {
              productData.distribution.distributors = [];
            }
          } else if (!Array.isArray(productData.distribution.distributors)) {
            productData.distribution.distributors = [];
          }
        } else if (productData.distribution) {
          productData.distribution.distributors = [];
        }
        
        // Ensure brokers is an array
        if (productData.broker && productData.broker.brokers) {
          if (typeof productData.broker.brokers === 'string') {
            try {
              productData.broker.brokers = JSON.parse(productData.broker.brokers);
            } catch (e) {
              productData.broker.brokers = [];
            }
          } else if (!Array.isArray(productData.broker.brokers)) {
            productData.broker.brokers = [];
          }
        } else if (productData.broker) {
          productData.broker.brokers = [];
        }
        
        // Convert empty strings to undefined for required fields
        const cleanedData = Object.fromEntries(
          Object.entries(productData).map(([key, value]) => [
            key,
            value === '' ? undefined : value
          ])
        );
        
        // Ensure numeric fields are numbers
        const numericFields = [
          'msrp', 'retailMargin', 'wholesalePrice', 'casePackSize', 
          'casePrice', 'cogs', 'stock', 'discount',
          'packaging.unitPackaging.height',
          'packaging.unitPackaging.width',
          'packaging.unitPackaging.length',
          'packaging.unitPackaging.weight',
          'packaging.casePackaging.height',
          'packaging.casePackaging.width',
          'packaging.casePackaging.length',
          'packaging.casePackaging.weight',
          'packaging.casePackaging.casesPerTier',
          'packaging.casePackaging.tiersPerPallet',
          'packaging.innerCasePackaging.unitsPerInnerCase',
          'packaging.innerCasePackaging.height',
          'packaging.innerCasePackaging.width',
          'packaging.innerCasePackaging.length',
          'packaging.innerCasePackaging.weight',
          'packaging.shelfLife.value'
        ];
        
        numericFields.forEach(field => {
          const fieldPath = field.split('.');
          let currentObj = cleanedData;
          let exists = true;
          
          // Navigate to the nested property location
          for (let i = 0; i < fieldPath.length - 1; i++) {
            if (!currentObj[fieldPath[i]]) {
              exists = false;
              break;
            }
            currentObj = currentObj[fieldPath[i]];
          }
          
          const lastField = fieldPath[fieldPath.length - 1];
          if (exists && currentObj[lastField] !== undefined && currentObj[lastField] !== '') {
            currentObj[lastField] = Number(currentObj[lastField]);
          }
        });
        
        productData = cleanedData;
        console.log('Updating product with data:', JSON.stringify(productData, null, 2));
      }
      
      const response = await apiClient.put(`/products/${id}`, productData, config);
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