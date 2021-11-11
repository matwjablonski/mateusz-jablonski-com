import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { FunctionComponent } from 'react';
import {Document} from '@contentful/rich-text-types';
import styles from './PostSummary.module.scss';

const PostSummary: FunctionComponent<{ summary: Document }> = ({ summary }) => {
    return (
        <div className={styles.summary}>
            <h2 className={styles.title}>Z tego artykułu dowiesz się:</h2>
            {documentToReactComponents(summary, {})}
        </div>
    )
}

export default PostSummary;
