

// // src/api/api.js
// const API_BASE_URL = 'http://localhost:3200/v1/api';
// const SHORT_URL_BASE = 'http://localhost:3200'; // Base URL for short links

// export const encodeUrl = async (longUrl) => {
//   const response = await fetch(`${API_BASE_URL}/url/encode`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ longUrl }),
//   });
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: 'Failed to encode URL' }));
//     throw new Error(errorData.message || 'Failed to encode URL');
//   }
//   return response.json();
// };

// export const decodeUrl = async (shortUrlPath) => {
//   // Remove /api/ from the path since it's already in the base URL
//   const response = await fetch(`${API_BASE_URL}/url/decode?shortUrlPath=${encodeURIComponent(shortUrlPath)}`);
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: 'Failed to decode URL' }));
//     throw new Error(errorData.message || 'Failed to decode URL');
//   }
//   return response.json();
// };

// export const getUrlStats = async (urlPath) => {
//   const response = await fetch(`${API_BASE_URL}/url/stats/${urlPath}`);
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: 'Failed to fetch stats' }));
//     throw new Error(errorData.message || 'Failed to fetch stats');
//   }
//   return response.json();
// };

// export const listUrls = async () => {
//   const response = await fetch(`${API_BASE_URL}/url/list`);
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: 'Failed to list URLs' }));
//     throw new Error(errorData.message || 'Failed to list URLs');
//   }
//   return response.json();
// };

// // Function to get the base URL for short links (used for display)
// export const getShortLinkBaseUrl = () => {
//   return SHORT_URL_BASE;
// };



// src/api/api.js
const API_BASE_URL = 'http://localhost:3200/v1/api';
const SHORT_URL_BASE = 'http://localhost:3200'; // Base URL for short links

/**
 * Encodes a long URL into a shortened URL
 * @param {string} longUrl - The original URL to shorten
 * @returns {Promise<Object>} - Promise resolving to the shortened URL data
 */
export const encodeUrl = async (longUrl) => {
  try {
    const response = await fetch(`${API_BASE_URL}/url/encode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Backend expects 'url' instead of 'longUrl'
      body: JSON.stringify({ url: longUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to encode URL' }));
      throw new Error(errorData.message || errorData.error || 'Failed to encode URL');
    }

    const data = await response.json();
    
    // Transform backend response format to match frontend expectations
    return {
      shortUrl: `${SHORT_URL_BASE}/${data.data.shortUrl}`, // Create full URL
      originalUrl: data.data.longUrl,
      shortUrlPath: data.data.shortUrl, // Save path separately for easier access
      visits: data.data.visits,
      createdAt: data.data.createdAt
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to encode URL');
  }
};

/**
 * Decodes a short URL path back to its original URL
 * @param {string} shortUrlPath - The path part of the short URL
 * @returns {Promise<Object>} - Promise resolving to the original URL data
 */
export const decodeUrl = async (shortUrlPath) => {
  try {
    // Backend expects '/decode/:shortUrl' format
    const response = await fetch(`${API_BASE_URL}/url/decode/${shortUrlPath}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to decode URL' }));
      throw new Error(errorData.message || errorData.error || 'Failed to decode URL');
    }

    const data = await response.json();
    
    // Transform backend response format to match frontend expectations
    return {
      originalUrl: data.data.longUrl,
      shortUrl: `${SHORT_URL_BASE}/${data.data.shortUrl}`,
      shortUrlPath: data.data.shortUrl,
      visits: data.data.visits,
      createdAt: data.data.createdAt
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to decode URL');
  }
};

/**
 * Gets statistics for a specific shortened URL
 * @param {string} urlPath - The path part of the short URL
 * @returns {Promise<Object>} - Promise resolving to the URL statistics
 */
export const getUrlStats = async (urlPath) => {
  try {
    const response = await fetch(`${API_BASE_URL}/url/statistics/${urlPath}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch stats' }));
      throw new Error(errorData.message || errorData.error || 'Failed to fetch stats');
    }

    const data = await response.json();
    
    // Transform backend response format to match frontend expectations
    return {
      originalUrl: data.data.longUrl,
      shortUrl: `${SHORT_URL_BASE}/${data.data.shortUrl}`,
      shortUrlPath: data.data.shortUrl,
      visits: data.data.visits,
      createdAt: data.data.createdAt,
      // Add any other stats fields from backend
      lastVisited: data.data.lastVisited || null,
      userAgentCounts: data.data.userAgentCounts || {},
      referrerCounts: data.data.referrerCounts || {}
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch stats');
  }
};

/**
 * Lists all shortened URLs
 * @returns {Promise<Array>} - Promise resolving to an array of URL data
 */
export const listUrls = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/url/all`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to list URLs' }));
      throw new Error(errorData.message || errorData.error || 'Failed to list URLs');
    }

    const data = await response.json();
    
    // Transform and map each URL in the response
    return data.data.map(url => ({
      originalUrl: url.longUrl,
      shortUrl: `${SHORT_URL_BASE}/${url.shortUrl}`,
      shortUrlPath: url.shortUrl,
      visits: url.visits,
      createdAt: url.createdAt,
      id: url._id || url.urlCode || url.shortUrl // Ensure we have a unique identifier
    }));
  } catch (error) {
    throw new Error(error.message || 'Failed to list URLs');
  }
};

/**
 * Search for URLs by query
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Promise resolving to an array of matching URL data
 */
export const searchUrls = async (query) => {
  if (!query || query.length < 3) {
    throw new Error('Search query must be at least 3 characters long');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/url/search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to search URLs' }));
      throw new Error(errorData.message || errorData.error || 'Failed to search URLs');
    }

    const data = await response.json();
    
    // Transform and map each URL in the response
    return data.data.map(url => ({
      originalUrl: url.longUrl,
      shortUrl: `${SHORT_URL_BASE}/${url.shortUrl}`,
      shortUrlPath: url.shortUrl,
      visits: url.visits,
      createdAt: url.createdAt,
      id: url._id || url.urlCode || url.shortUrl
    }));
  } catch (error) {
    throw new Error(error.message || 'Failed to search URLs');
  }
};

/**
 * Get the base URL for short links
 * @returns {string} - The base URL
 */
export const getShortLinkBaseUrl = () => {
  return SHORT_URL_BASE;
};