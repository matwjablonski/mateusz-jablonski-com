import { format } from 'path';
import { formatAuthorName } from './formatAuthorName';

describe('formatAuthorName', () => {
  it('should display author name without changes when its not url', () => {
    const author = 'author';
    const author2 = 'First Name';
    const author3 = 'First Name Last Name';

    expect(formatAuthorName(author)).toEqual(author);
    expect(formatAuthorName(author2)).toEqual(author2);
    expect(formatAuthorName(author3)).toEqual(author3);
  });

  it('should display author name without url and last slash', () => {
    const author = 'https://author.com/';

    expect(formatAuthorName(author)).toEqual('author_com');
  });

  it('should display author name with dots replaces by underscore', () => {
    const author = 'https://author.com/author.name';

    expect(formatAuthorName(author)).toEqual('author_com/author_name');
  });
});
