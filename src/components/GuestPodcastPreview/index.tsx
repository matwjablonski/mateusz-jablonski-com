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
  
  return (
    <article className={styles.GuestPodcastPreview}>
      <div className={styles.Image}>
        <ExternalLink href={externalLink}>
          <Image src={prepareImageUrl(image.fields.file.url)} alt={title} width={250} height={250}/>
        </ExternalLink>
      </div>
      <div className={styles.Content}>
        <div>
          <h4 className={styles.Title}><strong>#{episode}</strong> {title}</h4>
          <time className={styles.Time}>{prepareTime()}</time>
          <p className={styles.Text}>{excerpt}</p>
        </div>
        <Button.L pattern={ButtonType.PRIMARY} label="Słuchaj" href={externalLink} isExternal />
      </div>
    </article>
  )
}

export default GuestPodcastPreview;
