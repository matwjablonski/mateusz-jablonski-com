import { Asset } from 'contentful';

export interface BookBigPreviewProps {
    title: string;
    author: string;
    slug: string;
    createdDate: Date | string;
    image: Asset;
    showContentType?: boolean;
}