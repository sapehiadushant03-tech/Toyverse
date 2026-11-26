import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default headers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Token expired, clear storage and redirect
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/signup', userData);
    
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/signin', userData);
    
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export default apiClient;