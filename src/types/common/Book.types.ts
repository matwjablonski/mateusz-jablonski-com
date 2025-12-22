import { Asset, EntrySkeletonType } from "contentful";
import { HeadInterface } from "./Head.types";
import { Author } from "./Author.types";

export type BookType = 'ebook' | 'audiobook' | 'paper';

export interface BookSeller {
    name: string;
    logo: Asset;
}

export interface Book {
    isTranslationReady?: boolean;
    id: string;
    title: string;
    createdDate: Date | string;
    slug: string;
    cover: Asset;
    author: string;
    affiliateLink: string;
    currentRead: boolean;
    rate?: number;
    seller?: EntrySkeletonType<BookSeller>;
    head?: EntrySkeletonType<HeadInterface>
    reviewAuthor?: EntrySkeletonType<Author>[];
    bookType?: BookType;
    categoryName?: string;
}
