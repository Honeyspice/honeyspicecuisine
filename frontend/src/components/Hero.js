import React from 'react';
import { Box, Container, Typography, Grid, Chip, Stack, Fade } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Button from './Button';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import foodImg from '../assets/background/background.png';

const Hero = () => {
  const TIMING = React.useMemo(
    () => ({
      intervalMs: 3200,
      fadeMs: 420,
      switchDelayMs: 240,
      kenBurnsMs: 3600,
    }),
    []
  );

  const dishes = React.useMemo(
    () => [
      { name: 'Jollof Rice', image: '/images/jollof_rice.png' },
      { name: 'Egusi Soup', image: '/images/Egusi.png' },
      { name: 'Ofada (Ayamase)', image: '/images/Ofada.png' },
      { name: 'Efo Riro', image: '/images/efo_riro.png' },
      { name: 'Boli', image: '/images/boli.png' },
      { name: 'Amala & Ewedu', image: '/images/Amala.png' },
    ],
    []
  );

  const prefersReducedMotion = React.useMemo(() => {
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }, []);

  const [dishIndex, setDishIndex] = React.useState(0);
  const [dishVisible, setDishVisible] = React.useState(true);

  const kenBurns = React.useMemo(
    () =>
      keyframes`
        0% { transform: scale(1.06) translate3d(0px, 0px, 0px); }
        100% { transform: scale(1.12) translate3d(-12px, -10px, 0px); }
      `,
    []
  );

  React.useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setDishVisible(false);
      window.setTimeout(() => {
        setDishIndex((i) => (i + 1) % dishes.length);
        setDishVisible(true);
      }, TIMING.switchDelayMs);
    }, TIMING.intervalMs);

    return () => window.clearInterval(interval);
  }, [dishes.length, prefersReducedMotion, TIMING.intervalMs, TIMING.switchDelayMs]);

  return (
    <Box
      sx={(theme) => ({
        py: { xs: 6, sm: 7.5, md: 10 },
        mt: { xs: 0, sm: 2 },
        minHeight: { xs: 'auto', md: 'calc(100vh - 120px)' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: { xs: '0 0 16px 16px', sm: '0 0 24px 24px' },
        boxShadow: '0 18px 60px rgba(16, 24, 40, 0.10)',
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(700px 320px at 10% 0%, rgba(244, 106, 6, 0.16) 0%, rgba(0,0,0,0) 60%),
            radial-gradient(600px 280px at 90% 10%, rgba(252, 169, 0, 0.14) 0%, rgba(0,0,0,0) 55%)`,
          pointerEvents: 'none',
        },
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              gutterBottom
              sx={{
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              Authentic Nigerian food in the UK
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: { xs: 2, md: 3 },
                fontSize: {
                  xs: '1rem',
                  sm: '1.125rem',
                  md: '1.25rem'
                }
              }}
            >
              Bold flavours, authentic recipes — ready for delivery and catering across the UK.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ mb: { xs: 2.5, md: 3 } }}
            >
              <Chip icon={<LocalShippingOutlinedIcon />} label="Free delivery over £30" variant="outlined" />
              <Chip icon={<CreditCardOutlinedIcon />} label="Secure card checkout" variant="outlined" />
              <Chip icon={<StarRoundedIcon />} label="Loved by customers" variant="outlined" />
            </Stack>

            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button 
                arrow 
                component={RouterLink} 
                to="/order"
                fullWidth={false}
              >
                Order Now
              </Button>
              <Button 
                variant="outlined" 
                arrow 
                component={RouterLink} 
                to="/menu"
                fullWidth={false}
              >
                View Menu
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={(theme) => ({
                width: '100%',
                maxWidth: 680,
                minHeight: { xs: 260, sm: 340, md: 460 },
                ml: { md: 'auto' },
                borderRadius: { xs: 3, sm: 4 },
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 24px 70px rgba(16, 24, 40, 0.14)',
                position: 'relative',
                overflow: 'hidden',
              })}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  filter: 'contrast(1.04) saturate(1.05) brightness(0.92)',
                }}
              >
                <Fade in={dishVisible} timeout={TIMING.fadeMs}>
                  <Box
                    component="img"
                    src={dishes[dishIndex]?.image || foodImg}
                    alt=""
                    aria-hidden="true"
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      transform: 'scale(1.06)',
                      willChange: 'transform, opacity',
                      animation:
                        prefersReducedMotion || !dishVisible
                          ? 'none'
                          : `${kenBurns} ${TIMING.kenBurnsMs}ms cubic-bezier(0.2, 0, 0.2, 1) both`,
                    }}
                    onError={(e) => {
                      // Fallback to bundled background image if a public image is missing.
                      // eslint-disable-next-line no-param-reassign
                      e.currentTarget.src = foodImg;
                    }}
                  />
                </Fade>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(16,24,40,0.08) 0%, rgba(16,24,40,0.55) 75%, rgba(16,24,40,0.70) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 14, sm: 18 },
                  right: { xs: 14, sm: 18 },
                  bottom: { xs: 14, sm: 18 },
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.18)',
                  backgroundColor: 'rgba(16,24,40,0.28)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.25, color: 'common.white' }}>
                  Order in minutes
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: 460, color: 'rgba(255,255,255,0.9)' }}>
                  Build your basket from the menu, then pay securely by card at checkout.
                </Typography>

                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', display: 'block', mb: 0.6 }}>
                    Popular today
                  </Typography>
                  <Fade in={dishVisible} timeout={TIMING.fadeMs}>
                    <Box
                      sx={(theme) => ({
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 999,
                        backgroundColor: 'rgba(255, 255, 255, 0.14)',
                        border: '1px solid rgba(255,255,255,0.22)',
                        backdropFilter: 'blur(12px)',
                      })}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          backgroundColor: 'primary.main',
                          boxShadow: '0 0 0 3px rgba(244, 106, 6, 0.18)',
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 900,
                          color: 'common.white',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {dishes[dishIndex]?.name}
                      </Typography>
                    </Box>
                  </Fade>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 