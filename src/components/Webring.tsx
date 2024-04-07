'use client';

import Image from "next/image";

export const Webring = () => {
    return (
        <div className="flex justify-center">
            <div className="fixed container h-screen">
                <div className="absolute bottom-0 end-0 pb-3">
                    <Image 
                    alt="วงแหวนเว็บ"
                    width="32"
                    height="32"
                    src="https://webring.wonderful.software/webring.black.svg"
                    />
                </div>
            </div>
        </div>
    );
}
