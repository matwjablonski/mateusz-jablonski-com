// next.config.js
require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')(['wavesurfer-react']);

module.exports = withPlugins([
  [withFonts],
  [withTM],
], {
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    localeDetection: false,
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'gravatar.com',
      'img.youtube.com',
      'lh3.googleusercontent.com',
      'yt3.ggpht.com',
      'yt3.googleusercontent.com',
    ],
  },
  webpack(config, options) {
    return config;
  },
  async redirects() {
    return [
      {
        source: '/posts/2021-12-18%20Szalony%20rok',
        destination: '/blog/szalony-rok',
        permanent: true,
      },
      {
        source: '/posts/2021-08-16%20Specyficznosc%20CSS',
        destination: '/blog/specyficznosc-css',
        permanent: true,
      },
      {
        source: '/posts/2021-08-13%20Currying',
        destination: '/blog/currying',
        permanent: true,
      },
      {
        source: '/posts/2021-08-02%20Klucze%20w%20React',
        destination: '/blog/klucze-w-react',
        permanent: true,
      },
      {
        source: '/posts/2021-04-09%20Sztuka%20przebranzawiania',
        destination: '/blog/sztuka-przebranzawiania',
        permanent: true,
      },
      {
        source: '/posts/2020-10-15%20154%20%20-%20doświadczenie%2C%20którego%20nie%20zapomnę',
        destination: '/blog/154-doswiadczenie-ktorego-nie-zapomne',
        permanent: true,
      },
      {
        source: '/posts/2020-09-03%20Hierarchia%20szablonow%20w%20Wordpress',
        destination: '/blog/hierarchia-szablonow-w-wordpress',
        permanent: true,
      },
      {
        source: '/posts/2020-08-27%20Co%20to%20jest%20funkcja%3F',
        destination: '/blog/co-to-jest-funkcja',
        permanent: true,
      },
      {
        source: '/posts/2020-08-06%20O%20architekturze%20w%20CSS',
        destination: '/blog/o-architekturze-w-css',
        permanent: true,
      },
      {
        source: '/posts/2020-08-13%20Jak%20powiazac%20nasz%20projekt%20z%20Travisem%3F',
        destination: '/blog/jak-powiazac-nasz-projekt-z-travisem',
        permanent: true,
      },
      {
        source: '/posts/2020-07-30%20Co%20czytaja%20programisci%3F',
        destination: '/blog/co-czytaja-programisci',
        permanent: true,
      },
      {
        source: '/posts/2020-07-23%20Tajemnice%20npm\'a',
        destination: '/blog/tajemnice-npm',
        permanent: true,
      },
      {
        source: '/posts/2020-07-09%20Jak%20zbudowac%20wlasny%20edytor%20tekstu%20w%20przegladarce%3F',
        destination: '/blog/jak-zbudowac-wlasny-edytor-tekstu-w-przegladarce',
        permanent: true,
      },
      {
        source: '/posts/2019-09-09%20Wlasny%20szablon%20w%20Wordpress',
        destination: '/blog/wlasny-szablon-w-wordpress',
        permanent: true
      },
      {
        source: '/posts/2019-09-05%20CI%20oraz%20CD%20w%20procesie%20deweloperskim',
        destination: '/blog/ci-oraz-cd-w-procesie-deweloperskim',
        permanent: true
      },
      {
        source: '/posts/2019-07-30%20O%20standardach%20dostępności%20WCAG',
        destination: '/blog/o-standardach-dostepnosci-wcag',
        permanent: true
      },
      {
        source: '/posts/2019-07-29%20Context%20API%20w%20React',
        destination: '/blog/context-api-w-react',
        permanent: true
      },
      {
        source: '/books/2021-07-19%20Zakamarki%20marki',
        destination: '/book/zakamarki-marki',
        permanent: true
      }
    ]
  },
});
