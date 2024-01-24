import { modifySingleChars } from './modifySingleCharacters';

describe('modifySingleCharacters', () => {
  it('should modify change space into non breaking space after single characters in sentence', () => {
    const result = modifySingleChars('lorem i psum a w i dolor sinet legem');

    expect(result).toBe('lorem i\u00A0psum a\u00A0w\u00A0i\u00A0dolor sinet legem');
  });

  it('should not modify space after multi characters in sentence', () => {
    const result = modifySingleChars('lorem ipsum legem');

    expect(result).not.toBe('lorem\u00A0ipsum\u00A0legem');
    expect(result).toBe('lorem ipsum legem');
  });
});
