'use client';

import { CardList } from "@/components/project/CardList";
import { ibmbold } from "@/libs/font";
import { SearchBox } from "@/components/project/SearchBox";

export default () => {
    return (
        <>

            <div className="flex flex-col items-center gap-14 max-lg:gap-5">
                <div className="flex flex-col items-center w-full">
                    <p className={`text-4xl ${ibmbold.className} pb-5`}>Project</p>
                    <SearchBox />
                </div>
                <div className="flex flex-row max-lg:flex-col-reverse justify-center w-1/2 max-lg:w-full">
                    <CardList />
                </div>
            </div>
        </>
    );
}