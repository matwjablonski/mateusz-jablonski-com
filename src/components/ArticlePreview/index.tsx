import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { ArticlePreviewProps } from './ArticlePreview.types';
import prepareImageUrl from '../../utils/prepareImageUrl';
import styles from './ArticlePreview.module.scss';

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({title, createdDate, featuredImage}) => {
    return (
        <div className={styles.articlePreview}>
            {featuredImage?.image && <Image src={prepareImageUrl(featuredImage?.image?.fields?.file.url)} width={352} height={216}/>}
            {createdDate}
            {title}
        </div>
    )
}

export default ArticlePreview;
