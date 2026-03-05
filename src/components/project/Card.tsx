'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { timeCardFormat } from '@/libs/timeFormat';
import { IProjectContent } from '@/interface/project-content';
import { TagList } from './TagList';

interface CardProps {
  props: IProjectContent;
}

export function Card({ props }: CardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${props.documentId}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group block w-full h-full relative cursor-crosshair"
    >
      {/* Decorative borders (Neon Glow effect on hover) */}
      <div className="absolute -inset-[1px] bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[3px]"></div>
      
      <div className="relative h-full flex flex-col p-1 bg-neutral-950 border border-emerald-900/60 transition-all duration-300 group-hover:border-emerald-400">
        
        {/* Top bar info */}
        <div className="flex justify-between items-center px-4 py-2 bg-neutral-900/80 border-b border-emerald-900/50 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500"></span>
                <span className="text-emerald-400">LVL. {(props.id.toString().length * 7) % 90 + 10}</span>
            </div>
            <span className="text-emerald-600">{timeCardFormat(props.createdAt)}</span>
        </div>

        {/* Thumbnail with CRT/Scanline effect */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-b border-emerald-900/30">
          {props.banner ? (
            <Image
              src={props.banner.url}
              alt={props.title}
              fill
              className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full font-mono text-emerald-900/50 text-xs uppercase tracking-widest">
              NO SIGNAL
            </div>
          )}
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40 mix-blend-overlay"></div>
        </div>

        {/* Content Details */}
        <div className="flex flex-col flex-grow p-5 gap-3 bg-neutral-950">
          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider group-hover:text-emerald-400 transition-colors line-clamp-1 [text-shadow:1px_1px_0px_#000]">
            {props.title}
          </h3>
          <p className="text-xs text-emerald-100/60 font-mono leading-relaxed line-clamp-2 flex-grow">
            {props.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-4 mt-auto" onClick={(e) => e.stopPropagation()}>
            <TagList categorys={props.tags} isSearchTag />
          </div>
        </div>

      </div>
    </div>
  );
}

export const CardSkeleton = () => {
  return (
    <div className="h-full flex flex-col p-1 bg-neutral-950 border border-emerald-900/30 animate-pulse">
      <div className="h-8 bg-neutral-900 border-b border-emerald-900/30"></div>
      <div className="aspect-video bg-neutral-900"></div>
      <div className="p-5 space-y-4">
        <div className="h-6 w-3/4 bg-emerald-900/20"></div>
        <div className="h-10 w-full bg-emerald-900/20"></div>
      </div>
    </div>
  );
}
