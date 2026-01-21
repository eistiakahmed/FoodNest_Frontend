'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaTruck } from 'react-icons/fa';

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const steps = [
    {
      step: '01',
      title: 'Choose Your Food',
      description: 'Browse through our extensive menu and select your favorite dishes from top restaurants in your area.',
      icon: <FaSearch className="text-3xl" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      step: '02',
      title: 'Place Your Order',
      description: 'Add items to cart, customize your order, and proceed to secure checkout with multiple payment options.',
      icon: <FaShoppingCart className="text-3xl" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      step: '03',
      title: 'Fast Delivery',
      description: 'Sit back and relax while our delivery partners bring your hot, fresh food right to your doorstep.',
      icon: <FaTruck className="text-3xl" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 bg-linear-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-linear-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 mb-6"
          >
            <span className="text-orange-400 font-medium">Simple Process</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It
            <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ordering your favorite food is just a few clicks away with our simple and intuitive process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-linear-to-r from-blue-500/30 to-green-500/30 transform -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-linear-to-r from-green-500/30 to-orange-500/30 transform -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="text-center relative group"
            >
              <div className={`${step.bgColor} ${step.borderColor} border backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 relative overflow-hidden`}>
                {/* linear overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Step number */}
                <div className="absolute top-3 right-4 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`bg-linear-to-r ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-orange-500/30 rounded-full group-hover:bg-orange-500/60 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-8 w-1 h-1 bg-orange-500/20 rounded-full group-hover:bg-orange-500/40 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-8 py-4 bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 cursor-pointer"
          >
            <span className="mr-2">Ready to get started</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}