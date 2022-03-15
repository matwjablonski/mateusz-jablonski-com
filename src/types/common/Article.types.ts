import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";
import { Author } from "./Author.types";
import { Book } from "./Book.types";

export interface ArticleFeaturedImage {
    image: Asset;
    title: string;
    author: string;
}

export interface Article {
    head?: Entry<HeadInterface>;
    id: string;
    createdDate: Date;
    title: string;
    summary?: Document,
    excerpt?: Document;
    slug: string;
    content?: Document;
    featuredImage?: Entry<ArticleFeaturedImage>;
    author?: Entry<Author>[];
    recommendedBook?: Entry<Book>;
    sources?: Document;
    categoryName?: string;
    level?: string;
}
