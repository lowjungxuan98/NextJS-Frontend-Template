export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserParams {
  name?: string;
  email?: string;
  password?: string;
}

export interface GetUsersParams {
  name?: string;
  role?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface UsersPaginatedResponse {
  results: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
} 