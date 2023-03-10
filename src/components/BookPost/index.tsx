import React, { FunctionComponent } from 'react';
import Title from '../Title';
import Image from 'next/image';
import styles from './BookPost.module.scss';
import Content from '../Content';
import PostSidebar from '../PostSidebar';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BlogPostProps } from './BlogPost.types';
import PostShare from '../PostShare';
import MetaItem from '../MetaItem';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import { ButtonType } from '../Button/Button.types';
import Buttons from '../Button';
import BuyBook from '../BuyBook';
import { useTranslations } from '../../hooks/useTranslations';

const BookPost: FunctionComponent<BlogPostProps> = ({
  content,
  title,
  excerpt,
  numberOfComments,
  summary,
  sources,
  author,
  commentsBlockRef,
  createdDate,
  categoryName,
  coverImage,
  affiliateLink,
  bookType,
  seller,
  rate,
}) => {
  const { t } = useTranslations();

  const buyBookSection = (
    <div className={styles.buyBookSection}>
      <div className={styles.buyInfo}>
        <h2>Ta książka może być Twoja</h2>
        <p>Książka jest dostępna w sklepie <strong>{seller.fields.name}</strong>. Zachęcam do zakupu. Pamiętaj, że <strong className={styles.fundation}>5%</strong> z zysku od sprzedaży zostanie przekazane na rzecz <strong className={styles.fundation}>Fundacji Radość z Uśmiechu</strong>.</p>
      </div>
      <BuyBook affiliateLink={affiliateLink} seller={seller?.fields} bookType={bookType} />
    </div>
  )

  return (
    <article className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.sideCover}>
          <Image src={prepareImageUrl(coverImage)} fill alt={title}/>
        </div>
        <div>
          <Title classes={styles.title}>{title}</Title>
          <div className={styles.excerpt}>
            {documentToReactComponents(excerpt, {})}
          </div>
          <div className={styles.metabar}>
            {categoryName && <MetaItem title={t.ARTICLE.META.CATEGORY} value={categoryName} />}
            {createdDate && <MetaItem title={t.ARTICLE.META.READING_DATE} value={createdDate} />}
            {rate && <MetaItem title={t.ARTICLE.META.MY_RATE} value={`${rate}/10`} />}
          </div>
        </div>
      </div>
      {affiliateLink && buyBookSection}
      <div className={styles.content}>
        <PostSidebar author={author[0].fields} numberOfComments={numberOfComments} commentsBlockRef={commentsBlockRef}/>
        <Content content={content} summary={summary} sources={sources} disableSummary/>
      </div>
      {affiliateLink && buyBookSection}
      <PostShare />
    </article>
  );
};

export default BookPost;
