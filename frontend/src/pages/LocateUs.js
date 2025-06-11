import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const LocateUs = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.paper',
      pt: { xs: 6, sm: 8, md: 10 },
      pb: { xs: 3, sm: 4, md: 6 },
      px: { xs: 2, sm: 0 }
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            color: 'primary.main',
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.5rem'
            },
            fontWeight: 700
          }}
        >
          Locate Us
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Our Location */}
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ 
                p: { xs: 2, sm: 3 },
                textAlign: 'center'
              }}>
                <LocationOnIcon 
                  sx={{ 
                    fontSize: { xs: 40, sm: 48, md: 56 },
                    color: 'primary.main',
                    mb: { xs: 1, sm: 2 }
                  }} 
                />
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.25rem',
                      md: '1.5rem'
                    },
                    fontWeight: 600
                  }}
                >
                  Our Location
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem',
                      md: '1.125rem'
                    }
                  }}
                >
                  123 Nigerian Street<br />
                  London, UK<br />
                  SW1A 1AA
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ 
                p: { xs: 2, sm: 3 },
                textAlign: 'center'
              }}>
                <AccessTimeIcon 
                  sx={{ 
                    fontSize: { xs: 40, sm: 48, md: 56 },
                    color: 'primary.main',
                    mb: { xs: 1, sm: 2 }
                  }} 
                />
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.25rem',
                      md: '1.5rem'
                    },
                    fontWeight: 600
                  }}
                >
                  Opening Hours
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem',
                      md: '1.125rem'
                    }
                  }}
                >
                  Monday - Friday: 9am - 9pm<br />
                  Saturday: 10am - 10pm<br />
                  Sunday: 11am - 8pm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ 
                p: { xs: 2, sm: 3 },
                textAlign: 'center'
              }}>
                <PhoneIcon 
                  sx={{ 
                    fontSize: { xs: 40, sm: 48, md: 56 },
                    color: 'primary.main',
                    mb: { xs: 1, sm: 2 }
                  }} 
                />
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.25rem',
                      md: '1.5rem'
                    },
                    fontWeight: 600
                  }}
                >
                  Contact Us
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem',
                      md: '1.125rem'
                    }
                  }}
                >
                  Phone: +44 123 456 7890<br />
                  WhatsApp: +44 123 456 7890
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Email Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ 
                p: { xs: 2, sm: 3 },
                textAlign: 'center'
              }}>
                <EmailIcon 
                  sx={{ 
                    fontSize: { xs: 40, sm: 48, md: 56 },
                    color: 'primary.main',
                    mb: { xs: 1, sm: 2 }
                  }} 
                />
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.25rem',
                      md: '1.5rem'
                    },
                    fontWeight: 600
                  }}
                >
                  Email Us
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem',
                      md: '1.125rem'
                    }
                  }}
                >
                  info@honeyspice.com<br />
                  orders@honeyspice.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LocateUs; 