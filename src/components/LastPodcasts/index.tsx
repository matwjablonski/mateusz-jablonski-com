import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { LastPodcastsProps } from './LastPodcasts.types';
import styles from './LastPodcasts.module.scss';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import LastPodcastPreview from '../LastPodcastPreview';
import { LastPodcastPreviewSize } from '../LastPodcastPreview/LastPodcastPreview.types';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import { useTranslations } from '../../hooks/useTranslations';

const LastPodcasts: FunctionComponent<LastPodcastsProps> = ({ podcasts }) => {
    const { t } = useTranslations();
    const [first, ...rest] = podcasts;

    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <LastPodcastPreview 
                        previewSize={LastPodcastPreviewSize.BIG}
                        createdDate={first.createdDate}
                        slug={first.slug}
                        title={first.title}
                        featuredImage={first.featuredImage}
                        episode={first.episode}
                        excerpt={first.excerpt}
                        podcastTitle={first.podcastTitle}
                    />
                </div>
                <div className={styles.column}>
                    {rest.map(({ 
                        title,
                        featuredImage,
                        episode,
                        excerpt,
                        createdDate,
                        slug,
                        podcastTitle,
                    }) => <LastPodcastPreview 
                        key={slug}
                        previewSize={LastPodcastPreviewSize.SMALL}
                        createdDate={createdDate}
                        slug={slug} title={title}
                        featuredImage={featuredImage}
                        episode={episode}
                        excerpt={excerpt}
                        podcastTitle={podcastTitle}
                    />)}
                </div>
            </div>
            <div className={styles.btnsLine}>
                <Button.L href="/" pattern={ButtonType.CLEAN} label={t.HOME.ALL_PODCASTS} />
                <Button.L href="/" pattern={ButtonType.SECONDARY} label={t.HOME.WANT_TO_BE_A_GUEST} />
            </div>
        </div>
    )
}

export default LastPodcasts;
