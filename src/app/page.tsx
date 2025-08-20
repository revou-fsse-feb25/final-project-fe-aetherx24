import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your LMS Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          This is a test page to check for hydration errors.
        </p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Test Component</h2>
            <p className="text-sm text-gray-500">If you see this without errors, hydration is working!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
