import React, { FunctionComponent, useMemo, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '../Grid';
import styles from './Header.module.scss';
import logo from '../../public/logo.svg'
import MainNav from '../MainNav';
import { useTranslations } from '../../hooks/useTranslations';
import { useRouter } from 'next/router';

const Header: FunctionComponent = () => {
  const [isMenuOpen, setToggleMenu] = useState(false);
  const { t } = useTranslations();
  const { locale, asPath } = useRouter();

  const toggleMenu = () => {
    if (window !== undefined) {
      document.body.classList.toggle('noscroll');
    }
    setToggleMenu(!isMenuOpen)
  }

  const nextLocale = useMemo(() => locale === 'pl' ? 'en' : 'pl', [ locale ]);

  return (
    <Grid>
      <header className={styles.header}>
        <Link href="/">
          <a className={cx(styles.mainLogo, isMenuOpen && styles.isMenuOpen)}>
            <Image src={logo || '/logo.svg'} width={178} height={35} alt={t.HEADER.TITLE}/>
          </a>
        </Link>
        <button type="button" className={cx(styles.menuToggler, isMenuOpen && styles.isOpen)} onClick={toggleMenu}/>
        <MainNav isMobileOpen={isMenuOpen} />
      </header>
      <div className={styles.langSwitcher}>
        <Link href={asPath} locale={nextLocale}>
          <a
            title={nextLocale === 'pl' ? nextLocale.toUpperCase() : `${nextLocale.toUpperCase()} (incomplete)`}
            className={styles.langSwitcherButton}
          >
            {nextLocale.toUpperCase()}
          </a>
        </Link>
      </div>
    </Grid>
  )
}

export default Header
