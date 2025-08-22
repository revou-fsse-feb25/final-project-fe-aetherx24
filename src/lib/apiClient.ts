import { DashboardData, Course, User, TodoItem, Feedback } from '@/types';
import { API_ENDPOINTS } from './api';

// Generic API client with error handling
class ApiClient {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - the API is taking too long to respond');
      }
      throw error;
    }
  }

  // Dashboard data
  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>(API_ENDPOINTS.DASHBOARD.BASE);
  }

  // User profile
  async getCurrentUser(): Promise<User> {
    return this.request<User>(API_ENDPOINTS.USER.PROFILE);
  }

  // Courses (using enrollments endpoint)
  async getCourses(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.ENROLLMENTS.MY_ENROLLMENTS);
  }

  async getCourse(id: string): Promise<Course> {
    return this.request<Course>(`${API_ENDPOINTS.ENROLLMENTS.BASE}/${id}`);
  }

  // Todos
  async getTodos(): Promise<TodoItem[]> {
    return this.request<TodoItem[]>(API_ENDPOINTS.TODOS.BASE);
  }

  async createTodo(todo: Omit<TodoItem, 'id'>): Promise<TodoItem> {
    return this.request<TodoItem>(API_ENDPOINTS.TODOS.BASE, {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  async updateTodo(id: string, updates: Partial<TodoItem>): Promise<TodoItem> {
    return this.request<TodoItem>(API_ENDPOINTS.TODOS.BY_ID(id), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.TODOS.BY_ID(id), {
      method: 'DELETE',
    });
  }

  // Feedback
  async getRecentFeedback(): Promise<Feedback[]> {
    return this.request<Feedback[]>(API_ENDPOINTS.FEEDBACK.RECENT);
  }

  // Authentication
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: User }> {
    return this.request<{ token: string; user: User }>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: { email: string; password: string; name: string }): Promise<{ token: string; user: User }> {
    return this.request<{ token: string; user: User }>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient();

// Export individual functions for convenience
export const {
  getDashboardData,
  getCurrentUser,
  getCourses,
  getCourse,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getRecentFeedback,
  login,
  register,
} = apiClient;
