import { useRouter } from 'next/router';
import pl from '../data/translations/pl';
import en from '../data/translations/en';
import { createElement, ReactElement, ReactNode } from 'react';

const translations: Record<'pl' | 'en', typeof pl> = {
  pl: pl,
  en: en,
};

type translateParams = {
  value: string, 
  tagName?: string,
  variables?: string[],
}

export const useTranslations = (): { t: typeof pl, translate(opt: translateParams): ReactNode[] | string } => {
  const { locale } = useRouter();

  const translate = ({ value, tagName, variables }: translateParams): ReactNode[] | string => {
    let translatedValue = value;

    if (variables && variables.length) {
      variables.forEach((variable, index) => {
        const searchValue = `@${index + 1}`;
        translatedValue = translatedValue.replace(searchValue, variable);
      })

      return translatedValue;
    };

    const valueAsArray = translatedValue.split('%%');

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
