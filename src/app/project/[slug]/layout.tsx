import { ibm } from "@/libs/font";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex justify-center ${ibm.className}`}>
            <div className="w-[680px] pb-16">
                {children}
            </div>
        </div>
    );
}