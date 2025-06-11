import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/Hero';
import WhyUs from './WhyUs';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <Box>
      <Hero />
      <WhyUs />
      <Stats />
      <Features />
      <Products />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </Box>
  );
};

export default Home; 