'use client';

import Image from 'next/image';
import Link from 'next/link';
import { timeCardFormat } from '@/libs/timeFormat';
import { IProjectContent } from '@/interface/project-content';
import { TagList } from './TagList';

interface CardProps {
  props: IProjectContent;
}

export function Card({ props }: CardProps) {
  return (
    <Link href={`project/${props.documentId}`} className="block">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 cursor-pointer">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Content */}
        <div className="relative p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold text-gray-900 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-blue-500 `}>
                {props.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {props.description}
              </p>
            </div>
            
            {/* Thumbnail */}
            <div className="ml-6 flex-shrink-0">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg transition-all duration-300">
                {props.banner ? (
                  <Image
                    src={props.banner.url}
                    alt="Project thumbnail"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-gray-400 text-xs text-center">
                    No Image
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <TagList categorys={props.tags} isSearchTag />

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {timeCardFormat(props.createdAt)}
            </span>
            
            <div className="flex items-center gap-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span className="text-xs font-medium">View Project</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const CardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 animate-pulse">
      {/* Background Gradient Skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-gray-100 to-gray-50/30" />
      
      {/* Main Content */}
      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="h-6 bg-gray-300 rounded-md mb-2 w-3/4"></div>
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          
          {/* Thumbnail */}
          <div className="ml-6 flex-shrink-0">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg">
              <div className="flex items-center justify-center h-full w-full">
                <div className="w-8 h-8 bg-gray-400 rounded opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-14"></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="h-3 bg-gray-200 rounded w-24"></div>
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}