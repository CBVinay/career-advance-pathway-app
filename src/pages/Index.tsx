
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JobListings from '@/components/JobListings';
import ResumeBuilder from '@/components/ResumeBuilder';
import Projects from '@/components/Projects';
import Mentorship from '@/components/Mentorship';
import AIJobAgent from '@/components/AIJobAgent';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIJobAgent />
      </div>
      <JobListings />
      <ResumeBuilder />
      <Projects />
      <Mentorship />
      <Footer />
    </div>
  );
};

export default Index;
