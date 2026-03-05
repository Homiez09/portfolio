'use client'

import { useState, useEffect, FC, useRef } from 'react';
import { CardList } from "@/components/project/CardList";
import { SearchBox } from "@/components/project/SearchBox";
import { IContent } from "@/interface/content";
import { Pagination } from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

interface ProjectListProps {
    initialData: IContent;
    pageSize?: number;
}

export const ProjectList: FC<ProjectListProps> = ({ initialData, pageSize = 6 }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isFirstMount = useRef(true);

    const [data, setData] = useState<IContent>(initialData);
    const [loading, setLoading] = useState(false);

    const search = searchParams?.get('search') || '';
    const tag = searchParams?.get('tag') || '';
    const page = parseInt(searchParams?.get('page') || '1');

    const fetchData = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/content/getAll`, {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                    search: search,
                    tag: tag
                }
            });
            setData(response.data);
        } catch (error) {
            // Silently fail for the client
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        fetchData(page);
    }, [search, tag, page]);

    return (
        <div className="flex flex-col w-full">
            <SearchBox search={search} tag={tag} found={data.meta?.pagination.total} />
            
            <div className={`transition-all duration-300 ${loading ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
                <CardList projects={data.data} />
            </div>

            {data.meta?.pagination.pageCount > 1 && (
                <div className="flex justify-center pt-16">
                    <Pagination
                        showControls
                        page={page}
                        total={data.meta?.pagination.pageCount}
                        onChange={handlePageChange}
                        isDisabled={loading}
                        classNames={{
                            wrapper: "gap-2",
                            item: "bg-neutral-900 border border-emerald-900/50 text-emerald-600 font-mono rounded-none hover:bg-emerald-900 hover:text-emerald-400 transition-colors text-xs",
                            cursor: "bg-emerald-500 text-neutral-950 font-black font-mono rounded-none border border-emerald-400 text-xs",
                            prev: "bg-neutral-900 border border-emerald-900/50 text-emerald-600 rounded-none hover:bg-emerald-900 hover:text-emerald-400",
                            next: "bg-neutral-900 border border-emerald-900/50 text-emerald-600 rounded-none hover:bg-emerald-900 hover:text-emerald-400",
                        }}
                        radius="none"
                    />
                </div>
            )}
        </div>
    );
};
