import { Metadata } from "next";
import { ProjectContent } from "@/components/theme/ProjectContent";
import { IProjectContent } from "@/interface/project-content";
import { getProjectById } from "@/libs/api";

type Props = {
    params: { slug: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    try {
        const response = await getProjectById(params.slug);
        const project: IProjectContent = response.data;
        if (!project) throw new Error("Not found");
        
        return {
            title: project.title,
            description: project.description,
            openGraph: {
                title: project.title,
                description: project.description,
                images: project.banner?.url ? [
                    {
                        url: project.banner.url,
                        alt: project.title,
                    },
                ] : [],
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
        const response = await getProjectById(params.slug);
        const project: IProjectContent = response.data;

        if (!project) {
            return <div className="text-center py-20 opacity-50 font-light">
                Project not found.
            </div>;
        }

        return <ProjectContent project={project} />;
    } catch (err) {
        return <div className="text-center py-20 opacity-50 font-light">
            Failed to load project details.
        </div>;
    }
}

export default Page;