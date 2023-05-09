import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Author } from "./Author.types";
import { Document } from "@contentful/rich-text-types";
import { HeadInterface } from "./Head.types";

export interface Podcast {
    name: string;
    cover: Asset;
    description: string;
    website?: string;
    externalPodcast: boolean;
    authors?: Author[];
    spotify?: string;
    applepodcast?: string;
    youtube?: string;
    googlepodcasts?: string;
}

export interface PodcastEpisode {
    isTranslationReady?: boolean;
    guestPodcast: boolean;
    title: string;
    createdDate: Date;
    slug: string;
    excerpt: string;
    season?: number;
    episode: number;
    content?: Document;
    featuredImage: Asset;
    file?: Asset;
    time?: number;
    video?: string;
    head?: Entry<EntrySkeletonType<HeadInterface>>;
    author?: Entry<EntrySkeletonType<Author>>[];
    podcast: Podcast;
    id: string;
    podcastExcerpt: Document;
    externalLink?: string;
}
