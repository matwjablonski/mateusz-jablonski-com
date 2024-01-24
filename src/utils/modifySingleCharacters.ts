const NON_BREAKING_SPACE = '\u00A0';

const stringModifier = (str: string, firstChar: string) => `${firstChar}${str}${NON_BREAKING_SPACE}`

export const modifySingleChars = (str: string) => str
  .replace(
    / ([a-zA-Z]) /g,
    (_, value: string) => stringModifier(value, ' ')
  )
  .replace(
    /\u00A0([a-zA-Z]) /g,
    (_, value: string) => stringModifier(value, NON_BREAKING_SPACE)
  );
