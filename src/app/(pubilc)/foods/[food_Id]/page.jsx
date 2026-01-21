'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useCartContext } from '@/components/CartProvider';
import toast from 'react-hot-toast';

export default function FoodDetailsPage() {
  const params = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    if (food && food.isAvailable) {
      addToCart(food, quantity);
    } else {
      toast.error('This item is currently unavailable');
    }
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `https://foodnest-backend.vercel.app/foods/${params.food_Id}`
        );
        const result = await response.json();

        // Handle new API response format
        const data = result.success ? result.data : result;
        setFood(data);
      } catch (error) {
        console.error('Error fetching food:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.food_Id) {
      fetchFood();
    }
  }, [params.food_Id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Food not found</h2>
          <Link href="/foods" className="text-orange-500 hover:text-orange-400">
            ← Back to Foods
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [food.image, ...(food.images || [])].filter(Boolean);
  const finalPrice = food.discountPrice || food.price;
  const discount = food.discountPrice
    ? Math.round(((food.price - food.discountPrice) / food.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-400 mb-8"
        >
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/foods" className="hover:text-orange-500">
            Foods
          </Link>
          <span>/</span>
          <span className="text-white">{food.name}</span>
        </motion.nav>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Image Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
              <Image
                src={allImages[selectedImage]}
                alt={food.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </div>
              )}
              {food.isVeg && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  VEG
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-orange-600'
                        : 'border-gray-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${food.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-orange-900 text-orange-300 text-sm font-medium rounded-full">
                  {food.category}
                </span>
                <span className="px-3 py-1 bg-blue-900 text-blue-300 text-sm font-medium rounded-full">
                  {food.cuisine}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {food.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(food.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-white">
                  {food.rating}
                </span>
              </div>
              <span className="text-gray-400">
                ({food.totalReviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-orange-500">
                ₹{finalPrice}
              </span>
              {food.discountPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{food.price}
                </span>
              )}
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-orange-500"
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
                  <div>
                    <p className="text-sm text-gray-400">Prep Time</p>
                    <p className="font-semibold text-white">
                      {food.preparationTime} min
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Calories</p>
                    <p className="font-semibold text-white">
                      {food.calories} kcal
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Spice Level</p>
                    <p className="font-semibold text-white">
                      {food.spiceLevel}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Portion</p>
                    <p className="font-semibold text-white">
                      {food.portionSize}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-white">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-600 text-white rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!food.isAvailable}
                  className={`flex-1 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    food.isAvailable
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
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
                  <span>
                    {food.isAvailable
                      ? `Add to Cart - ₹${finalPrice * quantity}`
                      : 'Currently Unavailable'}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 border-2 border-orange-600 text-orange-500 hover:bg-orange-900/20 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Availability Status */}
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                food.isAvailable
                  ? 'bg-green-900 text-green-300'
                  : 'bg-red-900 text-red-300'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  food.isAvailable ? 'bg-green-400' : 'bg-red-400'
                }`}
              ></div>
              <span className="font-medium">
                {food.isAvailable ? 'Available Now' : 'Currently Unavailable'}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Ingredients Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Ingredients</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {food.ingredients?.map((ingredient, index) => (
              <div
                key={index}
                className="bg-gray-800 px-4 py-3 rounded-lg text-center border border-gray-600 hover:border-orange-500 transition-colors"
              >
                <span className="text-sm font-medium text-gray-300">
                  {ingredient}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4">
              Nutritional Information
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Calories</span>
                <span className="font-semibold">{food.calories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Portion Size</span>
                <span className="font-semibold">{food.portionSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Spice Level</span>
                <span className="font-semibold">{food.spiceLevel}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4">
              Order Information
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Preparation Time</span>
                <span className="font-semibold">
                  {food.preparationTime} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cuisine Type</span>
                <span className="font-semibold">{food.cuisine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Added On</span>
                <span className="font-semibold">{food.createdAt}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
