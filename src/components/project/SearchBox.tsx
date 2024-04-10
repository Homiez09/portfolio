"use client";

import React, { FC, useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBox: FC<{}> = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const query = useSearchParams().get("query");

    useEffect(() => {
        setSearchTerm(query || "");
        console.log(query)
    }, [])

    return (
        <>
            <Input
                radius="full"
                className="w-1/2 max-lg:w-full"
                onChange={(e) => {
                    if (e.target.value === "") router.push("/project");
                    else router.push(`?query=${e.target.value}`);
                    setSearchTerm(e.target.value);
                }}
                value={searchTerm}
                variant="bordered"
                placeholder="Type to search..."
                startContent={
                    <Icon icon="material-symbols:search" width={32} height={32} className="text-black/50 mb-0.5" />
                }
            />
        </>
    );
}