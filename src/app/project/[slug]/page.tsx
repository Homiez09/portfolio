import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { CategoryList } from "@/components/project/CategoryList";
import { Project } from "@/types/Project";
import { timeFormat } from "@/libs/timeFormat";
import { Metadata } from "next";

type Props = {
    params: { slug: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/content/${params.slug}`);
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

const Page = async ({ params }: Props) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/content/${params.slug}`);
        const project: Project = response.data.data;
    
        return (
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between items-end">
                    <Link href="/search" className="hover:cursor-pointer hover:scale-[1.05]">{'< back'}</Link>
                    {/* Date */}
                    <small className="text-gray-500">{timeFormat(project!.createdAt)}</small>
                </div>
                {/* <div className="relative w-full h-72">
                    <Image
                        alt={project!.title}
                        src={project!.banner.url}
                        fill={true}
                        className={`rounded-md shadow-md ${project!.banner.height > project!.banner.width ? 'object-contain' : 'object-cover'}`}
                    />
                </div> */}
                <div className="flex flex-col gap-2 pb-5 border-b">
                    {/* Title */}
                    <p className='text-3xl font-bold'>{project!.title}</p>
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
    } catch (err) {
        return <div className="text-center">
            Failed to load project.
        </div>;
    }
}

export default Page;