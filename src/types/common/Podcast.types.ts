import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";

export interface Podcast {
    title: string;
    createdDate: Date;
    slug: string;
    excerpt: string;
    episode: number;
    featuredImage: Asset;
    file: Asset;
    head?: Entry<HeadInterface>
}