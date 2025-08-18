import { IMedia } from "./media";
import { ITag } from "./tag";

export interface IProjectContent {
    id: number;
    documentId: string;
    title: string;
    description: string;
    content: string;
    tags: ITag[];
    banner: IMedia;
    screenshots: IMedia[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}