import Index from "@/components/sessions/Index";
import ProjectComp from "@/components/sessions/Project";
import { Project } from "@/types/TypeProject";
import axios from "axios";

export const generateMetadata = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/contents`);

    const projects: Project[] = response.data.data || [];

    return {
      title: 'Phumrapee Soenvanichakul',
      description: `
    I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website.
    I'm a student at Kasetsart University, majoring in Computer Science.
    I'm interested in software engineering, full-stack 
    Project -> ${projects.map((project) => project.title).join(', ')}`,
      images: [
        {
          url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
          width: 800,
          height: 600,
        },
        {
          url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
          width: 1800,
          height: 1600,
          alt: 'Phumrapee Soenvanichakul (HomieZ09)',
        },
      ],
      openGraph: {
        title: 'Phumrapee Soenvanichakul',
        description: `
    I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website.
    I'm a student at Kasetsart University, majoring in Computer Science.
    I'm interested in software engineering, full-stack
    Project -> ${projects.map((project) => project.title).join(', ')}`,
        url: 'https://phumrapee.com',
        images: [
          {
            url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
            width: 800,
            height: 600,
          },
          {
            url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
            width: 1800,
            height: 1600,
            alt: 'Phumrapee Soenvanichakul (HomieZ09)',
          },
        ],
      },
      projects,
    }
  } catch (error) {
    return {
      title: 'Phumrapee Soenvanichakul',
      description: `
    I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website.
    I'm a student at Kasetsart University, majoring in Computer Science.
    I'm interested in software engineering, full-stack`,
      images: [
        {
          url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
          width: 800,
          height: 600,
        },
        {
          url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
          width: 1800,
          height: 1600,
          alt: 'Phumrapee Soenvanichakul (HomieZ09)',
        },
      ],
      openGraph: {
        title: 'Phumrapee Soenvanichakul',
        description: `
    I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website.
    I'm a student at Kasetsart University, majoring in Computer Science.
    I'm interested in software engineering, full-stack`,
        url: 'https://phumrapee.com',
        images: [
          {
            url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
            width: 800,
            height: 600,
          },
          {
            url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
            width: 1800,
            height: 1600,
            alt: 'Phumrapee Soenvanichakul (HomieZ09)',
          },
        ],
      },
    }
  }
}

export default () => {
  return (
    <div className="container space-y-20 max-w-5xl">
      <Index />
      <ProjectComp />
    </div>
  );
}