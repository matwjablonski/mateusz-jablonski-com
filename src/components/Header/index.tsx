import React, { FunctionComponent, useMemo, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '../Grid';
import styles from './Header.module.scss';
import logo from '../../public/logo.svg'
import whiteLogo from '../../public/logo-white.svg';
import MainNav from '../MainNav';
import { useTranslations } from '../../hooks/useTranslations';
import { useRouter } from 'next/router';
import { LangSwitcherButton } from './ui';

type HeaderProps = {
  reverse?: boolean;
};

const Header: FunctionComponent<HeaderProps> = ({ reverse }) => {
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
        <Link href="/" className={cx(styles.mainLogo, isMenuOpen && styles.isMenuOpen)}>
          <Image src={reverse ? whiteLogo : logo} width={178} height={35} alt={t.HEADER.TITLE}/>
        </Link>
        <button type="button" className={cx(styles.menuToggler, isMenuOpen && styles.isOpen)} onClick={toggleMenu}/>
        <MainNav isMobileOpen={isMenuOpen} reverse={reverse} />
      </header>
      <div className={styles.langSwitcher}>
        <LangSwitcherButton
          href={asPath} 
          title={nextLocale === 'pl' ? nextLocale.toUpperCase() : `${nextLocale.toUpperCase()} (incomplete)`}
          locale={nextLocale} 
          reverse={reverse}
        >
          {nextLocale.toUpperCase()}
        </LangSwitcherButton>
      </div>
    </Grid>
  )
}

export default Header
