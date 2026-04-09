import React from 'react';
import { Box } from '@mui/material';
import Seo from '../components/Seo';
import Menu from './Menu';

export default function Order() {
  return (
    <>
      <Seo
        title="Order | HoneySpice Cuisine"
        description="Order authentic Nigerian food from Honeyspice Kitchen in Stirling. Jollof rice, suya, shawarma and more."
      />
      <Box sx={{ pt: { xs: 2, md: 3 } }}>
        <Menu />
      </Box>
    </>
  );
}
