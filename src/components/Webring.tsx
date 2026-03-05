import Image from "next/image";

export const Webring = () => {
    return (
        <a
            className="fixed bottom-0 end-0 p-5 z-[9999] hover:scale-110 transition-transform duration-200"
            href="https://webring.wonderful.software#portfolio"
            style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))',
                zIndex: 9999
            }}
        >
            <Image
                alt="วงแหวนเว็บ"
                width="32"
                height="32"
                className="hover:cursor-pointer grayscale hover:grayscale-0 transition-all duration-300"
                src="https://webring.wonderful.software/webring.black.svg"
            />
        </a>
    );
}
