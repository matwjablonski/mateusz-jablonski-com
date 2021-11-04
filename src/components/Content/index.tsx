import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES, Document} from '@contentful/rich-text-types';
import styles from './Content.module.scss';
import Entry from "../Entry";
import prepareImageUrl from '../../utils/prepareImageUrl';

interface ContentProps {
  content: Document;
  className?: string;
}

const Content = ({content, className}: ContentProps) => {
  const style = cx(styles.wrapper, className)

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
      [BLOCKS.EMBEDDED_ENTRY]: (node) => <Entry node={node}/>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        return <figure className={cx(styles.wideAsset, styles.wideImage)}>
          <Image src={prepareImageUrl(node.data.target.fields.file.url)} width={1120} height={387} />
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
      {documentToReactComponents(content, options)}
      <div className={styles.dots}></div>
    </div>
  )
}

export default Content
