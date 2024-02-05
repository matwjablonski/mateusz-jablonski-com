import { Asset, Entry, EntrySkeletonType } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";

export interface Course {
    title: string;
    slug: string;
    startDate: Date;
    publishDate: Date;
    description: string;
    longDescription: string;
    featuredImage: Asset;
    head?: EntrySkeletonType<HeadInterface>;
    program?: Document;
    days?: number;
    maxParticipants?: number;
    costPerUser?: number;
    currency?: string;
    nextWorkshops?: Date;
    cityOrRemote?: string;
    reviews: { name: string, content: string, rate: string, date: string }[];
}
