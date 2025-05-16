import apiClient from './client';
import { 
  User, 
  CreateUserParams, 
  UpdateUserParams, 
  GetUsersParams,
  UsersPaginatedResponse
} from './model/user';

/**
 * User service
 * Handles user management operations
 */
export const userService = {
  /**
   * Create a new user (admin only)
   * @param data User creation data
   * @returns Created user
   */
  createUser: async (data: CreateUserParams): Promise<User> => {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  /**
   * Get all users with pagination (admin only)
   * @param params Query parameters for filtering and pagination
   * @returns Paginated users response
   */
  getUsers: async (params?: GetUsersParams): Promise<UsersPaginatedResponse> => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  /**
   * Get a specific user by ID
   * @param userId User ID
   * @returns User data
   */
  getUser: async (userId: string): Promise<User> => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Update a user
   * @param userId User ID
   * @param data Update data
   * @returns Updated user
   */
  updateUser: async (userId: string, data: UpdateUserParams): Promise<User> => {
    const response = await apiClient.patch(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * Delete a user
   * @param userId User ID
   */
  deleteUser: async (userId: string): Promise<void> => {
    await apiClient.delete(`/users/${userId}`);
  }
};

export default userService; 