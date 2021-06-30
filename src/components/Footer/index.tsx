import { FunctionComponent, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo-footer.svg';
import Grid from '../Grid';
import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  const date: string = useMemo(
    () => new Date().getFullYear().toString() === '2021' ? '2021' : `2021 - ${new Date().getFullYear()}`,
    [],
  );
  return (
    <Grid>
      <footer className={styles.footer}>
        <section className={styles.copy}>
          <div className={styles.copyInner}>
            <Link
              href="/"
            >
              <a>
                <Image src={logo} width={114} height={24}/>
              </a>
            </Link>
            <p className={styles.info}>© {date} Woodpecker sp z o.o. All rights reserved</p>
          </div>
          copy link
        </section>
      </footer>
    </Grid>
  );
};

export default Footer;
