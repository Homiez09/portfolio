'use client';

import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { ImageViewer } from "@/components/theme/ImageViewer";
import { IProjectContent } from '@/interface/project-content';
import { MissionHUD } from '../project/content/MissionHUD';
import { MissionHeader } from '../project/content/MissionHeader';
import { IntelGallery } from '../project/content/IntelGallery';

interface ProjectContentProps {
    project: IProjectContent;
}

export const ProjectContent = ({ project }: ProjectContentProps) => {
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openViewer = (index: number) => {
        setSelectedImageIndex(index);
        setIsViewerOpen(true);
    };

    return (
        <article className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-32">
            
            <MissionHUD createdAt={project.createdAt} />
            <MissionHeader title={project.title} tags={project.tags} />
            
            {/* Mission Log (Markdown) */}
            <div className="bg-neutral-900/80 border border-emerald-900/50 p-4 md:p-10 relative mb-12 md:mb-16 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(16,185,129,0.02)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500"></div>

                <div className="prose prose-invert max-w-none 
                    prose-headings:text-white prose-headings:uppercase prose-headings:font-black prose-headings:tracking-wider
                    prose-p:text-emerald-100/70 prose-p:font-mono prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base
                    prose-a:text-emerald-400 prose-a:underline prose-a:decoration-emerald-500/50 hover:prose-a:decoration-emerald-400
                    prose-strong:text-emerald-300
                    prose-code:text-red-400 prose-code:bg-neutral-950 prose-code:px-1 prose-code:border prose-code:border-red-900/50
                    prose-ul:text-emerald-100/70 prose-ul:font-mono
                    prose-ol:text-emerald-100/70 prose-ol:font-mono
                    prose-img:border prose-img:border-emerald-900/50 prose-img:rounded-none">
                    <ReactMarkdown>
                        {project.content}
                    </ReactMarkdown>
                </div>
            </div>
            
            <IntelGallery screenshots={project.screenshots} onOpenViewer={openViewer} />

            <ImageViewer
                images={project.screenshots || []}
                initialIndex={selectedImageIndex}
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
            />
        </article>
    );
};
