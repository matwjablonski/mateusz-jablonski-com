// next.config.js
require('dotenv').config()
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
const withVideos = require('next-videos')

module.exports = withVideos()

module.exports = withPlugins([
  [withVideos],
  [withImages]
], {
  i18n: {
    locales: ['pl-PL', 'en-US'],
    defaultLocale: 'pl-PL',
    localeDetection: false,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
})
