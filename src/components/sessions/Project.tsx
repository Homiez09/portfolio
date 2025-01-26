"use client";

import { CardList } from "../project/CardList";
import { SearchBox } from "../project/SearchBox";
import { useSearchParams } from "next/navigation";

export default function Project() {
    const query = useSearchParams().get("query") || "";

    return (
        <div className="flex flex-col items-center gap-8">
            <p className="text-4xl font-bold text-gray-700">
                PROJECTS
            </p>
                <CardList query={query} />
            {/* <div className="flex flex-col items-center gap-14">
                <div className="flex flex-col items-center w-full">
                    <SearchBox query={query} />
                </div>
                <div className="flex flex-row max-lg:flex-col-reverse justify-center">
                    <CardList query={query} />
                </div>
            </div> */}
        </div>
    );
}