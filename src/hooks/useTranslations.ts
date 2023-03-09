import { useRouter } from 'next/router';
import pl from '../data/translations/pl';
import en from '../data/translations/en';

const translations: Record<'pl' | 'en', typeof pl> = {
  pl: pl,
  en: en,
};

export const useTranslations = (): { t: typeof pl } => {
  const { locale } = useRouter();

  return {
    t: translations[locale],
  }
}
