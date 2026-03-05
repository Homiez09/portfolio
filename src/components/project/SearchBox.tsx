'use client';

import React, { FC, useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ITag } from "@/interface/tag";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface SearchBoxProps {
    search?: string;
    tag?: string;
    found?: number;
}

export const SearchBox: FC<SearchBoxProps> = ({ search = '', tag = '', found = 0 }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [tags, setTags] = useState<ITag[]>([]);
    const [searchTerm, setSearchTerm] = useState(search);
    const [tagTerm, setTagTerm] = useState(tag);
    const [isLoadingTags, setIsLoadingTags] = useState(true);

    const createQueryString = useCallback(
        (paramsToUpdate: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(paramsToUpdate).forEach(([name, value]) => {
                if (value) params.set(name, value);
                else params.delete(name);
            });
            params.set('page', '1');
            return params.toString();
        },
        [searchParams]
    );

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        startTransition(() => {
            const query = createQueryString({ search: value });
            router.push(`?${query}`, { scroll: false });
        });
    };

    const handleTagChange = (key: string | number) => {
        const value = key === 'All' ? '' : key.toString();
        setTagTerm(value);
        const query = createQueryString({ tag: value });
        router.push(`?${query}`, { scroll: false });
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get('/api/tag/getAll');
                setTags(res.data.data || []);
            } catch (error) {
                // Silently fail for the client
                setTags([]);
            } finally {
                setIsLoadingTags(false);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        setSearchTerm(search);
        setTagTerm(tag);
    }, [search, tag]);

    return (
        <div className="w-full flex flex-col gap-4 py-6 border-b border-emerald-900/50 mb-8">
            <div className="flex flex-col md:flex-row gap-4 font-mono">
                <div className="relative flex-grow group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">{'>'}</span>
                    <input
                        className="w-full h-14 bg-neutral-900/80 border border-emerald-900/80 px-10 
                                 text-emerald-400 placeholder-emerald-800/50 focus:border-emerald-500 
                                 focus:ring-0 focus:bg-neutral-900 transition-all duration-200 uppercase tracking-widest text-sm"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchTerm}
                        placeholder="INPUT QUERY..."
                    />
                    {isPending && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 text-xs animate-pulse tracking-widest">
                            [PROCESSING]
                        </div>
                    )}
                </div>

                <Dropdown isDisabled={isLoadingTags} classNames={{ content: "bg-neutral-900 border border-emerald-500 rounded-none min-w-[200px]" }}>
                    <DropdownTrigger>
                        <Button
                            className="h-14 bg-neutral-900/80 border border-emerald-900/80 px-8 
                                     font-bold text-emerald-500 hover:border-emerald-500 hover:bg-neutral-900 transition-all uppercase rounded-none tracking-widest text-xs w-full md:w-auto"
                        >
                            {tagTerm ? `CLASS: ${tagTerm}` : "CLASS: ALL"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Filter by class"
                        onAction={handleTagChange}
                        selectedKeys={new Set([tagTerm || "All"])}
                        selectionMode="single"
                        className="text-emerald-400 p-0"
                        itemClasses={{
                            base: "rounded-none data-[hover=true]:bg-emerald-500 data-[hover=true]:text-neutral-950 transition-colors py-3 px-4 uppercase font-mono tracking-widest text-xs border-b border-emerald-900/30 last:border-0"
                        }}
                    >
                        <DropdownItem key="All">ALL CLASSES</DropdownItem>
                        <>
                            {tags.map((t) => (
                                <DropdownItem key={t.name}>{t.name}</DropdownItem>
                            ))}
                        </>
                    </DropdownMenu>
                </Dropdown>
            </div>
            
            <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
                <span className="text-emerald-600">[{found} ENTRIES FOUND]</span>
                {(search || tag) && (
                    <button 
                        onClick={() => { setSearchTerm(''); setTagTerm(''); router.push('/'); }}
                        className="text-red-500 hover:text-red-400 hover:underline decoration-red-500/50"
                    >
                        [ CLEAR_CACHE ]
                    </button>
                )}
            </div>
        </div>
    );
};
