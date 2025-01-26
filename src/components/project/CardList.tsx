'use client';

import { FC, useEffect, useState } from 'react';
import { Card } from './Card';
import { CardListProps } from '@/types/CardListProps';
import { Project } from '@/types/TypeProject';
import axios from 'axios';

export const CardList: FC<CardListProps> = ({ query }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {
        await axios.get(`/api/contents`).then((res) => {console.log(res.data.data);setProjects(res.data.data)});
    }

    useEffect(() => {
        fetchProjects();
        console.log(projects);
    }, []);

    if (!projects) {
        return <p>Loading...</p>;
    }
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