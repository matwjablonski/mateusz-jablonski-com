import { EntrySkeletonType } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";


export interface Page {
    isTranslationReady?: boolean;
    title: string;
    description: string;
    slug: string;
    head?: EntrySkeletonType<HeadInterface>;
    content?: Document;
}
