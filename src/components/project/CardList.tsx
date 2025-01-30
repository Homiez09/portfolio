'use client';

import { Card, CardSkeleton } from './Card';
import { Project } from '@/types/TypeProject';
import { ibm } from '@/libs/font';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const CardList = () => {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const query = useSearchParams().get("query") || "";

    const fetchProjects = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/contents`).then((res) => res).catch((err) => err.response);
        setProjects(response.data.data);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    if (!projects) return <CardListSkeleton />;
    if (projects.length === 0) return <div>No projects found.</div>;

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

export const CardListSkeleton = () => {
    return (
        <>
            <div className={`flex flex-col gap-5 justify-center w-full ${ibm.className}`}>
                {[0, 0, 0, 0].map((_, key) => <CardSkeleton key={key} />)}
            </div>
        </>
    )
}