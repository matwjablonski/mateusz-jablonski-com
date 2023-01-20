import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";

export interface Course {
    title: string;
    slug: string;
    startDate: Date;
    publishDate: Date;
    description: string;
    featuredImage: Asset;
    head?: Entry<HeadInterface>;
    program?: Document;
    days?: number;
    maxParticipants?: number;
    costPerUser?: number;
    currency?: string;
}
