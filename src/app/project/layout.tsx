import { ibm } from "@/libs/fonts";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`mt-8 ${ibm.className}`}>
                <Suspense>
                    {children}
                </Suspense>
            </div>
        </>
    );
}