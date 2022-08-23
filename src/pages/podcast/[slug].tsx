import { Entry } from "contentful";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { HeadInterface } from "../../types/common/Head.types";
import { Podcast } from "../../types/common/Podcast.types";
import { ParsedUrlQuery } from "querystring";
import { formatDate, formatDateAndTimeWithSeparator } from "../../utils/formatDate";
import { fetchEntries } from "../../contentful";
import prepareFileUrl from "../../utils/prepareAssetUrl";
import dynamic from "next/dynamic";
import MainLayout from "../../layouts";
import Grid from "../../components/Grid";
import Breadcrumbs from "../../components/Breadcrumbs";
import PodcastComponent from "../../components/Podcast";
import { useRef } from "react";
import PostAuthor from "../../components/PostAuthor";
import CommentsList from "../../components/CommentsList";
import PageNewsletter from "../../components/Newsletter/PageNewsletter";
import { Comment } from "../../types/common/Comment.type";
import CaptchaProvider from "../../providers/CaptchaProvider";

interface SinglePodcastPageProps {
    head?: Entry<HeadInterface>;
    body: Podcast;
    comments: Comment[];
}

const DynamicPlayer = dynamic(
  () => import('../../components/Player'),
  { ssr: false }
);

const SinglePodcastPage = ({ body, head, comments }: SinglePodcastPageProps) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  console.log(body);

  return body ? (
    <CaptchaProvider>
      <MainLayout head={head ? head.fields : {}}>
        <Grid>
          <Breadcrumbs />
          <PodcastComponent
            content={body.content}
            title={body.title}
            excerpt={body.excerpt}
            numberOfComments={0}
            featuredImage={body.featuredImage}
            commentsBlockRef={commentsRef}
            author={body.author}
            file={body.file}
            createdDate={body.createdDate}
            podcastExcerpt={body.podcastExcerpt}
            podcastCover={body.podcastCover}
          />
          {body.author[0] && <PostAuthor author={body.author[0].fields}/>}
            <div ref={commentsRef}>
              <CommentsList comments={comments} postId={body.id} title={body.title} />
            </div>
            <PageNewsletter />
        </Grid>
      </MainLayout>
    </CaptchaProvider>
  ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const {slug} = context.params

  const res = await fetchEntries({
    content_type: 'podcast',
    'fields.slug': slug,
    include: 2,
  })

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
      };
}

export default SinglePodcastPage;
