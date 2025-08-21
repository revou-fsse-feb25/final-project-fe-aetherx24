import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
        { href: '/courses', icon: '📚', label: 'Courses' },
        { href: '/grades', icon: '📊', label: 'Grades' },
        { href: '/profile', icon: '👤', label: 'Profile' },
        { href: '/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <aside className="bg-gray-800 text-white w-20 flex flex-col items-center py-4 min-h-screen">
            <div className="mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    L
                </div>
            </div>
            
            <nav className="flex-1 space-y-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex flex-col items-center p-2 rounded-lg transition-colors ${
                                isActive 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                            title={item.label}
                        >
                            <span className="text-2xl mb-1">{item.icon}</span>
                            <span className="text-xs text-center">{item.label}</span>
                            
                            {/* Tooltip */}
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>
            
            <div className="mt-auto">
                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Logout">
                    <span className="text-xl">🚪</span>
                </button>
            </div>
        </aside>
    );
}