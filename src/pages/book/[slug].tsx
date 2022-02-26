import { FunctionComponent, useRef } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchEntries } from "../../contentful";
import Post from '../../components/Post';
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Book } from '../../types/common/Book.types';

const BookPage: FunctionComponent<{ body: Book, comments: Comment[] }> = ({ body, comments = [] }) => {
    const { head, reviewAuthor, title, review } = body;
    const commentsRef = useRef<HTMLDivElement>(null);

    return body ? (
        <MainLayout head={head ? head.fields : {}}>
          <Grid>
            <Breadcrumbs />
            <Post
                content={review}
                title={title}
                excerpt={null}
                featuredImage={null}
                author={reviewAuthor}
                numberOfComments={comments.length}
                commentsBlockRef={commentsRef}
                />       
          </Grid>
        </MainLayout>
      ) : null;  
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const {slug} = context.params;

    const res = await fetchEntries({
        content_type: 'book',
        'fields.slug': slug,
        include: 2,
      });

    const body = await res.data
        .map(p => ({ ...p.fields, id: p.sys.id }))
        .shift();

    return {
        props: {
            body,
            comments: []
        }
    }
}

export default BookPage;
