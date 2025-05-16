import apiClient from './client';
import { 
  RegisterParams, 
  LoginParams, 
  AuthTokens, 
  AuthResponse,
  User
} from './model/auth';

/**
 * Authentication service
 * Handles user authentication, token management and local storage operations
 */
export const authService = {
  //
  // Authentication API methods
  //

  /**
   * Register a new user
   * @param data User registration data
   * @returns Authentication response with user data and tokens
   */
  register: async (data: RegisterParams): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    const authResponse = response.data;
    authService.storeUser(authResponse);
    return authResponse;
  },

  /**
   * Log in an existing user
   * @param data User login credentials
   * @returns Authentication response with user data and tokens
   */
  login: async (data: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    const authResponse = response.data;
    authService.storeUser(authResponse);
    return authResponse;
  },

  /**
   * Log out the current user
   */
  logout: async (): Promise<void> => {
    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      try {
        await apiClient.post('/auth/logout', { refreshToken });
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
    authService.clearUser();
  },

  /**
   * Refresh authentication tokens
   * @returns New authentication tokens or null if refresh fails
   */
  refreshTokens: async (): Promise<AuthTokens | null> => {
    const refreshToken = authService.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await apiClient.post('/auth/refresh-tokens', { refreshToken });
      const newTokens: AuthTokens = response.data;
      authService.updateTokens(newTokens);
      return newTokens;
    } catch (error) {
      console.error('Token refresh failed', error);
      authService.clearUser();
      return null;
    }
  },

  /**
   * Send password reset email
   * @param email User's email address
   */
  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reset user password with token
   * @param token Reset password token
   * @param password New password
   */
  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post(`/auth/reset-password?token=${token}`, { password });
  },

  /**
   * Send email verification
   */
  sendVerificationEmail: async (): Promise<void> => {
    await apiClient.post('/auth/send-verification-email');
  },

  /**
   * Verify email with token
   * @param token Email verification token
   */
  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.post(`/auth/verify-email?token=${token}`);
  },

  //
  // Token management methods
  //

  /**
   * Update authentication tokens in storage
   * @param newTokens New authentication tokens
   */
  updateTokens: (newTokens: AuthTokens): void => {
    if (typeof window === 'undefined') return;
    
    const userData = authService.getUser();
    if (!userData) return;
    
    const updatedUserData = {
      ...userData,
      tokens: newTokens
    };
    localStorage.setItem('auth', JSON.stringify(updatedUserData));
  },

  /**
   * Check if a token is expired
   * @param expiryDateString Token expiry date string
   * @returns True if token is expired
   */
  isTokenExpired: (expiryDateString: string): boolean => {
    const expiry = new Date(expiryDateString).getTime();
    const now = new Date().getTime();
    // Consider token expired 30 seconds before actual expiry to account for network latency
    return now >= expiry - 30000;
  },

  /**
   * Get the current access token if valid
   * @returns Access token or null if not available or expired
   */
  getAccessToken: (): string | null => {
    const userData = authService.getUser();
    if (!userData?.tokens?.access) return null;
    
    const { access } = userData.tokens;
    
    if (authService.isTokenExpired(access.expires)) {
      return null;
    }
    
    return access.token;
  },

  /**
   * Get the current refresh token
   * @returns Refresh token or null if not available
   */
  getRefreshToken: (): string | null => {
    const userData = authService.getUser();
    return userData?.tokens?.refresh?.token || null;
  },

  //
  // Storage management methods
  //

  /**
   * Store user data in local storage
   * @param auth Authentication response with user and tokens
   */
  storeUser: (auth: AuthResponse): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  },

  /**
   * Get user data from local storage
   * @returns User data or undefined if not found
   */
  getUser: (): AuthResponse | undefined => {
    if (typeof window === 'undefined') return undefined;
    
    const userStr = localStorage.getItem('auth');
    if (!userStr) return undefined;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user data', e);
      return undefined;
    }
  },

  /**
   * Clear user data from local storage
   */
  clearUser: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
  }
};

export default authService; 