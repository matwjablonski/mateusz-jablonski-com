import { Entry } from 'contentful';
import { ArticleFeaturedImage } from '../../types/common/Article.types';

export enum Preview {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface ArticlePreviewProps {
    title: string;
    excerpt: any;
    slug: string;
    createdDate: Date;
    featuredImage: Entry<ArticleFeaturedImage>;
    className?: string;
    preview: Preview;
}