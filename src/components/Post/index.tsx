import React, { FunctionComponent } from 'react';
import Title from '../Title'
import {useTranslation} from 'react-i18next';
import PostCover from '../PostCover';
import styles from './Post.module.scss'
import Content from '../Content';
import PostSidebar from '../PostSidebar';
import { Article } from '../../types/common/Article.types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Post: FunctionComponent<{ post: Article }> = ({post}) => {
  const {t} = useTranslation();

  return (
    <article className={styles.wrapper}>
      <Title classes={styles.title}>{post.title}</Title>
      <div className={styles.excerpt}>
        {documentToReactComponents(post.excerpt, {})}
      </div>
      {<PostCover coverImage={post.featuredImage.fields}/>}
      <div className={styles.content}>
        <button onClick={() => {
          console.log('aaaa');
          fetch('/api/comments/add', { method: 'POST', body: JSON.stringify({ id: post.id }) })
        }} >action</button>
        <PostSidebar author={post.author[0].fields} />
        <Content content={post.content}/>
      </div>
      {/*<PostNewsletterBox>*/}
      {/*  <MediumTitle>{t('GENERAL.NEWSLETTER.SUBSCRIBE')}</MediumTitle>*/}
      {/*  <SmallText>{t('GENERAL.NEWSLETTER.DESCRIPTION')}</SmallText>*/}
      {/*  <Newsletter/>*/}
      {/*</PostNewsletterBox>*/}
    </article>
  );
};

export default Post;
