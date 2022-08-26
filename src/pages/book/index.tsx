import { FC, useState } from 'react';
import MainLayout from '../../layouts/index'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Entry } from 'contentful';
import { HeadInterface } from '../../types/common/Head.types';
import { GetServerSideProps } from 'next';
import { Page } from '../../types/common/Page.types';
import { fetchEntries } from '../../contentful';
import PageTitle from '../../components/PageTitle';
import { formatDate } from '../../utils/formatDate';
import styles from '../../styles/Book.module.scss';
import HomeNewsletter from '../../components/Newsletter/HomeNewsletter';
import Button from '../../components/Button';
import { ButtonType } from '../../components/Button/Button.types';
import { Book } from '../../types/common/Book.types';
import BookPreview from '../../components/BookPreview';

interface BooksPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
    books: Book[];
    totalBooks: number;
}

const PAGE_SIZE = 9;
const FIRST_PAGE_SIZE = PAGE_SIZE + 1;

const BooksPage: FC<BooksPageProps> = ({ head, body: { title, description }, books, totalBooks }) => {
    const [amountOfLoadedBooks, setAmountOfLoadedBooks] = useState(FIRST_PAGE_SIZE);
    const [booksToShow, setBooksToShow] = useState(books);
    const [disabledFetch, setDisabledFetch] = useState(false);

    const shouldShowLoadMoreBtn = amountOfLoadedBooks < totalBooks;

    const fetchArticles = async () => {
        setDisabledFetch(true);
        const response = await fetch(`/api/blog/load?limit=${PAGE_SIZE}&skip=${amountOfLoadedBooks}`);
        const data = await response.json();

        setBooksToShow([...booksToShow, ...data]);
        setAmountOfLoadedBooks(amountOfLoadedBooks + data.length);
        setDisabledFetch(false);
    }

    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={title} description={description} />
                <section className={styles.booksList}>
                    {booksToShow.map((book) => <BookPreview 
                        key={`article${book.slug}`}
                        {...book}
                    />)}
                    {shouldShowLoadMoreBtn && <Button.B 
                        label="Wczytaj więcej treści"
                        pattern={ButtonType.SECONDARY}
                        action={fetchArticles}
                        disabled={disabledFetch}
                    />}
                </section>
                <section>
                    <HomeNewsletter />
                </section>
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'books',
        include: 2,
    });

    const booksRes = await fetchEntries({
        content_type: 'book',
        include: 2,
        skip: 0,
        limit: FIRST_PAGE_SIZE,
        order: '-fields.createdDate',
        'fields.createdDate[lte]': new Date(),
        'fields.review[exists]': true,
    });

    const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

    const books = await booksRes.data.map(p => ({
        ...p.fields,
        createdDate: formatDate({
            dateObject: p.fields?.createdDate,
            formatString: 'dd MMMM yyyy'
        }),
    }));

    if (!body) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            body,
            books,
            totalBooks: booksRes.total,
        }
    }
}

export default BooksPage;
