import { TodoItem, Feedback } from '@/types';

interface RightSidebarProps {
  todos?: TodoItem[];
  recentFeedback?: Feedback[];
  stats?: {
    totalCourses: number;
    completedCourses: number;
    activeCourses: number;
    averageGrade?: number;
  };
}

export default function RightSidebar({ todos, recentFeedback, stats }: RightSidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 border-l px-4 py-6">
      {/* Stats Section */}
      {stats && (
        <div className="mb-6">
          <h3 className="font-bold mb-3 text-gray-800">Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Courses:</span>
              <span className="font-medium">{stats.totalCourses}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active:</span>
              <span className="font-medium text-green-600">{stats.activeCourses}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completed:</span>
              <span className="font-medium text-blue-600">{stats.completedCourses}</span>
            </div>
            {stats.averageGrade && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Grade:</span>
                <span className="font-medium">{stats.averageGrade}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Todo Section */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800">To Do</h3>
        {todos && todos.length > 0 ? (
          <div className="space-y-2">
            {todos.slice(0, 3).map((todo) => (
              <div key={todo.id} className="text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {/* TODO: Implement toggle */}}
                    className="rounded"
                  />
                  <span className={todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                    {todo.title}
                  </span>
                </div>
                {todo.dueDate && (
                  <p className="text-xs text-gray-500 ml-6">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nothing for now</p>
        )}
      </div>

      {/* Recent Feedback Section */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800">Recent Feedback</h3>
        {recentFeedback && recentFeedback.length > 0 ? (
          <div className="space-y-2">
            {recentFeedback.slice(0, 2).map((feedback) => (
              <div key={feedback.id} className="text-sm">
                <p className="font-medium text-gray-700">{feedback.courseTitle}</p>
                <p className="text-gray-600 text-xs">{feedback.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No feedback yet</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-2 hover:bg-blue-700 transition-colors">
          Start a New Course
        </button>
        <button className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors">
          View Grades
        </button>
      </div>
    </aside>
  );
}
