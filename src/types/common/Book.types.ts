import { Asset, Entry } from "contentful";
import { HeadInterface } from "./Head.types";
import { Document } from "@contentful/rich-text-types";
import { Author } from "./Author.types";

export interface Book {
    title: string;
    createdDate: Date;
    slug: string;
    cover: Asset;
    author: string;
    affiliateLink: string;
    head?: Entry<HeadInterface>
    review: Document;
    reviewAuthor?: Entry<Author>[];
}