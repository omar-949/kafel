// API Service for Kafel Platform

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'حدث خطأ في الاتصال بالخادم');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Candidates API
 */
export const candidatesAPI = {
  /**
   * Get list of candidates with filters
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/candidates${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  /**
   * Get single candidate by ID
   * @param {number} id - Candidate ID
   * @returns {Promise}
   */
  getById: async (id) => {
    return apiRequest(`/candidates/${id}`);
  },

  /**
   * Get list of countries with candidate counts
   * @returns {Promise}
   */
  getCountries: async () => {
    return apiRequest('/candidates/countries');
  },
};

/**
 * News API
 */
export const newsAPI = {
  /**
   * Get list of news articles
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/news${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  /**
   * Get single news article by ID
   * @param {number} id - News ID
   * @returns {Promise}
   */
  getById: async (id) => {
    return apiRequest(`/news/${id}`);
  },

  /**
   * Get news categories
   * @returns {Promise}
   */
  getCategories: async () => {
    return apiRequest('/news/categories');
  },
};

/**
 * Fetch every page of a paginated endpoint and return a flat array.
 * Stops as soon as the API signals there is no next page.
 */
async function fetchAllPages(endpoint) {
  const items = [];
  const pageSize = 50;
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const query = `?page=${page}&limit=${pageSize}`;
    const response = await apiRequest(`${endpoint}${query}`);

    if (response?.success && response.data) {
      const listKey = Object.keys(response.data).find(
        (k) => Array.isArray(response.data[k]) && k !== 'pagination'
      );
      const list = listKey ? response.data[listKey] : [];
      items.push(...list);

      const pagination = response.data.pagination;
      hasNext = pagination ? Boolean(pagination.has_next) : false;
      page += 1;

      if (!list.length) break;
      if (page > 25) break;
    } else {
      hasNext = false;
    }
  }

  return items;
}

/**
 * Skills API
 */
export const skillsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    const queryString = queryParams.toString();
    return apiRequest(`/skills${queryString ? `?${queryString}` : ''}`);
  },
  getAllFlat: () => fetchAllPages('/skills'),
};

/**
 * Languages API
 */
export const languagesAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    const queryString = queryParams.toString();
    return apiRequest(`/languages${queryString ? `?${queryString}` : ''}`);
  },
  getAllFlat: () => fetchAllPages('/languages'),
};

export default {
  candidates: candidatesAPI,
  news: newsAPI,
  skills: skillsAPI,
  languages: languagesAPI,
};
