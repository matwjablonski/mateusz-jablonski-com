import React, { FunctionComponent, useRef } from 'react';
import Post from '../../components/Post';
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { fetchEntries } from "../../contentful";
import { ParsedUrlQuery } from "querystring";
import { Article } from '../../types/common/Article.types';
import { Comment } from '../../types/common/Comment.type';
import { formatDateAndTimeWithSeparator, formatDate } from '../../utils/formatDate';
import CommentsList from '../../components/CommentsList';
import PostAuthor from '../../components/PostAuthor';
import PageNewsletter from '../../components/Newsletter/PageNewsletter';
import CaptchaProvider from '../../providers/CaptchaProvider';

const BlogPost: FunctionComponent<{ body: Article, comments: Comment[] }> = ({body, comments}) => {
  const { head, author, content, title, sources, summary, excerpt, featuredImage, createdDate, categoryName, level } = body;
  const commentsRef = useRef<HTMLDivElement>(null);

  return body ? (
    <CaptchaProvider>
      <MainLayout head={head ? head.fields : {}}>
        <Grid>
          <Breadcrumbs />
          <Post
            content={content}
            title={title}
            sources={sources}
            author={author}
            summary={summary}
            excerpt={excerpt}
            featuredImage={featuredImage}
            numberOfComments={comments.length}
            commentsBlockRef={commentsRef}
            createdDate={createdDate}
            categoryName={categoryName}
            level={level}
          />
          {author[0] && <PostAuthor author={author[0].fields}/>}
          <div ref={commentsRef}>
            <CommentsList comments={comments} postId={body.id} />
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
    content_type: 'article',
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
    .map(({ fields: { message, email }, sys: { createdAt }}) => ({ 
      message,
      email: email || '',
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

export default BlogPost;
