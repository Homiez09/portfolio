import Image from "next/image";
import { PositionStat } from "@/components/PositionStat";
import { Social } from "@/components/Social";
import { Suspense } from "react";

export default function Index() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 pt-36 w-full">
            <div className="relative h-[128px] w-[128px] rounded-full drop-shadow-lg shadow-black">
                <Image
                    id="profile-phum"
                    priority
                    fill
                    className="object-cover rounded-full"
                    src="https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no"
                    alt="Phumrapee Soenvanichakul (HomieZ09)"
                />
            </div>

            <div className="flex flex-col w-full justify-center items-center">
                <span className="font-bold lg:text-2xl text-xl text-gray-700">HELLO I'M</span>
                <span className="font-bold lg:text-5xl text-3xl">PHUMRAPEE</span>
                <span className="font-bold lg:text-5xl text-3xl">SOENVANICHAKUL</span>
                <Suspense fallback={<span>Loading...</span>}>
                    <PositionStat />
                    <Social />
                </Suspense>
            </div>
        </div>
    );
}