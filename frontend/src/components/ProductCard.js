import { Typography, Card, CardMedia, CardContent, Skeleton } from '@mui/material';
import { useState } from 'react';

const ProductCard = ({ 
  image, 
  title,
  description
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card sx={{ 
      maxWidth: 360, 
      boxShadow: 'none',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      {!imageLoaded && (
        <Skeleton 
          variant="rectangular" 
          height={260} 
          sx={{ 
            borderRadius: '10px',
            height: { xs: 200, sm: 240, md: 260 }
          }} 
        />
      )}
      <CardMedia
        component="img"
        height="260"
        image={image}
        alt={title}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
        sx={{ 
          borderRadius: '10px',
          height: { xs: 200, sm: 240, md: 260 },
          objectFit: 'cover',
          display: imageLoaded ? 'block' : 'none'
        }}
      />
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