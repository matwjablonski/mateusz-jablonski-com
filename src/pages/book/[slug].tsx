import { FunctionComponent, useRef } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchEntries } from "../../contentful";
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Book } from '../../types/common/Book.types';
import BookPost from "../../components/BookPost";
import { formatDate } from "../../utils/formatDate";

const BookPage: FunctionComponent<{ body: Book, comments: Comment[] }> = ({ body, comments = [] }) => {
    const { head, reviewAuthor, title, review, rate, excerpt, createdDate, categoryName, cover, affiliateLink, seller, bookType } = body;
    const commentsRef = useRef<HTMLDivElement>(null);

    return body ? (
        <MainLayout head={head ? head.fields : {}}>
          <Grid>
            <Breadcrumbs />
            <BookPost
                content={review}
                title={title}
                excerpt={excerpt}
                coverImage={cover.fields.file.url}
                author={reviewAuthor}
                numberOfComments={comments.length}
                commentsBlockRef={commentsRef}
                createdDate={createdDate}
                categoryName={categoryName}
                affiliateLink={affiliateLink}
                seller={seller}
                bookType={bookType}
                rate={rate}
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
        .map(p => ({ 
          ...p.fields,
          id: p.sys.id,
          createdDate: formatDate({
            dateObject: p.fields.createdDate,
            formatString: 'dd MMMM yyyy',
          })
        }))
        .shift();

    return {
        props: {
            body,
            comments: []
        }
    }
}

export default BookPage;
