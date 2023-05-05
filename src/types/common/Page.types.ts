import { EntrySkeletonType } from "contentful";
import { HeadInterface } from "./Head.types";

export interface Page {
    title: string;
    description: string;
    slug: string;
    head?: EntrySkeletonType<HeadInterface>;
}
