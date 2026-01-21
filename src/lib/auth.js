import Cookies from 'js-cookie';

// Mock credentials
const MOCK_CREDENTIALS = {
  email: 'admin@foodnest.com',
  password: 'admin123'
};

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
};

// Event listeners for auth state changes
const authListeners = new Set();

export const auth = {
  // Add auth state listener
  addAuthListener: (callback) => {
    authListeners.add(callback);
    return () => authListeners.delete(callback);
  },

  // Notify all listeners of auth state change
  notifyAuthChange: () => {
    authListeners.forEach(callback => callback());
  },

  // Login function
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      // Create user session
      const user = {
        id: '1',
        email: email,
        name: 'Admin User',
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      
      // Store in cookies
      Cookies.set('foodnest_auth', JSON.stringify(user), COOKIE_OPTIONS);
      Cookies.set('foodnest_token', 'mock_jwt_token_' + Date.now(), COOKIE_OPTIONS);
      
      // Notify listeners of auth state change
      auth.notifyAuthChange();
      
      return { success: true, user };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  // Logout function
  logout: () => {
    Cookies.remove('foodnest_auth');
    Cookies.remove('foodnest_token');
    
    // Notify listeners of auth state change
    auth.notifyAuthChange();
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const userCookie = Cookies.get('foodnest_auth');
      const tokenCookie = Cookies.get('foodnest_token');
      
      if (userCookie && tokenCookie) {
        return JSON.parse(userCookie);
      }
      return null;
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const user = auth.getCurrentUser();
    const token = Cookies.get('foodnest_token');
    return !!(user && token);
  },

  // Get auth token
  getToken: () => {
    return Cookies.get('foodnest_token');
  }
};