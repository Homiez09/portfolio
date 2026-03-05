import { ProjectList } from "@/components/project/ProjectList";
import { HeroSection } from "@/components/home/HeroSection";
import { IContent } from "@/interface/content";
import { getContentsLogic } from "@/libs/api";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }: { searchParams: { search?: string, tag?: string, page?: string } }) => {
    const search = searchParams?.search || '';
    const tag = searchParams?.tag || '';
    const page = parseInt(searchParams?.page || '1');

    const response = await getContentsLogic({ 
        pageSize: 6,
        search,
        tag,
        page
    }) as unknown as IContent;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-32">
            
            <HeroSection totalRecords={response.meta?.pagination.total || 0} />

            {/* Content Section */}
            <main>
                <Suspense fallback={<div className="text-emerald-500 font-mono text-sm animate-pulse">{'>'} FETCHING DATA_PACKETS...</div>}>
                    <ProjectList initialData={response} pageSize={6} />
                </Suspense>
            </main>
        </div>
    );
}

export default Home;
