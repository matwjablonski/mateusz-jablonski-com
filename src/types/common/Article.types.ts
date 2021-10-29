import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";

export interface ArticleFeaturedImage {
    image: Asset;
    title: string;
    imageUrl: string;
    author: string;
    authorUrl: string;
    source: string;
}

export interface Article {
    head?: Entry<HeadInterface>;
    title: string;
    excerpt: Document;
    featuredImage: Entry<ArticleFeaturedImage>
}
