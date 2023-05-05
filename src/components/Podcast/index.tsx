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
import { useTranslations } from '../../hooks/useTranslations';
import { Author } from '../../types/common/Author.types';

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
  episode,
  file,
  podcastCover,
  externalLink,
  podcastTitle,
}) => {
  const { t } = useTranslations();

  return (
    <article className={styles.wrapper}>
      <Title classes={styles.title}>{title}</Title>
      <div className={styles.excerpt}>
        <p>{excerpt}</p>
      </div>
      <div className={styles.metabar}>      
        {createdDate && <MetaItem title={t.ARTICLE.META.PUBLICATION_DATE} value={createdDate} />}
        {podcastTitle && <MetaItem title={t.ARTICLE.META.PODCAST} value={podcastTitle} />}
        {episode !== undefined && <MetaItem title={t.ARTICLE.META.EPISODE} value={`#${episode}`} />}
      </div>
      {featuredImage && <PodcastCover image={featuredImage}/>}
      <div className={styles.content}>
        <PostSidebar author={author && author[0].fields as Author} numberOfComments={numberOfComments} commentsBlockRef={commentsBlockRef}/>
        <PodcastContent
          content={content}
          title={title}
          podcastExcerpt={podcastExcerpt}
          file={file}
          podcastCover={podcastCover}
          externalLink={externalLink}  
        />
      </div>
      <PostShare />
    </article>
  );
};

export default Podcast;
