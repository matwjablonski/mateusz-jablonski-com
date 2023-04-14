import React, { FC, useCallback, useEffect } from 'react';
import '../styles/globals.css';
import cx from 'classnames';
import { useRouter } from 'next/router'
import Script from 'next/script';
import * as gtag from '../lib/gtag'
import localFont from 'next/font/local';
import { IBM_Plex_Sans } from 'next/font/google'

const monumentExtendedFont = localFont({
  src: '../public/fonts/PPMonumentExtended-Regular.woff',
  variable: '--monument-extended'
});

const ibmPlexSansFont = IBM_Plex_Sans({
  variable: '--ibm-plex-sans',
  weight: [ '400', '500', '600' ],
  display: 'swap',
  subsets: [ 'latin-ext' ],
})

const App: FC<{ Component: FC, pageProps: any }> = ({ Component, pageProps }) => {
  const router = useRouter();

  const handleKeyPress = useCallback(({ ctrlKey, key}) => {
    if (ctrlKey && (key === 's' || key === 'S')) {
      console.log('search');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <style jsx global>{`
        :root {
          --ibm-plex-sans: ${ibmPlexSansFont.style.fontFamily};
          --monument-extended: ${monumentExtendedFont.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
  
}

export default App;

