import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ArticlePreviewProps, Preview } from './ArticlePreview.types';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import styles from './ArticlePreview.module.scss';
import ImagePlaceholder from '../ImagePlaceholder';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import ContentTypeLabel, { ContentTypeEnum } from '../ContentTypeLabel';
import { useTranslations } from '../../hooks/useTranslations';

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({
    title, createdDate, featuredImage, excerpt, slug, className, preview, externalSource, showContentType,
}) => {
    const imageWidth = preview === Preview.VERTICAL ? 352 : 544;
    const imageHeight = preview === Preview.VERTICAL ? 216 : 289;

    const { t } = useTranslations();
    
    return (
        <article className={cx(styles.articlePreview, className)}>
            <div className={styles[preview]}>
                {
                    externalSource ? (
                        <a href={externalSource} target="_blank" rel="noopener noreferrer">
                            {
                                featuredImage?.fields?.image ?
                                    (
                                        <div className={styles.imageBox}>
                                            <Image
                                                src={prepareImageUrl(featuredImage?.fields?.image?.fields?.file.url)}
                                                width={imageWidth}
                                                height={imageHeight}
                                                className={styles.image}
                                                alt={`${featuredImage.fields.title} by ${featuredImage.fields.author}`}
                                            />
                                            {externalSource &&  <div className={styles.external}>External</div>}
                                        </div>
                                    ) :
                                    <ImagePlaceholder width="352px" height="216px" />
                            }
                        </a>
                    ) : (
                        <Link href={`/blog/${slug}`}>
                            {
                                featuredImage?.fields?.image ?
                                    (
                                        <div className={styles.imageBox}>
                                            <Image
                                                src={prepareImageUrl(featuredImage?.fields?.image?.fields?.file.url)}
                                                width={imageWidth}
                                                height={imageHeight}
                                                className={styles.image}
                                                alt={`${featuredImage.fields.title} by ${featuredImage.fields.author}`}
                                            />
                                            {externalSource && <div className={styles.external}>External</div>}
                                        </div>
                                    ) :
                                    <ImagePlaceholder width="352px" height="216px" />
                            }
                        </Link>
                    )
                }
                
                <div className={styles.content}>
                    <div>
                        {showContentType && <ContentTypeLabel contentType={ContentTypeEnum.ARTICLE} />}
                        <div className={styles.date}>{createdDate}</div>
                        {
                            externalSource ? (
                                <a href={externalSource} target="_blank" rel="noopener noreferrer">
                                    <h3 className={styles.title}>{title}</h3>
                                </a>
                            ) : (
                                <Link href={externalSource || `/blog/${slug}`} passHref={!!externalSource}>
                                    <h3 className={styles.title}>{title}</h3>
                                </Link>
                            )
                        }
                        {documentToReactComponents(excerpt, {})}
                        </div>
                    {
                        preview === Preview.HORIZONTAL && (
                            <Button.L
                                isExternal={!!externalSource}
                                href={externalSource || `/blog/${slug}`}
                                passHref={!!externalSource}
                                pattern={ButtonType.PRIMARY}
                                label={t.ARTICLE.ACTIONS.READ_MORE}
                            />
                        )
                    }
                </div>
            </div>
            {
                preview === Preview.VERTICAL && (
                    <Button.L 
                        isExternal={!!externalSource}
                        href={externalSource || `/blog/${slug}`}
                        passHref={!!externalSource}
                        pattern={ButtonType.PRIMARY}
                        label={t.ARTICLE.ACTIONS.READ_MORE}
                    />
                )
            }
        </article>
    )
}

export default ArticlePreview;
