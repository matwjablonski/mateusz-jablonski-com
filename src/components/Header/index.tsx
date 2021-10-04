import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Grid from '../Grid';
import styles from './Header.module.scss';
import logo from '../../public/logo.svg'
import MainNav from '../MainNav';

const Header: FunctionComponent = () => {

  return (
    <Grid>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <Image src={logo || '/logo.svg'} width={178} height={35} alt="Mateusz Jabłoński - Blog, programowanie, rozwój"/>
          </a>
        </Link>
        <MainNav />
      </header>
    </Grid>
  )
}

export default Header
