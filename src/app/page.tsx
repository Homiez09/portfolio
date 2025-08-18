import { ProjectList } from "@/components/project/ProjectList";
import { Social } from "@/components/Social";
import { IContent } from "@/interface/content";
import axios from "axios";
import Image from "next/image";

const getContents = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/content/getAll`, {
            pageSize: 3
        });
        return response.data;
    } catch (error) {
        return { data: [] };
    }
}

export const dynamic = 'force-dynamic'

const Home = async () => {
    const response = await getContents() as IContent;

    return (
        <div className="space-y-20">
            <div className="flex flex-col items-center justify-center gap-8 pt-36 w-full">
                <div className="relative h-[128px] w-[128px] rounded-full drop-shadow-lg shadow-black border">
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
                    <div className="mt-5 font-extralight lg:text-3xl text-gray-500">
                        Programmer ᓚᘏᗢ.
                    </div>
                    <Social />
                </div>
            </div>

            <ProjectList initialData={response} pageSize={3} />
        </div>
    );
}

export default Home;