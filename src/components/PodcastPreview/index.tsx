import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Button from '../Button';
import ContentTypeLabel, { ContentTypeEnum } from '../ContentTypeLabel';
import ImagePlaceholder from '../ImagePlaceholder';
import { PodcastPreviewProps } from './PodcastPreview.types';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import styles from './PodcastPreview.module.scss';
import { ButtonType } from '../Button/Button.types';

const PodcastPreview: FC<PodcastPreviewProps> = ({ title, createdDate, image, excerpt, slug, showContentType, author }) => {
  const imageHeight = 289;

  return (
    <article className={cx(styles.podcastPreview)}>
      <div>
        {
          (
            <Link href={`/book/${slug}`}>
              <a>
                {
                  image ?
                    (
                      <div className={styles.imageBox}>
                        <Image
                          src={prepareImageUrl(image?.fields?.file.url)}
                          height={imageHeight}
                          className={styles.image}
                          alt={`${title} by ${author}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) :
                    <ImagePlaceholder width="352px" height="216px" />
                }
              </a>
            </Link>
          )
        }
        <div className={styles.content}>
          <div>
            {showContentType && <ContentTypeLabel contentType={ContentTypeEnum.PODCAST} />}
            <div className={styles.date}>{createdDate}</div>
            {
              (
                <Link href={`/blog/${slug}`}>
                  <a>
                    <h3 className={styles.title}>{title}</h3>
                  </a>
                </Link>
              )
            }
            <p>{excerpt}</p>
          </div>
        </div>
      </div>
      {
        (
          <Button.L 
            href={`/blog/${slug}`}
            pattern={ButtonType.PRIMARY}
            label="Posłuchaj"
          />
        )
      }
    </article>
  )
}

export default PodcastPreview;
