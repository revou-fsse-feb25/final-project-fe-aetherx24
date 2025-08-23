"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useApi';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Redirect to login page
        window.location.href = '/';
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
                         <div className="p-6 border-b border-[#C9C3D9]">
                 <div className="text-2xl font-bold text-[#2B2E4A]">Luminark</div>
             </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                                                 <Link 
                             href="/dashboard" 
                             className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                 pathname === '/dashboard' 
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
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
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
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
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
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
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
                             }`}
                         >
                            <span className="mr-3">📊</span>
                            Progress
                        </Link>
                    </li>
                    <li>
                                                 <Link 
                             href="/submissions" 
                             className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                 pathname === '/submissions' 
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
                             }`}
                         >
                            <span className="mr-3">📝</span>
                            Submissions
                        </Link>
                    </li>
                    <li>
                                                 <Link 
                             href="/profile" 
                             className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                 pathname === '/profile' 
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
                             }`}
                         >
                            <span className="mr-3">👤</span>
                            Profile
                        </Link>
                    </li>
                    <li>
                                                 <Link 
                             href="/grades" 
                             className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                 pathname === '/grades' 
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
                             }`}
                         >
                            <span className="mr-3">🏆</span>
                            Grades
                        </Link>
                    </li>
                    {user?.role === 'admin' && (
                        <li>
                                                     <Link 
                             href="/admin" 
                             className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                 pathname === '/admin' 
                                     ? 'bg-[#C9C3D9] text-[#2B2E4A]' 
                                     : 'text-[#2B2E4A] hover:bg-[#F5F3E7]'
                             }`}
                         >
                                <span className="mr-3">⚙️</span>
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

                         {/* Logout Button */}
             <div className="p-4 border-t border-[#C9C3D9]">
                 <button
                     onClick={handleLogout}
                     className="w-full flex items-center justify-center px-4 py-2 text-[#2B2E4A] hover:bg-[#F5F3E7] rounded-lg transition-colors"
                 >
                    <span className="mr-3">🚪</span>
                    Logout
                </button>
            </div>
        </div>
    );
}