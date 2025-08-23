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
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
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

// Role-specific dashboard data
export interface StudentDashboardData extends DashboardData {
  enrollments: Course[];
  upcomingAssignments: Assignment[];
  recentGrades: CourseGrade[];
  progress: {
    overallProgress: number;
    courseProgress: Record<string, number>;
  };
}

export interface TeacherDashboardData extends DashboardData {
  teachingCourses: Course[];
  pendingSubmissions: Submission[];
  gradingQueue: Assignment[];
  studentStats: {
    totalStudents: number;
    activeStudents: number;
    averageGrade: number;
  };
}

export interface AdminDashboardData extends DashboardData {
  systemStats: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    activeUsers: number;
  };
  recentActivity: {
    newUsers: User[];
    newCourses: Course[];
    newEnrollments: Enrollment[];
  };
}

// Authentication response types
export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;        // JWT token
  token_type: string;          // "Bearer"
  expires_in: number;          // 86400 (24 hours)
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'teacher' | 'admin';
    fullName: string;
  };
  timestamp: string;
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
