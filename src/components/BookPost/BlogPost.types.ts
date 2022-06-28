import { Document } from '@contentful/rich-text-types';
import { MutableRefObject } from 'react';
import { Entry } from "contentful";
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
    author?: Entry<Author>[];
    createdDate?: Date;
    categoryName?: string;
    affiliateLink: string;
    coverImage: string;
    rate?: number;
    recommendedBook?: Entry<Book>;
    bookType?: BookType;
    seller?: Entry<BookSeller>;
}