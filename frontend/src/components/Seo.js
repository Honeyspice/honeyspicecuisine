import React from 'react';

const Seo = ({ title, description, noindex = false }) => {
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const tag = document.querySelector('meta[name="description"]');
      if (tag) {
        tag.setAttribute('content', description);
      }
    }
  }, [title, description]);

  // Pages that exist for people but should not compete in search set this.
  //
  // Without it a thin route still serves the homepage's static head, then the
  // Canonical component in App.js makes it self-canonical at runtime, so Google
  // sees a near-empty page claiming to be its own canonical URL. That is what
  // lands a route in "Duplicate without user-selected canonical". noindex says
  // plainly that the page is not a search result, and follow keeps its outbound
  // links working as navigation.
  //
  // The tag is restored on unmount because a client-side navigation from a
  // noindex page to an indexable one would otherwise carry the directive across.
  React.useEffect(() => {
    if (!noindex) return undefined;
    let tag = document.querySelector('meta[name="robots"]');
    const created = !tag;
    if (created) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'robots');
      document.head.appendChild(tag);
    }
    const previous = tag.getAttribute('content');
    tag.setAttribute('content', 'noindex, follow');
    return () => {
      if (created) {
        tag.remove();
      } else {
        tag.setAttribute('content', previous);
      }
    };
  }, [noindex]);

  return null;
};

export default Seo;
