import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '../ImagePlaceholder';
import prepareImageUrl from '../../utils/prepareImageUrl';
import { Podcast } from '../../types/common/Podcast.types';
import styles from './LastPodcastPreview.module.scss'
import EpisodeNumber from '../EpisodeNumber';
import { EpisodeNumberSize } from '../EpisodeNumber/EpisodeNumber.types';

const LastPodcastPreview: FunctionComponent<Pick<Podcast, 'title' | 'createdDate' | 'excerpt' | 'slug' | 'featuredImage' | 'episode'>> = ({ title, createdDate, slug, excerpt, featuredImage, episode }) => {
    return (
        <Link href={`/podcast/${slug}`}>
            <a title={title}>
                <article className={styles.lastPodcastPreview}>
                    <div className={styles.imageWrapper}>
                        {
                            featuredImage ? 
                                <Image width={736} height={605} src={prepareImageUrl(featuredImage.fields.file.url)} className={styles.image}/> : 
                                <ImagePlaceholder width={736} height={605}/>
                        }
                    </div>
                    <EpisodeNumber episode={episode} size={EpisodeNumberSize.BIG} className={styles.episode} />
                    <div className={styles.content}>
                        <span>{createdDate}</span>
                        <h3 className={styles.title}>{title}</h3>
                        <p>{excerpt}</p>
                    </div>
                </article>
            </a>
        </Link>
    )
}

export default LastPodcastPreview;
