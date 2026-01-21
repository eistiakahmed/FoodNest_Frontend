'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

export default function Banner() {
  const slides = [
    {
      image: '/slide_1.png',
      badge: 'Best In Fish',
      title: 'The Best Fresh Fish in',
      titleBreak: 'your City Area',
      description: 'Experience the finest selection of fresh seafood delivered straight to your door',
    },
    {
      image: '/slide_2.png',
      badge: 'Best In Pizza',
      title: 'Sweet Crispy and',
      titleBreak: 'Spicy Pepperoni',
      description: 'Authentic Italian flavors crafted with premium ingredients and passion',
    },
    {
      image: '/slide_3.png',
      badge: 'Best In Meat',
      title: 'Order Healthy Fresh',
      titleBreak: 'Food in Any Time',
      description: 'Quality meals prepared by expert chefs, available 24/7 for your convenience',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative w-full h-125 sm:h-150 lg:h-175 overflow-hidden">
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        className="h-full banner-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30 z-10"></div>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 h-full flex items-center pt-16 sm:pt-0"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                      <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-orange-500 to-red-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6 shadow-lg">
                        {slide.badge}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      variants={itemVariants}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                    >
                      {slide.title}
                      <br />
                      <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        {slide.titleBreak}
                      </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      variants={itemVariants}
                      className="text-sm sm:text-base lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      variants={itemVariants}
                      className="flex sm:flex-row gap-3 sm:gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-orange-500 to-red-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>Order Now</span>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        <span>Watch Video</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: linear-gradient(135deg, #f97316, #dc2626);
          transform: scale(1.15);
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
          border-color: transparent;
        }

        .banner-swiper .swiper-button-next::after,
        .banner-swiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #f97316, #dc2626);
          width: 28px;
          border-radius: 6px;
        }

        /* Mobile responsive arrows */
        @media (max-width: 640px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            width: 35px;
            height: 35px;
          }

          .banner-swiper .swiper-button-next::after,
          .banner-swiper .swiper-button-prev::after {
            font-size: 14px;
          }
        }

        /* Hide arrows on very small screens */
        @media (max-width: 480px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
