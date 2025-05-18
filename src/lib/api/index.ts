/**
 * API Module Exports
 */

// Core API components
import apiClient from './client';
import authService from './auth';
import userService from './user';
import conversationService from './conversation';

// Export services
export { apiClient, authService, userService, conversationService };

// Re-export model types with namespaces to avoid conflicts
import * as AuthModels from './model/auth';
import * as UserModels from './model/user';
import * as ConversationModels from './model/conversation';

export { AuthModels, UserModels, ConversationModels }; 