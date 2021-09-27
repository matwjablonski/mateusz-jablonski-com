import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { LastPodcastsProps } from './LastPodcasts.types';
import styles from './LastPodcasts.module.scss';
import prepareImageUrl from '../../utils/prepareImageUrl';
import LastPodcastPreview from '../LastPodcastPreview';

const LastPodcasts: FunctionComponent<LastPodcastsProps> = ({ podcasts }) => {

    return <div className={styles.wrapper}>
        {podcasts.map(({ title, featuredImage, episode, excerpt, createdDate, slug }) => <LastPodcastPreview createdDate={createdDate} slug={slug} title={title} featuredImage={featuredImage} episode={episode} excerpt={excerpt} />)}
    </div>
}

export default LastPodcasts;
