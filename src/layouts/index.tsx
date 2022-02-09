import React, { FunctionComponent, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HeadInterface } from '../types/common/Head.types';
import prepareImageUrl from '../utils/prepareImageUrl';
import styles from '../styles/Layout.module.scss';
import fontEot from '../public/fonts/PPMonumentExtended-Regular.eot';
import fontOtf from '../public/fonts/PPMonumentExtended-Regular.otf';
import fontTtf from '../public/fonts/PPMonumentExtended-Regular.ttf';
import fontWoff from '../public/fonts/PPMonumentExtended-Regular.woff';
import fontWoff2 from '../public/fonts/PPMonumentExtended-Regular.woff2';

const mainTitle = "Mateusz Jabłoński - blog, podcast, kursy o programowaniu i rozwoju";
const mainDescription = "Blog, podcast oraz kursy o programowaniu i rozwoju. Oferuję aktualną wiedzę oraz wsparcie mentorskie w nauce programowania.";

const MainLayout: FunctionComponent<{ head: HeadInterface, hideOverflow?: boolean }> = ({children, head, hideOverflow}) => {
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href={fontEot}
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={fontOtf}
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={fontTtf}
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={fontWoff}
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={fontWoff2}
          as="font"
          crossOrigin=""
        />
      </Head>
      <style jsx>{`
          @font-face {
            font-family: 'Monument Extended';
            font-weight: 400;
            font-style: normal;
            src: url('${fontEot}') format('eot'),
                url('${fontOtf}') format('opentype'),
                url('${fontTtf}') format('truetype'),
                url('${fontWoff}') format('woff'),
                url('${fontWoff2}') format('woff2');
          }
      `}</style>
      <Header />
      <main className={cx(hideOverflow && styles.hiddenOverflow)}>
        {children}
      </main>
      <Footer />
    </>

  );
}

export default MainLayout
