export enum EpisodeNumberSize {
    SMALL = 'small',
    BIG = 'big',
}

export interface EpisodeNumberProps {
    episode: number;
    size?: EpisodeNumberSize,
    className?: string;
}