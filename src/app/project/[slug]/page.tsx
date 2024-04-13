import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ibmbold } from "@/libs/font";
import { projects } from "@/libs/hardCodeData"
import { CategoryList } from "@/components/project/CategoryList";

export default async ({ params }: { params: { slug: string } }) => {
    const project = projects.find((project) => project.id === Number(params.slug));
    if (!project) return <div className="text-center">Not Found</div>;

    return await axios.get(project!.content).then((res) => {
        return (
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between items-end">
                    <Link href="/project" className="hover:cursor-pointer hover:scale-[1.05]">{'< back'}</Link>
                    {/* Date */}
                    <small className="text-gray-500">{project!.createAt}</small>
                </div>
                <div className="relative w-full h-72">
                    <Image
                        alt={project!.title}
                        src={project!.image}
                        fill={true}
                        className="object-cover rounded-md shadow-md"
                    />
                </div>
                <div className="flex flex-col gap-2 pb-5 border-b">
                    {/* Title */}
                    <p className={`text-3xl ${ibmbold.className} `}>{project!.title}</p>
                    <div className="flex flex-row gap-1">
                        <CategoryList categorys={project!.categorys} />
                    </div>
                </div>
                {/* Content */}
                <div className="prose">
                    <ReactMarkdown
                        children={res.data}
                    />
                </div>
                <Link href={project!.link} className="w-auto text-blue-400 hover:text-blue-500">@{project!.link}</Link>
            </div>
        );
    });
}