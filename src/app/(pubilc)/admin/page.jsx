'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPlus, FaList, FaEdit, FaChartBar } from 'react-icons/fa';

export default function AdminDashboard() {
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
      textColor: 'text-green-600',
    },
    {
      title: 'View All Foods',
      description: 'Browse and manage existing food items',
      icon: <FaList className="text-2xl" />,
      href: '/foods',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Manage your FoodNest restaurant menu and track performance
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                  <div
                    className={`${action.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.textColor} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                  <div
                    className={`mt-4 inline-flex items-center text-sm font-medium bg-linear-to-r ${action.color} bg-clip-text text-transparent`}
                  >
                    Get Started →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
