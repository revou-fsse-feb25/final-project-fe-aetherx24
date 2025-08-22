export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  instructor?: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'completed' | 'upcoming';
  progress?: number;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  courseId?: string;
}

export interface Feedback {
  id: string;
  courseId: string;
  courseTitle: string;
  message: string;
  rating: number;
  createdAt: string;
}

export interface DashboardData {
  user: User;
  courses: Course[];
  todos: TodoItem[];
  recentFeedback: Feedback[];
  stats: {
    totalCourses: number;
    completedCourses: number;
    activeCourses: number;
    averageGrade?: number;
  };
}

// Authentication response types
export interface LoginResponse {
  jwt_token: string;
  user: User;
}

export interface RegisterResponse {
  jwt_token: string;
  user: User;
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxPoints: number;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// Submission types
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

// Enrollment types
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
}

// Module and Lesson types
export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  content: string;
  order: number;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

// Grade types
export interface CourseGrade {
  id: string;
  studentId: string;
  courseId: string;
  grade: number;
  letterGrade: string;
  gradeDate: string;
  comments?: string;
}

// Utility types
export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  services: {
    database: 'up' | 'down';
    api: 'up' | 'down';
  };
}

export interface AuthStatus {
  isAuthenticated: boolean;
  user?: User;
  expiresAt?: string;
}
