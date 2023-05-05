import { PodcastEpisode } from "../../types/common/Podcast.types";

export enum LastPodcastPreviewSize {
    SMALL = 'small',
    BIG = 'big'
}

export type LastPodcastPreviewProps = Pick<PodcastEpisode, 'title' | 'createdDate' | 'excerpt' | 'slug' | 'featuredImage' | 'episode'> & { previewSize: LastPodcastPreviewSize, podcastTitle: string };
