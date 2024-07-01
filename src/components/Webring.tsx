'use client';

import Image from "next/image";

export const Webring = () => {
    return (
        <a className="fixed bottom-0 end-0 p-5" href="https://webring.wonderful.software/#/phumrapee.com">
            <Image
                alt="วงแหวนเว็บ"
                width="32"
                height="32"
                className="hover:cursor-pointer"
                src="https://webring.wonderful.software/webring.black.svg"
            />
        </a>
    );
}
