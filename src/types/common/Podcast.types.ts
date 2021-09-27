import { Asset } from "contentful";

export interface Podcast {
    title: string;
    createdDate: Date;
    slug: string;
    excerpt: string;
    episode: number;
    featuredImage: Asset;
}