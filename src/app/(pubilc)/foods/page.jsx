'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FoodCard from '../../../components/FoodCard';

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    category: 'All',
    cuisine: 'All',
    minPrice: 0,
    maxPrice: 1000,
    isVeg: false,
    spiceLevel: 'All',
    rating: 0,
    sortBy: 'name',
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          'https://foodnest-backend.vercel.app/foods'
        );
        const result = await response.json();

        // Handle new API response format
        const data = result.success ? result.data : result;
        setFoods(data);

        // Set initial max price based on actual data
        if (data.length > 0) {
          const maxPrice = Math.max(
            ...data.map((food) => food.discountPrice || food.price)
          );
          setFilters((prev) => ({
            ...prev,
            maxPrice: Math.ceil(maxPrice / 100) * 100,
          }));
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Get unique values for filter options
  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(foods.map((food) => food.category).filter(Boolean)),
    ];
  }, [foods]);

  const cuisines = useMemo(() => {
    return [
      'All',
      ...new Set(foods.map((food) => food.cuisine).filter(Boolean)),
    ];
  }, [foods]);

  const spiceLevels = ['All', 'Low', 'Medium', 'High'];

  // Apply filters and search
  const filteredFoods = useMemo(() => {
    let filtered = [...foods];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (food) =>
          food.name?.toLowerCase().includes(query) ||
          food.description?.toLowerCase().includes(query) ||
          food.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          ) ||
          food.cuisine?.toLowerCase().includes(query) ||
          food.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter((food) => food.category === filters.category);
    }

    // Cuisine filter
    if (filters.cuisine !== 'All') {
      filtered = filtered.filter((food) => food.cuisine === filters.cuisine);
    }

    // Price range filter
    filtered = filtered.filter((food) => {
      const price = food.discountPrice || food.price || 0;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    // Vegetarian filter
    if (filters.isVeg) {
      filtered = filtered.filter((food) => food.isVeg === true);
    }

    // Spice level filter
    if (filters.spiceLevel !== 'All') {
      filtered = filtered.filter(
        (food) => food.spiceLevel === filters.spiceLevel
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(
        (food) => (food.rating || 0) >= filters.rating
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return (
            (a.discountPrice || a.price || 0) -
            (b.discountPrice || b.price || 0)
          );
        case 'price-high':
          return (
            (b.discountPrice || b.price || 0) -
            (a.discountPrice || a.price || 0)
          );
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'prep-time':
          return (a.preparationTime || 0) - (b.preparationTime || 0);
        case 'name':
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

    return filtered;
  }, [foods, filters, searchQuery]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const maxPrice =
      foods.length > 0
        ? Math.max(...foods.map((food) => food.discountPrice || food.price))
        : 1000;
    setFilters({
      category: 'All',
      cuisine: 'All',
      minPrice: 0,
      maxPrice: Math.ceil(maxPrice / 100) * 100,
      isVeg: false,
      spiceLevel: 'All',
      rating: 0,
      sortBy: 'name',
    });
    setSearchQuery('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading delicious foods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Foods
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Explore our carefully curated menu of {foods.length} delicious
              dishes
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for foods, ingredients, or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-gray-900 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-sm"
              >
                <span className="font-medium text-white">Filters & Sort</span>
                <svg
                  className={`w-5 h-5 text-white transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Filters Panel */}
            <div
              className={`bg-gray-900 border border-gray-700 rounded-2xl shadow-sm p-6 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-500 hover:text-orange-400 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-white"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="prep-time">Fastest Prep Time</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => updateFilter('category', category)}
                        className="text-orange-600 focus:ring-orange-500 bg-gray-800 border-gray-600"
                      />
                      <span className="ml-2 text-sm text-gray-300">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cuisine
                </label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => updateFilter('cuisine', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-white"
                >
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max={filters.maxPrice}
                      step="50"
                      value={filters.minPrice}
                      onChange={(e) =>
                        updateFilter('minPrice', parseInt(e.target.value))
                      }
                      className="w-full accent-orange-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Max Price</label>
                    <input
                      type="range"
                      min={filters.minPrice}
                      max="1000"
                      step="50"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        updateFilter('maxPrice', parseInt(e.target.value))
                      }
                      className="w-full accent-orange-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dietary Preferences
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isVeg}
                    onChange={(e) => updateFilter('isVeg', e.target.checked)}
                    className="text-orange-600 focus:ring-orange-500 bg-gray-800 border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Vegetarian Only
                  </span>
                </label>
              </div>

              {/* Spice Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Spice Level
                </label>
                <div className="space-y-2">
                  {spiceLevels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="spiceLevel"
                        checked={filters.spiceLevel === level}
                        onChange={() => updateFilter('spiceLevel', level)}
                        className="text-orange-600 focus:ring-orange-500 bg-gray-800 border-gray-600"
                      />
                      <span className="ml-2 text-sm text-gray-300">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => updateFilter('rating', rating)}
                        className="text-orange-600 focus:ring-orange-500 bg-gray-800 border-gray-600"
                      />
                      <span className="ml-2 text-sm text-gray-300 flex items-center">
                        {rating === 0 ? (
                          'Any Rating'
                        ) : (
                          <>
                            {rating}+
                            <svg
                              className="w-4 h-4 text-yellow-400 ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : 'All Foods'}
                </h2>
                <p className="text-gray-400">
                  Showing {filteredFoods.length} of {foods.length} items
                </p>
              </div>
            </div>

            {/* Foods Grid */}
            <AnimatePresence mode="wait">
              {filteredFoods.length > 0 ? (
                <motion.div
                  key="foods-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredFoods.map((food) => (
                    <motion.div key={food._id} variants={cardVariants}>
                      <FoodCard food={food} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <svg
                    className="w-24 h-24 text-gray-600 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.18-5.536-.437C3.97 14.304 3 12.822 3 11.077V5a2 2 0 012-2h14a2 2 0 012 2v6.077c0 1.745-.97 3.227-2.464 3.486A47.796 47.796 0 0112 15z"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-400 mb-2">
                    No foods found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                      : 'No foods match your current filters. Try adjusting your criteria.'}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
