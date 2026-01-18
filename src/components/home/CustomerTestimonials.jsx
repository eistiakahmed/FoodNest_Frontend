'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CustomerTestimonials() {
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

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Enthusiast',
      rating: 5,
      comment:
        'FoodNest has completely changed how I order food. The delivery is always on time and the food quality is exceptional!',
      avatar:
        'https://i.ibb.co.com/zTWV3X4D/From-Klick-Pin-CF-Pin-by-Ruhan-Sekh-on-Aira-Rawat-Bollywood-hairstyles-Beard-photography-Best-poses.jpg',
    },
    {
      name: 'Mike Chen',
      role: 'Busy Professional',
      rating: 5,
      comment:
        'As someone who works long hours, FoodNest is a lifesaver. Quick, reliable, and delicious food every single time.',
      avatar: 'https://i.ibb.co.com/PvY1qXhh/cast1.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'College Student',
      rating: 5,
      comment:
        'Great variety of restaurants and affordable prices. The app is super easy to use and delivery is always fast!',
      avatar:
        'https://i.ibb.co.com/yFMTFsks/From-Klick-Pin-CF-pingl-par-ajeet-sur-beautiful-lady-Cinquante-nuances-Coiffure-Cinquante-nuances.jpg',
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
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Image src={testimonial.avatar} alt={testimonial.name} height={100} width={100} className="text-3xl mr-3 h-12.5 w-12.5 rounded-full object-cover"/>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic">"{testimonial.comment}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}