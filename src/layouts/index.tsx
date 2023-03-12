import React, { FC, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HeadInterface } from '../types/common/Head.types';
import prepareImageUrl from '../utils/prepareAssetUrl';
import styles from '../styles/Layout.module.scss';
import favico from '../public/favicon.ico';

const mainTitle = "Mateusz Jabłoński - blog, podcast, kursy o programowaniu i rozwoju";
const mainDescription = "Blog, podcast oraz kursy o programowaniu i rozwoju. Oferuję aktualną wiedzę oraz wsparcie mentorskie w nauce programowania.";

type MainLayoutProps = {
  head: HeadInterface;
  hideOverflow?: boolean;
  dark?: boolean;
  hideFunds?: boolean;
  hideSocialMedia?: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({children, head, hideOverflow, dark, hideFunds, hideSocialMedia }) => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (window !== undefined) {
      document.body.classList.remove('noscroll');
    }
  }, [])

  return (
    <>
      <Head>
        <title>{head.title ? `${head.title} :: ${mainTitle}` : mainTitle}</title>
        <meta name="description" content={head.description ? head.description : mainDescription} />
        { head.keywords && <meta name="keywords" content={head.keywords} /> }
        <meta property="og:title" content={head.title ? `${head.title} :: ${mainTitle}` : mainTitle} />
        <meta property="og:url" content={`https://mateuszjablonski.com${asPath}`} />
        <meta property="og:description" content={head.description || mainDescription} />
        {head.image && <meta property="og:image" content={prepareImageUrl(head.image.fields.file.url)} />}
        <link rel="icon" href={favico.src} />
      </Head>
      <div className={cx(dark && styles.darkBackground)}>
        <Header reverse={dark} />
        <main className={cx(hideOverflow && styles.hiddenOverflow)}>
          {children}
        </main>
        <Footer hideFunds={hideFunds} hideSocialMedia={hideSocialMedia} />
      </div>
    </>
  );
}

export default MainLayout
