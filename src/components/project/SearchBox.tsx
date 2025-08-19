'use client';

import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import { ITag } from "@/interface/tag";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

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

    const [isDropdownLoading, setIsDropdownLoading] = useState<boolean>(true);

    // Create dropdown items
    const dropdownItems = [
        { key: "All", label: "All Categories" },
        ...(tags || []).map(tag => ({ key: tag.name, label: tag.name }))
    ];

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

    const updateTagQuery = (key: string | number) => {
        const value = key.toString();
        router.push('search?' + createQueryString('tag', value));
        setTagTerm(value);
    }

    const clearQuery = () => {
        setSearchTerm("");
        setTagTerm("")
        router.push("/search");
    }

    const fetchTags = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/tag/getAll`).then((res) => setTags(res.data.data));
        } catch (error) {
            console.error("Failed to fetch tags", error);
            setTags([]);
        } finally {
            setIsDropdownLoading(false);
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
                            className="border border-gray-300 w-full px-4 py-2 pl-10 
                                     rounded-lg text-gray-700 leading-tight 
                                     focus:outline-none
                                        shadow-sm h-9
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
                    <Dropdown isDisabled={isDropdownLoading}>
                        <DropdownTrigger>
                            <Button
                                className="bg-white border border-gray-300
                                         rounded-lg px-4 py-2 h-9 text-gray-700 leading-tight 
                                         focus:outline-none
                                         shadow-sm
                                         min-w-[120px] justify-between"
                                endContent={
                                    <svg
                                        className="fill-current h-4 w-4 transition-transform duration-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                }
                            >
                                {tagTerm === "" || tagTerm === "All" ? "All Categories" : tagTerm}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Category filter"
                            onAction={(key) => updateTagQuery(key)}
                            selectedKeys={new Set([tagTerm === "" ? "All" : tagTerm])}
                            selectionMode="single"
                            items={dropdownItems}
                        >
                            {(item) => (
                                <DropdownItem key={item.key}>
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {
                (search !== "" || tag !== "" && tag !== "All") &&
                <div className="flex flex-row justify-between">
                    <span className="place-self-start text-gray-600 text-sm">
                        <span className="font-medium text-blue-600">{found}</span> results for projects
                        {(search !== "") && <span className="font-medium"> matching "{search}"</span>}
                        {(tag !== "" && tag !== "All") && <span className="font-medium"> in {tag}</span>}
                        <span className="text-gray-500"> sorted by last created.</span>
                    </span>
                    <span
                        className="hover:cursor-pointer text-red-500 border border-transparent ml-1 flex-shrink-0"
                        onClick={clearQuery}
                    >
                        Clear filter
                    </span>
                </div>
            }
        </div>
    );
}