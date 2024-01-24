import { Entry } from "contentful";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { HeadInterface } from "../../types/common/Head.types";
import { Podcast, PodcastEpisode } from "../../types/common/Podcast.types";
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
import { Author } from '../../types/common/Author.types';

interface SinglePodcastPageProps {
    body: PodcastEpisode;
    comments: Comment[];
}

const SinglePodcastPage = ({ body, comments }: SinglePodcastPageProps) => {
  const { head } = body;
  const commentsRef = useRef<HTMLDivElement>(null);

  console.log('body', body.podcast.fields);
  return body ? (
    <CaptchaProvider>
      <MainLayout head={head ? (head.fields as HeadInterface) : {}}>
        <Grid>
          <Breadcrumbs />
          <PodcastComponent
            applepodcast={body.podcast.fields.applepodcast}
            spotify={body.podcast.fields.spotify}
            googlepodcast={body.podcast.fields.googlepodcasts}
            youtube={body.podcast.fields.youtube}
            content={body.content}
            title={body.title}
            excerpt={body.excerpt}
            numberOfComments={0}
            featuredImage={body.featuredImage}
            commentsBlockRef={commentsRef}
            author={body.author}
            file={body.file}
            fileUrl={body.fileUrl}
            episode={body.episode}
            createdDate={body.createdDate}
            podcastTitle={body.podcast.fields.name}
            podcastExcerpt={body.podcastExcerpt}
            podcastCover={body.podcast.fields.cover}
            externalLink={body.externalLink}
            video={body.video}
            time={body.time}
          />
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
        formatString: 'dd.MM.yyyy',
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
        separator: 'o',
        locale: context.locale,
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
