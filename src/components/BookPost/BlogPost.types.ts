import { Document } from '@contentful/rich-text-types';
import { MutableRefObject } from 'react';
import { EntrySkeletonType } from "contentful";
import { Author } from '../../types/common/Author.types';
import { Book, BookSeller, BookType } from '../../types/common/Book.types';

export interface BlogPostProps {
    content: Document;
    title: string;
    numberOfComments: number;
    commentsBlockRef: MutableRefObject<HTMLDivElement>;
    excerpt: Document;
    summary?: Document,
    sources?: Document;
    author?: EntrySkeletonType<Author>[];
    createdDate?: Date;
    categoryName?: string;
    affiliateLink: string;
    coverImage: string;
    rate?: number;
    recommendedBook?: EntrySkeletonType<Book>;
    bookType?: BookType;
    seller?: EntrySkeletonType<BookSeller>;
}
