import { Document } from '@contentful/rich-text-types';
import { MutableRefObject } from 'react';
import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Author } from '../../types/common/Author.types';
import { Book } from '../../types/common/Book.types';

export interface PodcastProps {
    content: Document;
    title: string;
    numberOfComments: number;
    commentsBlockRef: MutableRefObject<HTMLDivElement>;
    excerpt: string;
    featuredImage: Asset;
    summary?: Document,
    sources?: Document;
    author?: Entry<EntrySkeletonType<Author>>[];
    createdDate?: Date;
    categoryName?: string;
    episode?: number;
    level?: string;
    recommendedBook?: EntrySkeletonType<Book>;
    file?: Asset;
    video?: string;
    podcastTitle?: string;
    podcastExcerpt?: Document;
    podcastCover?: Asset;
    externalLink?: string;
    time?: number;
}
