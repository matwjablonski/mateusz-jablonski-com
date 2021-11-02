import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";
import { Author } from "./Author.types";

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
    id: string;
    createdDate: Date;
    title: string;
    excerpt?: Document;
    slug: string;
    content?: Document;
    featuredImage?: Entry<ArticleFeaturedImage>;
    author?: Entry<Author>[];
}
