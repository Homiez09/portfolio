'use client';

import Image from "next/image";

export const Webring = () => {
    return (
        <div className="fixed bottom-0 end-0 p-5">
            <Image
                alt="วงแหวนเว็บ"
                width="32"
                height="32"
                className="hover:cursor-pointer"
                onClick={() => window.location.href = "https://webring.wonderful.software/#/phumrapee.me"}
                src="https://webring.wonderful.software/webring.black.svg"
            />
        </div>
    );
}
