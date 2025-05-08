import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUrlStats } from '../api/api';
import { formatDate } from '../utils/helpers';

const StatsPage = () => {
  const { urlPath } = useParams();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      if (!urlPath) return;
      setIsLoading(true);
      setError('');
      try {
        const data = await getUrlStats(urlPath);
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load stats.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [urlPath]);

  if (isLoading) {
    return <div className="text-center py-10 text-slate-500">Loading statistics for {urlPath}...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="my-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm max-w-md mx-auto">{error}</div>
        <Link to="/list" className="text-indigo-600 hover:text-indigo-800">
            ← Back to URL List
        </Link>
      </div>
    );
  }

  if (!stats) {
    return (
         <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-slate-500">No statistics found for this URL path.</p>
            <Link to="/list" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
                ← Back to URL List
            </Link>
        </div>
    );
  }

  // Creative stats display
  // Assuming stats object from API is like:
  // { originalUrl, shortUrl, createdAt, visits, lastVisited, userAgentCounts, referrerCounts, ... }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-700">Statistics for Short Link</h2>
            <Link to="/list" className="text-sm text-indigo-600 hover:text-indigo-800">
                ← Back to List
            </Link>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500">Short URL</h3>
            <a href={stats.shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-green-600 hover:text-green-800 font-mono break-all">
              {stats.shortUrl}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Original URL</h3>
            <a href={stats.originalUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-indigo-600 hover:text-indigo-800 break-all">
              {stats.originalUrl}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
                <h3 className="text-sm font-medium text-slate-500">Total Visits</h3>
                <p className="text-2xl font-semibold text-slate-700">{stats.visits !== undefined ? stats.visits : 'N/A'}</p>
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-500">Created At</h3>
                <p className="text-md text-slate-700">{formatDate(stats.createdAt)}</p>
            </div>
             <div>
                <h3 className="text-sm font-medium text-slate-500">Last Visited</h3>
                <p className="text-md text-slate-700">{stats.lastVisited ? formatDate(stats.lastVisited) : 'Never'}</p>
            </div>
          </div>

          {/* Example of more creative stats if your backend provides them */}
          {stats.userAgentCounts && Object.keys(stats.userAgentCounts).length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h3 className="text-md font-semibold text-slate-600 mb-2">Visits by Browser (Example)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {Object.entries(stats.userAgentCounts).map(([agent, count]) => (
                  <li key={agent}>{agent}: {count}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;