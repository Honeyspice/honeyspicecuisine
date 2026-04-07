import React from 'react';
import { Link } from 'react-router-dom';

export default function SideTabs() {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {/* OUR MENU tab */}
      <Link
        to="/menu"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          background: '#1a1a1a',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '24px 13px',
          minHeight: 140,
          transition: 'padding 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#F46A06'; e.currentTarget.style.padding = '18px 13px'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.padding = '24px 13px'; }}
      >
        Our Menu
      </Link>

      {/* BOOK NOW tab */}
      <Link
        to="/reservation"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          background: '#4a4a4a',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '24px 13px',
          minHeight: 140,
          transition: 'padding 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#F46A06'; e.currentTarget.style.padding = '18px 13px'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#4a4a4a'; e.currentTarget.style.padding = '24px 13px'; }}
      >
        Book Now
      </Link>
    </div>
  );
}
