'use client';

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ibmbold } from "@/libs/font";
import { CategoryList } from "@/components/project/CategoryList";
import { Project } from "@/types/TypeProject";
import { useEffect, useState } from "react";
import { timeFormat } from "@/libs/timeFormat";

export default async ({ params }: { params: { slug: string } }) => {
    const [project, setProject] = useState<Project | null>(null);
    const [error, setError] = useState<boolean | null>(null);

    const fetchProject = async () => {
        await axios.post(`/api/contents/${params.slug}`).then((res) => setProject(res.data.data)).catch((err) => setError(true));
    }

    useEffect(() => {
        fetchProject();
    }, [])

    if (!project && !error) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center">Not Found</div>;
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-end">
                <Link href="/project" className="hover:cursor-pointer hover:scale-[1.05]">{'< back'}</Link>
                {/* Date */}
                <small className="text-gray-500">{timeFormat(project!.createdAt)}</small>
            </div>
            <div className="relative w-full h-72">
                <Image
                    alt={project!.title}
                    src={project!.banner.url}
                    fill={true}
                    className="object-cover rounded-md shadow-md"
                />
            </div>
            <div className="flex flex-col gap-2 pb-5 border-b">
                {/* Title */}
                <p className={`text-3xl ${ibmbold.className} `}>{project!.title}</p>
                <div className="flex flex-row gap-1">
                    <CategoryList categorys={project!.tags} />
                </div>
            </div>
            {/* Content */}
            <div className="prose self-center">
                <ReactMarkdown
                    children={project!.content}
                />
            </div>
        </div>
    );
}