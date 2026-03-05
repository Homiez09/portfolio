import { ProjectList } from "@/components/project/ProjectList";
import { IContent } from "@/interface/content";
import { FC } from "react";
import { getContentsLogic } from "@/libs/api";

interface SearchPageProps {
    searchParams: { [key: string]: string | undefined };
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
    const search = searchParams.search || "";
    const tag = (searchParams.tag && searchParams.tag !== 'All') ? searchParams.tag : "";
    const page = parseInt(searchParams.page || "1");

    const response = await getContentsLogic({
        search,
        tag,
        page,
        pageSize: 6
    }) as unknown as IContent;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-32">
            <ProjectList initialData={response} />
        </div>
    );
};

export default SearchPage;