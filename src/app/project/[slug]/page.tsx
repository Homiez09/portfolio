import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ibmbold } from "@/libs/font";
import { CategoryList } from "@/components/project/CategoryList";
import { Project } from "@/types/TypeProject";
import { timeFormat } from "@/libs/timeFormat";
import { Metadata } from "next";

type Props = {
    params: { slug: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/contents/${params.slug}`);
        const project: Project = response.data.data;

        return {
            title: project.title,
            description: project.description,
            openGraph: {
                title: project.title,
                description: project.description,
                images: [
                    {
                        url: project.banner.url,
                        alt: project.title,
                    },
                ],
            },
        };
    } catch (error) {
        return {
            title: "Project Not Found",
            description: "The project you are looking for does not exist.",
        };
    }
};



export default async function Page ({ params }: Props) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/contents/${params.slug}`).then((res) => res).catch((err) => err.response);
    const project: Project = response.data.data;

    if (response.status === 400) return <div className="text-center">Not Found</div>;
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

export const ProjectSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 animate-pulse">
            <div className="flex flex-row justify-between items-end">
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="relative w-full h-72 bg-gray-300 rounded-md"></div>
            <div className="flex flex-col gap-2 pb-5 border-b">
                <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                <div className="flex flex-row gap-1">
                    <div className="w-12 h-6 bg-gray-300 rounded"></div>
                    <div className="w-12 h-6 bg-gray-300 rounded"></div>
                    <div className="w-12 h-6 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="prose self-center w-full h-40 bg-gray-300 rounded"></div>
        </div>
    );
}