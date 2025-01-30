import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-center'>
            <div className="w-[680px]">
                <Suspense fallback={<ProjectSkeleton />}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}

const ProjectSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 animate-pulse">
            <div className="flex flex-row justify-between items-end">
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="relative w-full h-72 bg-gray-300 rounded-md"></div>
            <div className="flex flex-col gap-2 pb-5 border-b">
                <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                <div className="flex flex-row gap-1">
                    <div className="w-12 h-6 bg-gray-300 rounded"></div>
                    <div className="w-12 h-6 bg-gray-300 rounded"></div>
                    <div className="w-12 h-6 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="prose self-center w-full h-40 bg-gray-300 rounded"></div>
        </div>
    );
}