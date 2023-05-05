import { FC } from 'react';
import { Podcast, PodcastEpisode } from '../../types/common/Podcast.types';
import GuestPodcastPreview from '../GuestPodcastPreview';
import PodcastPreview from '../PodcastPreview';
import styles from './GuestPodcastBlock.module.scss';

type GuestPodcastBlock = {
  title: string;
  description: string;
  episodes: Partial<PodcastEpisode>[]
}

const GuestPodcastBlock: FC<GuestPodcastBlock> = ({ title, description, episodes }) => {
  
  return (
    <section className={styles.GuestPodcastBlock}>
      <h2 className={styles.Title}>{title}</h2>
      <p className={styles.Description}>{description}</p>
      <div>
        {episodes.map(({episode, title, createdDate, excerpt, slug, author, featuredImage, externalLink, time }) => (
          <GuestPodcastPreview 
            key={`${title}-${episode}`}
            title={title}
            createdDate={createdDate}
            excerpt={excerpt}
            slug={slug}
            episode={episode}
            externalLink={externalLink}
            time={time}
            // author={author ? (author[0].fields.name as unknown as string) : ''}
            image={featuredImage}
          />
        ))}
      </div>
    </section>
  )
}

export default GuestPodcastBlock;
