import { ibm } from "@/libs/font";
import { Suspense } from "react";
import { ProjectSkeleton } from "./page";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex justify-center ${ibm.className}`}>
            <div className="w-[680px]">
                <Suspense fallback={<ProjectSkeleton />}> 
                    {children}
                </Suspense>
            </div>
        </div>
    );
}