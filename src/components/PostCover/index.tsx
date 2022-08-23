import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import {useTranslation} from "react-i18next";
import styles from './PostCover.module.scss';
import { PostCoverProps } from './PostCover.types';
import prepareImageUrl from '../../utils/prepareAssetUrl';

const PostCover: FunctionComponent<PostCoverProps> = ({
  coverImage: { title, author,  image },
}) => {
  const { t } = useTranslation();
  return (
    <figure className={cx(styles.wrapper)}>
      <Image 
        src={prepareImageUrl(image.fields.file.url)}
        width={1147}
        height={460}
        objectFit="cover"
        alt={`${title} ${t('PAGES.POST.COVER_THUMBNAIL.BY_WHOM')} ${author}`}
        className={styles.image}
      />
    </figure>
  );
};

export default PostCover;
