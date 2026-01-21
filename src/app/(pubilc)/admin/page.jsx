'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getApiUrl, API_CONFIG } from '@/lib/config';
import { FaPlus, FaList, FaEdit, FaChartBar, FaSignOutAlt, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalFoods: 0,
    availableItems: 0,
    categories: 0,
    loading: true
  });
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [isAuthenticated, router]);

  const fetchDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true }));
      
      // Fetch foods from backend
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.FOODS));
      if (response.ok) {
        const result = await response.json();
        
        // Handle new API response format
        const foods = result.success ? result.data : result;
        
        // Calculate statistics
        const totalFoods = foods.length;
        const availableItems = foods.filter(food => food.isAvailable).length;
        const categories = [...new Set(foods.map(food => food.category))].length;
        
        setDashboardData({
          totalFoods,
          availableItems,
          categories,
          loading: false
        });
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data. Make sure the backend server is running.');
      setDashboardData({
        totalFoods: 0,
        availableItems: 0,
        categories: 0,
        loading: false
      });
    }
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    logout();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const adminActions = [
    {
      title: 'Add New Food',
      description: 'Create a new food item for your menu',
      icon: <FaPlus className="text-2xl" />,
      href: '/admin/add-food',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'View All Foods',
      description: 'Browse and manage existing food items',
      icon: <FaList className="text-2xl" />,
      href: '/foods',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl opacity-90 max-w-2xl">
                Welcome back, {user?.name || 'Admin'}! Manage your FoodNest restaurant menu and track performance
              </p>
            </div>
            
            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center text-white/90 mb-1">
                  <FaUser className="mr-2" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <div className="text-sm text-white/70">{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Foods</p>
                <p className="text-2xl font-bold text-white">
                  {dashboardData.loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    dashboardData.totalFoods
                  )}
                </p>
              </div>
              <div className="bg-blue-900 p-3 rounded-lg">
                <FaList className="text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Available Items</p>
                <p className="text-2xl font-bold text-white">
                  {dashboardData.loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    dashboardData.availableItems
                  )}
                </p>
              </div>
              <div className="bg-green-900 p-3 rounded-lg">
                <FaChartBar className="text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-white">
                  {dashboardData.loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    dashboardData.categories
                  )}
                </p>
              </div>
              <div className="bg-orange-900 p-3 rounded-lg">
                <FaEdit className="text-orange-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Admin Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {adminActions.map((action, index) => (
            <motion.div key={action.title} variants={itemVariants}>
              <Link href={action.href}>
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className={`${action.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.textColor} group-hover:scale-110 transition-transform duration-200`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {action.description}
                  </p>
                  <div className={`mt-4 inline-flex items-center text-sm font-medium bg-gradient-to-r ${action.color} bg-clip-text text-transparent`}>
                    Get Started →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Refresh Data Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={fetchDashboardData}
              disabled={dashboardData.loading}
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group disabled:opacity-50"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform duration-200">
                <FaChartBar className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Refresh Data
              </h3>
              <p className="text-gray-400 text-sm">
                {dashboardData.loading ? 'Loading...' : 'Update dashboard statistics'}
              </p>
              <div className="mt-4 inline-flex items-center text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                {dashboardData.loading ? 'Refreshing...' : 'Refresh Now →'}
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}