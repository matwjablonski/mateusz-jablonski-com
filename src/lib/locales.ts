export const mapLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'en-US';
    case 'pl':
    default:
      return 'pl-PL';
  }
}
