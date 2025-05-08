import React, { useState } from 'react';
import { decodeUrl } from '../api/api';

const DecodeSection = () => {
  const [shortUrlPath, setShortUrlPath] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shortUrlPath.trim()) {
      setError('Please enter a short URL path (e.g., GeAi9K).');
      return;
    }
    setIsLoading(true);
    setError('');
    setOriginalUrl('');

    try {
      // Extract path if full URL is pasted
      let path = shortUrlPath;
      if (shortUrlPath.includes('/')) {
        path = shortUrlPath.substring(shortUrlPath.lastIndexOf('/') + 1);
      }
      const data = await decodeUrl(path);
      setOriginalUrl(data.originalUrl);
    } catch (err) {
      setError(err.message || 'Failed to decode URL.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Decode Short Link</h2>
      <p className="text-sm text-slate-500 mb-4 text-center">
        Programmatically decode a short URL path to its original URL.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="shortUrlPath" className="block text-sm font-medium text-slate-600 mb-1">
            Enter short URL path (e.g., GeAi9K):
          </label>
          <input
            type="text"
            id="shortUrlPath"
            value={shortUrlPath}
            onChange={(e) => setShortUrlPath(e.target.value)}
            placeholder="GeAi9K"
            className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400"
        >
          {isLoading ? 'Decoding...' : 'Decode URL'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {originalUrl && !error && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-md">
          <h3 className="text-lg font-semibold text-blue-800">Original URL:</h3>
          <a 
            href={originalUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:text-indigo-800 break-all font-mono text-sm md:text-base mt-1 block"
          >
            {originalUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default DecodeSection;