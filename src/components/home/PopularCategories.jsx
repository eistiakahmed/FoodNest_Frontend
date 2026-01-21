'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function PopularCategories() {
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

  const categories = [
    {
      name: 'Pizza',
      image: 'https://i.ibb.co.com/mF935HMn/From-Klick-Pin-CF-Pizza-Photoshoot-for-a-Client.jpg',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      name: 'Sushi',
      image: 'https://i.ibb.co.com/My9PpRnV/From-Klick-Pin-CF-Pin-by-Alma-Macabe-on-Alma-Pins-Mixe-Healthy-food-motivation-Japanese-food-dishes.jpg',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      name: 'Burgers',
      image: 'https://i.ibb.co.com/sd6Pwj2P/From-Klick-Pin-CF-Zinger-Burger-Cheese-Burger-Beef-Burger.jpg',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'Desserts',
      image: 'https://i.ibb.co.com/9kSWtCjy/From-Klick-Pin-CF-Pin-de-alaibtisamat-alkhalida-em-Sobremesas-deliciosas-Guloseima.jpg',
      gradient: 'from-pink-500 to-purple-500',
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 bg-linear-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 to-red-500/5"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-linear-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 mb-6"
          >
            <span className="text-orange-400 font-medium">Popular Categories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Our
            <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> Delicious </span>
            Categories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our most loved food categories, carefully curated for your taste buds with premium quality ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <Link href="/foods" className="block">
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Image container with enhanced styling */}
                  <div className="relative mb-6">
                    <div className="relative w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-linear-to-t ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    Delicious Options
                  </p>

                  {/* Action button */}
                  <div className="flex items-center justify-center text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                    <span className="text-sm font-medium mr-2">Explore</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Link href="/foods">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <span>View All Categories</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
