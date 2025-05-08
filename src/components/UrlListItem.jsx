import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { getShortLinkBaseUrl } from '../api/api';

const UrlListItem = ({ url }) => {
  let fullShortUrl;
  let shortUrlPath;
  
  if (url.shortUrl && url.shortUrl.includes('://')) {
    fullShortUrl = url.shortUrl;
    shortUrlPath = url.shortUrl.substring(url.shortUrl.lastIndexOf('/') + 1);
  } else if (url.shortUrlPath) {
    shortUrlPath = url.shortUrlPath;
    fullShortUrl = `${getShortLinkBaseUrl()}/${shortUrlPath}`;
  } else {
    shortUrlPath = '';
    fullShortUrl = '#';
  }

  return (
    <tr className="bg-white hover:bg-slate-50">
      <td className="px-4 py-3 text-sm text-slate-700 break-all max-w-xs">
        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline" title={url.originalUrl}>
            {url.originalUrl.length > 60 ? `${url.originalUrl.substring(0, 57)}...` : url.originalUrl}
        </a>
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <a href={fullShortUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 hover:underline font-mono">
          {fullShortUrl}
        </a>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
        {formatDate(url.createdAt)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 text-center">
        {url.visits !== undefined ? url.visits : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 text-center">
         <Link 
            to={`/stats/${shortUrlPath}`} 
            className="text-blue-500 hover:text-blue-700 hover:underline text-xs font-medium py-1 px-2 rounded border border-blue-500 hover:bg-blue-50"
        >
            View Stats
        </Link>
      </td>
    </tr>
  );
};

export default UrlListItem;