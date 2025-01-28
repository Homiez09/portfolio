'use client';

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export const SearchBox: FC<{ query: string }> = ({ query }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setSearchTerm(query);
    }, [query])


    const updateQuery = (e?: ChangeEvent<HTMLInputElement>) => {
        if (e?.target.value === "") router.push("/project");
        else router.push(`?query=${e!.target.value}`);
        setSearchTerm(e!.target.value);
    }

    const clearQuery = () => {
        router.push("/project");
    }

    return (
        <>
            <Input
                radius="full"
                className="rounded-full border focus-within:shadow-lg"
                onChange={(e) => updateQuery(e)}
                value={searchTerm}
                placeholder="Type to search..."
                onClear={() => clearQuery()}
                startContent={
                    <Icon icon="material-symbols:search" width={20} height={20} className="text-black/50 mb-0.5" />
                }
            />
        </>
    );
}