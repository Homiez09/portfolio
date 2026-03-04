'use client';

import { IProjectContent } from '@/interface/project-content';
import { Card, CardSkeleton } from './Card';
import { kanit } from '@/libs/fonts';
import { FC } from 'react';

interface CardListProps {
    projects: IProjectContent[];
    isLoading?: boolean;
}

export const CardList: FC<CardListProps> = ({ projects, isLoading }) => {
    if (isLoading) return <CardListSkeleton />;
    if (projects.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 bg-neutral-900/50 border border-dashed border-emerald-900/50">
            <p className="text-emerald-600 font-mono text-sm uppercase tracking-widest animate-pulse">{'>'} ERR: NO MATCHING RECORDS FOUND.</p>
        </div>
    );

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full ${kanit.className}`}>
            {projects?.map((project, key) => (
                <div 
                    key={key} 
                    className="animate-in fade-in slide-in-from-bottom-8 duration-500"
                    style={{
                        animationDelay: `${key * 100}ms`,
                    }}
                >
                    <Card props={project} />
                </div>
            ))}
        </div>
    );
}

export const CardListSkeleton = () => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full`}>
            {Array(4).fill(0).map((_, key) => <CardSkeleton key={key} />)}
        </div>
    )
}
