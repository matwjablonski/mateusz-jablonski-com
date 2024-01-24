import React, { FunctionComponent } from 'react';
import Title from '../Title'
import styles from './Podcast.module.scss'
import { PodcastProps } from './Podcast.types';
import PostShare from '../PostShare';
import MetaItem from '../MetaItem';
import PodcastContent from '../PodcastContent';
import { useTranslations } from '../../hooks/useTranslations';
import PodcastPlayerSection from '../PodcastPlayerSection';
import PodcastAuthorsList from '../PodcastAuthorsList';
import PodcastSources from '../PodcastSources';
import PodcastCommentsSidebar from '../PodcastCommentsSidebar';
import { ArticleWrapper, Sticky, Wrapper, ContentWrapper } from './ui';

const Podcast: FunctionComponent<PodcastProps> = ({
  content,
  title,
  excerpt,
  numberOfComments,
  applepodcast,
  spotify,
  googlepodcast,
  youtube,
  podcastExcerpt,
  author,
  commentsBlockRef,
  createdDate,
  episode,
  file,
  fileUrl,
  podcastCover,
  externalLink,
  time,
  podcastTitle,
}) => {
  const { t } = useTranslations();

  return (
    <ArticleWrapper>
      <Wrapper>
        <Sticky>
          <PodcastPlayerSection
            time={time}
            title={title}
            createdDate={createdDate}
            file={file}
            externalLink={externalLink}
            podcastCover={podcastCover}
          />
          <PodcastSources
            applepodcast={applepodcast}
            spotify={spotify}
            googlepodcast={googlepodcast}
            youtube={youtube}
          />
          <PodcastAuthorsList authors={author} />
          <PodcastCommentsSidebar
            numberOfComments={numberOfComments}
            commentsBlockRef={commentsBlockRef}
          />
        </Sticky>
        <ContentWrapper>
          <Title classes={styles.title}>{title}</Title>
          <div className={styles.excerpt}>
            <p>{excerpt}</p>
          </div>
          <div className={styles.metabar}>      
            {createdDate && <MetaItem title={t.ARTICLE.META.PUBLICATION_DATE} value={createdDate} />}
            {podcastTitle && <MetaItem title={t.ARTICLE.META.PODCAST} value={podcastTitle} />}
            {episode !== undefined && <MetaItem title={t.ARTICLE.META.EPISODE} value={`#${episode}`} />}
          </div>
          <div className={styles.content}>
            <PodcastContent
              createdDate={createdDate}
              content={content}
              title={title}
              podcastExcerpt={podcastExcerpt}
              file={file}
              fileUrl={fileUrl}
              podcastCover={podcastCover}
              externalLink={externalLink}  
              time={time}
            />
          </div>
        </ContentWrapper>
      </Wrapper>
      <PostShare />
    </ArticleWrapper>
  );
};

export default Podcast;
