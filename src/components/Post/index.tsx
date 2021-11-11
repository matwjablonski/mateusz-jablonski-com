import React, { FunctionComponent } from 'react';
import Title from '../Title'
import {useTranslation} from 'react-i18next';
import PostCover from '../PostCover';
import styles from './Post.module.scss'
import Content from '../Content';
import PostSidebar from '../PostSidebar';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PostProps } from './Post.types';
import PostShare from '../PostShare';

const Post: FunctionComponent<PostProps> = ({post, numberOfComments, commentsBlockRef}) => {
  const {t} = useTranslation();

  return (
    <article className={styles.wrapper}>
      <Title classes={styles.title}>{post.title}</Title>
      <div className={styles.excerpt}>
        {documentToReactComponents(post.excerpt, {})}
      </div>
      {<PostCover coverImage={post.featuredImage.fields}/>}
      <div className={styles.content}>
        <PostSidebar author={post.author[0].fields} numberOfComments={numberOfComments} commentsBlockRef={commentsBlockRef}/>
        <Content content={post.content} summary={post?.summary} />
      </div>
      <PostShare />
    </article>
  );
};

export default Post;
