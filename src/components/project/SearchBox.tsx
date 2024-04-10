"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
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

    const updateQuery = (e?: ChangeEvent<HTMLInputElement>) => {
        if (e) {
            if (e?.target.value === "") router.push("/project");
            else router.push(`?query=${e!.target.value}`);
            setSearchTerm(e!.target.value);
        } else {
            router.push("/project");
            setSearchTerm("");
        }
    }

    return (
        <>
            <Input
                radius="full"
                className="w-1/2 max-lg:w-full rounded-full border focus-within:shadow-lg"
                onChange={(e) => updateQuery(e)}
                value={searchTerm}
                // variant="bordered"
                placeholder="Type to search..."
                onClear={() => updateQuery()}
                startContent={
                    <Icon icon="material-symbols:search" width={20} height={20} className="text-black/50 mb-0.5" />
                }
            />
        </>
    );
}