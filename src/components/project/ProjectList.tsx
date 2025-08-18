'use client'

import { useState, useEffect } from 'react';
import { CardList } from "@/components/project/CardList";
import { SearchBox } from "@/components/project/SearchBox";
import { IContent } from "@/interface/content";
import { Pagination } from "@nextui-org/react";
import axios from "axios";

interface ProjectListProps {
    initialData: IContent;
}

export const ProjectList = ({ initialData }: ProjectListProps) => {
    const [data, setData] = useState<IContent>(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/content/getAll`, {
                page,
                pageSize: 6
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

    return (
        <div className={`flex flex-col items-center gap-8 max-w-3xl mx-auto pb-5`}>
            <p className="text-4xl font-bold text-gray-700">
                PROJECTS
            </p>
            <SearchBox />
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
