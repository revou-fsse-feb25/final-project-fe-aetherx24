import { 
  DashboardData, 
  StudentDashboardData,
  TeacherDashboardData,
  AdminDashboardData,
  Course, 
  User, 
  TodoItem, 
  Feedback, 
  LoginResponse, 
  RegisterResponse,
  Assignment,
  Submission,
  Enrollment,
  HealthCheck,
  AuthStatus
} from '@/types';
import { API_ENDPOINTS, API_CONFIG } from './api';

// Generic API client with error handling
class ApiClient {
  private getAuthHeaders(): HeadersInit {
    // Try to get token from localStorage first, then cookies
    let token: string | null = null;
    
    if (typeof window !== 'undefined') {
      // Client-side: try localStorage first, then cookies
      token = localStorage.getItem('jwt_token');
      console.log('🔍 getAuthHeaders - localStorage token:', token ? 'EXISTS' : 'NOT FOUND');
      
      // If no token in localStorage, try to get from cookies
      if (!token) {
        const cookies = document.cookie.split(';');
        console.log('🔍 getAuthHeaders - all cookies:', cookies);
        const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
        if (jwtCookie) {
          token = jwtCookie.split('=')[1];
          console.log('🔍 getAuthHeaders - found token in cookies:', token ? 'EXISTS' : 'NOT FOUND');
        } else {
          console.log('🔍 getAuthHeaders - no jwt_token cookie found');
        }
      }
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔍 getAuthHeaders - setting Authorization header with token');
    } else {
      console.log('🔍 getAuthHeaders - NO token found, request will be unauthenticated');
    }

    return headers;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const authHeaders = this.getAuthHeaders();
    const config: RequestInit = {
      headers: {
        ...authHeaders,
        ...options.headers,
      },
      ...options,
    };

    console.log('🔍 API Request:', {
      url,
      method: options.method || 'GET',
      headers: config.headers,
      hasAuth: !!(authHeaders as Record<string, string>).Authorization
    });

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          this.clearAuth();
          throw new Error('Authentication expired. Please login again.');
        }
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

  // Authentication methods
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check localStorage first
    let token = localStorage.getItem('jwt_token');
    
    // If no token in localStorage, check cookies
    if (!token) {
      const cookies = document.cookie.split(';');
      const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
      if (jwtCookie) {
        token = jwtCookie.split('=')[1];
      }
    }
    
    return !!token;
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    // Try localStorage first
    let userStr = localStorage.getItem('user');
    
    // If no user in localStorage, try cookies
    if (!userStr) {
      const cookies = document.cookie.split(';');
      const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
      if (userCookie) {
        userStr = userCookie.split('=')[1];
      }
    }
    
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Helper function to set cookies
  private setCookie(name: string, value: string, days: number = 7): void {
    if (typeof window !== 'undefined') {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }
  }

  // Helper function to delete cookies
  private deleteCookie(name: string): void {
    if (typeof window !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');
      this.deleteCookie('jwt_token');
      this.deleteCookie('user');
    }
  }

  // Dashboard data
  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>(API_ENDPOINTS.DASHBOARD.MAIN);
  }

  // Role-based dashboard data
  async getStudentDashboardData(): Promise<StudentDashboardData> {
    return this.request<StudentDashboardData>(API_ENDPOINTS.DASHBOARD_DATA.STUDENT);
  }

  async getTeacherDashboardData(): Promise<TeacherDashboardData> {
    return this.request<TeacherDashboardData>(API_ENDPOINTS.DASHBOARD_DATA.TEACHER);
  }

  async getAdminDashboardData(): Promise<AdminDashboardData> {
    return this.request<AdminDashboardData>(API_ENDPOINTS.DASHBOARD_DATA.ADMIN);
  }

  // Role-based course data
  async getCoursesTaughtByMe(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.COURSES.TAUGHT_BY_ME);
  }

  async getMyEnrolledCourses(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.COURSES.ENROLLED_IN);
  }

  async getAvailableCourses(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.COURSES.AVAILABLE);
  }

  // Role-based assignment data
  async getMyAssignments(): Promise<Assignment[]> {
    return this.request<Assignment[]>(API_ENDPOINTS.ASSIGNMENTS.MY_ASSIGNMENTS);
  }

  async getAssignmentsForCourse(courseId: string): Promise<Assignment[]> {
    return this.request<Assignment[]>(API_ENDPOINTS.ASSIGNMENTS.ASSIGNMENTS_FOR_COURSE(courseId));
  }

  async getPendingGradingAssignments(): Promise<Assignment[]> {
    return this.request<Assignment[]>(API_ENDPOINTS.ASSIGNMENTS.PENDING_GRADING);
  }

  // User profile
  async getCurrentUser(): Promise<User> {
    return this.request<User>(API_ENDPOINTS.USERS.PROFILE);
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.ENROLLMENTS.MY_ENROLLMENTS);
  }

  async getCourse(id: string): Promise<Course> {
    return this.request<Course>(API_ENDPOINTS.COURSES.BY_ID(id));
  }

  async getAllCourses(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.COURSES.ALL);
  }

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    return this.request<Course>(API_ENDPOINTS.COURSES.CREATE, {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    return this.request<Course>(API_ENDPOINTS.COURSES.UPDATE(id), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteCourse(id: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.COURSES.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Todos
  async getTodos(): Promise<TodoItem[]> {
    return this.request<TodoItem[]>(API_ENDPOINTS.DASHBOARD.TODOS);
  }

  async createTodo(todo: Omit<TodoItem, 'id'>): Promise<TodoItem> {
    return this.request<TodoItem>(API_ENDPOINTS.DASHBOARD.TODOS, {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  async updateTodo(id: string, updates: Partial<TodoItem>): Promise<TodoItem> {
    return this.request<TodoItem>(`${API_ENDPOINTS.DASHBOARD.TODOS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return this.request<void>(`${API_ENDPOINTS.DASHBOARD.TODOS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Feedback
  async getRecentFeedback(): Promise<Feedback[]> {
    return this.request<Feedback[]>(API_ENDPOINTS.DASHBOARD.FEEDBACK);
  }

  // Enrollments
  async getMyEnrollments(): Promise<Course[]> {
    return this.request<Course[]>(API_ENDPOINTS.ENROLLMENTS.MY_ENROLLMENTS);
  }

  async createEnrollment(courseId: string): Promise<Enrollment> {
    return this.request<Enrollment>(API_ENDPOINTS.ENROLLMENTS.CREATE, {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async deleteEnrollment(id: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ENROLLMENTS.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    return this.request<Assignment[]>(API_ENDPOINTS.ASSIGNMENTS.ALL);
  }

  async getAssignment(id: string): Promise<Assignment> {
    return this.request<Assignment>(API_ENDPOINTS.ASSIGNMENTS.BY_ID(id));
  }

  async createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Assignment> {
    return this.request<Assignment>(API_ENDPOINTS.ASSIGNMENTS.CREATE, {
      method: 'POST',
      body: JSON.stringify(assignment),
    });
  }

  async updateAssignment(id: string, updates: Partial<Assignment>): Promise<Assignment> {
    return this.request<Assignment>(API_ENDPOINTS.ASSIGNMENTS.UPDATE(id), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteAssignment(id: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ASSIGNMENTS.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Submissions
  async getSubmissions(): Promise<Submission[]> {
    return this.request<Submission[]>(API_ENDPOINTS.SUBMISSIONS.ALL);
  }

  async getSubmission(id: string): Promise<Submission> {
    return this.request<Submission>(API_ENDPOINTS.SUBMISSIONS.BY_ID(id));
  }

  async createSubmission(submission: Omit<Submission, 'id' | 'submittedAt'>): Promise<Submission> {
    return this.request<Submission>(API_ENDPOINTS.SUBMISSIONS.CREATE, {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  }

  async updateSubmission(id: string, updates: Partial<Submission>): Promise<Submission> {
    return this.request<Submission>(API_ENDPOINTS.SUBMISSIONS.UPDATE(id), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteSubmission(id: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.SUBMISSIONS.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Utility methods
  async checkHealth(): Promise<HealthCheck> {
    return this.request<HealthCheck>(API_ENDPOINTS.UTILITY.HEALTH);
  }

  async checkAuthStatus(): Promise<AuthStatus> {
    return this.request<AuthStatus>(API_ENDPOINTS.UTILITY.AUTH_STATUS);
  }

  // Authentication
  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    return this.request<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: { email: string; password: string; name: string }): Promise<RegisterResponse> {
    return this.request<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, {
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
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getRecentFeedback,
  getMyEnrollments,
  createEnrollment,
  deleteEnrollment,
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getSubmissions,
  getSubmission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  checkHealth,
  checkAuthStatus,
  login,
  register,
} = apiClient;
