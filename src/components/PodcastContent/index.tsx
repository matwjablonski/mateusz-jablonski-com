import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES, Document} from '@contentful/rich-text-types';
import styles from './PodcastContent.module.scss';
import { default as EntryBlock} from "../Entry";
import prepareImageUrl from '../../utils/prepareAssetUrl';
import { Asset } from 'contentful';
import dynamic from 'next/dynamic';
import prepareFileUrl from '../../utils/prepareAssetUrl';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import prepareAssetUrl from '../../utils/prepareAssetUrl';

interface PodcastContentProps {
  content: Document;
  podcastExcerpt?: Document;
  className?: string;
  createdDate?: Date;
  file: Asset;
  title: string;
  podcastCover?: Asset;
  externalLink?: string;
  video?: string;
  time?: number;
}

const DynamicPlayer = dynamic(
  () => import('../../components/Player'),
  { ssr: false }
);

const PodcastContent = ({content, title, file, podcastExcerpt, podcastCover, externalLink, video, createdDate, time }: PodcastContentProps) => {
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

        return <figure className={cx(isImageWide && styles.wideAsset, isImageWide && styles.wideImage)}>
          <Image
            src={prepareImageUrl(node.data.target.fields.file.url)}
            width={isImageWide ? 1120 : width}
            height={isImageWide ? 387 : width}
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
      {externalLink && <>
        <div className={styles.buttonExternal}>
          {podcastCover && <div className={styles.buttonExternalCover}>
            <Image src={prepareAssetUrl(podcastCover.fields.file.url as string)} width={200} height={200} alt="" />
          </div>}
          <div className={styles.buttonExternalContent}>
            <p>Odcinek do przesłuchania dostępny jest w serwisie zewnętrznym. Aby posłuchać kliknij przycisk poniżej.</p>
            <Button.L pattern={ButtonType.SECONDARY} href={externalLink} isExternal label="Przejdź do słuchania" />
          </div>
        </div>
      </>}
      {file && <DynamicPlayer
        cover={podcastCover}
        title={title}
        createdDate={createdDate}
        time={time}
        description={file.fields.description as string}
        file={prepareFileUrl(file.fields.file.url as string)}
      />}
      <div className={styles.dots}></div>
      {video && <>
        <h2>Wideo</h2>
        <div className={styles.dots}></div>
      </>}
      <h2>Transkrypcja</h2>
      {documentToReactComponents(content, options)}
      <div className={styles.dots}></div>
    </div>
  )
}

export default PodcastContent;
