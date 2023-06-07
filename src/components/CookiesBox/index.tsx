import Link from 'next/link';
import { useTranslations } from '../../hooks/useTranslations';
import styles from './CookiesBox.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import { FC } from 'react';

type CookiesBox = {
  acceptAction(): void;
  notAcceptAction(): void;
}

const CookiesBox: FC<CookiesBox> = ({ acceptAction, notAcceptAction }) => {
  const { t, translate } = useTranslations();
  return (
    <div className={styles.CookiesBox}>
      <div className={styles.Bite} />
      <div className={styles.Content}>
        <div className={styles.Inner}>
          <h2 className={styles.Title}>{t.COOKIES.TITLE}</h2>
          <p className={styles.Text}>{translate({ value: t.COOKIES.MESSAGE, Wrapper: Link, wrapperProps: { href: '/docs/cookies' } })}</p>
          <div className={styles.Actions}>
            <Button.B pattern={ButtonType.SECONDARY} label={t.COOKIES.NOT_ACCEPT} hideArrow action={notAcceptAction}/>
            <Button.B pattern={ButtonType.PRIMARY} label={t.COOKIES.ACCEPT} hideArrow action={acceptAction} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiesBox;
