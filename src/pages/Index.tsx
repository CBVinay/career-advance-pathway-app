
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JobListings from '@/components/JobListings';
import ResumeBuilder from '@/components/ResumeBuilder';
import Projects from '@/components/Projects';
import Mentorship from '@/components/Mentorship';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <JobListings />
      <ResumeBuilder />
      <Projects />
      <Mentorship />
      <Footer />
    </div>
  );
};

export default Index;
