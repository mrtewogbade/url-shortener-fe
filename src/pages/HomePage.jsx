import React from 'react';
import ShortenForm from '../components/ShortenForm';
import DecodeSection from '../components/DecodeSection';

const HomePage = () => {
  const handleUrlShortened = (newUrlData) => {
    console.log('New URL shortened:', newUrlData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ShortenForm onUrlShortened={handleUrlShortened} />
      <DecodeSection /> {}
    </div>
  );
};

export default HomePage;