import axios from "axios";
import { Project } from "@/types/Project";
import { Metadata } from "next";
import { ProjectContent } from "@/components/theme/ProjectContent";

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

        return <ProjectContent project={project} />;
    } catch (err) {
        return <div className="text-center">
            Failed to load project.
        </div>;
    }
}

export default Page;