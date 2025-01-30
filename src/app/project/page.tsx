import { ibmbold } from "@/libs/font";
import { SearchBox } from "@/components/project/SearchBox";
import { CardList } from "@/components/project/CardList";
import { Project } from "@/types/TypeProject";
import axios from "axios";

const Page = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/contents`);
        const projects: Project[] = response.data.data;

        return (
            <>
                <div className="flex flex-col items-center gap-14 max-lg:gap-5">
                    <div className="flex flex-col items-center w-1/2 max-lg:w-full">
                        <p className={`text-4xl ${ibmbold.className} pb-5`}>Project</p>
                        <SearchBox />
                    </div>
                    <div className="flex flex-row justify-center w-1/2 max-lg:w-full">
                        <CardList projects={projects} />
                    </div>
                </div>
            </>
        );
    } catch (err) {
        return <div className="text-center">
            Failed to load project.
        </div>;
    }
}

export default Page;