import React from 'react';
import cx from 'classnames'
import {useTranslation} from "react-i18next";
import figureStyles from '../../styles/Figure.module.scss'
import ExternalLink from "../ExternalLink";
import styles from './PostCover.module.scss';

const PostCover = ({
  coverImage: { url, name, author, authorUrl, source, sourceUrl },
  daysFromToday
}) => {
  const { t } = useTranslation();
  return (
    <figure className={cx(figureStyles.figure, figureStyles.overflowFigure)}>
      <img
        className={styles.postCoverImage}
        src={url}
        alt={`${name} ${t('PAGES.POST.COVER_THUMBNAIL.BY_WHOM')} ${author}`}
      />
      {daysFromToday < 3 && <div className={styles.newPostLabel}>{t('PAGES.POST.COVER_THUMBNAIL.NEW')}</div> }
      <span className={styles.postCoverImageSource}>from {source}</span>
      <figcaption className={figureStyles.figcaption}>
        <ExternalLink href={sourceUrl}>{name}</ExternalLink>
        &nbsp;{t('PAGES.POST.COVER_THUMBNAIL.BY_WHOM')}&nbsp;
        <ExternalLink href={authorUrl}>{author}</ExternalLink>
      </figcaption>
    </figure>
  );
};

export default PostCover;
