import { User } from '@/types';
import Image from 'next/image';

interface DashboardHeaderProps {
  user?: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
    return (
        <header className="py-6 px-8 border-b bg-white">
            <div className="flex justify-between items-center">
                <div>
                                         <div className="flex items-center space-x-3 mb-2">
                         <div className="w-8 h-8 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-lg flex items-center justify-center">
                             <span className="text-white font-bold text-sm">L</span>
                         </div>
                         <span className="text-lg font-semibold text-[#2B2E4A]">Luminark</span>
                     </div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    {user && (
                        <p className="text-gray-600 mt-1">Welcome back, {user.firstName || user.fullName}!</p>
                    )}
                </div>
                {user && (
                    <div className="flex items-center space-x-3">
                        {user.avatar && (
                            <Image 
                                src={user.avatar} 
                                alt={user.fullName || `${user.firstName} ${user.lastName}`}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}
                        <div className="text-right">
                            <p className="font-medium text-gray-800">{user.fullName || `${user.firstName} ${user.lastName}`}</p>
                            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}