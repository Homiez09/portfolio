import { Card } from './Card';
import { projects } from '@/app/project/hardcodedata';

export const ShowCard = () => {
    return (
        <>
            <div className="flex flex-wrap gap-5 justify-center w-1/2 max-lg:w-full">
                {projects.map((project) => (
                    <Card key={project.id} props={project} />
                ))}
            </div>
        </>
    );
}