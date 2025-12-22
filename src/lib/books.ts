import booksData from '../data/books.json';
import { Book } from '../types/common/Book.types';
import { Asset, EntrySkeletonType } from 'contentful';
import { formatDate } from '../utils/formatDate';

interface BookJsonData {
  id: string;
  title: string;
  slug: string;
  author: string;
  cover: {
    url: string;
    width?: number;
    height?: number;
  };
  createdDate: string;
  rate?: number;
  affiliateLink?: string;
  bookType?: 'ebook' | 'audiobook' | 'paper';
  currentRead?: boolean;
  categoryName?: string;
  seller?: {
    name: string;
    logo?: string;
  };
}

function transformBookData(book: BookJsonData, locale?: string): Book {
  const coverAsset: Asset = {
    sys: {
      id: book.id,
      type: 'Asset',
      createdAt: book.createdDate,
      updatedAt: book.createdDate,
      revision: 1,
      space: { sys: { type: 'Link', linkType: 'Space', id: '' } },
      environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
      locale: locale || 'pl',
    },
    fields: {
      file: {
        url: book.cover.url,
        details: {
          size: 0,
          image: {
            width: book.cover.width || 192,
            height: book.cover.height || 290,
          },
        },
        fileName: `${book.slug}.jpg`,
        contentType: 'image/jpeg',
      },
      title: book.title,
    },
  } as Asset;

  const transformedBook: Book = {
    id: book.id,
    title: book.title,
    slug: book.slug,
    author: book.author,
    cover: coverAsset,
    createdDate: book.createdDate,
    rate: book.rate,
    affiliateLink: book.affiliateLink || '',
    bookType: book.bookType,
    currentRead: book.currentRead || false,
    categoryName: book.categoryName,
  };

  if (book.seller) {
    const sellerLogo: Asset = book.seller.logo ? {
      sys: {
        id: `${book.id}-seller-logo`,
        type: 'Asset',
        createdAt: book.createdDate,
        updatedAt: book.createdDate,
        revision: 1,
        space: { sys: { type: 'Link', linkType: 'Space', id: '' } },
        environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
        locale: locale || 'pl',
      },
      fields: {
        file: {
          url: book.seller.logo,
          details: { size: 0 },
          fileName: `${book.seller.name}-logo.jpg`,
          contentType: 'image/jpeg',
        },
        title: `${book.seller.name} logo`,
      },
    } as Asset : null;

    transformedBook.seller = {
      sys: {
        id: `${book.id}-seller`,
        type: 'Entry',
        createdAt: book.createdDate,
        updatedAt: book.createdDate,
        revision: 1,
        space: { sys: { type: 'Link', linkType: 'Space', id: '' } },
        environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
        contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'bookSeller' } },
        locale: locale || 'pl',
      },
      fields: {
        name: book.seller.name,
        logo: sellerLogo,
      },
    } as unknown as EntrySkeletonType<any>;
  }

  return transformedBook;
}

export function getAllBooks(locale?: string): Book[] {
  return (booksData as BookJsonData[]).map(book => transformBookData(book, locale));
}

export function getBookBySlug(slug: string, locale?: string): Book | null {
  const book = (booksData as BookJsonData[]).find(b => b.slug === slug);
  return book ? transformBookData(book, locale) : null;
}

export function getBooks(filters: {
  limit?: number;
  skip?: number;
  hasRate?: boolean;
  currentRead?: boolean;
  orderBy?: 'createdDate' | '-createdDate';
  locale?: string;
}): { books: Book[]; total: number } {
  let filteredBooks = [...(booksData as BookJsonData[])];

  if (filters.hasRate) {
    filteredBooks = filteredBooks.filter(b => b.rate !== undefined && b.rate !== null);
  }

  if (filters.currentRead !== undefined) {
    filteredBooks = filteredBooks.filter(b => (b.currentRead || false) === filters.currentRead);
  }

  if (filters.orderBy) {
    const isDescending = filters.orderBy.startsWith('-');
    const field = isDescending ? filters.orderBy.substring(1) : filters.orderBy;
    filteredBooks.sort((a, b) => {
      const aValue = new Date(a[field as keyof BookJsonData] as string).getTime();
      const bValue = new Date(b[field as keyof BookJsonData] as string).getTime();
      return isDescending ? bValue - aValue : aValue - bValue;
    });
  }

  const total = filteredBooks.length;

  if (filters.skip !== undefined) {
    filteredBooks = filteredBooks.slice(filters.skip);
  }
  if (filters.limit !== undefined) {
    filteredBooks = filteredBooks.slice(0, filters.limit);
  }

  const books = filteredBooks.map(book => transformBookData(book, filters.locale));

  return { books, total };
}

export function formatBookForDisplay(book: Book, locale?: string) {
  return {
    ...book,
    createdDate: formatDate({
      dateObject: book.createdDate,
      formatString: 'dd MMMM yyyy',
      locale: locale || 'pl',
    }),
  };
}

