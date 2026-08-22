import React from 'react';
import { Box, Container, Typography, Stack, Button } from '@mui/material';
import Seo from '../components/Seo';

const RecipeBook = () => {
  return (
    <>
      {/* The recipe book is not written yet, so this page is a blurred preview
          and a paragraph. It is a real destination for anyone who follows the
          footer link, but there is nothing here for Google to rank, and left
          indexable it reads as a duplicate of the homepage. */}
      <Seo
        title="Recipe Book | HoneySpice Cuisine"
        description="Our home-style Nigerian recipe book is on the way."
        noindex
      />
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.paper',
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 3, sm: 4.5 },
            borderRadius: 4,
            bgcolor: 'background.default',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Box
            component="img"
            src="/images/recipe_book.webp"
            alt="Recipe book preview"
            sx={{
              width: '100%',
              maxHeight: 420,
              height: { xs: 260, sm: 320, md: 380 },
              objectFit: 'cover',
              borderRadius: 3,
              mb: { xs: 2.5, sm: 3 },
              filter: 'blur(1.2px) brightness(0.95)',
            }}
          />
          <Stack spacing={1.5} alignItems="center">
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 520,
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.7,
              }}
            >
              We’re collecting our best home-style Nigerian recipes from our kitchen in Stirling, UK, into a beautiful,
              easy-to-follow recipe book. From Jollof to Efo Riro, you’ll be able to recreate HoneySpice favourites at
              home.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 1,
                px: 3.5,
                py: 1.1,
                borderRadius: 999,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Coming soon
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default RecipeBook; 