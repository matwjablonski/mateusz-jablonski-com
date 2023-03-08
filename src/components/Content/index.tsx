import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES, Document} from '@contentful/rich-text-types';
import styles from './Content.module.scss';
import { default as EntryBlock} from "../Entry";
import prepareImageUrl from '../../utils/prepareAssetUrl';
import PostSummary from '../PostSummary';
import PostSources from '../PostSources';

interface ContentProps {
  summary?: Document;
  content: Document;
  sources?: Document;
  className?: string;
  disableSummary?: boolean;
}

const Content = ({content, summary, sources, disableSummary}: ContentProps) => {

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
      [BLOCKS.QUOTE]: (node, children) => <div className={styles.wideAsset}>
        <blockquote className={styles.blockquote}>
          {children}
        </blockquote>
      </div>, 
      [BLOCKS.EMBEDDED_ENTRY]: (node) => <EntryBlock node={node}/>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { width, height } = node.data.target.fields.file.details.image;
        const proportion = width / height;
        const isImageWide = proportion > 1.4;

        return <figure className={cx(styles.figure, isImageWide && styles.wideAsset, isImageWide && styles.wideImage)}>
          <Image
            src={prepareImageUrl(node.data.target.fields.file.url)}
            width={isImageWide ? 1120 : width}
            height={isImageWide ? 387 : height}
            alt={node.data.target.fields.file.fileName}
          />
          {
            node.data.target.fields.description && (
              <figcaption className={styles.caption}>{node.data.target.fields.description}</figcaption>
            )
          }
        </figure>
      },
      [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri}>{children}</a>,
    }
  }

  if (!content) {
    return null
  }

  return (
    <div className={styles.content}>
      {!disableSummary && <PostSummary summary={summary} />}
      {documentToReactComponents(content, options)}
      <div className={styles.dots}></div>
      {sources && <PostSources sources={sources}/>}
    </div>
  )
}

export default Content
