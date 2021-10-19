import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";

export interface Book {
    title: string;
    createdDate: Date;
    slug: string;
    cover: Asset;
    author: string;
    affiliateLink: string;
    head?: Entry<HeadInterface>
}