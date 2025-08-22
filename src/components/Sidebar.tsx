"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useApi';

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Redirect to login page
        window.location.href = '/';
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <div className="text-2xl font-bold text-blue-600">LMS</div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Link 
                            href="/dashboard" 
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                pathname === '/dashboard' 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mr-3">🏠</span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/courses" 
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                pathname === '/courses' 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mr-3">📚</span>
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/assignments" 
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                pathname === '/assignments' 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mr-3">📝</span>
                            Assignments
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/progress" 
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                pathname === '/progress' 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mr-3">📊</span>
                            Progress
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <span className="mr-3">🚪</span>
                    Logout
                </button>
            </div>
        </div>
    );
}