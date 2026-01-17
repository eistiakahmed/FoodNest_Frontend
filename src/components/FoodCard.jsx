'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEye } from 'react-icons/fa';

const FoodCard = ({ food }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div>
        <div className="relative">
          {/* Food Image */}
          <div className="relative h-48 bg-gray-200">
            {food.image ? (
              <Image
                src={food.image}
                alt={food.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Category Badge */}
            {food.category && (
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                  {food.category}
                </span>
              </div>
            )}

            {/* Rating Badge */}
            {food.rating && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {food.rating}
                </span>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
              {food.name}
            </h3>

            {food.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {food.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {food.price && (
                  <span className="text-2xl font-bold text-orange-600">
                    ${food.price}
                  </span>
                )}
                {food.originalPrice && food.originalPrice > food.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${food.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic here
                    console.log('Added to cart:', food.name);
                  }}
                  className="px-4 py-2 btn lg:btn-sm shadow-none border-0 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                    />
                  </svg>
                  Add
                </motion.button>
                <Link
                  href={`/foods/${food._id}`}
                  className="px-4 py-2 btn lg:btn-sm shadow-none border-0 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <FaRegEye />
                  View
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              {food.cookingTime && (
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {food.cookingTime} min
                </div>
              )}

              <div className="flex gap-2">
                {food.isVegetarian && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Vegetarian
                  </span>
                )}

                {food.isSpicy && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    🌶️ Spicy
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
