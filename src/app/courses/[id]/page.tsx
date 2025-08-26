"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  CheckCircle
} from "lucide-react";
import { Course, Enrollment } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";
import { Navbar } from "@/components/Navbar";

// Curriculum data structure from backend
interface CurriculumData {
  course: {
    title: string;
    description: string;
  };
  modules: Array<{
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      description: string;
      order: number;
      duration?: number;
    }>;
  }>;
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { user } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null);
  const [curriculumLoading, setCurriculumLoading] = useState(false);
  const curriculumFetchedRef = useRef(false);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await apiClient.getCourse(courseId);
        setCourse(courseData);

        // Check if user is enrolled in this course
        if (user) {
          try {
            const enrollments = await apiClient.getMyEnrollments();
            const userEnrollment = enrollments.find(enrollment => enrollment.courseId === courseId);
            setEnrollment(userEnrollment || null);
          } catch {
            // Silently handle enrollment fetch errors
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      alert('Please log in to enroll in courses');
      return;
    }

    try {
      setEnrolling(true);
      const newEnrollment = await apiClient.createEnrollment(courseId);
      setEnrollment(newEnrollment);
      
      // Show success message
      alert('Successfully enrolled in the course!');
    } catch {
      alert('Failed to enroll in the course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const loadCurriculum = useCallback(async (courseId: string) => {
    try {
      setCurriculumLoading(true);
      
      console.log('🔍 Loading curriculum for course:', courseId);
      
      // Use existing endpoints to build curriculum data
      const [modulesResponse, lessonsResponse] = await Promise.all([
        apiClient.getModulesByCourse(courseId),
        apiClient.getLessonsByCourse(courseId)
      ]);
      
      console.log('🔍 Modules response:', modulesResponse);
      console.log('🔍 Lessons response:', lessonsResponse);
      console.log('🔍 Modules type:', typeof modulesResponse);
      console.log('🔍 Modules is array:', Array.isArray(modulesResponse));
      
      // Ensure we have arrays and handle potential errors
      const modules = Array.isArray(modulesResponse) ? modulesResponse : [];
      const lessons = Array.isArray(lessonsResponse) ? lessonsResponse : [];
      
      console.log('🔍 Processed modules:', modules);
      console.log('🔍 Processed lessons:', lessons);
      
      // Build curriculum data structure
      const curriculumData: CurriculumData = {
        course: {
          title: course?.title || '',
          description: course?.description || ''
        },
        modules: modules.map(module => ({
          id: module.id,
          title: module.title,
          description: module.description,
          order: module.order,
          lessons: []
        }))
      };
      
      // Add lessons to their respective modules
      if (lessons.length > 0) {
        curriculumData.modules = curriculumData.modules.map(module => ({
          ...module,
          lessons: lessons
            .filter(lesson => lesson.moduleId === module.id)
            .map(lesson => ({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
              order: lesson.order,
              duration: lesson.duration
            }))
        }));
      }
      
      console.log('🔍 Final curriculum data:', curriculumData);
      setCurriculum(curriculumData);
    } catch (error) {
      console.error('Error loading curriculum:', error);
      setCurriculum(null);
    } finally {
      setCurriculumLoading(false);
    }
  }, [course]);

  // Load curriculum when curriculum tab is selected (guarded to avoid refetch/flicker)
  useEffect(() => {
    if (
      activeTab === "curriculum" &&
      courseId &&
      !curriculumFetchedRef.current &&
      !curriculumLoading
    ) {
      curriculumFetchedRef.current = true;
      loadCurriculum(courseId);
    }
  }, [activeTab, courseId, curriculumLoading, loadCurriculum]);

  const handleLessonClick = (lesson: CurriculumData['modules'][0]['lessons'][0]) => {
    if (!isEnrolled) {
      alert('Please enroll in this course to access lessons');
      return;
    }

    // TODO: Navigate to lesson page or open lesson modal
    // For now, show a placeholder message
    alert(`Opening lesson: ${lesson.title}\n\nLesson functionality will be implemented soon.`);
    
    // Future implementation might look like:
    // router.push(`/courses/${courseId}/lessons/${lesson.id}`);
  };



  // Prevent hydration issues by only rendering content on client side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading course...</p>
            </div>
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
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading course...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
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
      </div>
    );
  }

  const isEnrolled = enrollment !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
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
                <Button onClick={handleEnroll} disabled={course.status !== 'active' || enrolling}>
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setActiveTab("curriculum")}>
                  Continue Learning
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isEnrolled && enrollment && (
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-gray-600">{enrollment.progress}%</span>
              </div>
              <Progress value={enrollment.progress} className="h-3" />
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
            {curriculumLoading ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading curriculum...</p>
                  </div>
                </CardContent>
              </Card>
            ) : !curriculum ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-gray-500">
                    <p>No curriculum available for this course yet.</p>
                    <p className="text-sm mt-2">Check back later for updated curriculum.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="curriculum-tab space-y-6">
                {/* Course Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="course-overview">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{curriculum.course?.title || course.title}</h2>
                      <p className="text-gray-700 mb-4">{curriculum.course?.description || course.description}</p>
                      <div className="course-stats flex space-x-6 text-sm text-gray-600">
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {curriculum.modules?.length || 0} Modules
                        </span>
                        <span className="flex items-center">
                          <Play className="w-4 h-4 mr-2" />
                          {curriculum.modules?.reduce((total: number, mod: CurriculumData['modules'][0]) => total + (mod.lessons?.length || 0), 0) || 0} Lessons
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Modules and Lessons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Curriculum Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="curriculum-content space-y-6">
                      {curriculum.modules?.map((module: CurriculumData['modules'][0], moduleIndex: number) => (
                        <div key={module.id} className="module border rounded-lg">
                          <div className="module-header p-4 bg-gray-50 border-b">
                            <h3 className="text-lg font-medium text-gray-900">
                              Module {module.order || moduleIndex + 1}: {module.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                          </div>
                          
                          <div className="lessons-list p-4">
                            {module.lessons?.map((lesson: CurriculumData['modules'][0]['lessons'][0], lessonIndex: number) => (
                              <div key={lesson.id} className="lesson-item flex items-center justify-between p-3 border rounded-lg mb-2 hover:bg-gray-50 transition-colors">
                                <div className="lesson-info flex items-center space-x-3">
                                  <span className="lesson-number text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {module.order || moduleIndex + 1}.{lesson.order || lessonIndex + 1}
                                  </span>
                                  <span className="lesson-title text-sm font-medium text-gray-900">{lesson.title}</span>
                                  {lesson.duration && (
                                    <span className="text-xs text-gray-500">
                                      {typeof lesson.duration === 'number' ? `${lesson.duration} min` : lesson.duration}
                                    </span>
                                  )}
                                </div>
                                <div className="lesson-actions">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleLessonClick(lesson)}
                                  >
                                    View Lesson
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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
    </div>
  );
}
