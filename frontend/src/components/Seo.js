import React from 'react';

const Seo = ({ title, description }) => {
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

  return null;
};

export default Seo;

