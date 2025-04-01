import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000 
});

const requestCache = {};
const CACHE_DURATION = 10000; 

if (import.meta.env.DEV) {
  apiClient.interceptors.request.use(request => {
    console.log('API Request:', request.method?.toUpperCase(), request.url);
    if (request.data && !(request.data instanceof FormData)) {
      console.log('Request data:', request.data);
    } else if (request.data instanceof FormData) {
      console.log('Request contains FormData');
    }
    return request;
  });
  
  apiClient.interceptors.response.use(
    response => {
      console.log('API Response:', response.status, response.config.method?.toUpperCase(), response.config.url);
      return response;
    },
    error => {
      console.error('API Error:', 
        error.response?.status, 
        error.config?.method?.toUpperCase(), 
        error.config?.url,
        error.response?.data
      );
      if (error.response?.data) {
        console.error('Error details:', error.response.data);
      }
      if (error.message) {
        console.error('Error message:', error.message);
      }
      return Promise.reject(error);
    }
  );
}

const clearRelatedCache = (config) => {
  if (config.method !== 'get') {
    const url = config.url;
    // Clear all cache entries that start with the same base URL
    // This ensures after a PUT/POST/DELETE, subsequent GETs get fresh data
    Object.keys(requestCache).forEach(cachedUrl => {
      if (cachedUrl === url || cachedUrl.startsWith(`${url}/`) || url.startsWith(`${cachedUrl}/`)) {
        console.log('Clearing cache for related URL:', cachedUrl);
        delete requestCache[cachedUrl];
      }
    });
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Ensure we don't set Content-Type for FormData (browser will set correct boundary)
    if (config.data instanceof FormData) {
      // Let the browser set the correct Content-Type with boundary
      delete config.headers['Content-Type'];
      console.log('FormData detected, removing Content-Type header to allow boundary setting');
    }
    
    // Clear cache for related endpoints on non-GET requests
    clearRelatedCache(config);
    
    // Only cache GET requests
    if (config.method === 'get') {
      const url = config.url;
      
      // Check if we have a cached response that's still valid
      if (requestCache[url]) {
        const cachedData = requestCache[url];
        const now = Date.now();
        
        // If the cache is still fresh, use it
        if (now - cachedData.timestamp < CACHE_DURATION) {
          console.log('Using cached response for:', url);
          // Clone the cached response and return it
          return Promise.resolve({
            ...cachedData.response,
            cached: true,
            config
          });
        } else {
          // Cache expired, remove it
          delete requestCache[url];
        }
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // If this is already a cached response we returned earlier, just return it
    if (response.cached) {
      return response;
    }
    
    // Cache GET responses
    if (response.config.method === 'get') {
      const url = response.config.url;
      requestCache[url] = {
        response: { ...response },
        timestamp: Date.now()
      };
    }
    
    return response;
  },
  async (error) => {
    // Handle token refresh or redirect to login on 401
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
