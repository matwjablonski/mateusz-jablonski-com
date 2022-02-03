import { Entry } from 'contentful';
import { ArticleFeaturedImage } from '../../types/common/Article.types';

export interface ArticlePreviewProps {
    title: string;
    excerpt: any;
    slug: string;
    createdDate: Date;
    featuredImage: Entry<ArticleFeaturedImage>;
    className?: string;
}