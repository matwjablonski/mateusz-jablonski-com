import { useRouter } from 'next/router';
import { FC, memo, useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import styles from './NotTranslated.module.scss';

type NotTranslated = {
  // lang: 'pl' | 'en';
}

const NotTranslated: FC<NotTranslated> = memo(() => {
  const { locale } = useRouter();
  const { t } = useTranslations();
  const [ visible, setVisible ] = useState<boolean>(true);

  const handleClose = () => setVisible(false);

  return (locale !== 'pl' && visible) && (
    <section className={styles.NotTranslated}>
      <button className={styles.Close} onClick={handleClose}>✕</button>
      <h2 className={styles.Title}>{t.NOT_TRANSLATED.TITLE}</h2>
      <p className={styles.Message}>{t.NOT_TRANSLATED.MESSAGE}</p>
    </section>
  )
});

NotTranslated.displayName = 'MemoizedNotTranslated';


export default NotTranslated;
