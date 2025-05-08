import React, { useState } from 'react';
import { encodeUrl } from '../api/api';

const ShortenForm = ({ onUrlShortened }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedData, setShortenedData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      setError('Please enter a URL.');
      return;
    }
  
    try {
      new URL(longUrl);
    } catch (e) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return;
    }

    setIsLoading(true);
    setError('');
    setShortenedData(null);
    setCopied(false);

    try {
      const data = await encodeUrl(longUrl);
      setShortenedData(data);
      if (onUrlShortened) {
        onUrlShortened(data);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (shortenedData?.shortUrl) {
      navigator.clipboard.writeText(shortenedData.shortUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          setError('Failed to copy URL to clipboard.');
        });
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Create a Short Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-slate-600 mb-1">
            Enter your long URL:
          </label>
          <input
            type="url"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very/long/url/to/shorten"
            className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {shortenedData && !error && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-md">
          <h3 className="text-lg font-semibold text-green-800">Your Short Link:</h3>
          <div className="flex items-center justify-between mt-2">
            <a
              href={shortenedData.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 break-all font-mono text-sm md:text-base"
            >
              {shortenedData.shortUrl}
            </a>
            <button
              onClick={handleCopyToClipboard}
              className="ml-4 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Original URL: <span className="break-all">{shortenedData.originalUrl}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ShortenForm;