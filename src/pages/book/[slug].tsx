import { FunctionComponent, useRef } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchEntries } from "../../contentful";
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Book } from '../../types/common/Book.types';
import BookPost from "../../components/BookPost";
import { formatDate, formatDateAndTimeWithSeparator } from "../../utils/formatDate";
import PostAuthor from "../../components/PostAuthor";
import CommentsList from "../../components/CommentsList";
import PageNewsletter from "../../components/Newsletter/PageNewsletter";
import { Comment } from "../../types/common/Comment.type";
import CaptchaProvider from "../../providers/CaptchaProvider";

const BookPage: FunctionComponent<{ body: Book, comments: Comment[] }> = ({ body, comments }) => {
    const { id, head, reviewAuthor, title, review, rate, excerpt, createdDate, categoryName, cover, affiliateLink, seller, bookType } = body;
    const commentsRef = useRef<HTMLDivElement>(null);

    return body ? (
      <CaptchaProvider>
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
              {reviewAuthor[0] && <PostAuthor author={reviewAuthor[0].fields}/>}
              <div ref={commentsRef}>
                <CommentsList comments={comments} postId={id} title={title} />
              </div>
              <PageNewsletter />
          </Grid>
        </MainLayout>
      </CaptchaProvider>
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
          locale: context.locale,
        })
      }))
      .shift();

    const commentsRes = await fetchEntries({
      content_type: 'comment',
      include: 2,
      'fields.article.sys.id': body.id,
    });
  
    const comments = await commentsRes.data
      .map(({ fields: { message, email, author }, sys: { createdAt }}) => ({ 
        message,
        email: email || '',
        author,
        createdDate: formatDateAndTimeWithSeparator({
          dateObject: createdAt,
          dateFormatString: 'dd MMMM yyyy',
          timeFormatString: 'HH:mm',
          separator: 'o'
        })
      }));

    return {
        props: {
            body,
            comments,
        }
    }
}

export default BookPage;
