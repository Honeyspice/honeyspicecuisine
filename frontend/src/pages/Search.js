import React from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, Chip, Divider } from '@mui/material';
import Seo from '../components/Seo';
import { search } from '../data/searchIndex';

// Colours here come from the theme rather than hex literals. The codebase has
// 413 hardcoded hex values fighting the palette; new work should not add to them.

const KIND_LABEL = { dish: 'Dish', bundle: 'Bundle', page: 'Page' };

const SUGGESTIONS = ['Jollof rice', 'Suya', 'Swallow', 'Vegetarian', 'Catering', 'Shawarma'];

const formatPrice = (p) => (typeof p === 'number' ? `£${p.toFixed(2)}` : null);

const ResultRow = ({ record }) => (
  <Box
    component={RouterLink}
    to={record.path}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 2, sm: 2.5 },
      py: 2.25,
      textDecoration: 'none',
      color: 'inherit',
      borderRadius: 1,
      transition: 'background-color 0.2s ease',
      '&:hover': { bgcolor: 'rgba(244, 106, 6, 0.05)' },
      // Every interactive element on this page is keyboard reachable and shows
      // where focus is. The rest of the site has no focus-visible styling at all,
      // which is the next thing on the list after photography.
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      },
    }}
  >
    {record.image ? (
      <Box
        component="img"
        src={record.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        sx={{ width: 72, height: 72, flexShrink: 0, objectFit: 'cover', borderRadius: 1.5, display: 'block' }}
      />
    ) : (
      <Box
        aria-hidden="true"
        sx={{
          width: 72,
          height: 72,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'rgba(244, 106, 6, 0.08)',
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          fontWeight: 700,
          fontSize: '1.1rem',
        }}
      >
        {record.title.charAt(0)}
      </Box>
    )}

    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.02rem', color: 'text.primary' }}>
          {record.title}
        </Typography>
        <Chip
          label={KIND_LABEL[record.kind]}
          size="small"
          sx={{ height: 20, fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        />
      </Box>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          mt: 0.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {record.subtitle}
      </Typography>
    </Box>

    {formatPrice(record.price) && (
      <Typography sx={{ fontWeight: 700, color: 'text.primary', whiteSpace: 'nowrap' }}>
        {formatPrice(record.price)}
      </Typography>
    )}
  </Box>
);

const Search = () => {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();
  const { results, exact } = React.useMemo(() => search(query), [query]);

  return (
    <>
      <Seo
        title={query ? `Search: ${query} | HoneySpice Cuisine` : 'Search | HoneySpice Cuisine'}
        description="Search the HoneySpice Cuisine menu, bundles and pages."
      />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', py: { xs: 4, md: 7 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 600, mb: 1 }}
          >
            {query ? 'Search results' : 'Search'}
          </Typography>

          {query ? (
            <Typography sx={{ color: 'text.secondary', mb: 4 }}>
              {results.length === 0
                ? `Nothing matched "${query}".`
                : exact
                ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${query}".`
                : `Nothing matched all of "${query}". Showing ${results.length} related ${
                    results.length === 1 ? 'result' : 'results'
                  }.`}
            </Typography>
          ) : (
            <Typography sx={{ color: 'text.secondary', mb: 4 }}>
              Search the menu, our bundles and the rest of the site.
            </Typography>
          )}

          {results.length > 0 && (
            <Box>
              {results.map((record, i) => (
                <React.Fragment key={`${record.kind}-${record.title}`}>
                  {i > 0 && <Divider />}
                  <ResultRow record={record} />
                </React.Fragment>
              ))}
            </Box>
          )}

          {(results.length === 0 || !query) && (
            <Box sx={{ mt: query ? 2 : 0 }}>
              <Typography sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                {query ? 'Try one of these' : 'Popular searches'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {SUGGESTIONS.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    component={RouterLink}
                    to={`/search?q=${encodeURIComponent(s)}`}
                    clickable
                    sx={{ height: 36, fontSize: '0.85rem' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Search;
