import Image from 'next/image';
import {BLOCKS, INLINES } from '@contentful/rich-text-types';
import { default as EntryBlock} from "../Entry";
import prepareImageUrl from '../../utils/prepareAssetUrl';
import { Blockquote, EmmbeddedAsset, ListItem, Text, Title, TitleLevel3, TitleLevel4, TitleLevel5 } from './ui';
import { modifySingleChars } from '../../utils/modifySingleCharacters';

export const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_2]: (_, children) => <Title>{children}</Title>,
    [BLOCKS.HEADING_3]: (_, children) => <TitleLevel3>{children}</TitleLevel3>,
    [BLOCKS.HEADING_4]: (_, children) => <TitleLevel4>{children}</TitleLevel4>,
    [BLOCKS.HEADING_5]: (_, children) => <TitleLevel5>{children}</TitleLevel5>,
    [BLOCKS.LIST_ITEM]: (_, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.QUOTE]: (_, children) => <Blockquote>{children}</Blockquote>, 
    [BLOCKS.EMBEDDED_ENTRY]: (node) => <EntryBlock node={node}/>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { width, height } = node.data.target.fields.file.details.image;
      const proportion = width / height;
      const isImageWide = proportion > 1.4;

      return <EmmbeddedAsset isImageWide={isImageWide} description={node.data.target.fields.description}>
        <Image
          src={prepareImageUrl(node.data.target.fields.file.url)}
          width={isImageWide ? 1120 : width}
          height={isImageWide ? 387 : width}
          alt={node.data.target.fields.file.fileName}
        />
      </EmmbeddedAsset>
    },
    [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri}>{children}</a>,
  }
}
