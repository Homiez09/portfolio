import { Card, CardSkeleton } from './Card';
import { Project } from '@/types/Project';
import { kanit } from '@/libs/fonts';
import { FC } from 'react';

interface CardListProps {
    projects: Project[];
}

export const CardList: FC<CardListProps> = ({ projects }) => {
    if (!projects) return <CardListSkeleton />;
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
                        <Card props={project} highlight='' />
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
                {[0, 0, 0, 0].map((_, key) => <CardSkeleton key={key} />)}
            </div>
        </>
    )
}