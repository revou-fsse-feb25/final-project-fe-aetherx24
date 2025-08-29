"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Clock,
  CheckCircle,
  Eye,
  Star,
  Users,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { TeacherDashboardData } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";



export default function TeacherDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the correct backend endpoint for teacher dashboard
        const response = await apiClient.getTeacherDashboardData();
        setDashboardData(response);
        
      } catch (err) {
        console.error("Failed to fetch teacher dashboard:", err);
        setError("Failed to load dashboard data. Please try again.");
        
        // Fallback to mock data for development/testing
        const mockData: TeacherDashboardData = {
          user: user!,
          courses: [],
          todos: [],
          recentFeedback: [],
          stats: {
            totalCourses: 3,
            completedCourses: 0,
            activeCourses: 3,
            averageGrade: 85
          },
          teachingCourses: [
            {
              id: "1",
              title: "Introduction to Computer Science",
              subtitle: "CS101",
              description: "Learn the fundamentals of computer science and programming",
              instructor: "Teacher 1",
              duration: "12 weeks",
              studentCount: 12,
              status: "active"
            },
            {
              id: "2", 
              title: "Web Development Fundamentals",
              subtitle: "WD101",
              description: "Master HTML, CSS, and JavaScript basics",
              instructor: "Teacher 1",
              duration: "10 weeks",
              studentCount: 8,
              status: "active"
            },
            {
              id: "3",
              title: "Advanced JavaScript",
              subtitle: "JS201",
              description: "Deep dive into modern JavaScript concepts",
              instructor: "Teacher 2",
              duration: "8 weeks", 
              studentCount: 4,
              status: "active"
            }
          ],
          pendingSubmissions: [
            {
              id: "sub1",
              assignmentId: "1",
              studentId: "student1",
              content: "Completed JavaScript fundamentals with proper syntax...",
              submittedAt: "2024-01-14T10:30:00Z",
              status: "submitted"
            },
            {
              id: "sub2",
              assignmentId: "2", 
              studentId: "student2",
              content: "Built HTML page with proper semantic elements...",
              submittedAt: "2024-01-18T14:20:00Z",
              status: "submitted"
            }
          ],
          gradingQueue: [
            {
              id: "1",
              title: "JavaScript Fundamentals Quiz",
              description: "Complete the JavaScript basics assessment",
              courseId: "1",
              dueDate: "2024-01-15T23:59:59Z",
              maxPoints: 100,
              status: "published",
              createdAt: "2024-01-01T00:00:00Z",
              updatedAt: "2024-01-01T00:00:00Z"
            },
            {
              id: "2",
              title: "HTML Structure Assignment",
              description: "Create a semantic HTML page structure",
              courseId: "2",
              dueDate: "2024-01-20T23:59:59Z",
              maxPoints: 50,
              status: "published",
              createdAt: "2024-01-01T00:00:00Z",
              updatedAt: "2024-01-01T00:00:00Z"
            }
          ],
          studentStats: {
            totalStudents: 24,
            activeStudents: 24,
            averageGrade: 85
          }
        };
        setDashboardData(mockData);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'teacher') {
      fetchTeacherDashboard();
    }
  }, [user]);

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-red-600 text-xl mb-4">⚠️ Access Denied</div>
            <p className="text-gray-600">This page is only accessible to teachers.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading teacher dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Dashboard</div>
            <p className="text-gray-600">{error || 'Failed to load dashboard data'}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your courses and grade student assignments</p>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">Active courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.studentStats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Enrolled students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.pendingSubmissions.length}</div>
                <p className="text-xs text-muted-foreground">Need grading</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.studentStats.averageGrade}%</div>
                <p className="text-xs text-muted-foreground">Student average</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Active Courses</h2>
            <div className="grid gap-4">
              {dashboardData.teachingCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{course.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Students:</span> {course.studentCount || 0}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {course.duration}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Course
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        View Students
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pending Submissions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pending Submissions to Grade</h2>
            {dashboardData.pendingSubmissions.length > 0 ? (
              <div className="grid gap-4">
                {dashboardData.pendingSubmissions.map((submission) => {
                  // Find the corresponding assignment from gradingQueue
                  const assignment = dashboardData.gradingQueue.find(a => a.id === submission.assignmentId);
                  if (!assignment) return null;
                  
                  return (
                    <Card key={submission.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{assignment.title}</CardTitle>
                            <CardDescription>
                              Student ID: {submission.studentId}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-gray-600 mb-2">{assignment.description}</p>
                          <div className="text-sm text-gray-500">
                            Submitted: {new Date(submission.submittedAt).toLocaleDateString()} | 
                            Max Points: {assignment.maxPoints}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md mb-4">
                          <p className="text-sm text-gray-700">
                            <strong>Submission:</strong> {submission.content}
                          </p>
                        </div>
                        <Button onClick={() => window.location.href = `/assignments/${assignment.id}`}>
                          <Star className="w-4 h-4 mr-2" />
                          Grade This Submission
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">All submissions have been graded! 🎉</p>
                </CardContent>
              </Card>
            )}
          </div>



          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20" variant="outline" asChild>
                <Link href="/teacher/courses/manage">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <div>Manage Courses</div>
                  </div>
                </Link>
              </Button>
              <Button className="h-20" variant="outline" asChild>
                <Link href="/teacher/courses/create">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <div>Create Course</div>
                  </div>
                </Link>
              </Button>
              <Button className="h-20" variant="outline" asChild>
                <Link href="/teacher/grading">
                  <div className="text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2" />
                    <div>Grade Submissions</div>
                  </div>
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Button className="h-20" variant="outline" asChild>
                <Link href="/teacher/analytics">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                    <div>Student Analytics</div>
                  </div>
                </Link>
              </Button>
              <Button className="h-20" variant="outline" asChild>
                <Link href="/assignments/create">
                  <div className="text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2" />
                    <div>Create Assignment</div>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
