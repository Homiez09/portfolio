'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ITag } from "@/interface/tag";
import { Tag } from './Tag';

export function TagList({ categorys, isSearchTag = false }: { categorys: ITag[], isSearchTag?: boolean }) {
  const searchParams = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const displayedTags = showAll ? categorys : categorys.slice(0, 3);

  const createTagUrl = (tagName: string) => {
    const params = new URLSearchParams();
    params.set('tag', tagName);
    params.set('page', '1');
    return `/search?${params.toString()}`;
  };

  const handleTagClick = (e: React.MouseEvent, tagName: string) => {
    e.stopPropagation();
    router.push(createTagUrl(tagName));
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAll(true);
  };

  const handleShowLessClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAll(false);
  };

  if (!categorys || categorys.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {displayedTags.map((tag, key) => (
        <Tag key={key} tag={tag} handleTagClick={handleTagClick} />
      ))}
      
      {categorys.length > 3 && !showAll && (
        <button
          onClick={handleMoreClick}
          className="inline-flex items-center px-2 py-0.5 border border-emerald-900/30 bg-transparent text-[9px] font-mono text-emerald-700 hover:text-emerald-500 hover:border-emerald-800 transition-all uppercase tracking-widest"
        >
          +{categorys.length - 3} MORE_DATA
        </button>
      )}
      
      {showAll && categorys.length > 3 && (
        <button
          onClick={handleShowLessClick}
          className="inline-flex items-center px-2 py-0.5 border border-emerald-900/30 bg-transparent text-[9px] font-mono text-emerald-700 hover:text-emerald-500 hover:border-emerald-800 transition-all uppercase tracking-widest"
        >
          [-] COLLAPSE
        </button>
      )}
    </div>
  )
}
