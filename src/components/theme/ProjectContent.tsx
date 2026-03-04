'use client';

import { useState } from 'react';
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { timeFormat } from "@/libs/timeFormat";
import Image from "next/image";
import { ImageViewer } from "@/components/theme/ImageViewer";
import { IProjectContent } from '@/interface/project-content';

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
            
            {/* Top HUD */}
            <div className="flex justify-between items-center border-b-2 border-emerald-500 pb-4 mb-10 font-mono">
                <Link href="/" className="text-emerald-500 hover:text-white hover:bg-emerald-600 uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 bg-emerald-900/20 px-4 py-1.5 border border-emerald-500/50 transition-all">
                    <span>{'<'} ABORT_MISSION</span>
                </Link>
                <div className="text-emerald-600 text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 block animate-pulse"></span>
                    LOG_DATE: {timeFormat(project.createdAt)}
                </div>
            </div>
            
            {/* Mission Title */}
            <header className="mb-8 md:mb-12 border-l-4 border-emerald-500 pl-4 md:pl-8 relative">
                <div className="absolute top-0 -left-[14px] w-6 h-1 bg-emerald-500"></div>
                <div className="absolute bottom-0 -left-[14px] w-6 h-1 bg-emerald-500"></div>
                
                <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 [text-shadow:2px_2px_0px_#059669]">
                    {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                    {project.tags?.map((t, i) => (
                        <span key={i} className="px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-mono border border-emerald-500/50 text-emerald-400 bg-emerald-950 uppercase tracking-widest">
                            CLASS: {t.name}
                        </span>
                    ))}
                </div>
            </header>
            
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
            
            {/* Intel / Screenshots */}
            <section>
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-xl font-bold text-emerald-500 uppercase tracking-widest font-mono">ATTACHED_INTEL</h2>
                    <div className="flex-grow h-px bg-emerald-900/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project?.screenshots?.map((screenshot, index) => (
                        <div 
                            key={screenshot.id} 
                            className="group relative cursor-pointer border border-emerald-900/50 bg-neutral-900 p-1 hover:border-emerald-400 transition-colors duration-300"
                            onClick={() => openViewer(index)}
                        >
                            <div className="relative aspect-video overflow-hidden bg-neutral-950">
                                <Image
                                    src={screenshot.url}
                                    alt={`Intel ${index + 1}`}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40 mix-blend-overlay"></div>
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1.5 border border-emerald-900/80 text-[10px] text-emerald-400 uppercase font-mono tracking-widest backdrop-blur-sm">
                                INTEL_{index + 1}.IMG
                            </div>
                        </div>
                    ))}
                </div>

                {(!project?.screenshots || project.screenshots.length === 0) && (
                    <div className="text-center py-16 border border-dashed border-emerald-900/50 bg-neutral-900/30 text-emerald-700 text-xs font-mono uppercase tracking-widest">
                        [ NO VISUAL DATA ATTACHED TO THIS RECORD ]
                    </div>
                )}
            </section>

            {/* Image Viewer */}
            <ImageViewer
                images={project.screenshots || []}
                initialIndex={selectedImageIndex}
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
            />
        </article>
    );
};
