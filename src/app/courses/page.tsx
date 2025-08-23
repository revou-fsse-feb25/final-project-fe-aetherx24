"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Calendar, Clock, Star } from "lucide-react";
import { Course } from "@/types";
import { apiClient } from "@/lib/apiClient";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getAllCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    try {
      await apiClient.createEnrollment(courseId);
      // Refresh courses to show updated enrollment status
      const updatedCourses = await apiClient.getAllCourses();
      setCourses(updatedCourses);
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
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
                  
                  {course.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleEnroll(course.id)}
                    disabled={course.status !== 'active'}
                  >
                    {course.progress !== undefined ? 'Continue Learning' : 'Enroll Now'}
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
