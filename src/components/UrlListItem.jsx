// // src/components/UrlListItem.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { formatDate } from '../utils/helpers';
// import { getShortLinkBaseUrl } from '../api/api';



// const UrlListItem = ({ url }) => {
//   // Construct the full short URL for display and linking if backend only provides path
//   // Assuming `url.shortUrl` is already the full URL from the backend.
//   // If not, and you only get `url.shortUrlPath`, you'd construct it:
//   // const fullShortUrl = `${getShortLinkBaseUrl()}/${url.shortUrlPath}`;
//   const fullShortUrl = url.shortUrl; // Use this if backend provides full short URL
//   const shortUrlPath = url.shortUrlPath || url.shortUrl.substring(url.shortUrl.lastIndexOf('/') + 1);


//   return (
//     <tr className="bg-white hover:bg-slate-50">
//       <td className="px-4 py-3 text-sm text-slate-700 break-all max-w-xs">
//         <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline" title={url.originalUrl}>
//             {url.originalUrl.length > 60 ? `${url.originalUrl.substring(0, 57)}...` : url.originalUrl}
//         </a>
//       </td>
//       <td className="px-4 py-3 text-sm text-slate-700">
//         <a href={fullShortUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 hover:underline font-mono">
//           {fullShortUrl}
//         </a>
//       </td>
//       <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
//         {formatDate(url.createdAt)}
//       </td>
//       <td className="px-4 py-3 text-sm text-slate-500 text-center">
//         {url.visits !== undefined ? url.visits : 'N/A'}
//       </td>
//       <td className="px-4 py-3 text-sm text-slate-500 text-center">
//          <Link 
//             to={`/stats/${shortUrlPath}`} 
//             className="text-blue-500 hover:text-blue-700 hover:underline text-xs font-medium py-1 px-2 rounded border border-blue-500 hover:bg-blue-50"
//         >
//             View Stats
//         </Link>
//       </td>
//     </tr>
//   );
// };

// export default UrlListItem;



// src/components/UrlListItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { getShortLinkBaseUrl } from '../api/api';

const UrlListItem = ({ url }) => {
  // Properly construct the full short URL for display and linking
  // Check if we have a full URL or just the path
  let fullShortUrl;
  let shortUrlPath;
  
  if (url.shortUrl && url.shortUrl.includes('://')) {
    // If backend provides full short URL
    fullShortUrl = url.shortUrl;
    shortUrlPath = url.shortUrl.substring(url.shortUrl.lastIndexOf('/') + 1);
  } else if (url.shortUrlPath) {
    // If backend provides only the path
    shortUrlPath = url.shortUrlPath;
    fullShortUrl = `${getShortLinkBaseUrl()}/${shortUrlPath}`;
  } else {
    // Fallback if neither is available
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