import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      heading: ['var(--monument-extended)', 'sans-serif'],
      body: ['var(--ibm-plex-sans)', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      main: {
        DEFAULT: '#001773',
        100: '#DEF3FF',
        300: '#14A5FF',
        500: '#0136F8',
        700: '#3B4F9F',
        900: '#001773',
      },
    },
    extend: {
      boxShadow: {
        'icon-box': '0 4px 8px 0 rgba(194, 194, 194, 0.24)',
      },
      dropShadow: {
        'wide-image': '0px 16px 48px rgba(20, 165, 255, 0.24)',
      },
      margin: {
        22: '5.5rem',
      },
      lineClamp: {
        22: '22',
      },
    },
  },
  plugins: [],
}

export default config
