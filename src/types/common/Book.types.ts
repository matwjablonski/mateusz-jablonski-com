import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";
import { Author } from "./Author.types";

export type BookType = 'ebook' | 'audiobook' | 'paper';

export interface BookSeller {
    name: string;
    logo: Asset;
}

export interface Book {
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
    seller?: Entry<BookSeller>;
    head?: Entry<HeadInterface>
    reviewAuthor?: Entry<Author>[];
    bookType?: BookType;
    categoryName?: string;
}
