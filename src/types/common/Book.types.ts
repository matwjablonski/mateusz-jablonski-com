import { Asset, EntrySkeletonType } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";
import { Author } from "./Author.types";

export type BookType = 'ebook' | 'audiobook' | 'paper';

export interface BookSeller {
    name: string;
    logo: Asset;
}

export interface Book {
    id: string;
    title: string;
    createdDate: Date;
    slug: string;
    cover: Asset;
    author: string;
    affiliateLink: string;
    excerpt: Document;
    review: Document;
    currentRead: boolean;
    rate?: number;
    seller?: EntrySkeletonType<BookSeller>;
    head?: EntrySkeletonType<HeadInterface>
    reviewAuthor?: EntrySkeletonType<Author>[];
    bookType?: BookType;
    categoryName?: string;
}
