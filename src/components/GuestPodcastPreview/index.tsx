import { Asset } from 'contentful';
import Image from 'next/image';
import { FC } from 'react';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import { ButtonType } from '../Button/Button.types';
import Button from '../Button';
import ExternalLink from '../ExternalLink';
import styles from './GuestPodcastPreview.module.scss';
import { convertMinutesToTimeObject } from '../../utils/formatTime';
import { useTranslations } from '../../hooks/useTranslations';
import EpisodeNumber from '../EpisodeNumber';
import Link from 'next/link';

type GuestPodcastPreview = {
  title: string;
  createdDate: Date;
  excerpt: string;
  slug: string;
  image: Asset;
  episode: number;
  externalLink?: string;
  time: number;
}

const GuestPodcastPreview: FC<GuestPodcastPreview> = ({ title, createdDate, excerpt, slug, episode, image, externalLink, time }) => {
  const { hours, minutes } = convertMinutesToTimeObject(time);
  const { t } = useTranslations();

  const prepareTime = () => {
    let hoursTranslations = t.COMMON.HOUR;
    let minutesTranslations = t.COMMON.MINUTE;

    if (hours > 1 && hours < 5) {
      hoursTranslations = t.COMMON.HOURS_2_4;
    }

    if (minutes > 1 && minutes < 5) {
      minutesTranslations = t.COMMON.MINUTES_2_4;
    }

    if (hours >= 5) {
      hoursTranslations = t.COMMON.HOURS;
    }

    if (minutes >= 5) {
      minutesTranslations = t.COMMON.MINUTES;
    }

    const hoursString = hours ? `${hours} ${hoursTranslations}` : '';
    const minutesString = minutes ? `${minutes} ${minutesTranslations}` : '';

    return hoursString ? `${hoursString} ${minutesString}` : minutesString;
  }

  const imageContent = <>
    <div className={styles.EpisodeNo}>
      <EpisodeNumber episode={episode} />
    </div>
    {image && <Image src={prepareImageUrl(image.fields.file.url)} alt={title} width={250} height={250}/>}
  </>
  
  return (
    <article className={styles.GuestPodcastPreview}>
      <div className={styles.Image}>
        {externalLink && <ExternalLink href={externalLink}>
          {imageContent}
        </ExternalLink>}
        {!externalLink && <Link href={`/podcast/${slug}`}>
          {imageContent}
        </Link>}
      </div>
      <div className={styles.Content}>
        <div>
          {externalLink && <ExternalLink href={externalLink}>
            <h4 className={styles.Title}>{title}</h4>
          </ExternalLink>}
          {!externalLink && <Link href={`/podcast/${slug}`}>
            <h4 className={styles.Title}>{title}</h4>
          </Link>}
          <time className={styles.Time}>{prepareTime()}</time>
          <p className={styles.Text}>{excerpt}</p>
        </div>
        {externalLink && <Button.L pattern={ButtonType.PRIMARY} label={t.PODCAST.COMMON.LISTEN} href={externalLink} isExternal />}
        {!externalLink && <Button.L pattern={ButtonType.PRIMARY} label={t.PODCAST.COMMON.LISTEN} href={`/podcast/${slug}`} />}
      </div>
    </article>
  )
}

export default GuestPodcastPreview;
