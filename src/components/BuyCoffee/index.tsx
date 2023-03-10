import { useTranslations } from '../../hooks/useTranslations';
import styles from './BuyCoffee.module.scss';
import cx from 'classnames';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import externalUrls from '../../data/external-sources.json';
import { useEffect, useState } from 'react';

const BuyCoffee = () => {
  const { t } = useTranslations();
  const [ isVisible, setIsVisible ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);

  const handleScroll = () => {
    if (window !== undefined) {
      const clientHeight = document.body.clientHeight;
      const showMoment = clientHeight * 0.15;
      const openMoment = document.body.clientHeight * 0.4;
      const closeMoment = document.body.clientHeight * 0.6;
      
      if (window.scrollY > showMoment) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (window.scrollY > openMoment && window.scrollY < closeMoment) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (window !== undefined) {
        window.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  console.log(isOpen)

  return (
    <aside className={cx(styles.BuyCoffee, isVisible && styles.IsVisible, isOpen && styles.IsOpen)}>
      <div className={styles.Content}>
        <h2 className={styles.Title}>{t.ARTICLE.BUY_COFFEE.TITLE}</h2>
        <p className={styles.Text}>{t.ARTICLE.BUY_COFFEE.MESSAGE}</p>
        <Button.L
          href={externalUrls.buycoffee}
          pattern={ButtonType.RED}
          label={t.ARTICLE.BUY_COFFEE.ACTION}
          isExternal
        />
      </div>
    </aside>
  )
}

export default BuyCoffee;
