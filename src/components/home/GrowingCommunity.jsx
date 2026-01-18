'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaSmile, FaStore, FaGlobe } from 'react-icons/fa';

export default function GrowingCommunity() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    { 
      number: '15K+', 
      label: 'Orders Delivered', 
      icon: <FaBox className="text-4xl mb-2" />
    },
    { 
      number: '8.5K+', 
      label: 'Happy Customers', 
      icon: <FaSmile className="text-4xl mb-2" />
    },
    { 
      number: '150+', 
      label: 'Restaurant Partners', 
      icon: <FaStore className="text-4xl mb-2" />
    },
    { 
      number: '25+', 
      label: 'Cities Served', 
      icon: <FaGlobe className="text-4xl mb-2" />
    }
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Growing Community
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of satisfied customers who trust FoodNest
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className="flex justify-center">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}