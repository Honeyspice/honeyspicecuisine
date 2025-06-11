import { Box, Container, Grid } from '@mui/material';
import Counter from './Counter';

const Stats = () => {
  const stats = [
    { value: '50+', label: 'Menu Items' },
    { value: '1000+', label: 'Happy Customers' },
    { value: '5+', label: 'Years of Service' },
    { value: '100%', label: 'Authentic Taste' },
  ];

  return (
    <Box sx={{ 
      bgcolor: 'primary.main', 
      py: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          justifyContent="space-around"
        >
          {stats.map((stat, index) => (
            <Grid item key={index} xs={6} sm={3}>
              <Counter value={stat.value} label={stat.label} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats; 