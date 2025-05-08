import React, { useState, useEffect, useMemo } from 'react';
import { listUrls } from '../api/api';
import UrlListItem from './UrlListItem';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllUrls = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await listUrls();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUrls(data);
    } catch (err) {
      setError(err.message || 'Failed to load URLs.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllUrls();
  }, []);

  const filteredUrls = useMemo(() => {
    if (!searchTerm || searchTerm.length < 3) {
      return urls;
    }
    return urls.filter(url =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [urls, searchTerm]);

  if (isLoading) {
    return <div className="text-center py-10 text-slate-500">Loading URLs...</div>;
  }

  if (error) {
    return <div className="my-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">{error}</div>;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">All Shortened URLs</h2>
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search long URLs (min 3 chars)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {filteredUrls.length === 0 && !isLoading && (
        <p className="text-slate-500 text-center py-6">
          {searchTerm && searchTerm.length >=3 ? 'No URLs found matching your search.' : 'No URLs have been shortened yet.'}
        </p>
      )}

      {filteredUrls.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Visits
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredUrls.map((url, index) => (
                <UrlListItem key={url.shortUrlPath || url.id || index} url={url} />
              ))}
            </tbody>
          </table>
        </div>
      )}
       <button
          onClick={fetchAllUrls}
          className="mt-6 flex items-center text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
          disabled={isLoading}
        >
          <svg className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2M15 15h-4.582"></path></svg>
          Refresh List
        </button>
    </div>
  );
};

export default UrlList;