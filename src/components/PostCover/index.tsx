import React, { FunctionComponent } from 'react';
import cx from 'classnames'
import {useTranslation} from "react-i18next";
import figureStyles from '../../styles/Figure.module.scss'
import ExternalLink from "../ExternalLink";
import styles from './PostCover.module.scss';
import { PostCoverProps } from './PostCover.types';
import prepareImageUrl from '../../utils/prepareImageUrl';

const PostCover: FunctionComponent<PostCoverProps> = ({
  coverImage: { title, author, authorUrl, source, image },
}) => {
  const { t } = useTranslation();
  return (
    <figure className={cx(figureStyles.figure, figureStyles.overflowFigure)}>
      <img
        className={styles.postCoverImage}
        src={prepareImageUrl(image.fields.file.url)}
        alt={`${title} ${t('PAGES.POST.COVER_THUMBNAIL.BY_WHOM')} ${author}`}
      />
    </figure>
  );
};

export default PostCover;
