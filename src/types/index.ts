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
