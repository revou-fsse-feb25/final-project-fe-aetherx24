/**
 * Configuration for API endpoints
 * Switch between local development and production
 */

// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development';

// API Configuration
export const API_CONFIG = {
  // Local development backend (your local backend project)
  LOCAL: {
    BASE_URL: 'http://localhost:3000', // Adjust port to match your backend
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  
  // Production backend (Railway)
  PRODUCTION: {
    BASE_URL: 'https://shanghairevolmsapi.up.railway.app',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  
  // Current active configuration
  get ACTIVE() {
    return isDevelopment ? this.LOCAL : this.PRODUCTION;
  },
  
  // Helper to get current base URL
  get BASE_URL() {
    return this.ACTIVE.BASE_URL;
  },
  
  // Helper to get current timeout
  get TIMEOUT() {
    return this.ACTIVE.TIMEOUT;
  },
  
  // Helper to get current retry attempts
  get RETRY_ATTEMPTS() {
    return this.ACTIVE.RETRY_ATTEMPTS;
  },
} as const;

// Helper to get API base URL with /api/v1 prefix
// Avoid double /api/v1 if it's already in the base URL
const getApiUrl = (path: string) => {
  const baseUrl = API_CONFIG.BASE_URL;
  if (baseUrl.includes('/api/v1')) {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/api/v1${path}`;
  }
};

// All endpoints using the active configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: getApiUrl('/auth/login'),
    REGISTER: getApiUrl('/auth/register'),
    REFRESH: getApiUrl('/auth/refresh'),
    LOGOUT: getApiUrl('/auth/logout'),
  },
  
  // User Management
  USERS: {
    PROFILE: getApiUrl('/users/profile'),
    ALL: getApiUrl('/users'),
    BY_ID: (id: string) => getApiUrl(`/users/${id}`),
    CREATE: getApiUrl('/users'),
    UPDATE: (id: string) => getApiUrl(`/users/${id}`),
    UPDATE_ROLE: (id: string) => getApiUrl(`/users/${id}/role`),
    DELETE: (id: string) => getApiUrl(`/users/${id}`),
  },
  
  // Dashboard & Analytics
  DASHBOARD: {
    MAIN: getApiUrl('/dashboard'),
    STUDENT: getApiUrl('/dashboard/student'),
    TEACHER: getApiUrl('/dashboard/teacher'),
    ADMIN: getApiUrl('/dashboard/admin'),
    TODOS: getApiUrl('/todos'),
    FEEDBACK: getApiUrl('/feedback/recent'),
  },
  
  // Course Management
  COURSES: {
    ALL: getApiUrl('/courses'),
    BY_ID: (id: string) => getApiUrl(`/courses/${id}`),
    CREATE: getApiUrl('/courses'),
    UPDATE: (id: string) => getApiUrl(`/courses/${id}`),
    DELETE: (id: string) => getApiUrl(`/courses/${id}`),
    // Role-specific endpoints
    TAUGHT_BY_ME: getApiUrl('/courses/taught-by-me'),
    ENROLLED_IN: getApiUrl('/courses/enrolled-in'),
    AVAILABLE: getApiUrl('/courses/available'),
  },
  
  // Enrollment Management
  ENROLLMENTS: {
    MY_ENROLLMENTS: getApiUrl('/enrollments/my-enrollments'),
    ALL: getApiUrl('/enrollments'),
    BY_ID: (id: string) => getApiUrl(`/enrollments/${id}`),
    BY_STUDENT: (studentId: string) => getApiUrl(`/enrollments/student/${studentId}`),
    BY_COURSE: (courseId: string) => getApiUrl(`/enrollments/course/${courseId}`),
    CREATE: getApiUrl('/enrollments'),
    UPDATE: (id: string) => getApiUrl(`/enrollments/${id}`),
    DELETE: (id: string) => getApiUrl(`/enrollments/${id}`),
  },
  
  // Content Management
  MODULES: {
    ALL: getApiUrl('/modules'),
    BY_ID: (id: string) => getApiUrl(`/modules/${id}`),
    BY_COURSE: (courseId: string) => getApiUrl(`/modules/course/${courseId}`),
    CREATE: getApiUrl('/modules'),
    UPDATE: (id: string) => getApiUrl(`/modules/${id}`),
    DELETE: (id: string) => getApiUrl(`/modules/${id}`),
  },
  
  LESSONS: {
    ALL: getApiUrl('/lessons'),
    BY_ID: (id: string) => getApiUrl(`/lessons/${id}`),
    BY_COURSE: (courseId: string) => getApiUrl(`/lessons/course/${courseId}`),
    CREATE: getApiUrl('/lessons'),
    UPDATE: (id: string) => getApiUrl(`/lessons/${id}`),
    DELETE: (id: string) => getApiUrl(`/lessons/${id}`),
  },
  
  // Assessment System
  ASSIGNMENTS: {
    ALL: getApiUrl('/assignments'),
    BY_ID: (id: string) => getApiUrl(`/assignments/${id}`),
    CREATE: getApiUrl('/assignments'),
    UPDATE: (id: string) => getApiUrl(`/assignments/${id}`),
    DELETE: (id: string) => getApiUrl(`/assignments/${id}`),
    // Role-specific endpoints
    MY_ASSIGNMENTS: getApiUrl('/assignments/my-assignments'),
    ASSIGNMENTS_FOR_COURSE: (courseId: string) => getApiUrl(`/assignments/course/${courseId}`),
    PENDING_GRADING: getApiUrl('/assignments/pending-grading'),
  },
  
  SUBMISSIONS: {
    ALL: getApiUrl('/submissions'),
    BY_ID: (id: string) => getApiUrl(`/submissions/${id}`),
    CREATE: getApiUrl('/submissions'),
    UPDATE: (id: string) => getApiUrl(`/submissions/${id}`),
    DELETE: (id: string) => getApiUrl(`/submissions/${id}`),
  },
  
  // Grading System
  GRADES: {
    COURSE_GRADES: {
      ALL: getApiUrl('/course-grades'),
      BY_ID: (id: string) => getApiUrl(`/course-grades/${id}`),
      CREATE: getApiUrl('/course-grades'),
      UPDATE: (id: string) => getApiUrl(`/course-grades/${id}`),
      DELETE: (id: string) => getApiUrl(`/course-grades/${id}`),
    },
  },
  
  // Utility
  UTILITY: {
    HEALTH: `${API_CONFIG.BASE_URL}/health`, // Health check is at root level
    TEST: getApiUrl('/test'),
    AUTH_STATUS: getApiUrl('/auth-status'),
  },

  // Role-based dashboard data
  DASHBOARD_DATA: {
    STUDENT: getApiUrl('/dashboard/student/data'),
    TEACHER: getApiUrl('/dashboard/teacher/data'),
    ADMIN: getApiUrl('/dashboard/admin/data'),
  },
} as const;

// Helper function to get endpoint with parameters
export const getEndpoint = (base: string, ...params: string[]) => {
  return `${base}/${params.join('/')}`;
};

// Environment info for debugging
export const ENV_INFO = {
  isDevelopment,
  currentBaseUrl: API_CONFIG.BASE_URL,
  environment: process.env.NODE_ENV || 'development',
} as const;

// Log current configuration (only in development)
if (isDevelopment) {
  console.log('🔧 API Configuration:', {
    environment: ENV_INFO.environment,
    baseUrl: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
  });
}
