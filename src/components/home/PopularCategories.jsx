'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      image:
        'https://i.ibb.co.com/mF935HMn/From-Klick-Pin-CF-Pizza-Photoshoot-for-a-Client.jpg',
    },
    {
      name: 'Sushi',
      image:
        'https://i.ibb.co.com/My9PpRnV/From-Klick-Pin-CF-Pin-by-Alma-Macabe-on-Alma-Pins-Mixe-Healthy-food-motivation-Japanese-food-dishes.jpg',
    },
    {
      name: 'Burgers',
      image:
        'https://i.ibb.co.com/sd6Pwj2P/From-Klick-Pin-CF-Zinger-Burger-Cheese-Burger-Beef-Burger.jpg',
    },
    {
      name: 'Desserts',
      image:
        'https://i.ibb.co.com/9kSWtCjy/From-Klick-Pin-CF-Pin-de-alaibtisamat-alkhalida-em-Sobremesas-deliciosas-Guloseima.jpg',
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our most loved food categories, carefully curated for your
            taste buds
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
