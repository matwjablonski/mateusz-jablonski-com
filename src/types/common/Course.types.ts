import { Asset } from "contentful";

export interface Course {
    title: string;
    slug: string;
    startDate: Date;
    publishDate: Date;
    description: string;
    featuredImage: Asset;
}