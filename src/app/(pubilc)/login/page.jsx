'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { auth } from '@/lib/auth';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaSpinner,
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaUser,
  FaUtensils,
  FaInfoCircle
} from 'react-icons/fa';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push('/foods');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (!formData.password.trim()) {
      toast.error('Please enter your password');
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    const loadingToast = toast.loading('Signing you in...');
    
    try {
      const result = await auth.login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Welcome back to FoodNest!', {
          duration: 4000,
          style: {
            background: '#10B981',
            color: 'white',
          },
        });
        
        // Redirect to foods page (items/lists page)
        router.push('/foods');
      }
      
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.loading(`Connecting to ${provider}...`);
    // Implement social login logic here
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
      <div className="min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md w-full space-y-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-linear-to-r from-orange-500 to-red-600 p-3 rounded-full">
                  <FaUtensils className="text-white text-2xl" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-400 mb-4">
                Sign in to your FoodNest account to continue your culinary journey
              </p>
              
              {/* Demo Credentials Info */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <FaInfoCircle className="text-orange-500 mr-2" />
                  <span className="text-sm font-semibold text-orange-400">Demo Credentials</span>
                </div>
                <div className="text-sm text-gray-300">
                  <p><strong>Email:</strong> admin@foodnest.com</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
              </div>
            </motion.div>

            

            {/* Login Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-900 text-white placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-900 text-white placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-500 hover:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-orange-600 border-2 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 bg-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-orange-500 hover:text-orange-400 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaUser className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </motion.form>

            {/* Sign Up Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-orange-500 hover:text-orange-400 font-semibold"
                >
                  Sign up for free
                </Link>
              </p>
            </motion.div>

            {/* Terms */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-orange-500 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-500 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="hidden lg:flex lg:flex-1 bg-linear-to-br from-orange-500 to-red-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-40 right-10 w-12 h-12 border-2 border-white rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FaUtensils className="text-6xl mb-8" />
              <h1 className="text-4xl font-bold mb-6">
                Delicious Food Awaits
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-md">
                Join thousands of food lovers who trust FoodNest for their daily meals. 
                Fresh ingredients, amazing flavors, delivered fast.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold">15K+</div>
                  <div className="text-sm opacity-80">Orders Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-sm opacity-80">Restaurants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-sm opacity-80">Cities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}