import { CardList } from "@/components/project/CardList";
import { SearchBox } from "@/components/project/SearchBox";
import axios from "axios";
import { FC } from "react";

interface SearchPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const getResults = async (search: string, tag: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/content/search/${search}|${tag}`);
        return response.data;
    } catch (error) {
        console.log('error')
        return { data: [] };
    }
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
    const search = searchParams.search ? searchParams.search : '';
    const tag = searchParams.tag ? searchParams.tag : ''

    const response = await getResults(searchParams.search ? String(searchParams.search) : "", (searchParams.tag || String(searchParams.tag) === 'All') ? String(searchParams.tag) : "");

    return (
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center w-full">
                <p className='text-4xl font-bold pb-5'>PROJECTS</p>
                <SearchBox search={String(search)} tag={String(tag)} found={response.data.length} />
            </div>
            <div className="flex flex-row justify-center w-full">
                <CardList projects={response.data} />
            </div>
        </div>
    );
};

export default SearchPage;