'use client';

import { ibm } from "@/libs/font";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`mt-8 ${ibm.className}`}>
                {children}
            </div>
        </>
    );
}