import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";

export interface Course {
    title: string;
    slug: string;
    startDate: Date;
    publishDate: Date;
    description: string;
    featuredImage: Asset;
    head?: Entry<HeadInterface>
}