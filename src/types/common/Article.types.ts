import { Asset, EntrySkeletonType } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";
import { Author } from "./Author.types";

export interface ArticleFeaturedImage {
    image: Asset;
    title: string;
    author: string;
}

export interface Article {
    isTranslationReady?: boolean;
    head?: EntrySkeletonType<HeadInterface>;
    id: string;
    createdDate: Date;
    title: string;
    summary?: Document,
    excerpt?: Document;
    slug: string;
    content?: Document;
    featuredImage?: EntrySkeletonType<ArticleFeaturedImage>;
    author?: EntrySkeletonType<Author>[];
    sources?: Document;
    categoryName?: string;
    level?: string;
    externalSource?: string;
}
