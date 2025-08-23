import { Course } from '@/types';
import { MoreVertical } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick?: (course: Course) => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  // Generate a consistent color for each course based on its ID
  const getCourseColor = (courseId: string) => {
    const colors = [
      'bg-orange-500',    // Orange
      'bg-blue-500',      // Blue
      'bg-green-500',     // Green
      'bg-purple-500',    // Purple
      'bg-red-500',       // Red
      'bg-teal-500',      // Teal
      'bg-pink-500',      // Pink
      'bg-indigo-500',    // Indigo
    ];
    
    // Use course ID to consistently assign colors
    const colorIndex = courseId.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  // Format course title with date prefix if available
  const formatCourseTitle = (title: string) => {
    // Extract date from title if it exists, otherwise use current month
    const currentDate = new Date();
    const month = currentDate.toLocaleString('en', { month: 'short' });
    const year = currentDate.getFullYear().toString().slice(-2);
    const datePrefix = `[${month}${year}]`;
    
    // Truncate title if too long
    const maxLength = 25;
    const truncatedTitle = title.length > maxLength 
      ? title.substring(0, maxLength) + '...' 
      : title;
    
    return `${datePrefix} ${truncatedTitle}`;
  };

  // Format subtitle with location if available
  const formatSubtitle = (subtitle: string) => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('en', { month: 'short' });
    const year = currentDate.getFullYear().toString().slice(-2);
    const datePrefix = `[${month}${year}]`;
    
    // Use subtitle if available, otherwise create a generic one
    const courseSubtitle = subtitle || `${course.title.split(' ').slice(0, 3).join(' ')} - Shanghai`;
    return `${datePrefix} ${courseSubtitle}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Colored Header Section */}
      <div className={`${getCourseColor(course.id)} h-32 relative`}>
        {/* More options menu (three dots) */}
        <div className="absolute top-3 right-3">
          <MoreVertical className="w-5 h-5 text-white opacity-80 hover:opacity-100" />
        </div>
      </div>
      
      {/* White Content Section */}
      <div className="p-4 h-20 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-900 text-sm leading-tight">
            {formatCourseTitle(course.title)}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {formatSubtitle(course.subtitle)}
          </p>
        </div>
        
        {/* Course status indicator */}
        <div className="flex justify-between items-center mt-2">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            course.status === 'active' ? 'bg-green-100 text-green-800' :
            course.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            course.status === 'upcoming' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {course.status}
          </span>
          
          {course.progress !== undefined && (
            <span className="text-xs text-gray-500">
              {course.progress}% complete
            </span>
          )}
        </div>
      </div>
    </div>
  );
}