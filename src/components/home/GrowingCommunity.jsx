'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBox, FaSmile, FaStore, FaGlobe } from 'react-icons/fa';
import { useRef } from 'react';

// Counter animation hook
const useCounter = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

export default function GrowingCommunity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stats = [
    { 
      number: 15000, 
      suffix: '+',
      label: 'Orders Delivered', 
      icon: <FaBox className="text-4xl mb-2" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    { 
      number: 8500, 
      suffix: '+',
      label: 'Happy Customers', 
      icon: <FaSmile className="text-4xl mb-2" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    { 
      number: 150, 
      suffix: '+',
      label: 'Restaurant Partners', 
      icon: <FaStore className="text-4xl mb-2" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    { 
      number: 25, 
      suffix: '+',
      label: 'Cities Served', 
      icon: <FaGlobe className="text-4xl mb-2" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6"
          >
            <span className="text-white font-medium">Our Impact</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Growing
            <span className="text-yellow-300"> Community</span>
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust FoodNest for their daily food delivery needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const count = useCounter(stat.number, 2000 + (index * 200), isInView);
            
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="text-center group"
              >
                <div className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500`}>
                  <div className={`flex justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {count.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Progress bar animation */}
                  <div className="mt-4 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                    <motion.div
                      className={`h-full ${stat.color.replace('text-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : { width: 0 }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional CTA */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300 cursor-pointer"
          >
            <span className="font-medium">Be part of our growing family!</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}