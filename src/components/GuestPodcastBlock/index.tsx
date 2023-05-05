import { FC } from 'react';
import { Podcast, PodcastEpisode } from '../../types/common/Podcast.types';
import PodcastPreview from '../PodcastPreview';
import styles from './GuestPodcastBlock.module.scss';

type GuestPodcastBlock = {
  podcastTitle: string;
  episodes: Partial<PodcastEpisode>[]
}

const GuestPodcastBlock: FC<GuestPodcastBlock> = ({ podcastTitle, episodes }) => {
  
  return (
    <section className={styles.GuestPodcastBlock}>
      <h2 className={styles.Title}>{podcastTitle}</h2>
      <p></p>
      <div>
        {episodes.map(({episode, title, createdDate, excerpt, slug, author, featuredImage }) => (
          <PodcastPreview 
            key={`${podcastTitle}-${episode}`}
            title={title}
            createdDate={createdDate}
            excerpt={excerpt}
            slug={slug}
            author={author ? author[0].fields.name : ''}
            image={featuredImage}
          />
        ))}
      </div>
    </section>
  )
}

export default GuestPodcastBlock;
