import React, { FunctionComponent, ReactHTMLElement, useRef } from 'react';
import { Entry } from 'contentful';
import Post from '../../components/Post';
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { fetchEntries } from "../../contentful";
import { ParsedUrlQuery } from "querystring";
import { Article } from '../../types/common/Article.types';
import { Comment } from '../../types/common/Comment.type';
import { formatDateAndTimeWithSeparator } from '../../utils/formatDate';
import CommentsList from '../../components/CommentsList';

const BlogPost: FunctionComponent<{ body: Article, comments: Comment[] }> = ({body, comments}) => {
  const { head } = body;
  const commentsRef = useRef<HTMLDivElement>(null);

  console.log(comments);

  return body ? (
    <MainLayout head={head ? head.fields : {}}>
      <Grid>
        <Breadcrumbs />
        <Post post={body} numberOfComments={comments.length} commentsBlockRef={commentsRef}/>
        <div ref={commentsRef}>
          <CommentsList comments={comments} postId={body.id} />
        </div>
      </Grid>
    </MainLayout>
  ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const {slug} = context.params

  const res: Entry<Article>[] = await fetchEntries({
    content_type: 'article',
    'fields.slug': slug,
    include: 2,
  })

  const body = await res
    .map(p => ({ ...p.fields, id: p.sys.id }))
    .shift();

  const commentsRes: Entry<Comment>[] = await fetchEntries({
    content_type: 'comment',
    include: 2,
    'fields.article.sys.id': body.id,
  });

  const comments = await commentsRes
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
