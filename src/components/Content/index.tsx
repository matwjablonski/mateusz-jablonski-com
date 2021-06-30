import React from 'react'
import cx from 'classnames'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import {BLOCKS, INLINES} from '@contentful/rich-text-types'

import styles from './Content.module.scss';
import Entry from "../Entry";

interface ContentProps {
  content: any;
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
      [BLOCKS.EMBEDDED_ENTRY]: (node) => <Entry node={node}/>,
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => <p>abc</p>,
      [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri}>{children}</a>,
    }
  }

  if (!content) {
    return null
  }

  return (
    <div className={style}>
      {documentToReactComponents(content, options)}
    </div>
  )
}

export default Content
