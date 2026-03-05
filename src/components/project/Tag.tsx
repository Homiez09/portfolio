'use client';

import { ITag } from "@/interface/tag";

export function Tag({ tag, handleTagClick }: { tag: ITag; handleTagClick: (e: React.MouseEvent, tagName: string) => void }) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleTagClick(e, tag.name);
    };

    return (
        <button
            onClick={handleClick}
            className="group relative inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-900/50 bg-emerald-950/30 text-[9px] font-mono font-bold text-emerald-500 hover:border-emerald-400 hover:text-emerald-300 transition-all duration-200 uppercase tracking-widest overflow-hidden"
        >
            <span className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <div className="w-1 h-1 bg-emerald-500 group-hover:animate-pulse" />
            {tag.name}
        </button>
    );
}
