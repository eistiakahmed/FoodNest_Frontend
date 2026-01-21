import React from 'react';
import Banner from '@/components/banner';
import PopularCategories from '@/components/home/PopularCategories';
import HowItWorks from '@/components/home/HowItWorks';
import GrowingCommunity from '@/components/home/GrowingCommunity';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CustomerTestimonials from '@/components/home/CustomerTestimonials';
import CallToAction from '@/components/home/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* 1. Hero Section (Banner) */}
      <Banner />

      {/* 2. Popular Categories Section */}
      <PopularCategories />

      {/* 3. How It Works Section */}
      <HowItWorks />

      {/* 4. Growing Community Section (Statistics) */}
      <GrowingCommunity />

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 6. Customer Testimonials Section */}
      <CustomerTestimonials />

      {/* 7. Call to Action Section */}
      <CallToAction />
    </div>
  );
}