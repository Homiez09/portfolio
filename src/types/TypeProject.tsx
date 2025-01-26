import { Tag } from "./TypeTag";

export type Project = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string;
    tags: Tag[];
    banner: any;
    date: string | null; // ในอนาคตจะลบออก
}