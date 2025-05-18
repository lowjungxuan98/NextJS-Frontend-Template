import apiClient from './client';
import { 
  Conversation, 
  CreateConversationParams, 
  UpdateConversationParams, 
  GetConversationsParams,
  ConversationsPaginatedResponse,
  Message
} from './model/conversation';

/**
 * Conversation service
 * Handles conversation and message operations
 */
export const conversationService = {
  /**
   * Create a new conversation
   * @param data Conversation creation data
   * @returns Created conversation
   */
  createConversation: async (data: CreateConversationParams): Promise<Conversation> => {
    const response = await apiClient.post('/conversations', data);
    return response.data;
  },

  /**
   * Get all conversations with pagination
   * @param params Query parameters for filtering and pagination
   * @returns Paginated conversations response
   */
  getConversations: async (params?: GetConversationsParams): Promise<ConversationsPaginatedResponse> => {
    const response = await apiClient.get('/conversations', { params });
    return response.data;
  },

  /**
   * Get a specific conversation by ID
   * @param conversationId Conversation ID
   * @returns Conversation data
   */
  getConversation: async (conversationId: string): Promise<Conversation> => {
    const response = await apiClient.get(`/conversations/${conversationId}`);
    return response.data;
  },

  /**
   * Update a conversation
   * @param conversationId Conversation ID
   * @param data Update data
   * @returns Updated conversation
   */
  updateConversation: async (conversationId: string, data: UpdateConversationParams): Promise<Conversation> => {
    const response = await apiClient.patch(`/conversations/${conversationId}`, data);
    return response.data;
  },

  /**
   * Delete a conversation
   * @param conversationId Conversation ID
   */
  deleteConversation: async (conversationId: string): Promise<void> => {
    await apiClient.delete(`/conversations/${conversationId}`);
  },

  /**
   * Get all messages for a conversation
   * @param conversationId Conversation ID
   * @returns Array of messages
   */
  getConversationMessages: async (conversationId: string): Promise<Message[]> => {
    const response = await apiClient.get(`/conversations/${conversationId}/messages`);
    return response.data;
  }
};

export default conversationService; 