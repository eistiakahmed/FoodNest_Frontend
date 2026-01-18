'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
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
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="mb-6">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-orange-500">
                    Food
                  </span>
                  <span className="text-2xl font-bold text-white">Nest</span>
                </Link>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                FoodNest connects you with your favorite restaurants, delivering
                exceptional culinary experiences right to your doorstep. Fresh,
                fast, and always delicious.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebookF, href: '#', label: 'Facebook' },
                  { icon: FaTwitter, href: '#', label: 'Twitter' },
                  { icon: FaInstagram, href: '#', label: 'Instagram' },
                  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                  { icon: FaYoutube, href: '#', label: 'YouTube' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="text-sm" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Browse Foods', href: '/foods' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'Partner with Us', href: '/partner' },
                  { name: 'Careers', href: '#' },
                  { name: 'Blog', href: '#' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Support */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6">Customer Support</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Help Center', href: '#' },
                  { name: 'Track Your Order', href: '#' },
                  { name: 'Refund Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' },
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'FAQ', href: '#' },
                  { name: 'Report an Issue', href: '#' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info & App Downloads */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    123 Food Street, Culinary District
                    <br />
                    City 12345, Country
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-orange-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-orange-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    support@foodnest.com
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaClock className="text-orange-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    24/7 Customer Support
                    <br />
                    Always here to help
                  </span>
                </div>
              </div>

              {/* App Download Links */}
              <div>
                <h5 className="font-semibold mb-4">Download Our App</h5>
                <div className="space-y-3">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200"
                  >
                    <FaApple className="text-2xl" />
                    <div>
                      <div className="text-xs text-gray-400">
                        Download on the
                      </div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200"
                  >
                    <FaGooglePlay className="text-2xl" />
                    <div>
                      <div className="text-xs text-gray-400">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <motion.div
              variants={itemVariants}
              className="text-gray-400 text-sm"
            >
              © {currentYear} FoodNest. All rights reserved. Made with ❤️ for
              food lovers.
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm"
            >
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Accessibility
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
