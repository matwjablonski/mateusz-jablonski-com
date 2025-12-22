import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { BookBigPreviewProps } from './BookBigPreview.types';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import styles from './BookBigPreview.module.scss';
import ImagePlaceholder from '../ImagePlaceholder';
import ContentTypeLabel, { ContentTypeEnum } from '../ContentTypeLabel';

const BookBigPreview: FunctionComponent<BookBigPreviewProps> = ({
    title, createdDate, image, showContentType, author,
}) => {
    const imageHeight = 216;
    const imageWidth = 352;
   
    return (
        <article className={cx(styles.articlePreview)}>
            <div>
                {
                    image ? (
                        <div className={styles.imageBox}>
                            <Image
                                src={prepareImageUrl(image?.fields?.file.url as string)}
                                height={imageHeight}
                                width={imageWidth}
                                className={styles.image}
                                alt={`${title} by ${author}`}
                            />
                        </div>
                    ) : (
                        <ImagePlaceholder width="352px" height="216px" />
                    )
                }
                
                <div className={styles.content}>
                    <div>
                        {showContentType && <ContentTypeLabel contentType={ContentTypeEnum.BOOK} />}
                        <div className={styles.date}>{createdDate}</div>
                        <h3 className={styles.title}>{title}</h3>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BookBigPreview;
