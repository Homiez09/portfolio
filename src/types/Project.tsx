import { ITag } from "./Tag";
import { IMedia } from "./Media";

export type Project = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string;
    tags: ITag[];
    banner: IMedia;
    date: string | null; // ในอนาคตจะลบออก
    screenshots: IMedia[];
}