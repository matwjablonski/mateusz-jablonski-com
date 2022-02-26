import React, { FunctionComponent } from 'react';
import Title from '../Title'
import PostCover from '../PostCover';
import styles from './Post.module.scss'
import Content from '../Content';
import PostSidebar from '../PostSidebar';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PostProps } from './Post.types';
import PostShare from '../PostShare';

const Post: FunctionComponent<PostProps> = ({content, title, excerpt, featuredImage, numberOfComments, summary, sources, author, commentsBlockRef}) => {

  return (
    <article className={styles.wrapper}>
      <Title classes={styles.title}>{title}</Title>
      <div className={styles.excerpt}>
        {documentToReactComponents(excerpt, {})}
      </div>
      {featuredImage && <PostCover coverImage={featuredImage.fields}/>}
      <div className={styles.content}>
        <PostSidebar author={author[0].fields} numberOfComments={numberOfComments} commentsBlockRef={commentsBlockRef}/>
        <Content content={content} summary={summary} sources={sources} />
      </div>
      <PostShare />
    </article>
  );
};

export default Post;
