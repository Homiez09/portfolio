'use client'

import { useState, useEffect, FC } from 'react';
import { CardList } from "@/components/project/CardList";
import { SearchBox } from "@/components/project/SearchBox";
import { IContent } from "@/interface/content";
import { Pagination } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface ProjectListProps {
    initialData: IContent;
    pageSize?: number;
}

export const ProjectList: FC<ProjectListProps> = ({ initialData, pageSize = 6 }) => {
    const searchParams = useSearchParams();

    const [data, setData] = useState<IContent>(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const search = searchParams?.get('search') || '';
    const tag = searchParams?.get('tag') || '';

    const fetchData = async (page: number, searchQuery?: string, tagQuery?: string) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/content/getAll`, {
                page,
                pageSize: pageSize,
                search: searchQuery || search,
                tag: tagQuery || tag
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchData(page);
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchData(1);
    }, [search, tag]);

    return (
        <div className={`flex flex-col items-center gap-8 max-w-3xl mx-auto pb-5`}>
            <p className="text-4xl font-bold text-gray-700">
                PROJECTS
            </p>
            <SearchBox search={search} tag={tag} found={data.meta?.pagination.total} />
            <CardList projects={data.data} />
            <Pagination
                showControls
                page={currentPage}
                total={data.meta?.pagination.pageCount}
                onChange={handlePageChange}
                isDisabled={loading}
            />
        </div>
    );
};
