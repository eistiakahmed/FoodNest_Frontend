'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
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
      <div className="bg-linear-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About FoodNest
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We are passionate about connecting food lovers with their favorite
              restaurants, delivering exceptional culinary experiences right to
              your doorstep.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  Founded in 2020, FoodNest began with a simple mission: to make
                  delicious, quality food accessible to everyone, anytime,
                  anywhere. What started as a small team of food enthusiasts has
                  grown into a thriving platform connecting thousands of
                  customers with their favorite restaurants.
                </p>
                <p>
                  We believe that great food brings people together, and our
                  technology makes it easier than ever to discover new flavors,
                  support local businesses, and enjoy memorable meals with the
                  people you care about.
                </p>
                <p>
                  Today, we are proud to serve over 25 cities, partner with 150+
                  restaurants, and have delivered more than 15,000 orders to
                  satisfied customers across the region.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/slide_1.png"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm"
            >
              <div className="bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-orange-400"
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
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 text-lg">
                To revolutionize food delivery by creating seamless connections
                between restaurants and customers, ensuring every meal is
                delivered fresh, fast, and with exceptional service that exceeds
                expectations.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm"
            >
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300 text-lg">
                To become the most trusted and beloved food delivery platform,
                empowering local restaurants to thrive while bringing
                communities together through the universal language of great
                food.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment
              to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description:
                  'We partner only with restaurants that meet our high standards for food quality and safety.',
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Customer Obsessed',
                description:
                  'Every decision we make is centered around creating the best possible experience for our customers.',
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
              },
              {
                title: 'Innovation Driven',
                description:
                  'We continuously innovate to improve our technology and deliver faster, better service.',
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-400">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The passionate people behind FoodNest who work tirelessly to bring
              you the best food delivery experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {[
              {
                name: 'Alex Johnson',
                role: 'CEO & Founder',
                bio: 'Passionate about food and technology, Alex founded FoodNest to revolutionize food delivery.',
                avatar:
                  'https://i.ibb.co/9kHpfRj/From-Klick-Pin-CF-Nailed-it-Professional-profile-pictures-Guy-pictures-Man-photo.jpg',
              },
              {
                name: 'Sarah Chen',
                role: 'Head of Operations',
                bio: 'Sarah ensures our delivery network runs smoothly and efficiently across all cities.',
                avatar:
                  'https://i.ibb.co/BHS1BDt/From-Klick-Pin-CF-Pin-de-K-bra-Akak-e-em-A-ART-Beleza-de-mulher-Mulher-Beleza.jpg',
              },
              {
                name: 'Mike Rodriguez',
                role: 'Head of Technology',
                bio: 'Mike leads our tech team in building innovative solutions for seamless food ordering.',
                avatar:
                  'https://i.ibb.co/3YFRdDJ/From-Klick-Pin-CF-portrait-LINKEDIN-Corporate-headshot-poses-Headshots-professional-Corporate-portr.jpg',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <Image 
                  src={member.avatar} 
                  alt={member.name} 
                  width={100} 
                  height={100} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" 
                />
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-orange-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-linear-to-r from-orange-500 to-red-600 rounded-2xl p-12 text-white text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl opacity-90">
              See how we are making a difference in the food delivery industry
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15K+', label: 'Orders Delivered' },
              { number: '8.5K+', label: 'Happy Customers' },
              { number: '150+', label: 'Restaurant Partners' },
              { number: '25+', label: 'Cities Served' },
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}