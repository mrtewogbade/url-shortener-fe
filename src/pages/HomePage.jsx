// src/pages/HomePage.js
import React from 'react';
import ShortenForm from '../components/ShortenForm';
import DecodeSection from '../components/DecodeSection'; // Added for programmatic decode

const HomePage = () => {
  // This callback could be used to auto-refresh the list page if it's open,
  // or trigger a notification, etc. For now, it's a placeholder.
  const handleUrlShortened = (newUrlData) => {
    console.log('New URL shortened:', newUrlData);
    // Potentially, you could use a global state or context to notify UrlList to refresh.
    // For simplicity, UrlList has its own refresh button.
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ShortenForm onUrlShortened={handleUrlShortened} />
      <DecodeSection /> {/* Add the decode section here */}
    </div>
  );
};

export default HomePage;