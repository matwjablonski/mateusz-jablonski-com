import { useRouter } from 'next/router';
import pl from '../data/translations/pl';
import en from '../data/translations/en';
import { createElement, ReactElement, ReactNode } from 'react';

const translations: Record<'pl' | 'en', typeof pl> = {
  pl: pl,
  en: en,
};

export const useTranslations = (): { t: typeof pl, translate(v: string, tagName: string): ReactNode[] } => {
  const { locale } = useRouter();

  const translate = (value: string, tagName: string): ReactNode[] => {
    const valueAsArray = value.split('%%');

    const res = valueAsArray.map((v, i) => {
      if ((i % 2) && v !== '') {
        return createElement(tagName, { key: i}, v);
      }
      return v;
    });

    return res;
  }

  return {
    t: translations[locale],
    translate,
  }
}
