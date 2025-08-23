"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Play, 
  CheckCircle, 
  Lock,
  FileText,
  Video
} from "lucide-react";
import { Course, Module, Lesson } from "@/types";
import { apiClient } from "@/lib/apiClient";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const [courseData, modulesData, lessonsData] = await Promise.all([
          apiClient.getCourse(courseId),
          apiClient.getModulesByCourse(courseId),
          apiClient.getLessonsByCourse(courseId)
        ]);
        
        setCourse(courseData);
        setModules(modulesData);
        setLessons(lessonsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await apiClient.createEnrollment(courseId);
      // Refresh course data to show enrollment status
      const courseData = await apiClient.getCourse(courseId);
      setCourse(courseData);
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'quiz':
        return <FileText className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Course</div>
            <p className="text-gray-600">{error || 'Course not found'}</p>
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

  const isEnrolled = course.progress !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{course.subtitle}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Instructor: {course.instructor || 'TBA'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Students: {course.studentCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Duration: {course.duration || 'Self-paced'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-3">
              <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                {course.status}
              </Badge>
              {!isEnrolled ? (
                <Button onClick={handleEnroll} disabled={course.status !== 'active'}>
                  Enroll Now
                </Button>
              ) : (
                <Button variant="outline">
                  Continue Learning
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isEnrolled && (
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-3" />
            </div>
          )}
        </div>

        {/* Course Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {course.description || 'No description available for this course.'}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You&apos;ll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Key learning objective 1</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Key learning objective 2</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Key learning objective 3</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Basic knowledge requirement 1</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Basic knowledge requirement 2</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {modules.length} modules • {lessons.length} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border rounded-lg">
                      <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-medium text-gray-900">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {module.description}
                        </p>
                      </div>
                      
                      <div className="p-4">
                        <div className="space-y-2">
                          {lessons
                            .filter(lesson => lesson.moduleId === module.id)
                            .map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <div className="flex items-center space-x-3">
                                  {getLessonIcon(lesson.type)}
                                  <span className="text-sm">
                                    {lessonIndex + 1}. {lesson.title}
                                  </span>
                                  {lesson.duration && (
                                    <span className="text-xs text-gray-500">
                                      {lesson.duration}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {lesson.isCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : lesson.isLocked ? (
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <Play className="w-4 h-4 text-blue-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructor Tab */}
          <TabsContent value="instructor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xl">
                      {course.instructor?.charAt(0) || 'I'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{course.instructor || 'Instructor Name'}</h3>
                    <p className="text-gray-600 mt-1">
                      Experienced instructor with expertise in this field.
                    </p>
                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                      <span>• 5+ years experience</span>
                      <span>• 1000+ students taught</span>
                      <span>• 4.8/5 rating</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>What students are saying about this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet for this course.</p>
                  <p className="text-sm mt-2">Be the first to leave a review!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
