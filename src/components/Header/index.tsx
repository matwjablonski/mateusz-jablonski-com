import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Grid from '../Grid';
import styles from './Header.module.scss';
import MainNav from '../MainNav';

const Header: FunctionComponent = () => {

  return (
    <Grid>
      <header className={styles.header}>
        <div>Logo</div>
        <MainNav />
      </header>
    </Grid>
  )
}

export default Header
