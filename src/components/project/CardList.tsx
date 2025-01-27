'use client';

import { FC, useEffect, useState } from 'react';
import { Card } from './Card';
import { CardListProps } from '@/types/CardListProps';
import { Project } from '@/types/TypeProject';
import axios from 'axios';

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
        return <p>Loading...</p>;
    }
    if (error) { return <p>Failed to fetch projects,  Please try again.</p>; }
    return (
        <>
            <div className="flex flex-col gap-5 justify-center w-full">
                {projects.filter((project) => {
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