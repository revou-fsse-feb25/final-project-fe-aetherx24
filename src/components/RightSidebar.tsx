// RightSidebar.tsx
export default function RightSidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-l px-4 py-6">
      <div className="mb-6">
        <h3 className="font-bold mb-2">To Do</h3>
        <p className="text-sm text-gray-500">Nothing for now</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-2">Recent Feedback</h3>
        <p className="text-sm text-gray-500">Nothing for now</p>
      </div>
      <div>
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-2">Start a New Course</button>
        <button className="w-full border py-2 rounded">View Grades</button>
      </div>
    </aside>
  );
}
