import React, { FunctionComponent, memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '../Grid';
import styles from './Footer.module.scss';
import menu from '../../data/footer-menu.json';
import FundsInfo from '../FundsInfo';
import logo from '../../public/logo-footer.svg'
import FooterSocialMedia from '../FooterSocialMedia';

const Footer: FunctionComponent = memo(() => {
  const date: string = useMemo(
    () => new Date().getFullYear().toString() === '2019' ? '2019' : `2019 - ${new Date().getFullYear()}`,
    [],
  );
  return (
    <Grid>
      <footer className={styles.footer}>
        <FooterSocialMedia />
        <FundsInfo />
        <section className={styles.copy}>
          <div className={styles.copyInner}>
            <Link
              href="/"
            >
              <a>
                <Image src={logo || '/logo-footer.svg'} alt="" width={114} height={24}/>
              </a>
            </Link>
            <p className={styles.info}>© {date} Woodpecker sp z o.o. All rights reserved</p>
          </div>
          <ul className={styles.footerMenu}>
            {
              menu.items.map((item) => (
                  <li key={item.id} className={styles.footerMenuItem}>
                    <Link href={item.url}>
                      <a>{item.title}</a>
                    </Link>
                  </li>
                ),
              )}
          </ul>
        </section>
      </footer>
    </Grid>
  );
});

Footer.displayName = 'Footer';

export default Footer;
