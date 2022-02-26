import { Document } from '@contentful/rich-text-types';
import { MutableRefObject } from 'react';
import { Entry } from "contentful";
import { ArticleFeaturedImage } from '../../types/common/Article.types';
import { Author } from '../../types/common/Author.types';

export interface PostProps {
    content: Document;
    title: string;
    numberOfComments: number;
    commentsBlockRef: MutableRefObject<HTMLDivElement>;
    excerpt: Document;
    featuredImage: Entry<ArticleFeaturedImage>;
    summary?: Document,
    sources?: Document;
    author?: Entry<Author>[];
}