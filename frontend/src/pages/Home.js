import React from 'react';
import { Box } from '@mui/material';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <Seo
        title="HoneySpice Cuisine | Nigerian Food in Stirling"
        description="Authentic Nigerian food in Stirling, UK. Order Jollof Rice, Efo Riro, Ofada and more for collection or delivery from HoneySpice Cuisine."
      />
      <Box>
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </Box>
    </>
  );
};

export default Home; 