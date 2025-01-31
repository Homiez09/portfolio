import { ITag } from "./Tag";

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
    banner: any;
    date: string | null; // ในอนาคตจะลบออก
}