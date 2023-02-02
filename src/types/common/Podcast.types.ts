import { Asset, Entry } from "contentful";
import { Author } from "./Author.types";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";

export interface Podcast {
    title: string;
    createdDate: Date;
    slug: string;
    excerpt: string;
    episode: number;
    content?: Document;
    featuredImage: Asset;
    file: Asset;
    head?: Entry<HeadInterface>;
    author?: Entry<Author>[];
    id: string;
    podcastExcerpt: Document;
    podcastCover: Asset;
    podcastTitle: string;
    podcastWebsite?: string;
    externalLink?: string;
}
