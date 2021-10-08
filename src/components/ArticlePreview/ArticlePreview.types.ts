import { Asset } from 'contentful';

export interface ArticlePreviewProps {
    title: string;
    excerpt: any;
    slug: string;
    createdDate: string;
    featuredImage: {
        image: Asset;
    };
    className?: string;
}