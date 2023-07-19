import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './UpdateNote.module.scss';
import { useTranslations } from '../../hooks/useTranslations';
import { formatDate } from '../../utils/formatDate';
import { useRouter } from 'next/router';
import EntryBlock from '../Entry';
import { BLOCKS } from '@contentful/rich-text-types';
import { FC } from 'react';
import { UpdateNote } from '../../types/common/UpdateNote.types';

const UpdateNote: FC<Omit<UpdateNote, 'title'>> = ({ note, date }) => {
  const { translate, t } = useTranslations();
  const { locale } = useRouter();

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => <EntryBlock node={node}/>,
    },
  }

  return (
    <div className={styles.UpdateNote}>
      <h4 className={styles.Card}>
        {
          translate({
            value: t.ARTICLE.UPDATE_NOTE.TITLE,
            variables: [ formatDate({ dateObject: date, formatString: 'dd MMMM yyyy', locale }) ],
          })
        }
      </h4>
      <div className={styles.Content}>
        {documentToReactComponents(note, options)}
      </div>
    </div>
  )
}

export default UpdateNote;
