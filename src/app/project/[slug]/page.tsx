import { ibmbold } from "@/libs/font";
import { projects } from "@/libs/hardCodeData"
import Image from "next/image";
import { Tag } from 'antd';
import Link from "next/link";

export default ({ params }: { params: { slug: string } }) => {
    const project = projects.find((project) => project.id === Number(params.slug));

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-end">
                <Link href="/project" className="hover:cursor-pointer hover:scale-[1.05]">{'< back'}</Link>
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
            <div>
                <p className={`text-3xl ${ibmbold.className}`}>{project!.title}</p>
                <div className="flex flex-row gap-1">
                    {project!.categorys.map((category: string, key: any) => (
                        <Tag key={key} bordered={false} color="processing" className="hover:cursor-pointer">{category}</Tag>
                    ))}
                </div>
            </div>
            <p>{project!.detail}</p>
            <Link href={project!.link} className="w-auto text-blue-400 hover:text-blue-500">@{project!.link}</Link>
        </div>
    );
}
