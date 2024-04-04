import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '../../types/common/Book.types';
import prepareImageUrl from '../../utils/prepareAssetUrl';
import styles from './BookPreview.module.scss';
import { useTranslations } from '../../hooks/useTranslations';

const BookPreview: FunctionComponent<Book> = ({ title, slug, cover, author, hasReview  }) => {
    const { t } = useTranslations();
    const book = <article className={styles.bookPreview} title={hasReview ? t.HOME.BOOKS.WITH_LINK : t.HOME.BOOKS.NO_LINK}>
        <div className={styles.imageWrapper}>
            {
                cover && (
                    <Image 
                        src={prepareImageUrl(cover.fields.file.url as string)}
                        height={290}
                        width={192}
                        alt={`${title} - ${author}`}
                        className={styles.image}
                    />
                )
            }
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
    </article>

    return hasReview ? (
        <Link href={`/book/${slug}`} title={`${title} - ${author}`}>
            {book}
        </Link>
    ) : book
}

export default BookPreview;
