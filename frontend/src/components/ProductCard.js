import React from 'react';
import { Typography, Card, CardMedia, CardContent, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const ProductCard = ({ 
  image, 
  title,
  description
}) => {
  const [imageOk, setImageOk] = React.useState(true);

  return (
    <Card sx={{ 
      maxWidth: 360, 
      boxShadow: 'none',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      {image && imageOk ? (
        <CardMedia
          component="img"
          height="260"
          image={image}
          alt={title}
          onError={() => setImageOk(false)}
          sx={{ 
            borderRadius: '10px',
            height: { xs: 200, sm: 240, md: 260 },
            objectFit: 'cover'
          }}
        />
      ) : (
        <Box
          sx={(theme) => ({
            borderRadius: '10px',
            height: { xs: 200, sm: 240, md: 260 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.palette.divider}`,
            background:
              'radial-gradient(500px 220px at 20% 10%, rgba(244, 106, 6, 0.18) 0%, rgba(0,0,0,0) 60%), radial-gradient(420px 200px at 80% 10%, rgba(252, 169, 0, 0.16) 0%, rgba(0,0,0,0) 55%), #fff',
            color: 'text.secondary',
          })}
        >
          <RestaurantMenuIcon sx={{ fontSize: 44 }} />
        </Box>
      )}
      <CardContent sx={{ 
        p: { xs: 1, sm: 2 }, 
        mt: { xs: 1, sm: 2 }
      }}>
        <Typography 
          variant="h6" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: '1rem',
              sm: '1.125rem',
              md: '1.25rem'
            },
            color: 'text.primary',
            letterSpacing: '0.02em',
            mb: { xs: 0.5, sm: 1 }
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              fontSize: {
                xs: '0.875rem',
                sm: '0.9375rem',
                md: '1rem'
              }
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard; 