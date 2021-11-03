import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { PostAuthorProps } from './PostAuthor.types';
import styles from './PostAuthor.module.scss';
import prepareImageUrl from '../../utils/prepareImageUrl';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const PostAuthor: FunctionComponent<PostAuthorProps> = ({ author }) => {
    return (
        <div className={styles.authorWrapper}>
            <div className={styles.authorImage}>
                {
                    author.image ? 
                        <Image src={prepareImageUrl(author.image.fields.file.url)} width={197} height={197} /> :
                        <div />
                }
            </div>
            <div className={styles.content}>
                <h3 className={styles.sectionTitle}>O autorze</h3>
                <h2 className={styles.authorName}>{author.name}</h2>
                <div className={styles.authorBio}>
                    {documentToReactComponents(author.shortBiography, {})}
                </div>
            </div>
        </div>
    )
}

export default PostAuthor;
