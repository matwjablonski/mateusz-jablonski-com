import React, { FunctionComponent } from 'react';
import Title from '../Title'
import styles from './Podcast.module.scss'
import Content from '../Content';
import PostSidebar from '../PostSidebar';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PodcastProps } from './Podcast.types';
import PostShare from '../PostShare';
import MetaItem from '../MetaItem';
import PodcastCover from '../PodcastCover';
import PodcastContent from '../PodcastContent';

const Podcast: FunctionComponent<PodcastProps> = ({
  content,
  title,
  excerpt,
  featuredImage,
  numberOfComments,
  podcastExcerpt,
  author,
  commentsBlockRef,
  createdDate,
  categoryName,
  level,
  file,
  podcastCover,
}) => {

  return (
    <article className={styles.wrapper}>
      <Title classes={styles.title}>{title}</Title>
      <div className={styles.excerpt}>
        <p>{excerpt}</p>
      </div>
      <div className={styles.metabar}>
        {categoryName && <MetaItem title="Kategoria" value={categoryName} />}
        {createdDate && <MetaItem title="Data publikacji" value={createdDate} />}
        {level && <MetaItem title="Poziom" value={level} />}
      </div>
      {featuredImage && <PodcastCover image={featuredImage}/>}
      <div className={styles.content}>
        <PostSidebar author={author[0].fields} numberOfComments={numberOfComments} commentsBlockRef={commentsBlockRef}/>
        <PodcastContent content={content} title={title} podcastExcerpt={podcastExcerpt} file={file} podcastCover={podcastCover}/>
      </div>
      <PostShare />
    </article>
  );
};

export default Podcast;
