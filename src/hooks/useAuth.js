'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial auth check
    const checkAuth = () => {
      const currentUser = auth.getCurrentUser();
      const authenticated = auth.isAuthenticated();
      
      setUser(currentUser);
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const unsubscribe = auth.addAuthListener(() => {
      checkAuth();
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login: auth.login,
    logout: auth.logout,
    getCurrentUser: auth.getCurrentUser
  };
}