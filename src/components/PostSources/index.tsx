import React, { FC } from 'react';
import { PostSourcesProps } from './PostSources.types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './PostSources.module.scss';
import { INLINES } from '@contentful/rich-text-types';
import { useTranslations } from '../../hooks/useTranslations';

const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri} target="_blank" rel="noopener noreferrer nofollow">{children}</a>,
    }
  }

const PostSources: FC<PostSourcesProps> = ({ sources }) => {
  const { t } = useTranslations();
  return <div className={styles.sources}>
      <h3 className={styles.title}>{t.ARTICLE.SOURCES}</h3>
      {documentToReactComponents(sources, options)}
  </div>
}

PostSources.displayName = 'PostSources';

export default PostSources;
