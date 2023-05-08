import { FC } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { PodcastEpisode } from '../../types/common/Podcast.types';
import GuestPodcastPreview from '../GuestPodcastPreview';
import styles from './PodcastSeason.module.scss';

type PodcastSeason = {
  season: number;
  episodes: PodcastEpisode[];
}

const PodcastSeason: FC<PodcastSeason> = ({ season, episodes }) => {
  const { t } = useTranslations();
  return (
    <div className={styles.PodcastSeason}>
      <div className={styles.Meta}>
        <p className={styles.Season}>{t.PODCAST.MY_PODCASTS.META.SEASON}: {season}</p>
        <p className={styles.Episodes}>{t.PODCAST.MY_PODCASTS.META.EPISODES}: {episodes.length}</p>
      </div>
      {episodes.map(({ episode, createdDate, excerpt, slug, externalLink, time, featuredImage, title: episodeTitle}) => (
        <GuestPodcastPreview
          key={`${episodeTitle}-${episode}`}
          title={episodeTitle}
          createdDate={createdDate}
          excerpt={excerpt}
          slug={slug}
          episode={episode}
          externalLink={externalLink}
          time={time}
          image={featuredImage}
        />
      ))}
    </div>
  )
}

export default PodcastSeason;
