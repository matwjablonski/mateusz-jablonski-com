import React from 'react';
import cx from 'classnames'
import Title from '../Title'
import {useTranslation} from 'react-i18next';
import PostCover from "../PostCover";
import styles from './Post.module.scss'
import ExternalLink from "../ExternalLink";
import Content from "../Content";

const Post = ({post}) => {
  const {t} = useTranslation();

  console.log(post.content.content)

  return (
    <article className={styles.wrapper}>
      <Title classes={styles.title}>{post.title}</Title>
      <PostCover coverImage={post.coverImage} daysFromToday={0}/>
      <div className={styles.content}>
        <Content content={post.content}/>
      </div>
      <div className={styles.footer}>
        <Title classes={cx(styles.title, styles.footerTitle)}>{t('PAGES.POST.ADDITIONAL_MATERIALS')}</Title>
        {post.repositoryUrl && <ExternalLink href={post.repositoryUrl}>{t('PAGES.POST.REPO_URL')}</ExternalLink>}
        {post.demoUrl && <ExternalLink href={post.demoUrl}>{t('PAGES.POST.DEMO_URL')}</ExternalLink>}
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
