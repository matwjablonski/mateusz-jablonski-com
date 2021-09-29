import React, { FunctionComponent } from 'react';
import BookPreview from '../BookPreview';
import { LastBooksProps } from './LastBooks.types';
import styles from './LastBooks.module.scss';

const LastBooks: FunctionComponent<LastBooksProps> = ({ books }) => {
    return <div className={styles.lastBooks}>
        {books.map(book => <BookPreview key={book.slug} {...book} />)}
    </div>
}

export default LastBooks;
