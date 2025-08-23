"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, BookOpen, Award } from "lucide-react";
import { Course, CourseGrade } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { Navbar } from "@/components/Navbar";

export default function ProgressPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [grades, setGrades] = useState<CourseGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const [enrollmentsData, gradesData] = await Promise.all([
          apiClient.getMyEnrollments(),
          apiClient.getAssignments().then(() => []) // Placeholder - replace with actual grades API
        ]);
        
        // Get course details for each enrollment
        const coursesWithProgress = await Promise.all(
          enrollmentsData.map(async (enrollment) => {
            try {
              const course = await apiClient.getCourse(enrollment.courseId);
              return {
                ...course,
                progress: enrollment.progress,
                enrollmentStatus: enrollment.status
              };
            } catch {
              // If course fetch fails, create a minimal course object
              return {
                id: enrollment.courseId,
                title: `Course ${enrollment.courseId}`,
                subtitle: 'Course details unavailable',
                status: 'active' as const,
                progress: enrollment.progress,
                enrollmentStatus: enrollment.status
              };
            }
          })
        );
        
        setEnrolledCourses(coursesWithProgress);
        setGrades(gradesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load progress');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const calculateOverallProgress = () => {
    if (enrolledCourses.length === 0) return 0;
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0);
    return Math.round(totalProgress / enrolledCourses.length);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading progress...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 text-xl mb-8">⚠️ Error Loading Progress</div>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Overall Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Active learning courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {grades.length > 0 
                  ? Math.round(grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length)
                  : 'N/A'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {grades.length > 0 ? 'Based on completed assignments' : 'No grades yet'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Status</span>
                      <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Grades Section */}
        {grades.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Grades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grades.slice(0, 6).map((grade) => (
                <Card key={grade.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">Assignment Grade</CardTitle>
                    <CardDescription>Course: {grade.courseId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}%
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {grade.letterGrade}
                      </div>
                      {grade.comments && (
                        <p className="text-xs text-gray-500 mt-2">{grade.comments}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {enrolledCourses.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No progress data yet</h3>
            <p className="text-gray-600">Enroll in courses to start tracking your progress.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
