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
    if (projects.length === 0) return <div>No projects found.</div>;

    return (
        <>
            <div className={`flex flex-col gap-5 justify-center w-full ${kanit.className}`}>
                {projects?.map((project, key) => (
                    <div 
                        key={key} 
                        className="animate-fade-in-up opacity-0"
                        style={{
                            animationDelay: `${key * 100}ms`,
                            animationFillMode: 'forwards'
                        }}
                    >
                        <Card props={project} />
                    </div>
                ))}
            </div>
        </>
    );
}

export const CardListSkeleton = () => {
    return (
        <>
            <div className={`flex flex-col gap-5 justify-center w-full`}>
                {Array(4).fill(0).map((_, key) => <CardSkeleton key={key} />)}
            </div>
        </>
    )
}