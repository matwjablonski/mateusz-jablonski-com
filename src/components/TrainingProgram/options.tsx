import { BLOCKS } from '@contentful/rich-text-types';
import { Chapter, Topic, Topics } from './ui';

export const options = {
  renderNode: {
    [BLOCKS.HEADING_3]: (_, children) => <Chapter>{children}</Chapter>,
    [BLOCKS.OL_LIST]: (_, children) => <Topics>{children}</Topics>,
    [BLOCKS.LIST_ITEM]: (_, children) => <Topic>{children}</Topic>,
  }
};
