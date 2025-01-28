'use client';

import { FC, useEffect, useState } from 'react';
import { Card } from './Card';
import { CardListProps } from '@/types/CardListProps';
import { Project } from '@/types/TypeProject';
import axios from 'axios';
import { ibm } from '@/libs/font';

export const CardList: FC<CardListProps> = ({ query }) => {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [error, setError] = useState<boolean>(false);

    const fetchProjects = async () => {
        await axios.post(`/api/contents`).then((res) => {setError(false);setProjects(res.data.data)}).catch((err) => setError(true));
    }

    useEffect(() => {
        fetchProjects();
        console.log(projects);
    }, [error]);

    if (!projects) {
        return <LoadCardListSkeleton />;
    }
    if (error) { return <p>Failed to fetch projects,  Please try again.</p>; }
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

const LoadCardListSkeleton = () => {
    return (
        <div className="flex flex-col gap-5 justify-center w-full">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}