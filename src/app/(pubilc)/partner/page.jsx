'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrendingUp, 
  FaChartBar, 
  FaBullhorn, 
  FaChartLine, 
  FaDollarSign, 
  FaHandshake,
  FaCheckCircle,
  FaRocket,
  FaClock
} from 'react-icons/fa';
import { IoMdTrendingUp } from 'react-icons/io';

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cuisineType: '',
    restaurantType: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        restaurantName: '',
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        cuisineType: '',
        restaurantType: '',
        experience: '',
        message: ''
      });
    }, 2000);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner with FoodNest
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join our growing network of restaurant partners and reach
              thousands of hungry customers. Grow your business with our
              powerful delivery platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Partner with Us?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover the benefits of joining FoodNest's restaurant partner
              network
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Increase Revenue',
                description:
                  'Reach new customers and increase your sales with our extensive customer base of 8,500+ active users.',
                icon: <IoMdTrendingUp className="text-green-400" />,
              },
              {
                title: 'Easy Management',
                description:
                  'Manage orders, menu, and analytics through our user-friendly restaurant dashboard.',
                icon: <FaChartBar className="text-blue-400" />,
              },
              {
                title: 'Marketing Support',
                description:
                  'Get featured in our app promotions and benefit from our marketing campaigns.',
                icon: <FaBullhorn className="text-purple-400" />,
              },
              {
                title: 'Real-time Analytics',
                description:
                  'Track your performance with detailed insights on sales, customer feedback, and trends.',
                icon: <FaChartLine className="text-orange-400" />,
              },
              {
                title: 'Flexible Commission',
                description:
                  'Competitive commission rates with transparent pricing and no hidden fees.',
                icon: <FaDollarSign className="text-yellow-400" />,
              },
              {
                title: 'Dedicated Support',
                description:
                  '24/7 partner support team to help you succeed and resolve any issues quickly.',
                icon: <FaHandshake className="text-red-400" />,
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-700"
              >
                <div className="text-4xl mb-4 flex gap-5">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partner Application Form */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-700"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Apply for Partnership
              </h2>
              <p className="text-lg text-gray-300">
                Ready to join our network? Fill out the form below and we'll get
                back to you within 24 hours.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-3 text-xl" />
                  <p className="text-green-300">
                    Thank you! Your partnership application has been submitted
                    successfully.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="restaurantName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter restaurant name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ownerName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Owner/Manager Name *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Restaurant Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cuisineType"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Cuisine Type *
                  </label>
                  <select
                    id="cuisineType"
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white"
                  >
                    <option value="">Select cuisine type</option>
                    <option value="indian">Indian</option>
                    <option value="chinese">Chinese</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="japanese">Japanese</option>
                    <option value="american">American</option>
                    <option value="thai">Thai</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <FaClock className="mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <FaRocket className="mr-2" />
                    Submit Application
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}