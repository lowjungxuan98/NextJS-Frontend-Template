import axios, { AxiosInstance } from 'axios';
import authService from './auth';

/**
 * Create an Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

/**
 * Request interceptor to add authorization headers to requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle token refresh on 401 errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the request was cancelled, just reject
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors for token refresh
    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const newTokens = await authService.refreshTokens();
        
        if (newTokens) {
          // Update the authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${newTokens.access.token}`;
          
          // Retry the original request with the new token
          return apiClient(originalRequest);
        } else {
          // If token refresh returned null, redirect to login
          await handleAuthError();
        }
      } catch {
        // If token refresh fails, redirect to login
        await handleAuthError();
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Handle authentication errors by clearing user data and redirecting to login
 */
const handleAuthError = async (): Promise<void> => {
  authService.clearUser();
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export default apiClient; 