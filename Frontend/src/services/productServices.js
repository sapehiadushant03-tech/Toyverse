import apiClient from './authService';

export const getProducts = async (selectedCategory) => {
  try {
    const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';
    const response = await apiClient.get(`/api/products/${query}`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

export const getProductsWithoutAuth = async (selectedCategory) => {
  // For public endpoints that don't require authentication
  try {
    const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';
    const response = await apiClient.get(`/api/products/${query}`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};