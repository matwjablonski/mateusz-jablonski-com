import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { FunctionComponent } from 'react';
import styles from './PostSidebar.module.scss';
import { PostSidebarProps } from './PostSidebar.types';

const PostSidebar: FunctionComponent<PostSidebarProps> = ({ author }) => {
    
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.name}>{ author.name }</h2>
            {documentToReactComponents(author.description, {})}
        </div>
    )
}

export default PostSidebar;
