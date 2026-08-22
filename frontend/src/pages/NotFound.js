import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      {/* The SPA catch-all means an unknown URL still answers 200, so without
          this a mistyped or stale link becomes another indexable page claiming
          the homepage's content. */}
      <Seo title="Page not found | HoneySpice Cuisine" noindex />
      <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 3 }}>
        <Typography sx={{ fontSize: '4.5rem', lineHeight: 1, mb: 2, fontWeight: 800, color: '#F46A06', letterSpacing: '0.02em' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 1 }}>
          Page not found
        </Typography>
        <Typography sx={{ color: '#888', mb: 4, maxWidth: 360 }}>
          Looks like this dish isn't on the menu. Let's get you back to something tasty.
        </Typography>
        <Link
          to="/"
          style={{
            padding: '12px 32px',
            borderRadius: 999,
            background: '#F46A06',
            color: 'white',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.95rem',
          }}
        >
          Back to Home
        </Link>
      </Box>
    </>
  );
}
