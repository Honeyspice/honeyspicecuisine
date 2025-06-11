import { Box, Typography } from '@mui/material';

const Counter = ({ value, label }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          color: 'white',
          mb: 0.5,
          fontSize: {
            xs: '2rem',
            sm: '2.5rem',
            md: '3rem'
          },
          fontWeight: 700
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'white',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem'
          },
          opacity: 0.9
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Counter; 