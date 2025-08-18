'use client';

import { FC, useState } from 'react';
import { ITag } from '@/types/Tag';
import Link from 'next/link';

export const CategoryList: FC<{ categorys: ITag[] }> = ({ categorys }) => {
    const [showAll, setShowAll] = useState(false);
    
    const displayedTags = showAll ? categorys : categorys.slice(0, 3);
    
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {displayedTags.map((tag: any, key: any) => (
              <Link href={`/search?tag=${tag.name}`}
                key={key} 
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-700"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                {tag.name}
              </Link>
            ))}
            {categorys.length > 3 && !showAll && (
              <button
                onClick={(e) => {
                    setShowAll(true)
                    e.stopPropagation()
                }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 cursor-pointer"
              >
                +{categorys.length - 3} more
              </button>
            )}
            {showAll && categorys.length > 3 && (
              <button
                onClick={(e) => {
                    setShowAll(false)
                    e.stopPropagation()
                }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 cursor-pointer"
              >
                Show less
              </button>
            )}
          </div>
        
    )
}