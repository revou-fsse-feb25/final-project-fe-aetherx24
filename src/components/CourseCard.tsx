import { Course } from '@/types';

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

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`${getStatusColor(course.status)} text-white rounded-lg shadow p-4 w-64 h-32 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={handleClick}
    >
      <div>
        <h2 className="font-semibold text-sm leading-tight">{course.title}</h2>
        <p className="text-xs opacity-90 mt-1">{course.subtitle}</p>
        {course.instructor && (
          <p className="text-xs opacity-75 mt-1">Instructor: {course.instructor}</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs capitalize">{course.status}</span>
        {course.progress !== undefined && (
          <span className="text-xs">{course.progress}%</span>
        )}
      </div>
    </div>
  );
}