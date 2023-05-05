import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '../ImagePlaceholder';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import styles from './LastPodcastPreview.module.scss'
import EpisodeNumber from '../EpisodeNumber';
import { EpisodeNumberSize } from '../EpisodeNumber/EpisodeNumber.types';
import { LastPodcastPreviewProps, LastPodcastPreviewSize } from './LastPodcastPreview.types';

const LastPodcastPreview: FunctionComponent<LastPodcastPreviewProps> = ({ 
    title, createdDate, slug, excerpt, featuredImage, episode, previewSize, podcastTitle,
}) => {

    const podcastInfo = <>
        {podcastTitle}
    </>

    return (
        <Link href={`/podcast/${slug}`} title={title}>
            <article className={cx(styles.lastPodcastPreview, styles[previewSize])}>
                <div className={styles.imageWrapper}>
                    { 
                        previewSize === LastPodcastPreviewSize.BIG && (
                            featuredImage ? 
                                <Image 
                                    width={736}
                                    height={605}
                                    src={prepareImageUrl(featuredImage.fields.file.url as string)}
                                    className={styles.image}
                                    alt=""
                                /> : 
                                <ImagePlaceholder width={736} height={605}/>
                        )
                    }
                    {
                        previewSize === LastPodcastPreviewSize.SMALL && (
                            featuredImage ? 
                                <Image
                                    width={353}
                                    height={191}
                                    src={prepareImageUrl(featuredImage.fields.file.url as string)}
                                    className={styles.image}
                                    alt=""
                                /> : 
                                <ImagePlaceholder width={353} height={191}/>
                        )
                    }
                </div>
                <EpisodeNumber
                    episode={episode}
                    size={previewSize === LastPodcastPreviewSize.BIG ? EpisodeNumberSize.BIG : EpisodeNumberSize.SMALL}
                    className={styles.episode}
                />
                <div className={styles.content}>
                    <div className={styles.date}>{createdDate} | {podcastInfo}</div>
                    <h3 className={styles.title}>{title}</h3>
                    {previewSize === LastPodcastPreviewSize.BIG && (<p className={styles.text}>{excerpt}</p>)}
                </div>
            </article>
        </Link>
    )
}

export default LastPodcastPreview;
