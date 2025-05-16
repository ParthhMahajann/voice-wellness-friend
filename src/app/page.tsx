import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import DisclaimerSection from '@/components/home/DisclaimerSection';

export default function HomePage() {
  return (
    <main className="flex-grow">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <DisclaimerSection />
    </main>
  );
} 