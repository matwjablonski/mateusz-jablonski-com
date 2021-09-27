import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import ImagePlaceholder from '../ImagePlaceholder';
import prepareImageUrl from '../../utils/prepareImageUrl';
import { Podcast } from '../../types/common/Podcast.types';
import styles from './LastPodcastPreview.module.scss'

const LastPodcastPreview: FunctionComponent<Pick<Podcast, 'title' | 'createdDate' | 'excerpt' | 'slug' | 'featuredImage' | 'episode'>> = ({ title, createdDate, slug, excerpt, featuredImage }) => {
    return (
        <article className={styles.lastPodcastPreview}>
            <div className={styles.imageWrapper}>
                {
                    featuredImage ? 
                        <Image width={736} height={605} src={prepareImageUrl(featuredImage.fields.file.url)} className={styles.image}/> : 
                        <ImagePlaceholder width={736} height={605}/>
                }
            </div>
            <div className={styles.content}>
                <span>{createdDate}</span>
                <h3 className={styles.title}>{title}</h3>
                <p>{excerpt}</p>
            </div>
        </article>
    )
}

export default LastPodcastPreview;
