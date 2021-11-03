import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import styles from './PostSidebar.module.scss';
import { PostSidebarProps } from './PostSidebar.types';
import commentsIcon from '../../public/icons/comments.svg';

const PostSidebar: FunctionComponent<PostSidebarProps> = ({ author, numberOfComments, commentsBlockRef}) => {
    const handleGoToCommentsBlock = () => {
        if (commentsBlockRef.current) {
            commentsBlockRef.current.scrollIntoView({ behavior: 'smooth'})
        }
    }

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.name}>{ author.name }</h2>
            <div className={styles.description}>
                {documentToReactComponents(author.description, {})}
            </div>
            <div onClick={handleGoToCommentsBlock} className={styles.comments}>
                <div className={styles.commentsIcon}>
                    <Image src={commentsIcon} width={24} height={24}/>
                </div>
                {numberOfComments}
            </div>
        </div>
    )
}

export default PostSidebar;
