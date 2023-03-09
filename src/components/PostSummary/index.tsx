import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React, { FunctionComponent } from 'react';
import {Document} from '@contentful/rich-text-types';
import styles from './PostSummary.module.scss';
import { useTranslations } from '../../hooks/useTranslations';

const PostSummary: FunctionComponent<{ summary: Document }> = ({ summary }) => {
    const { t } = useTranslations();
    return (
        <div className={styles.summary}>
            <h2 className={styles.title}>{t.ARTICLE.SUMMARY.TITLE}</h2>
            {documentToReactComponents(summary, {})}
        </div>
    )
}

export default PostSummary;
