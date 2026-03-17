import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <Box>
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </Box>
  );
};

export default Home; 