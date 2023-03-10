import React, { FunctionComponent, memo } from 'react';
import cx from 'classnames';
import styles from './ListenNow.module.scss';
import Image from 'next/image';
import spotify from '../../public/icons/spotify.png';
import applePodcast from '../../public/icons/applepodcast.svg';
import googlePodcast from '../../public/icons/googlepodcast.png'
import youtube from '../../public/icons/youtube.png';
import { useTranslations } from '../../hooks/useTranslations';
import externalSources from '../../data/external-sources.json';

const ListenNow: FunctionComponent<{ className?: string; }> = memo(({ className }) => {
    const { t: { HOME: { LISTEN_PODCAST, LISTEN_PODCAST_ON }}, translate } = useTranslations();
    const { podcasts: { piwnicait: podcast } } = externalSources;
    return <div className={cx(styles.listenNow, className)}>
        <h2 className={styles.title}>{LISTEN_PODCAST}</h2>
        <div className={styles.podcasts}>
            <a
                className={styles.podcastLink} 
                rel="noopener noreferrer nofollow"
                href={podcast.spotify}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ 'Piwnica IT', 'Spotify' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={spotify || `/icons/spotify.png`} width={145} height={40} alt=""/>
                </div>
            </a>
            <a
                className={styles.podcastLink}
                rel="noopener noreferrer nofollow"
                href={podcast.applepodcast}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ 'Piwnica IT', 'Apple Podcasts' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={applePodcast || `/icons/applepodcast.svg`} width={196} height={35} alt=""/>
                </div>
            </a>
            <a
                className={styles.podcastLink}
                rel="noopener noreferrer nofollow"
                href={podcast.googlepodcasts}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ 'Piwnica IT', 'Google Podcasts' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={googlePodcast || `/icons/googlepodcast.png`} width={205} height={41} alt=""/>
                </div>
            </a>
            <a
                className={styles.podcastLink}
                rel="noopener noreferrer nofollow"
                href={podcast.youtube}
                target="_blank"
                aria-label={translate({ value: LISTEN_PODCAST_ON, variables: [ 'Piwnica IT', 'Youtube' ] }) as string}
            >
                <div className={styles.podcast}>
                    <Image src={youtube || `/icons/youtube.png`} width={138} height={40} alt=""/>
                </div>
            </a>
        </div>
    </div>
});

ListenNow.displayName = 'ListenNow';

export default ListenNow;
