import { ITag } from "@/interface/tag";

interface MissionHeaderProps {
    title: string;
    tags?: ITag[];
}

export const MissionHeader = ({ title, tags }: MissionHeaderProps) => {
    return (
        <header className="mb-8 md:mb-12 border-l-4 border-emerald-500 pl-4 md:pl-8 relative">
            <div className="absolute top-0 -left-[14px] w-6 h-1 bg-emerald-500"></div>
            <div className="absolute bottom-0 -left-[14px] w-6 h-1 bg-emerald-500"></div>
            
            <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 [text-shadow:2px_2px_0px_#059669]">
                {title}
            </h1>
            <div className="flex flex-wrap gap-2">
                {tags?.map((t, i) => (
                    <span key={i} className="px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-mono border border-emerald-500/50 text-emerald-400 bg-emerald-950 uppercase tracking-widest">
                        CLASS: {t.name}
                    </span>
                ))}
            </div>
        </header>
    );
};
