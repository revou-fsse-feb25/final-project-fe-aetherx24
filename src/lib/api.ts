/**
 * Centralized configuration for backend API URLs
 * This file contains all backend endpoint configurations
 * to make it easier to update or change backend URLs in the future
 */

// Base API URL - change this to update all backend endpoints
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://shanghairevolmsapi.up.railway.app/api/v1";
export const API_CONFIG = {
  BASE_URL: 'https://shanghairevolmsapi.up.railway.app/api/v1',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;

// All endpoints in one object
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_CONFIG.BASE_URL}/auth/login`,
    REGISTER: `${API_CONFIG.BASE_URL}/auth/register`,
    REFRESH: `${API_CONFIG.BASE_URL}/auth/refresh`,
    LOGOUT: `${API_CONFIG.BASE_URL}/auth/logout`,
  },
  
  // User Management
  USERS: {
    PROFILE: `${API_CONFIG.BASE_URL}/users/profile`,
    ALL: `${API_CONFIG.BASE_URL}/users`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/users/${id}`,
    CREATE: `${API_CONFIG.BASE_URL}/users`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/users/${id}`,
  },
  
  // Dashboard & Analytics
  DASHBOARD: {
    MAIN: `${API_CONFIG.BASE_URL}/dashboard`,
    STUDENT: `${API_CONFIG.BASE_URL}/dashboard/student`,
    TEACHER: `${API_CONFIG.BASE_URL}/dashboard/teacher`,
    ADMIN: `${API_CONFIG.BASE_URL}/dashboard/admin`,
    TODOS: `${API_CONFIG.BASE_URL}/todos`,
    FEEDBACK: `${API_CONFIG.BASE_URL}/feedback/recent`,
  },
  
  // Course Management
  COURSES: {
    ALL: `${API_CONFIG.BASE_URL}/courses`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/courses/${id}`,
    CREATE: `${API_CONFIG.BASE_URL}/courses`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/courses/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/courses/${id}`,
    // Role-specific endpoints
    TAUGHT_BY_ME: `${API_CONFIG.BASE_URL}/courses/taught-by-me`,
    ENROLLED_IN: `${API_CONFIG.BASE_URL}/courses/enrolled-in`,
    AVAILABLE: `${API_CONFIG.BASE_URL}/courses/available`,
  },
  
  // Enrollment Management
  ENROLLMENTS: {
    MY_ENROLLMENTS: `${API_CONFIG.BASE_URL}/enrollments/my-enrollments`,
    ALL: `${API_CONFIG.BASE_URL}/enrollments`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/enrollments/${id}`,
    BY_STUDENT: (studentId: string) => `${API_CONFIG.BASE_URL}/enrollments/student/${studentId}`,
    BY_COURSE: (courseId: string) => `${API_CONFIG.BASE_URL}/enrollments/course/${courseId}`,
    CREATE: `${API_CONFIG.BASE_URL}/enrollments`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/enrollments/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/enrollments/${id}`,
  },
  
  // Content Management
  MODULES: {
    ALL: `${API_CONFIG.BASE_URL}/modules`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/modules/${id}`,
    CREATE: `${API_CONFIG.BASE_URL}/modules`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/modules/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/modules/${id}`,
  },
  
  LESSONS: {
    ALL: `${API_CONFIG.BASE_URL}/lessons`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/lessons/${id}`,
    CREATE: `${API_CONFIG.BASE_URL}/lessons`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/lessons/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/lessons/${id}`,
  },
  
  // Assessment System
  ASSIGNMENTS: {
    ALL: `${API_CONFIG.BASE_URL}/assignments`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/assignments/${id}`,
    CREATE: `${API_CONFIG.BASE_URL}/assignments`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/assignments/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/assignments/${id}`,
    // Role-specific endpoints
    MY_ASSIGNMENTS: `${API_CONFIG.BASE_URL}/assignments/my-assignments`,
    ASSIGNMENTS_FOR_COURSE: (courseId: string) => `${API_CONFIG.BASE_URL}/assignments/course/${courseId}`,
    PENDING_GRADING: `${API_CONFIG.BASE_URL}/assignments/pending-grading`,
  },
  
  SUBMISSIONS: {
    ALL: `${API_CONFIG.BASE_URL}/submissions`,
    BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/submissions/${id}`,
    CREATE: `${API_CONFIG.BASE_URL}/submissions`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/submissions/${id}`,
    DELETE: (id: string) => `${API_CONFIG.BASE_URL}/submissions/${id}`,
  },
  
  // Grading System
  GRADES: {
    COURSE_GRADES: {
      ALL: `${API_CONFIG.BASE_URL}/course-grades`,
      BY_ID: (id: string) => `${API_CONFIG.BASE_URL}/course-grades/${id}`,
      CREATE: `${API_CONFIG.BASE_URL}/course-grades`,
      UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/course-grades/${id}`,
      DELETE: (id: string) => `${API_CONFIG.BASE_URL}/course-grades/${id}`,
    },
  },
  
  // Utility
  UTILITY: {
    HEALTH: `${API_CONFIG.BASE_URL}/health`,
    TEST: `${API_CONFIG.BASE_URL}/test`,
    AUTH_STATUS: `${API_CONFIG.BASE_URL}/auth-status`,
  },

  // Role-based dashboard data
  DASHBOARD_DATA: {
    STUDENT: `${API_CONFIG.BASE_URL}/dashboard/student/data`,
    TEACHER: `${API_CONFIG.BASE_URL}/dashboard/teacher/data`,
    ADMIN: `${API_CONFIG.BASE_URL}/dashboard/admin/data`,
  },
} as const;

// Helper function to get endpoint with parameters
export const getEndpoint = (base: string, ...params: string[]) => {
  return `${base}/${params.join('/')}`;
};

// Usage examples:
// const userEndpoint = getEndpoint(API_ENDPOINTS.USERS.BY_ID, '123');
// const courseEndpoint = getEndpoint(API_ENDPOINTS.COURSES.BY_ID, '456');