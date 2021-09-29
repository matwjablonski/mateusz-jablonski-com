import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '../../types/common/Book.types';
import prepareImageUrl from '../../utils/prepareImageUrl';
import styles from './BookPreview.module.scss';

const BookPreview: FunctionComponent<Book> = ({ title, slug, cover, author}) => {
    return (
        <Link href={`/book/${slug}`}>
            <a title={`${title} - ${author}`}>
                <article className={styles.bookPreview}>
                    <div className={styles.imageWrapper}>
                        {
                            cover && (
                                <Image 
                                    src={prepareImageUrl(cover.fields.file.url)}
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
            </a>
        </Link>
    )
}

export default BookPreview;