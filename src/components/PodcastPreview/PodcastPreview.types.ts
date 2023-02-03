import { Asset } from 'contentful';

export interface PodcastPreviewProps {
  title: string;
  excerpt: any;
  author: string;
  slug: string;
  createdDate: Date;
  image: Asset;
  showContentType?: boolean;
  podcastName?: string;
}
