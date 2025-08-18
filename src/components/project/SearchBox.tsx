'use client';

import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import { ITag } from "@/interface/tag";

interface SearchBoxProps {
    search?: string;
    tag?: string;
    found?: number;
}

export const SearchBox: FC<SearchBoxProps> = ({ search = '', tag = '', found = 0, }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const searchInputRef = useRef<HTMLInputElement>(null);

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
        if (pathname === "/search") searchInputRef.current?.focus();
    }, []);

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row w-full gap-3">
                <div className="flex w-full">
                    <div className="relative w-full">
                        <input
                            ref={searchInputRef}
                            className="border border-gray-300 hover:border-gray-400 w-full px-4 py-2 pl-10 
                                     rounded-lg text-gray-700 leading-tight 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                     transition-all duration-200 ease-in-out shadow-sm hover:shadow-md
                                     placeholder-gray-400"
                            onChange={(e) => updateSearchQuery(e)}
                            value={searchTerm}
                            placeholder="Find a project..."
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex w-auto">
                    <div className="relative inline-block">
                        <select
                            onChange={(e) => updateTagQuery(e)}
                            value={tagTerm}
                            className="appearance-none bg-white border border-gray-300 hover:border-gray-400 
                                     rounded-lg px-4 py-2 pr-8 text-gray-700 leading-tight 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                     transition-all duration-200 ease-in-out shadow-sm hover:shadow-md
                                     min-w-[120px] cursor-pointer"
                        >
                            <option value="All">All Categories</option>
                            {tags?.map((tag) => (
                                <option key={tag.id} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4 transition-transform duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {
                (search !== "" || tag !== "" && tag !== "All") && <>
                    <span className="place-self-start text-gray-600 text-sm">
                        <span className="font-medium text-blue-600">{found}</span> results for projects
                        {(search !== "") && <span className="font-medium"> matching "{search}"</span>}
                        {(tag !== "" && tag !== "All") && <span className="font-medium"> in {tag}</span>}
                        <span className="text-gray-500"> sorted by last created.</span>
                        <span
                            className="hover:cursor-pointer text-red-500 place-self-end text-sm 
                             px-3 py-1 rounded-md hover:bg-red-50 transition-all duration-200 
                             border border-transparent hover:border-red-200 ml-1"
                            onClick={clearQuery}
                        >
                            Clear filter
                        </span>
                    </span>
                </>
            }
        </div>
    );
}