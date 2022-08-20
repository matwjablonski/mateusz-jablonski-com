import { Asset } from 'contentful';

export interface BookBigPreviewProps {
    title: string;
    excerpt: any;
    author: string;
    slug: string;
    createdDate: Date;
    image: Asset;
    showContentType?: boolean;
}