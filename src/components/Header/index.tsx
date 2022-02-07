import React, { FunctionComponent, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '../Grid';
import styles from './Header.module.scss';
import logo from '../../public/logo.svg'
import MainNav from '../MainNav';

const Header: FunctionComponent = () => {
  const [isMenuOpen, setToggleMenu] = useState(false);

  const toggleMenu = () => {
    if (window !== undefined) {
      document.body.classList.toggle('noscroll');
    }
    setToggleMenu(!isMenuOpen)
  }

  return (
    <Grid>
      <header className={styles.header}>
        <Link href="/">
          <a className={cx(styles.mainLogo, isMenuOpen && styles.isMenuOpen)}>
            <Image src={logo || '/logo.svg'} width={178} height={35} alt="Mateusz Jabłoński - Blog, programowanie, rozwój"/>
          </a>
        </Link>
        <button type="button" className={cx(styles.menuToggler, isMenuOpen && styles.isOpen)} onClick={toggleMenu}/>
        <MainNav isMobileOpen={isMenuOpen} />
      </header>
    </Grid>
  )
}

export default Header
