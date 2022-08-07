import React, { FC, useEffect } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router'
import Script from 'next/script';
import * as gtag from '../lib/gtag'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const App: FC<{ Component: FC, pageProps: any }> = ({ Component, pageProps }) => {
  const router = useRouter();

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
      <GoogleReCaptchaProvider
        reCaptchaKey="6LdvY1YhAAAAAOpn2TQ36DH94hTnsFGVQzlHQgx9"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </>
  )
  
}

export default App;

