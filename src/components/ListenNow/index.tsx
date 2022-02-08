import React, { FunctionComponent, memo } from 'react';
import cx from 'classnames';
import styles from './ListenNow.module.scss';
import Image from 'next/image';
import spotify from '../../public/icons/spotify.png';
import applePodcast from '../../public/icons/applepodcast.svg';
import googlePodcast from '../../public/icons/googlepodcast.png'
import youtube from '../../public/icons/youtube.png';

const ListenNow: FunctionComponent<{ className?: string; }> = memo(({ className }) => {
    return <div className={cx(styles.listenNow, className)}>
        <h2 className={styles.title}>Słuchaj mojego podcastu:</h2>
        <div className={styles.podcasts}>
            <a className={styles.podcastLink} rel="noopener noreferrer nofollow" href="" target="_blank">
                <div className={styles.podcast}>
                    <Image src={spotify || `/icons/spotify.png`} width={145} height={40} alt=""/>
                </div>
            </a>
            <a className={styles.podcastLink} rel="noopener noreferrer nofollow" href="" target="_blank">
                <div className={styles.podcast}>
                    <Image src={applePodcast || `/icons/applepodcast.svg`} width={196} height={35} alt=""/>
                </div>
            </a>
            <a className={styles.podcastLink} rel="noopener noreferrer nofollow" href="" target="_blank">
                <div className={styles.podcast}>
                    <Image src={googlePodcast || `/icons/googlepodcast.png`} width={205} height={41} alt=""/>
                </div>
            </a>
            <a className={styles.podcastLink} rel="noopener noreferrer nofollow" href="" target="_blank">
                <div className={styles.podcast}>
                    <Image src={youtube || `/icons/youtube.png`} width={138} height={40} alt=""/>
                </div>
            </a>
        </div>
    </div>
});

ListenNow.displayName = 'ListenNow';

export default ListenNow;