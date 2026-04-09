import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Slider, Divider, TextField, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Seo from '../components/Seo';
import { recommendBundle, INDIVIDUAL_MEAL } from '../utils/bundleRecommender';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function distLabel(km) {
  if (km < 0.1) return 'Less than 100m';
  if (km < 1) return `${Math.round(km * 1000)}m away`;
  return `${km.toFixed(1)} km away`;
}

// Fetch named parks / picnic sites near coords using OpenStreetMap Overpass API
async function fetchNearbyParks(lat, lng) {
  const radius = 8000; // 8 km
  const query = `[out:json][timeout:20];
(
  node["leisure"~"^(park|picnic_site|garden|nature_reserve)$"]["name"](around:${radius},${lat},${lng});
  way["leisure"~"^(park|picnic_site|garden|nature_reserve)$"]["name"](around:${radius},${lat},${lng});
);
out center 12;`;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: query,
  });
  const data = await res.json();

  const seen = new Set();
  return data.elements
    .filter((el) => el.tags?.name && !seen.has(el.tags.name) && seen.add(el.tags.name))
    .map((el) => {
      const spotLat = el.lat ?? el.center?.lat;
      const spotLng = el.lon ?? el.center?.lon;
      const km = haversineKm(lat, lng, spotLat, spotLng);
      const leisure = el.tags.leisure || 'park';
      const tagLabels = [
        leisure === 'picnic_site' ? 'Picnic site' : leisure === 'nature_reserve' ? 'Nature reserve' : 'Park',
        el.tags.access === 'yes' || !el.tags.access ? 'Free entry' : null,
        el.tags['wheelchair'] === 'yes' ? 'Accessible' : null,
      ].filter(Boolean);

      return {
        name: el.tags.name,
        location: el.tags['addr:city'] || el.tags['addr:town'] || el.tags['addr:suburb'] || '',
        coords: { lat: spotLat, lng: spotLng },
        distanceKm: km,
        tags: tagLabels.length ? tagLabels : ['Open space'],
        mapsQuery: `${el.tags.name}`,
        wikiTitle: el.tags.name.replace(/ /g, '_'),
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 6);
}

// ─── Preferences ──────────────────────────────────────────────────────────────

const PREFERENCES = [
  { key: 'light', label: 'Light', sub: 'Snacks & small bites' },
  { key: 'filling', label: 'Filling', sub: 'Soups, rice & swallows' },
  { key: 'mixed', label: 'Mixed', sub: 'A bit of everything' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanPicnic() {
  const [people, setPeople] = useState(4);
  const [budget, setBudget] = useState(50);
  const [preference, setPreference] = useState('mixed');
  const [result, setResult] = useState(null);

  // Location state
  const [postcode, setPostcode] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Dynamic nearby spots
  const [nearbySpots, setNearbySpots] = useState(null); // null = not searched yet
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [spotsError, setSpotsError] = useState('');

  // Wikipedia images keyed by spot name
  const [spotImages, setSpotImages] = useState({});

  // Fetch Wikipedia images for whatever spots are currently showing
  const currentSpots = nearbySpots;
  useEffect(() => {
    if (!currentSpots) return;
    currentSpots.forEach((spot) => {
      if (spotImages[spot.name] !== undefined) return; // already tried
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(spot.wikiTitle)}`)
        .then((r) => r.json())
        .then((data) => {
          const src = data?.thumbnail?.source || data?.originalimage?.source || null;
          setSpotImages((prev) => ({ ...prev, [spot.name]: src }));
        })
        .catch(() => setSpotImages((prev) => ({ ...prev, [spot.name]: null })));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSpots]);

  // After coords are set, fetch nearby parks
  const loadNearbySpots = async (lat, lng) => {
    setSpotsLoading(true);
    setSpotsError('');
    try {
      const spots = await fetchNearbyParks(lat, lng);
      if (spots.length === 0) {
        setSpotsError('No parks found nearby. Try a different postcode or increase the search area.');
        setNearbySpots([]);
      } else {
        setNearbySpots(spots);
      }
    } catch {
      setSpotsError('Could not load nearby parks. Please check your connection.');
    }
    setSpotsLoading(false);
  };

  // Use my location
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setLocationLoading(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
        setLocationLabel('your location');
        setLocationLoading(false);
        loadNearbySpots(coords.lat, coords.lng);
      },
      () => {
        setLocationError('Could not get your location. Please try entering a postcode.');
        setLocationLoading(false);
      }
    );
  };

  // Postcode search via Nominatim (OpenStreetMap, free, no API key)
  const handlePostcodeSearch = async () => {
    const q = postcode.trim();
    if (!q) return;
    setLocationLoading(true);
    setLocationError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ', UK')}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setUserCoords(coords);
        setLocationLabel(q.toUpperCase());
        loadNearbySpots(coords.lat, coords.lng);
      } else {
        setLocationError('Postcode not found. Please try again.');
      }
    } catch {
      setLocationError('Search failed. Please check your connection.');
    }
    setLocationLoading(false);
  };

  const handlePlan = () => {
    const rec = recommendBundle(people, budget);
    setResult(rec);
    setTimeout(() => {
      const el = document.getElementById('picnic-result');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const display = result
    ? result.type === 'individual'
      ? { ...INDIVIDUAL_MEAL, price: result.totalCost }
      : result.bundle
    : null;

  return (
    <>
      <Seo
        title="Plan a Picnic | HoneySpice Cuisine"
        description="Plan your perfect picnic in seconds. Tell us how many people you're feeding and your budget — we'll suggest the best meal options and nearby parks for you."
      />

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '42vh', md: '50vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src="/images/barbecue.jpg"
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 55%',
            filter: 'brightness(0.38) saturate(1.1)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
          >
            Outdoor dining
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: '#fff',
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
              letterSpacing: '-0.02em',
              mt: 1,
              mb: 1.5,
              lineHeight: 1.1,
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
            }}
          >
            Plan a Picnic
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              maxWidth: 480,
              mx: 'auto',
              lineHeight: 1.75,
            }}
          >
            Tell us your group size and budget, then find parks near you — we'll suggest the perfect Nigerian spread.
          </Typography>
        </Box>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'start',
          }}
        >
          {/* ── Form ──────────────────────────────────────────────────────── */}
          <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', p: { xs: 3, md: 4 } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#1a1a1a', mb: 3.5 }}>
              Your picnic details
            </Typography>

            {/* Number of people */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Number of people
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {[
                  { label: '−', action: () => setPeople((p) => Math.max(1, p - 1)) },
                  null,
                  { label: '+', action: () => setPeople((p) => Math.min(20, p + 1)) },
                ].map((btn, i) =>
                  btn ? (
                    <Box
                      key={btn.label}
                      onClick={btn.action}
                      sx={{
                        width: 38, height: 38,
                        border: '2px solid #E5E7EB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontWeight: 700, fontSize: '1.15rem', color: '#374151',
                        userSelect: 'none', transition: 'all 0.2s',
                        '&:hover': { borderColor: '#F46A06', color: '#F46A06' },
                      }}
                    >
                      {btn.label}
                    </Box>
                  ) : (
                    <Typography key="count" sx={{ fontWeight: 800, fontSize: '1.6rem', color: '#1a1a1a', minWidth: 36, textAlign: 'center' }}>
                      {people}
                    </Typography>
                  )
                )}
                <Typography sx={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                  {people === 1 ? 'person' : 'people'}
                </Typography>
              </Box>
            </Box>

            {/* Budget */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Total budget</Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#F46A06' }}>£{budget}</Typography>
              </Box>
              <Slider
                value={budget} onChange={(_, v) => setBudget(v)} min={10} max={200} step={5}
                sx={{ color: '#F46A06', '& .MuiSlider-thumb': { width: 20, height: 20 }, '& .MuiSlider-rail': { bgcolor: '#E5E7EB' } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>£10</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>£200</Typography>
              </Box>
            </Box>

            {/* Food preference */}
            <Box sx={{ mb: 4.5 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Food preference
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {PREFERENCES.map((p) => {
                  const active = preference === p.key;
                  return (
                    <Box
                      key={p.key}
                      onClick={() => setPreference(p.key)}
                      sx={{
                        border: '2px solid', borderColor: active ? '#F46A06' : '#E5E7EB',
                        bgcolor: active ? '#FFF7F0' : '#fff',
                        px: 2.5, py: 1.5, cursor: 'pointer',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.2s', '&:hover': { borderColor: '#F46A06' },
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: active ? 700 : 600, fontSize: '0.9rem', color: active ? '#F46A06' : '#1a1a1a' }}>
                          {p.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF', mt: 0.25 }}>{p.sub}</Typography>
                      </Box>
                      {active && (
                        <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: '#F46A06', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>
                          ✓
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box
              onClick={handlePlan}
              sx={{
                display: 'block', width: '100%', py: 1.8,
                bgcolor: '#F46A06', color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center',
                cursor: 'pointer', border: '2px solid #F46A06', transition: 'background 0.2s',
                '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
              }}
            >
              Plan My Picnic
            </Box>
          </Box>

          {/* ── Result ────────────────────────────────────────────────────── */}
          <Box id="picnic-result">
            {!result ? (
              <Box
                sx={{
                  border: '2px dashed #E5E7EB', p: { xs: 4, md: 6 }, textAlign: 'center',
                  bgcolor: '#FAFAFA', minHeight: 320,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                }}
              >
                <Box sx={{ fontSize: '2.5rem' }}>🧺</Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#374151' }}>
                  Your bundle will appear here
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF', maxWidth: 260 }}>
                  Fill in your details and tap "Plan My Picnic".
                </Typography>
              </Box>
            ) : (
              <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', overflow: 'hidden' }}>
                <Box sx={{ width: '100%', height: { xs: 190, md: 230 }, overflow: 'hidden', position: 'relative' }}>
                  <Box component="img" src={display.image} alt={display.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <Box sx={{ position: 'absolute', top: 14, left: 14, bgcolor: '#F46A06', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.5, py: 0.5 }}>
                    {display.tag}
                  </Box>
                </Box>
                <Box sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontSize: '0.78rem', color: '#F46A06', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', mb: 0.5 }}>
                    Recommended bundle
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.55rem' }, color: '#1a1a1a', lineHeight: 1.2 }}>
                      {display.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#F46A06', ml: 2, whiteSpace: 'nowrap' }}>
                      £{display.price}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, mb: 3 }}>{display.desc}</Typography>

                  <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#374151', mb: 1.5 }}>
                    What's included
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 1 }}>
                    {display.items.map((item) => (
                      <Box component="li" key={item} sx={{ fontSize: '0.9rem', color: '#374151', lineHeight: 2 }}>{item}</Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#FAF6F0', px: 2.5, py: 1.5, mt: 2, mb: result.budgetNote ? 2.5 : 3 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Total cost</Typography>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#F46A06' }}>£{display.price}</Typography>
                  </Box>

                  {result.budgetNote && (
                    <Box sx={{ bgcolor: '#FFF7ED', border: '1px solid #FED7AA', px: 2, py: 1.5, mb: 3 }}>
                      <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#92400E' }}>💰 {result.budgetNote}</Typography>
                    </Box>
                  )}

                  <Box component={RouterLink} to="/reservation" sx={{ textDecoration: 'none', display: 'block', width: '100%', py: 1.8, bgcolor: '#F46A06', color: '#fff', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', border: '2px solid #F46A06', transition: 'background 0.2s', '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' }, mb: 1.5 }}>
                    Order Picnic Bundle
                  </Box>
                  <Box component="a" href="https://wa.me/447721629566" target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', display: 'block', width: '100%', py: 1.6, border: '2px solid #1a1a1a', color: '#1a1a1a', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', transition: 'background 0.2s, color 0.2s', '&:hover': { bgcolor: '#1a1a1a', color: '#fff' } }}>
                    Chat on WhatsApp
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* ── Find Parks Near You ──────────────────────────────────────────── */}
        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          <Divider sx={{ mb: { xs: 8, md: 10 } }} />

          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
            <Typography variant="overline" sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}>
              Find your spot
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, letterSpacing: '-0.02em', color: '#1a1a1a' }}>
              Parks Near You
            </Typography>
            <Typography sx={{ color: '#666', mt: 1.5, maxWidth: 500, mx: 'auto', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Enter your postcode or tap "Use my location" — we'll find real parks and green spaces within 8 km of you.
            </Typography>
          </Box>

          {/* ── Location finder ─────────────────────────────────────────── */}
          <Box
            sx={{
              border: '1px solid #E5E7EB', bgcolor: '#fff', p: { xs: 3, md: 4 }, mb: { xs: 5, md: 6 },
              display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'flex-end' }, gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 1 }}>
                Enter your postcode
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostcodeSearch()}
                  placeholder="e.g. FK1 1AA or G1 1AA"
                  size="small"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#E5E7EB' },
                      '&:hover fieldset': { borderColor: '#F46A06' },
                      '&.Mui-focused fieldset': { borderColor: '#F46A06' },
                    },
                  }}
                />
                <Box
                  onClick={handlePostcodeSearch}
                  sx={{
                    px: 2, height: 40, bgcolor: '#1a1a1a', color: '#fff',
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700,
                    letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0,
                    transition: 'background 0.2s', '&:hover': { bgcolor: '#333' },
                  }}
                >
                  {locationLoading ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : <SearchIcon sx={{ fontSize: 16 }} />}
                  Search
                </Box>
              </Box>
            </Box>

            <Typography sx={{ color: '#9CA3AF', fontSize: '0.8rem', alignSelf: 'center', flexShrink: 0 }}>or</Typography>

            <Box
              onClick={handleUseLocation}
              sx={{
                px: 2.5, height: 40, border: '2px solid #F46A06', color: '#F46A06',
                display: 'flex', alignItems: 'center', gap: 1,
                cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700,
                letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'all 0.2s', '&:hover': { bgcolor: '#FFF7F0' },
              }}
            >
              {locationLoading ? <CircularProgress size={14} sx={{ color: '#F46A06' }} /> : <MyLocationIcon sx={{ fontSize: 16 }} />}
              Use my location
            </Box>
          </Box>

          {/* Status messages */}
          {locationError && (
            <Box sx={{ mb: 4, px: 2.5, py: 1.25, bgcolor: '#FEF2F2', border: '1px solid #FECACA' }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#991B1B' }}>{locationError}</Typography>
            </Box>
          )}
          {userCoords && !locationError && nearbySpots && nearbySpots.length > 0 && (
            <Box sx={{ mb: 4, px: 2.5, py: 1.25, bgcolor: '#ECFDF5', border: '1px solid #6EE7B7', display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.85rem', color: '#065F46', fontWeight: 600 }}>
                {nearbySpots.length} parks found near {locationLabel} · sorted by distance
              </Typography>
            </Box>
          )}
          {spotsError && (
            <Box sx={{ mb: 4, px: 2.5, py: 1.25, bgcolor: '#FEF2F2', border: '1px solid #FECACA' }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#991B1B' }}>{spotsError}</Typography>
            </Box>
          )}

          {/* Loading */}
          {spotsLoading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#F46A06' }} />
              <Typography sx={{ mt: 2, fontSize: '0.9rem', color: '#666' }}>Finding parks near you…</Typography>
            </Box>
          )}

          {/* ── Spot cards ──────────────────────────────────────────────── */}
          {!spotsLoading && nearbySpots && nearbySpots.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: { xs: 2.5, md: 3 },
              }}
            >
              {nearbySpots.map((spot) => {
                const imgSrc = spotImages[spot.name];
                return (
                  <Box
                    key={spot.name}
                    sx={{
                      border: '1px solid #E5E7EB', bgcolor: '#fff', overflow: 'hidden',
                      transition: 'box-shadow 0.25s', '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.08)' },
                      display: 'flex', flexDirection: 'column',
                    }}
                  >
                    {/* Photo */}
                    <Box sx={{ position: 'relative', width: '100%', height: 180, overflow: 'hidden', bgcolor: '#E5F0E8' }}>
                      {imgSrc ? (
                        <Box component="img" src={imgSrc} alt={spot.name} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem' }}>
                          🌳
                        </Box>
                      )}
                      {/* Distance badge */}
                      <Box
                        sx={{
                          position: 'absolute', top: 10, right: 10,
                          bgcolor: '#F46A06', color: '#fff',
                          fontSize: '0.75rem', fontWeight: 800,
                          px: 1.5, py: 0.5, letterSpacing: '0.02em',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                      >
                        📍 {distLabel(spot.distanceKm)}
                      </Box>
                    </Box>

                    <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1a1a1a', mb: 0.5 }}>
                        {spot.name}
                      </Typography>
                      {spot.location && (
                        <Typography sx={{ fontSize: '0.78rem', color: '#F46A06', fontWeight: 600, mb: 1.25 }}>
                          {spot.location}
                        </Typography>
                      )}

                      {/* Tags */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2, flex: 1, alignContent: 'flex-start' }}>
                        {spot.tags.map((tag) => (
                          <Box key={tag} sx={{ px: 1.5, py: 0.4, bgcolor: '#F3F4F6', color: '#374151', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.03em' }}>
                            {tag}
                          </Box>
                        ))}
                      </Box>

                      {/* Directions */}
                      <Box
                        component="a"
                        href={mapsUrl(spot.mapsQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0.75,
                          fontSize: '0.8rem', fontWeight: 700, color: '#1a1a1a',
                          letterSpacing: '0.05em', textTransform: 'uppercase',
                          borderTop: '1px solid #F3F4F6', pt: 2,
                          transition: 'color 0.2s', '&:hover': { color: '#F46A06' },
                        }}
                      >
                        <DirectionsIcon sx={{ fontSize: 16 }} />
                        Get Directions
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Empty state before any search */}
          {!spotsLoading && !nearbySpots && (
            <Box sx={{ border: '2px dashed #E5E7EB', p: { xs: 5, md: 8 }, textAlign: 'center', bgcolor: '#FAFAFA' }}>
              <Box sx={{ fontSize: '2.5rem', mb: 2 }}>📍</Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#374151', mb: 1 }}>
                Enter your postcode to find parks near you
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF', maxWidth: 300, mx: 'auto' }}>
                Works anywhere in the UK — not just Stirling.
              </Typography>
            </Box>
          )}

          {/* Bottom CTA */}
          <Box sx={{ textAlign: 'center', mt: { xs: 7, md: 9 } }}>
            <Typography sx={{ color: '#666', fontSize: '0.95rem', mb: 3 }}>
              Found your spot? Order your bundle and we'll have it ready.
            </Typography>
            <Box
              component={RouterLink}
              to="/reservation"
              sx={{
                textDecoration: 'none', display: 'inline-block',
                px: 5, py: 1.8, bgcolor: '#F46A06', color: '#fff',
                fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                border: '2px solid #F46A06', transition: 'background 0.2s',
                '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
              }}
            >
              Order Picnic Bundle
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
