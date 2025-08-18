import { IPagination } from "./pagination";
import { IProjectContent } from "./project-content";

export interface IContent {
    data: IProjectContent[],
    meta: {
        pagination: IPagination
    }
}