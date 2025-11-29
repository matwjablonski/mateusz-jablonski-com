import { useRouter } from 'next/router';
import pl from '../data/translations/pl';
import en from '../data/translations/en';
import { createElement, ElementType, ReactNode } from 'react';

const translations: Record<'pl' | 'en', typeof pl> = {
  pl: pl,
  en: en,
};

type translateParams = {
  value: string, 
  tagName?: string,
  Wrapper?: ElementType,
  wrapperProps?: {},
  variables?: string[],
}

export const useTranslations = (): { t: typeof pl, translate(opt: translateParams): ReactNode[] | string, translateByFullKey(fullKey: string): string } => {
  const { locale } = useRouter();

  const translate = ({ value, tagName, variables, Wrapper, wrapperProps }: translateParams): ReactNode[] | string => {
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
      if (tagName) {
        if ((i % 2) && v !== '') {
          return createElement(tagName, { key: i}, v);
        }
      }
      if (Wrapper) {
        if ((i % 2) && v !== '') {
          return (
            <Wrapper {...wrapperProps}>
              {v}
            </Wrapper>
          )
        }
      }
      
      return v;
    });

    return res;
  }

  const translateByFullKey = (fullKey: string): string => {
    const keys = fullKey.split('.');
    let result: any = translations[locale as 'pl' | 'en'];

    keys.forEach((key) => {
      result = result[key];
    });

    return result;
  }

  return {
    t: translations[locale],
    translateByFullKey,
    translate,
  }
}
