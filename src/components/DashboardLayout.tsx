import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import CourseCard from './CourseCard';
import RightSidebar from './RightSidebar';
import { useDashboardData } from '@/hooks/useApi';
import { Course } from '@/types';

export default function DashboardLayout() {
    const { data: dashboardData, loading, error } = useDashboardData();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
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
        // TODO: Navigate to course detail page
        console.log('Course clicked:', course);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader user={dashboardData?.user} />
                <div className="flex-1 flex p-8">
                    <div className="flex-1">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Courses</h2>
                            {dashboardData?.courses && dashboardData.courses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {dashboardData.courses.map((course) => (
                                        <CourseCard 
                                            key={course.id} 
                                            course={course} 
                                            onClick={handleCourseClick}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">📚</div>
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">No courses yet</h3>
                                    <p className="text-gray-500">Start your learning journey by enrolling in a course.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <RightSidebar 
                        todos={dashboardData?.todos} 
                        recentFeedback={dashboardData?.recentFeedback}
                        stats={dashboardData?.stats}
                    />
                </div>
            </div>
        </div>
    );
}