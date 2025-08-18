import { ProjectList } from "@/components/project/ProjectList";
import { IContent } from "@/interface/content";
import axios from "axios";
import { FC } from "react";

interface SearchPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const getContents = async (search: string, tag: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/content/getAll`, {
            search,
            tag
        });
        return response.data;
    } catch (error) {
        return { data: [] };
    }
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
    const response = await getContents(searchParams.search ? String(searchParams.search) : "", (searchParams.tag || String(searchParams.tag) === 'All') ? String(searchParams.tag) : "") as IContent;

    return <ProjectList initialData={response} />;
};

export default SearchPage;