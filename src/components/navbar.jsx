'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useCartContext } from '@/components/CartProvider';
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaList,
  FaUserShield,
  FaShoppingCart,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, setIsOpen: setCartOpen } = useCartContext();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    toast.success('Logged out successfully');
  };

  const navLinks = [
    { href: '/', label: 'Home'},
    { href: '/foods', label: 'Foods' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/partner', label: 'Partner' },
  ];

  // Add admin link if user is authenticated
  if (isAuthenticated) {
    navLinks.push({ href: '/admin', label: 'Admin', icon: FaUserShield });
  }

  return (
    <nav className="bg-black shadow-md lg:shadow-none ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-extrabold text-orange-500">
              Food
            </span>
            <span className="text-3xl font-extrabold text-white">Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-orange-500 font-semibold transition-colors duration-200 flex items-center gap-1"
              >
                {link.icon && <link.icon className="text-sm" />}
                {link.label}
              </Link>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-gray-300 hover:text-orange-500 transition-colors duration-200 p-3 hover:border-4 rounded-full shadow-md"
            >
              <FaShoppingCart className="text-xl" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <FaUser className="text-sm" />
                  {user?.name || 'User'}
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-800"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="text-sm" />}
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Cart Button */}
                <button
                  onClick={() => {
                    setCartOpen(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-colors duration-200 w-full"
                >
                  <FaShoppingCart className="text-sm" />
                  <span>Cart ({getTotalItems()})</span>
                </button>
                
                <div className="px-4 pt-2">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 border-b border-gray-700 pb-2">
                        <p className="font-medium text-white">{user?.name}</p>
                        <p>{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full block text-center px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
