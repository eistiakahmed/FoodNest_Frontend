// API Configuration for FoodNest Frontend

// Base API URL - Backend runs on port 5000
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://foodnest-backend.vercel.app'
  : 'http://localhost:5000';

// API Configuration object
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    // Food endpoints
    FOODS: '/foods',
    ADD_FOOD: '/add_foods',
    FOOD_BY_ID: (id) => `/foods/${id}`,
    
    // Auth endpoints (if needed in future)
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    
    // Admin endpoints (if needed in future)
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_STATS: '/admin/stats',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

/**
 * Get full API URL for an endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {string} - Full API URL
 */
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Create API request configuration
 * @param {string} method - HTTP method
 * @param {Object} data - Request data
 * @param {Object} headers - Additional headers
 * @returns {Object} - Fetch configuration object
 */
export const createApiConfig = (method = 'GET', data = null, headers = {}) => {
  const config = {
    method,
    headers: {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...headers,
    },
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  return config;
};

/**
 * Make API request with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - API response
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = getApiUrl(endpoint);
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default API_CONFIG;