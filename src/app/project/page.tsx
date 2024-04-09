'use client';

import { ShowCard } from "@/components/CardList";
import { ibmbold } from "@/libs/font";

export default () => {
    return (
        <>
            <p className={`text-2xl ${ibmbold.className} pb-5`}>Project</p>
            <div className="flex flex-row justify-center gap-14 max-lg:gap-5 max-lg:flex-col-reverse">
                <ShowCard />
                <div className="flex flex-wrap p-3 gap-5 w-1/3 max-lg:w-full border">
                    filter & search
                </div>
            </div>
        </>
    );
}