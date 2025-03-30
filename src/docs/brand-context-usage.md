# BrandContext Documentation

The BrandContext provides a convenient way to manage brand data across the application. It handles all API calls to the backend and provides state management for brands.

## Setup

The BrandContext is already set up in the application. It's included in the main App component:

```jsx
// In App.jsx
<AuthProvider>
  <ProductProvider>
    <BrandProvider>
      <RouterProvider router={router} />
    </BrandProvider>
  </ProductProvider>
</AuthProvider>
```

## Using BrandContext in Components

To use the BrandContext in your components, import the useBrand hook:

```jsx
import { useBrand } from '../../../contexts/BrandContext';

const MyComponent = () => {
  const { 
    brands,             // Array of all brands
    currentBrand,       // Currently selected brand
    loading,            // Loading state for API calls
    error,              // Error state for API calls
    getAllBrands,       // Function to fetch all brands
    getBrandById,       // Function to fetch a brand by ID
    getBrandsByCategory, // Function to fetch brands by category
    createBrand,        // Function to create a new brand
    updateBrand,        // Function to update an existing brand
    deleteBrand,        // Function to delete a brand
    toggleBrandStatus,  // Function to toggle brand status
    clearError          // Function to clear error state
  } = useBrand();

  // Your component code here
};
```

## Available Methods

### `getAllBrands()`

Fetches all brands from the backend.

```jsx
const fetchBrands = async () => {
  try {
    const brandsData = await getAllBrands();
    console.log('Brands:', brandsData);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
};
```

### `getBrandById(id)`

Fetches a single brand by its ID.

```jsx
const fetchBrand = async (brandId) => {
  try {
    const brandData = await getBrandById(brandId);
    console.log('Brand:', brandData);
  } catch (error) {
    console.error('Error fetching brand:', error);
  }
};
```

### `getBrandsByCategory(category)`

Fetches brands filtered by category.

```jsx
const fetchCategoryBrands = async (category) => {
  try {
    const brandsData = await getBrandsByCategory(category);
    console.log('Brands in category:', brandsData);
  } catch (error) {
    console.error('Error fetching brands by category:', error);
  }
};
```

### `createBrand(brandData)`

Creates a new brand.

```jsx
const createNewBrand = async () => {
  const newBrandData = {
    name: 'New Brand',
    tagline: 'Brand tagline',
    // Other brand properties...
  };
  
  try {
    const createdBrand = await createBrand(newBrandData);
    console.log('Created brand:', createdBrand);
  } catch (error) {
    console.error('Error creating brand:', error);
  }
};
```

### `updateBrand(id, brandData)`

Updates an existing brand.

```jsx
const updateExistingBrand = async (brandId) => {
  const updatedData = {
    name: 'Updated Brand Name',
    // Other properties to update...
  };
  
  try {
    const updatedBrand = await updateBrand(brandId, updatedData);
    console.log('Updated brand:', updatedBrand);
  } catch (error) {
    console.error('Error updating brand:', error);
  }
};
```

### `deleteBrand(id)`

Deletes a brand.

```jsx
const removeBrand = async (brandId) => {
  try {
    await deleteBrand(brandId);
    console.log('Brand deleted successfully');
  } catch (error) {
    console.error('Error deleting brand:', error);
  }
};
```

### `toggleBrandStatus(id)`

Toggles a brand's status between active and inactive.

```jsx
const toggleStatus = async (brandId) => {
  try {
    const updatedBrand = await toggleBrandStatus(brandId);
    console.log('Brand status updated:', updatedBrand.status);
  } catch (error) {
    console.error('Error toggling brand status:', error);
  }
};
```

## Error Handling

The BrandContext includes built-in error handling. You can access the error state and clear it:

```jsx
if (error) {
  console.error('An error occurred:', error);
  // Display error message to user
  
  // Clear the error when appropriate
  clearError();
}
```

## Loading State

You can use the loading state to show loading indicators:

```jsx
if (loading) {
  return <div>Loading...</div>;
}
```

## Example: Complete Component

Here's a complete example of a component that uses the BrandContext:

```jsx
import React, { useEffect, useState } from 'react';
import { useBrand } from '../../../contexts/BrandContext';

const BrandsList = () => {
  const { 
    brands, 
    loading, 
    error, 
    getAllBrands,
    deleteBrand,
    clearError
  } = useBrand();

  useEffect(() => {
    getAllBrands().catch(err => console.error(err));
  }, [getAllBrands]);

  const handleDeleteBrand = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(id);
        alert('Brand deleted successfully');
      } catch (err) {
        console.error('Failed to delete brand:', err);
      }
    }
  };

  if (loading) return <div>Loading brands...</div>;
  
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={clearError}>Clear error</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Brands List</h2>
      {brands.length === 0 ? (
        <p>No brands found</p>
      ) : (
        <ul>
          {brands.map(brand => (
            <li key={brand._id}>
              {brand.name}
              <button onClick={() => handleDeleteBrand(brand._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandsList;
``` 