import axios from "axios";
import { CardList } from "../project/CardList";
import { Project } from "@/types/TypeProject";

const ProjectComp = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/contents`).then((res) => res).catch((err) => err.response);
    const projects: Project[] = response.data.data;
    
    return (
        <div className={`flex flex-col items-center gap-8 max-w-3xl mx-auto`}>
            <p className="text-4xl font-bold text-gray-700">
                PROJECTS
            </p>
            <CardList projects={projects} />
        </div>
    );
}

export default ProjectComp;