'use client';

import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ITag } from "@/types/Tag";

interface SearchBoxProps {
    search?: string;
    tag?: string;
    found?: number;
}

export const SearchBox: FC<SearchBoxProps> = ({ search = '', tag = '', found = 0, }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [tags, setTags] = useState<ITag[] | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(search);
    const [tagTerm, setTagTerm] = useState<string>(tag);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const updateSearchQuery = (e?: ChangeEvent<HTMLInputElement>) => {
        router.push('search?' + createQueryString('search', e!.target.value));
        setSearchTerm(e!.target.value);
    }

    const updateTagQuery = (e: ChangeEvent<HTMLSelectElement>) => {
        router.push('search?' + createQueryString('tag', e.target.value));
        setTagTerm(e.target.value);
    }

    const clearQuery = () => {
        setSearchTerm("");
        router.push("/search");
    }

    const fetchTags = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/tag/getAll`).then((res) => setTags(res.data.data));
        } catch (error) {
            console.error("Failed to fetch tags", error);
            setTags([]);
        }
    }

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row w-full gap-3">
                <div className="flex w-full">
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        onChange={(e) => updateSearchQuery(e)}
                        value={searchTerm}
                        placeholder="Find a project..."
                    />
                </div>
                <div className="flex w-auto">
                    <div className="relative inline-block">
                        <select
                            onChange={(e) => updateTagQuery(e)}
                            value={tag}
                            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All</option>
                            {tags?.map((tag) => (
                                <option key={tag.id} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>
            {
            (search !== "" || tag !== "" && tag !== "All") && <div className="flex flex-col lg:flex-row justify-between">
                <span className="place-self-start">{found} results for projects {(search !== "") && `matching ${search}`} {(tag !== "") && `written in ${tag}`} sorted by last created.</span>
                <span className="hover:cursor-pointer hover:text-red-500 place-self-end" onClick={clearQuery}>Clear filter</span>
            </div>
            }
        </div>
    );
}