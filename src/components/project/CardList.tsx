'use client';

import { Card } from './Card';
import { Project } from '@/types/TypeProject';
import { ibm } from '@/libs/font';
import { useSearchParams } from 'next/navigation';

export const CardList = ({ projects } : { projects: Project[] | [] }) => {    
    if (projects.length === 0) return <div>No projects found.</div>;
    const query = useSearchParams().get("query") || "";
    
    return (
        <>
            <div className={`flex flex-col gap-5 justify-center w-full ${ibm.className}`}>
                {projects?.filter((project) => {
                    if (query) {
                        return project.title.toLowerCase().includes(query.toLowerCase()) ||
                            project.description.toLowerCase().includes(query.toLowerCase()) ||
                            project.tags.some((tag) => tag.name.toLowerCase().includes(query.toLowerCase()));
                    }
                    return true;
                }).map((project, key) => (
                    <Card key={key} props={project} highlight={query} />
                ))}
            </div>
        </>
    );
}