'use client';

import { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ITag } from "@/interface/tag";
import { Tag } from './Tag';

export function TagList({ categorys, isSearchTag = false }: { categorys: ITag[], isSearchTag?: boolean }) {
  const searchParams = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const displayedTags = showAll ? categorys : categorys.slice(0, 3);

  const createTagUrl = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tag', tagName);
    return `/search?${params.toString()}`;
  };

  const handleTagClick = (e: React.MouseEvent, tagName: string) => {
    e.stopPropagation();
    if (isSearchTag) router.push(createTagUrl(tagName));
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

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {displayedTags.map((tag: any, key: any) => (
        <Tag key={key} tag={tag} handleTagClick={handleTagClick} />
      ))}
      {categorys.length > 3 && !showAll && (
        <button
          onClick={handleMoreClick}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 cursor-pointer"
        >
          +{categorys.length - 3} more
        </button>
      )}
      {showAll && categorys.length > 3 && (
        <button
          onClick={handleShowLessClick}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 cursor-pointer"
        >
          Show less
        </button>
      )}
    </div>

  )
}