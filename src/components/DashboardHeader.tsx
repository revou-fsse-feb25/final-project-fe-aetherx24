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
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    {user && (
                        <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
                    )}
                </div>
                {user && (
                    <div className="flex items-center space-x-3">
                        {user.avatar && (
                            <Image 
                                src={user.avatar} 
                                alt={user.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}
                        <div className="text-right">
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}