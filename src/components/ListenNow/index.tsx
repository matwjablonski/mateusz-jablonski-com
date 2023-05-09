import React, { FC, FunctionComponent, memo } from 'react';
import cx from 'classnames';
import styles from './ListenNow.module.scss';
import Image from 'next/image';
import spotify from '../../public/icons/spotify.png';
import applePodcast from '../../public/icons/applepodcast.svg';
import googlePodcast from '../../public/icons/googlepodcast.png'
import youtube from '../../public/icons/youtube.png';
import { useTranslations } from '../../hooks/useTranslations';

type ListenNowLinks = {
    spotify?: string;
    applepodcast?: string;
    youtube?: string;
    googlepodcasts?: string;
}

type ListenNow = {
    podcastName: string;
    links: ListenNowLinks;
    className?: string;
    isIdle?: boolean;
}

const ListenNow: FC<ListenNow> = memo(({ className, links, podcastName, isIdle }) => {
    const { t: { HOME: { LISTEN_PODCAST, LISTEN_PODCAST_ON }}, translate } = useTranslations();
    return <div className={cx(styles.listenNow, className, isIdle && styles.isIdle)}>
        {!isIdle && <h2 className={styles.title}>{LISTEN_PODCAST}</h2>}
        <div className={styles.podcasts}>
            {links.spotify && <a
                className={styles.podcastLink} 
                rel="noopener noreferrer nofollow"
                href={links.spotify}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ podcastName, 'Spotify' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={spotify || `/icons/spotify.png`} width={145} height={40} alt=""/>
                </div>
            </a>}
            {links.applepodcast && <a
                className={styles.podcastLink}
                rel="noopener noreferrer nofollow"
                href={links.applepodcast}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ podcastName, 'Apple Podcasts' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={applePodcast || `/icons/applepodcast.svg`} width={196} height={35} alt=""/>
                </div>
            </a>}
            {links.googlepodcasts && <a
                className={styles.podcastLink}
                rel="noopener noreferrer nofollow"
                href={links.googlepodcasts}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ podcastName, 'Google Podcasts' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={googlePodcast || `/icons/googlepodcast.png`} width={205} height={41} alt=""/>
                </div>
            </a>}
            {links.youtube && <a
                className={styles.podcastLink}
                rel="noopener noreferrer nofollow"
                href={links.youtube}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ podcastName, 'Youtube' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={youtube || `/icons/youtube.png`} width={138} height={40} alt=""/>
                </div>
            </a>}
        </div>
    </div>
});

ListenNow.displayName = 'ListenNow';

export default ListenNow;
