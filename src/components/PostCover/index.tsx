import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import {useTranslation} from "react-i18next";
import styles from './PostCover.module.scss';
import { PostCoverProps } from './PostCover.types';
import prepareImageUrl from '../../utils/prepareImageUrl';

const PostCover: FunctionComponent<PostCoverProps> = ({
  coverImage: { title, author, authorUrl, source, image },
}) => {
  const { t } = useTranslation();
  return (
    <figure className={cx(styles.InputWrapper)}>
      <Image 
        src={prepareImageUrl(image.fields.file.url)}
        width={1147}
        height={460}
        alt={`${title} ${t('PAGES.POST.COVER_THUMBNAIL.BY_WHOM')} ${author}`}
        className={styles.image}
      />
    </figure>
  );
};

export default PostCover;
