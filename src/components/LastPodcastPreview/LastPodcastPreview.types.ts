import { Podcast } from "../../types/common/Podcast.types";

export enum LastPodcastPreviewSize {
    SMALL = 'small',
    BIG = 'big'
}

export type LastPodcastPreviewProps = Pick<Podcast, 'title' | 'createdDate' | 'excerpt' | 'slug' | 'featuredImage' | 'episode'> & { previewSize: LastPodcastPreviewSize };
