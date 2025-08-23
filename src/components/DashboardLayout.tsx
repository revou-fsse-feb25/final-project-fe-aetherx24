"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import CourseCard from './CourseCard';
import RightSidebar from './RightSidebar';
import { useApi } from '@/hooks/useApi';
import { Course } from '@/types';
import { apiClient } from '@/lib/apiClient';

export default function DashboardLayout() {
    const router = useRouter();
    const { data: enrollments, loading: coursesLoading, error: coursesError } = useApi(() => apiClient.getMyEnrollments());
    const { data: userData, loading: userLoading, error: userError } = useApi(() => apiClient.getCurrentUser());
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [timeoutError, setTimeoutError] = useState(false);
    
    // Combine loading states
    const loading = coursesLoading || userLoading;
    const error = coursesError || userError;
    
    // Fetch course details for enrollments
    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (enrollments && enrollments.length > 0) {
                try {
                    const coursePromises = enrollments.map(enrollment => 
                        apiClient.getCourse(enrollment.courseId)
                    );
                    const courses = await Promise.all(coursePromises);
                    setEnrolledCourses(courses);
                } catch (err) {
                    console.error('Failed to fetch course details:', err);
                    // Set empty array if course fetch fails
                    setEnrolledCourses([]);
                }
            } else {
                setEnrolledCourses([]);
            }
        };
        
        fetchCourseDetails();
    }, [enrollments]);

    // Add timeout protection to prevent infinite loading
    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => {
                setTimeoutError(true);
            }, 10000); // 10 second timeout

            return () => clearTimeout(timeout);
        } else {
            setTimeoutError(false);
        }
    }, [loading]);

    if (timeoutError) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⏰</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Timeout</h2>
                    <p className="text-gray-600 mb-4">The dashboard is taking too long to load. This might be due to backend issues.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                    <p className="text-sm text-gray-400 mt-2">This may take a few seconds</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Dashboard</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <p className="text-sm text-gray-500 mb-4">This usually means the backend API is not responding</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Add fallback for when data is null
    if (!enrolledCourses || !userData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">📊</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Dashboard Data</h2>
                    <p className="text-gray-600 mb-4">Unable to load dashboard information.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const handleCourseClick = (course: Course) => {
        // Navigate to course detail page using Next.js router
        router.push(`/courses/${course.id}`);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader user={userData} />
                <div className="flex-1 flex p-8">
                    <div className="flex-1">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Enrolled Courses</h2>
                            {enrolledCourses && enrolledCourses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {enrolledCourses.map((enrollment) => (
                                        <CourseCard 
                                            key={enrollment.id} 
                                            course={enrollment as Course} 
                                            onClick={handleCourseClick}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">📚</div>
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">No enrolled courses yet</h3>
                                    <p className="text-gray-500">Start your learning journey by enrolling in a course.</p>
                                    <button 
                                        onClick={() => window.location.href = '/courses'} 
                                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                                    >
                                        Browse Courses
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <RightSidebar 
                        todos={[]} 
                        recentFeedback={[]}
                        stats={{
                            totalCourses: enrolledCourses?.length || 0,
                            completedCourses: 0,
                            activeCourses: enrolledCourses?.length || 0,
                            averageGrade: 0
                        }}
                    />
                </div>
            </div>
        </div>
    );
}