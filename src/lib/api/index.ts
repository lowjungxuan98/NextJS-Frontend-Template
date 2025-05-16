/**
 * API Module Exports
 */

// Core API components
import apiClient from './client';
import authService from './auth';
import userService from './user';

// Export services
export { apiClient, authService, userService };

// Re-export model types with namespaces to avoid conflicts
import * as AuthModels from './model/auth';
import * as UserModels from './model/user';

export { AuthModels, UserModels }; 