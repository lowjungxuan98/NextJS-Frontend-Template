export interface Conversation {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationParams {
  userId: string;
}

export interface UpdateConversationParams {
  userId?: string;
}

export interface GetConversationsParams {
  userId?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: string;
  createdAt: string;
}

export interface ConversationsPaginatedResponse {
  results: Conversation[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
} 