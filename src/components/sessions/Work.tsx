import { WorkTimeLine } from "@/components/project/TimeLine";
import { IWorkExperience } from "@/types/IWorkExperience";

const workExperience: IWorkExperience[] = [
  {
    title: "Recording...",
    position: "",
    date: "Present",
    description: []
  },
  {
    title: "Internship - OCS(สำนักคอมมหาวิทยาลัยเกษตรศาสตร์)",
    position: "Full Stack Developer",
    date: "April 2024 - June 2024",
    description: [
      "Managed two projects: EDUCERT and KU-Meeting",
      "Used NextJS, Strapi, Laravel, Tailwind, Bootstrap5, and PostgreSQL for development and maintenance.",
      "Developed and maintained web applications, focusing on both front-end and back-end.",
    ]
  },
  {
    title: "Freelance - Virtual KasetFair 2023",
    position: "3D Virtual Tour",
    date: "Feb 2023",
    description: [
      "Created a 360° virtual tour for the KasetFair.",
      "Used 3DVista Program for virtual tour creation",
    ]
  },
]

export default function Work() {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-2xl font-bold text-gray-700">
        WORK EXPERIENCE
      </p>
      <WorkTimeLine list={workExperience} />
    </div>
  );
}