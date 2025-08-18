import Image from 'next/image';
import { kanit } from '@/libs/fonts';
import Link from 'next/link';
import { timeCardFormat } from '@/libs/timeFormat';
import { Project } from '@/types/Project';
import { CategoryList } from './CategoryList';

export const Card = ({ props, highlight }: { props: Project, highlight: string }) => {
  return (

      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-500 ease-out">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Content */}
        <div className="relative p-6">
          {/* Header Section */}
          <Link href={`project/${props.documentId}`} className="flex items-start justify-between mb-4">
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
          </Link>

          {/* Tags Section */}
          <CategoryList categorys={props.tags} />

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {timeCardFormat(props.createdAt)}
            </span>
            
            <div className="flex items-center gap-1 text-blue-600 opacity-0 transition-all duration-300 transform translate-x-2">
              <span className="text-xs font-medium">View Project</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
}

export const CardSkeleton = () => {
  return (
    <>
      <div className="flex flex-row w-full pb-5 lg:px-5 gap-3 select-none animate-pulse">
        <div className="flex flex-col p-2 w-2/3">
          <div className="flex flex-col gap-2">
            {/* Title */}
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-4 bg-gray-300 rounded"></div>
          </div>
          {/* Categorys */}
          <div className="pt-2 flex flex-row gap-2">
            <div className="w-6 h-3 bg-gray-300 rounded"></div>
            <div className="w-6 h-3 bg-gray-300 rounded"></div>
            <div className="w-6 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Image */}
        <div className="ml-auto">
          <div className="relative flex flex-col items-end w-[150px] h-[84px] overflow-hidden rounded-md shadow-md bg-gray-100">
            <div className='w-full h-full bg-gray-300 rounded'>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}