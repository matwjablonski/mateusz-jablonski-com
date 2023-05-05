import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import {useTranslation} from "react-i18next";
import styles from './PodcastCover.module.scss';
import { PodcastCoverProps } from './PodcastCover.types';
import prepareImageUrl from '../../utils/prepareAssetUrl';

const PodcastCover: FunctionComponent<PodcastCoverProps> = ({
  image
}) => {
  const { t } = useTranslation();
  return (
    <figure className={cx(styles.wrapper)}>
      <Image 
        src={prepareImageUrl(image.fields.file.url as string)}
        width={1147}
        height={460}
        alt={`${image.fields.title} ${t('PAGES.POST.COVER_THUMBNAIL.BY_WHOM')}`}
        className={styles.image}
      />
    </figure>
  );
};

export default PodcastCover;
