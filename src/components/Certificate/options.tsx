import { BLOCKS } from '@contentful/rich-text-types';
import { List, Text } from './ui';

export const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
    [BLOCKS.UL_LIST]: (_, children) => <List>{children}</List>,
  },
}
