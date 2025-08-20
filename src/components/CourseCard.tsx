type CourseCardProps = {
    title: string;
    subtitle: string;
};

export default function CourseCard({ title, subtitle}: CourseCardProps) {
    return (
        <div className="bg-orange-500 text-white rounded-lg shadow p-4 w-64 h-32 flex flex-col justify-between">
            <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm">{subtitle}</p>
            </div>
            <button className="self-end text-xs underline">More</button>
        </div>
    );
}