"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Star } from "lucide-react";
import { Course, Enrollment } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingCourses, setEnrollingCourses] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coursesData = await apiClient.getAllCourses();
        setCourses(coursesData);

        // Fetch user enrollments if logged in
        if (user) {
          try {
            const enrollmentsData = await apiClient.getMyEnrollments();
            setEnrollments(enrollmentsData);
          } catch {
            console.log('Could not fetch enrollments');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      alert('Please log in to enroll in courses');
      return;
    }

    try {
      // Add course to enrolling set
      setEnrollingCourses(prev => new Set(prev).add(courseId));

      console.log('🔍 Attempting to enroll in course:', courseId);
      console.log('🔍 User ID:', user?.id);
      console.log('🔍 Request payload:', { courseId });
      
      const newEnrollment = await apiClient.createEnrollment(courseId);
      
      console.log('🔍 Enrollment successful:', newEnrollment);
      
      // Update enrollments state
      setEnrollments(prev => [...prev, newEnrollment]);
      
      alert('Successfully enrolled in the course!');
    } catch (err) {
      console.error('Enrollment failed:', err);
      
      // Show more specific error information
      let errorMessage = 'Failed to enroll in the course. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Course not found or enrollment endpoint unavailable.';
        } else if (err.message.includes('409')) {
          errorMessage = 'You are already enrolled in this course.';
        } else if (err.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Enrollment failed: ${err.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      // Remove course from enrolling set
      setEnrollingCourses(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }
  };

  // Helper function to check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(enrollment => enrollment.courseId === courseId);
  };

  // Helper function to get enrollment progress
  const getEnrollmentProgress = (courseId: string) => {
    const enrollment = enrollments.find(e => e.courseId === courseId);
    return enrollment?.progress || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
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
            <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Courses</div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Courses</h1>
          <p className="text-gray-600">Explore and enroll in courses to advance your skills</p>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
            <h3 className="font-bold">Debug Info:</h3>
            <p>User: {user ? `${user.firstName} (${user.role})` : 'Not logged in'}</p>
            <p>Courses loaded: {courses.length}</p>
            <p>Enrollments loaded: {enrollments.length}</p>
            <p>Enrolling courses: {Array.from(enrollingCourses).join(', ') || 'None'}</p>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mb-3">
                      {course.subtitle}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={course.status === 'active' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {course.description || 'No description available'}
                </p>
                
                {/* Course Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Instructor: {course.instructor || 'TBA'}</span>
                  </div>
                  
                  {course.startDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Starts: {new Date(course.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {isEnrolled(course.id) && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getEnrollmentProgress(course.id)}%</span>
                      </div>
                      <Progress value={getEnrollmentProgress(course.id)} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Debug Info for this course */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-2 p-2 bg-gray-100 text-xs rounded">
                    <p>Course ID: {course.id}</p>
                    <p>Status: {course.status}</p>
                    <p>Is Enrolled: {isEnrolled(course.id) ? 'Yes' : 'No'}</p>
                    <p>Is Enrolling: {enrollingCourses.has(course.id) ? 'Yes' : 'No'}</p>
                    <p>Button Disabled: {enrollingCourses.has(course.id) ? 'Yes' : 'No'}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      console.log('🔍 Button clicked for course:', course.id);
                      console.log('🔍 Course status:', course.status);
                      console.log('🔍 Is enrolling:', enrollingCourses.has(course.id));
                      console.log('🔍 Is enrolled:', isEnrolled(course.id));
                      console.log('🔍 User:', user ? 'logged in' : 'not logged in');
                      handleEnroll(course.id);
                    }}
                    disabled={enrollingCourses.has(course.id)}
                  >
                    {enrollingCourses.has(course.id) 
                      ? 'Enrolling...' 
                      : isEnrolled(course.id) 
                        ? 'Continue Learning' 
                        : 'Enroll Now'
                    }
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
            <p className="text-gray-600">Check back later for new course offerings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
