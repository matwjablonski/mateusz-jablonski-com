import React, { FC, useCallback, useEffect, useState } from 'react';
import '../styles/globals.css';
import localFont from 'next/font/local';
import { IBM_Plex_Sans } from 'next/font/google'
import { hasCookie, setCookie, getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';

const monumentExtendedFont = localFont({
  src: '../public/fonts/PPMonumentExtended-Regular.woff',
  variable: '--monument-extended'
});

const ibmPlexSansFont = IBM_Plex_Sans({
  variable: '--ibm-plex-sans',
  weight: [ '400', '500', '600' ],
  display: 'swap',
  subsets: [ 'latin-ext' ],
});

const DynamicCookies = dynamic(
  () => import('../components/CookiesBox'),
  { ssr: false },
);

const DynamicGoogleScripts = dynamic(
  () => import('../components/GoogleScripts'),
  { ssr: false },
);

const App: FC<{ Component: FC, pageProps: any }> = ({ Component, pageProps }) => {
  const [ isCookieMonster, setAsCookieMonster ] = useState(() => hasCookie('cookies_accepted'));

  const handleKeyPress = useCallback(({ ctrlKey, key}) => {
    if (ctrlKey && (key === 's' || key === 'S')) {
      console.log('search');
    }
  }, []);

  const handleCookiesAcceptance = useCallback(() => {
    setCookie('cookies_accepted', 'true');
    setAsCookieMonster(true);
  }, []);

  const handleCookiesDismiss = useCallback(() => {
    setCookie('cookies_accepted', 'false');
    setAsCookieMonster(true);
  }, []);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {isCookieMonster && getCookie('cookies_accepted') && <DynamicGoogleScripts />}
      <style jsx global>{`
        :root {
          --ibm-plex-sans: ${ibmPlexSansFont.style.fontFamily};
          --monument-extended: ${monumentExtendedFont.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      {!isCookieMonster && <DynamicCookies acceptAction={handleCookiesAcceptance} notAcceptAction={handleCookiesDismiss} />}
    </>
  )
}

export default App;

