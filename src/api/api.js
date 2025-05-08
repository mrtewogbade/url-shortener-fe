const API_BASE_URL = 'http://localhost:3200/v1/api';
const SHORT_URL_BASE = 'http://localhost:3200';

/**
 * @param {string} longUrl
 * @returns {Promise<Object>}
 */
export const encodeUrl = async (longUrl) => {
  try {
    const response = await fetch(`${API_BASE_URL}/url/encode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: longUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to encode URL' }));
      throw new Error(errorData.message || errorData.error || 'Failed to encode URL');
    }

    const data = await response.json();
    
    return {
      shortUrl: `${SHORT_URL_BASE}/${data.data.shortUrl}`,
      originalUrl: data.data.longUrl,
      shortUrlPath: data.data.shortUrl,
      visits: data.data.visits,
      createdAt: data.data.createdAt
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to encode URL');
  }
};

/**

 * @param {string}
 * @returns {Promise<Object>}
 */
export const decodeUrl = async (shortUrlPath) => {
  try {

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
 * 
 * @param {string} urlPath
 * @returns {Promise<Object>}
 */
export const getUrlStats = async (urlPath) => {
  try {
    const response = await fetch(`${API_BASE_URL}/url/statistics/${urlPath}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch stats' }));
      throw new Error(errorData.message || errorData.error || 'Failed to fetch stats');
    }

    const data = await response.json();
    
    return {
      originalUrl: data.data.longUrl,
      shortUrl: `${SHORT_URL_BASE}/${data.data.shortUrl}`,
      shortUrlPath: data.data.shortUrl,
      visits: data.data.visits,
      createdAt: data.data.createdAt,
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
 * @returns {Promise<Array>}
 */
export const listUrls = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/url/all`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to list URLs' }));
      throw new Error(errorData.message || errorData.error || 'Failed to list URLs');
    }

    const data = await response.json();
    
    return data.data.map(url => ({
      originalUrl: url.longUrl,
      shortUrl: `${SHORT_URL_BASE}/${url.shortUrl}`,
      shortUrlPath: url.shortUrl,
      visits: url.visits,
      createdAt: url.createdAt,
      id: url._id || url.urlCode || url.shortUrl
    }));
  } catch (error) {
    throw new Error(error.message || 'Failed to list URLs');
  }
};

/**

 * @param {string} query 
 * @returns {Promise<Array>}
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

 * @returns {string} 
 */
export const getShortLinkBaseUrl = () => {
  return SHORT_URL_BASE;
};