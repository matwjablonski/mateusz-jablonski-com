import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArticlePreviewProps } from './ArticlePreview.types';
import prepareImageUrl from '../../utils/prepareImageUrl';
import styles from './ArticlePreview.module.scss';
import ImagePlaceholder from '../ImagePlaceholder';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({title, createdDate, featuredImage, excerpt, slug}) => {
    return (
        <article className={styles.articlePreview}>
            <div>
                <Link href={`/blog/${slug}`}>
                    <a>
                        {
                            featuredImage?.image ? 
                                (
                                    <div className={styles.imageBox}>
                                        <Image src={prepareImageUrl(featuredImage?.image?.fields?.file.url)} width={352} height={216} className={styles.image}/>
                                    </div>
                                ) :
                                <ImagePlaceholder width="352px" height="216px" />
                        }
                    </a>
                </Link>
                <div className={styles.date}>{createdDate}</div>
                <Link href={`/blog/${slug}`}>
                    <a>
                    <   h3 className={styles.title}>{title}</h3>
                    </a>
                </Link>
                {documentToReactComponents(excerpt, {})}
            </div>
            <Button.L href={`/blog/${slug}`} pattern={ButtonType.PRIMARY} label="Czytaj więcej"/>
        </article>
    )
}

export default ArticlePreview;
