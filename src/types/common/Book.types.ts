import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";
import { Author } from "./Author.types";

export type BookType = 'ebook' | 'audiobook' | 'paper';

export interface Book {
    title: string;
    createdDate: Date;
    slug: string;
    cover: Asset;
    author: string;
    affiliateLink: string;
    review: Document;
    currentRead: boolean;
    head?: Entry<HeadInterface>
    reviewAuthor?: Entry<Author>[];
    bookType?: BookType;
}
