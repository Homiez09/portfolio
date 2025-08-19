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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            {tag.name}
        </button>
    );
}