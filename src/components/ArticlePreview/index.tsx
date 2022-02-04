import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ArticlePreviewProps, Preview } from './ArticlePreview.types';
import prepareImageUrl from '../../utils/prepareImageUrl';
import styles from './ArticlePreview.module.scss';
import ImagePlaceholder from '../ImagePlaceholder';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({ title, createdDate, featuredImage, excerpt, slug, className, preview }) => {
    const imageWidth = preview === Preview.VERTICAL ? 352 : 544;
    const imageHeight = preview === Preview.VERTICAL ? 216 : 289;
    
    return (
        <article className={cx(styles.articlePreview, className)}>
            <div className={styles[preview]}>
                <Link href={`/blog/${slug}`}>
                    <a>
                        {
                            featuredImage?.fields?.image ?
                                (
                                    <div className={styles.imageBox}>
                                        <Image src={prepareImageUrl(featuredImage?.fields?.image?.fields?.file.url)} width={imageWidth} height={imageHeight} className={styles.image} />
                                    </div>
                                ) :
                                <ImagePlaceholder width="352px" height="216px" />
                        }
                    </a>
                </Link>
                <div className={styles.content}>
                    <div>
                        <div className={styles.date}>{createdDate}</div>
                        <Link href={`/blog/${slug}`}>
                            <a>
                                <   h3 className={styles.title}>{title}</h3>
                            </a>
                        </Link>
                        {documentToReactComponents(excerpt, {})}
                        </div>
                    {preview === Preview.HORIZONTAL && <Button.L href={`/blog/${slug}`} pattern={ButtonType.PRIMARY} label="Czytaj więcej" />}
                </div>
            </div>
            {preview === Preview.VERTICAL && <Button.L href={`/blog/${slug}`} pattern={ButtonType.PRIMARY} label="Czytaj więcej" />}
        </article>
    )
}

export default ArticlePreview;
