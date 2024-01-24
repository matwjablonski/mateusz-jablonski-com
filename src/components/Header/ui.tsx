import Link from 'next/link';

export const LangSwitcherButton = ({ children, title, href, locale, reverse }) => (
  <Link
    href={href}
    locale={locale}
    title={title}
    className={`
      p-4
      transition-all
      font-bold
      rounded-tl-[7px]
      rounded-bl-[7px]

      hover:pr-8

      ${reverse ? `
        text-main-900
        bg-white
        hover:bg-main-300
      ` : `
        text-white
        bg-main-900
        hover:bg-main-700
      `}

    `}
  >{children}</Link>
);
