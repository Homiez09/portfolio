'use client';

import { useState } from 'react';
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { CategoryList } from "@/components/project/CategoryList";
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

    const closeViewer = () => {
        setIsViewerOpen(false);
    };

    return (
        <>
            <div className="flex flex-col gap-3 mb-14">
                <div className="flex flex-row justify-between items-end">
                    <Link href="/search" className="hover:cursor-pointer hover:scale-[1.05]">{'< back'}</Link>
                    {/* Date */}
                    <small className="text-gray-500">{timeFormat(project.createdAt)}</small>
                </div>
                
                <div className="flex flex-col gap-2 pb-3 border-b">
                    {/* Title */}
                    <p className='text-3xl font-bold'>{project.title}</p>
                    <div className="flex flex-row gap-1">
                        <CategoryList categorys={project.tags} />
                    </div>
                </div>
                
                {/* Content */}
                <div className="prose self-center">
                    <ReactMarkdown>
                        {project.content}
                    </ReactMarkdown>
                </div>
                
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Screenshots</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project?.screenshots?.map((screenshot, index) => (
                            <div 
                                key={screenshot.id} 
                                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                                onClick={() => openViewer(index)}
                            >
                                <div className="relative aspect-video bg-gray-100">
                                    <Image
                                        src={screenshot.url}
                                        alt={`Screenshot ${index + 1} of ${project.title}`}
                                        fill
                                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                                    {/* Click indicator */}
                                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-sm font-medium">
                                        Screenshot {index + 1}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {(!project?.screenshots || project.screenshots.length === 0) && (
                        <div className="text-center py-12 text-gray-500">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p>No screenshots available for this project</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Viewer */}
            <ImageViewer
                images={project.screenshots || []}
                initialIndex={selectedImageIndex}
                isOpen={isViewerOpen}
                onClose={closeViewer}
            />
        </>
    );
};
