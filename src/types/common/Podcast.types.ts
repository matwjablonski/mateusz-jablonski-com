import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Author } from "./Author.types";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";

export interface Podcast {
    name: string;
    cover: Asset;
    website?: string;
    externalPodcast: boolean;
}

export interface PodcastEpisode {
    guestPodcast: boolean;
    title: string;
    createdDate: Date;
    slug: string;
    excerpt: string;
    episode: number;
    content?: Document;
    featuredImage: Asset;
    file?: Asset;
    video?: string;
    head?: Entry<EntrySkeletonType<HeadInterface>>;
    author?: Entry<EntrySkeletonType<Author>>[];
    podcast: Podcast;
    id: string;
    podcastExcerpt: Document;
    externalLink?: string;
}
