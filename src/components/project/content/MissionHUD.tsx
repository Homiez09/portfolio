import Link from "next/link";
import { timeFormat } from "@/libs/timeFormat";

interface MissionHUDProps {
    createdAt: string;
}

export const MissionHUD = ({ createdAt }: MissionHUDProps) => {
    return (
        <div className="flex justify-between items-center border-b-2 border-emerald-500 pb-4 mb-10 font-mono">
            <Link href="/" className="text-emerald-500 hover:text-white hover:bg-emerald-600 uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 bg-emerald-900/20 px-4 py-1.5 border border-emerald-500/50 transition-all">
                <span>{'<'} BACK</span>
            </Link>
            <div className="text-emerald-600 text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-600 block animate-pulse"></span>
                LOG_DATE: {timeFormat(createdAt)}
            </div>
        </div>
    );
};
