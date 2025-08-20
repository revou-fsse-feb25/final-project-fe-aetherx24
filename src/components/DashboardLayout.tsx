import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import CourseCard from './CourseCard';
import RightSidebar from './RightSidebar';

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 flex p-8">
                <DashboardHeader />
                <div className="flex-1 flex p-8">
                    <div className="flex-1">
                        {/* example list of course cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <CourseCard title="[Feb25] Full-Stack Software Engineering" subtitle="FSSE - Shanghai"/>
                            {/* add more course cards here */}
                        </div>
                    </div>
                    <RightSidebar />
                </div>
            </main>
        </div>
    );
}