import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { LastPodcastsProps } from './LastPodcasts.types';
import styles from './LastPodcasts.module.scss';
import prepareImageUrl from '../../utils/prepareImageUrl';
import LastPodcastPreview from '../LastPodcastPreview';

const LastPodcasts: FunctionComponent<LastPodcastsProps> = ({ podcasts }) => {
    const [first, ...rest] = podcasts;

    return <div className={styles.wrapper}>
        <div className={styles.main}>
            <LastPodcastPreview 
                createdDate={first.createdDate}
                slug={first.slug}
                title={first.title}
                featuredImage={first.featuredImage}
                episode={first.episode}
                excerpt={first.excerpt}
            />
        </div>
        <div className={styles.column}>
            {rest.map(({ title, featuredImage, episode, excerpt, createdDate, slug }) => <LastPodcastPreview 
                key={slug}
                createdDate={createdDate}
                slug={slug} title={title}
                featuredImage={featuredImage}
                episode={episode}
                excerpt={excerpt}
            />)}
        </div>
    </div>
}

export default LastPodcasts;
