'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  FaPlus,
  FaTrash,
  FaUpload,
  FaSpinner,
  FaDollarSign,
  FaCamera,
  FaUtensils,
  FaCog,
  FaInfoCircle,
  FaImage,
  FaLeaf,
} from 'react-icons/fa';

export default function AddFoodPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    cuisine: '',
    image: '',
    images: [''],
    isAvailable: true,
    isVeg: false,
    calories: '',
    preparationTime: '',
    spiceLevel: 'Low',
    ingredients: [''],
    portionSize: '',
    restaurantId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const categories = [
    'Appetizer',
    'Main Course',
    'Burger',
    'Sushi',
    'Pizza',
    'Dessert',
    'Beverage',
    'Snack',
    'Salad',
    'Soup',
    'Breakfast',
  ];

  const cuisines = [
    'Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Japanese',
    'American',
    'Thai',
    'Mediterranean',
    'French',
    'Korean',
  ];

  const spiceLevels = ['Low', 'Medium', 'High'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Handle image preview
    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleArrayChange = (index, value, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ''],
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    if (formData[arrayName].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'name',
      'price',
      'category',
      'cuisine',
      'description',
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return false;
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0');
      return false;
    }

    if (
      formData.discountPrice &&
      parseFloat(formData.discountPrice) >= parseFloat(formData.price)
    ) {
      toast.error('Discount price must be less than original price');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading('Adding food item...');

    try {
      // Clean up form data
      const cleanedData = {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice
          ? parseFloat(formData.discountPrice)
          : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        preparationTime: formData.preparationTime
          ? parseInt(formData.preparationTime)
          : null,
        ingredients: formData.ingredients.filter((item) => item.trim() !== ''),
        images: formData.images.filter((item) => item.trim() !== ''),
      };

      const response = await fetch(
        'https://foodnest-backend.vercel.app/add_foods',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cleanedData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success('Food item added successfully!', {
          duration: 4000,
          style: {
            background: '#10B981',
            color: 'white',
          },
        });

        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          discountPrice: '',
          category: '',
          cuisine: '',
          image: '',
          images: [''],
          isAvailable: true,
          isVeg: false,
          calories: '',
          preparationTime: '',
          spiceLevel: 'Low',
          ingredients: [''],
          portionSize: '',
          restaurantId: '',
        });
        setImagePreview('');
      } else {
        toast.error(result.error || 'Failed to add food item');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
    }
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

  return (
    <div className="min-h-screen bg-black">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />

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
              Add New Food Item
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Create a delicious new menu item for your customers to enjoy
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-orange-900 p-2 rounded-lg mr-3">
                  <FaInfoCircle className="text-orange-400" />
                </span>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="Enter food name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white shadow-md hover:border-gray-500"
                  >
                    <option value="" className="text-gray-400">
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="text-white bg-gray-800"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Cuisine *
                  </label>
                  <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white shadow-md hover:border-gray-500"
                  >
                    <option value="" className="text-gray-400">
                      Select Cuisine
                    </option>
                    {cuisines.map((cuisine) => (
                      <option
                        key={cuisine}
                        value={cuisine}
                        className="text-white bg-gray-800"
                      >
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Portion Size
                  </label>
                  <input
                    type="text"
                    name="portionSize"
                    value={formData.portionSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="e.g., 8 Rolls, 1 Plate"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                  placeholder="Describe your delicious food item..."
                />
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-green-900 p-2 rounded-lg mr-3">
                  <FaDollarSign className="text-green-400" />
                </span>
                Pricing & Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Preparation Time (min)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Spice Level
                  </label>
                  <select
                    name="spiceLevel"
                    value={formData.spiceLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white shadow-md hover:border-gray-500"
                  >
                    {spiceLevels.map((level) => (
                      <option
                        key={level}
                        value={level}
                        className="text-white bg-gray-800"
                      >
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Restaurant ID
                  </label>
                  <input
                    type="text"
                    name="restaurantId"
                    value={formData.restaurantId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="Restaurant ID"
                  />
                </div>
              </div>
            </motion.div>

            {/* Images */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-blue-900 p-2 rounded-lg mr-3">
                  <FaCamera className="text-blue-400" />
                </span>
                Images
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Main Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                        onError={() => setImagePreview('')}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Additional Images
                  </label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) =>
                          handleArrayChange(index, e.target.value, 'images')
                        }
                        className="flex-1 px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'images')}
                        className="px-3 py-3 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('images')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-600"
                  >
                    <FaImage /> Add Image
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Ingredients */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-purple-900 p-2 rounded-lg mr-3">
                  <FaUtensils className="text-purple-400" />
                </span>
                Ingredients
              </h2>

              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, 'ingredients')
                    }
                    className="flex-1 px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-800 text-white placeholder-gray-400 shadow-md hover:border-gray-500"
                    placeholder="Enter ingredient"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'ingredients')}
                    className="px-3 py-3 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('ingredients')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-600"
              >
                <FaPlus /> Add Ingredient
              </button>
            </motion.div>

            {/* Options */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-yellow-900 p-2 rounded-lg mr-3">
                  <FaCog className="text-yellow-400" />
                </span>
                Options
              </h2>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isVeg"
                    checked={formData.isVeg}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-600 border-2 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 bg-gray-800"
                  />
                  <FaLeaf className="ml-2 mr-1 text-green-400" />
                  <span className="text-gray-300 font-medium">Vegetarian</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-600 border-2 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 bg-gray-800"
                  />
                  <FaCog className="ml-2 mr-1 text-blue-400" />
                  <span className="text-gray-300 font-medium">Available</span>
                </label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Adding Food Item...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add Food Item
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
