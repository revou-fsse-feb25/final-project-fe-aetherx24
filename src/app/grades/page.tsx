"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  Award, 
  BarChart3,
  Filter,
  Download
} from "lucide-react";
import { CourseGrade, Course } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";

export default function GradesPage() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<CourseGrade[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gradesData, coursesData] = await Promise.all([
          apiClient.getCourseGrades(),
          apiClient.getAllCourses()
        ]);
        setGrades(gradesData);
        setCourses(coursesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load grades');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredGrades = selectedCourse === 'all' 
    ? grades 
    : grades.filter(grade => grade.courseId === selectedCourse);

  const calculateOverallGPA = () => {
    if (grades.length === 0) return 0;
    const totalPoints = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return (totalPoints / grades.length).toFixed(2);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading grades...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Grades</div>
            <p className="text-gray-600">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Grades & Analytics</h1>
              <p className="text-gray-600">
                {isTeacher ? 'Review and manage student grades' : 'Track your academic performance'}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Grades
              </Button>
            </div>
          </div>
        </div>

        {/* Grade Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateOverallGPA()}</div>
              <p className="text-xs text-muted-foreground">
                Based on {grades.length} assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{grades.length}</div>
              <p className="text-xs text-muted-foreground">
                Graded assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {grades.length > 0 
                  ? Math.round(grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length)
                  : 0
                }%
              </div>
              <p className="text-xs text-muted-foreground">
                Overall performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Grade</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {grades.length > 0 
                  ? Math.max(...grades.map(grade => grade.grade))
                  : 0
                }%
              </div>
              <p className="text-xs text-muted-foreground">
                Highest score achieved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="ml-2 p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Details</CardTitle>
            <CardDescription>
              {filteredGrades.length} assignment{filteredGrades.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredGrades.length > 0 ? (
              <div className="space-y-4">
                {filteredGrades.map((grade) => {
                  const course = courses.find(c => c.id === grade.courseId);
                  
                  return (
                    <div key={grade.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {course?.title || 'Unknown Course'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Assignment: {grade.assignmentTitle || 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getGradeColor(grade.grade)}`}>
                              {grade.grade}%
                            </div>
                            <div className="text-sm text-gray-500">
                              {getGradeLetter(grade.grade)}
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {grade.status || 'Graded'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Course:</span> {course?.title || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Graded On:</span> {grade.gradedAt ? new Date(grade.gradedAt).toLocaleDateString() : 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Max Points:</span> {grade.maxPoints || 'N/A'}
                        </div>
                      </div>
                      
                      {grade.comments && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Feedback:</span> {grade.comments}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No grades found for the selected criteria.</p>
                <p className="text-sm mt-2">Grades will appear here once assignments are graded.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your grade progression over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Performance chart will be displayed here</p>
                <p className="text-sm">Shows grade trends and patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
