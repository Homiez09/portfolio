'use client';

import { FC } from 'react';
import { Card } from './Card';
import { projects } from '@/libs/hardCodeData';

export const CardList: FC<{ query: string }> = ({ query }) => {
    return (
        <>
            <div className="flex flex-col gap-5 justify-center w-full">
                {projects.filter((project) => {
                    if (query) {
                        return project.title.toLowerCase().includes(query.toLowerCase()) ||
                            project.detail.toLowerCase().includes(query.toLowerCase()) ||
                            project.categorys.some((cat) => cat.toLowerCase().includes(query.toLowerCase()));
                    }
                    return true;
                }).map((project, key) => (
                    <Card key={key} props={project} />
                ))}
            </div>
        </>
    );
}