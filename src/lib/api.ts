import { DashboardData, Course, User, TodoItem, Feedback } from '@/types';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generic API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dashboard data
  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>('/dashboard');
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return this.request<Course[]>('/courses');
  }

  async getCourse(id: string): Promise<Course> {
    return this.request<Course>(`/courses/${id}`);
  }

  // User
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/user/profile');
  }

  // Todos
  async getTodos(): Promise<TodoItem[]> {
    return this.request<TodoItem[]>('/todos');
  }

  async createTodo(todo: Omit<TodoItem, 'id'>): Promise<TodoItem> {
    return this.request<TodoItem>('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  async updateTodo(id: string, updates: Partial<TodoItem>): Promise<TodoItem> {
    return this.request<TodoItem>(`/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return this.request<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Feedback
  async getRecentFeedback(): Promise<Feedback[]> {
    return this.request<Feedback[]>('/feedback/recent');
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual functions for convenience
export const {
  getDashboardData,
  getCourses,
  getCourse,
  getCurrentUser,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getRecentFeedback,
} = apiClient;
