import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { BookBigPreviewProps } from './BookBigPreview.types';
import prepareImageUrl from '../../utils/prepareImageUrl';
import styles from './BookBigPreview.module.scss';
import ImagePlaceholder from '../ImagePlaceholder';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import ContentTypeLabel, { ContentTypeEnum } from '../ContentTypeLabel';

const BookBigPreview: FunctionComponent<BookBigPreviewProps> = ({
    title, createdDate, image, excerpt, slug, showContentType, author,
}) => {
    const imageHeight = 216;
   
    return (
        <article className={cx(styles.articlePreview)}>
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
                        {showContentType && <ContentTypeLabel contentType={ContentTypeEnum.BOOK} />}
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
                        {documentToReactComponents(excerpt, {})}
                        </div>
                </div>
            </div>
            {
                (
                    <Button.L 
                        href={`/blog/${slug}`}
                        pattern={ButtonType.PRIMARY}
                        label="Czytaj więcej"
                    />
                )
            }
        </article>
    )
}

export default BookBigPreview;
