'use client';

import { ibmbold } from "@/libs/fonts";
import { SearchBox } from "@/components/project/SearchBox";
import { CardList } from "@/components/project/CardList";

const Page = async () => {
    return (
        <>
            <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center w-full">
                    <p className={`text-4xl ${ibmbold.className} pb-5`}>PROJECTS</p>
                    <SearchBox />
                </div>
                <div className="flex flex-row justify-center w-full">
                    <CardList />
                </div>
            </div>
        </>
    );
}

export default Page;