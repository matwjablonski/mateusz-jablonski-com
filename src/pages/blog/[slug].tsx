import React, { FunctionComponent } from 'react';
import { Entry } from 'contentful';
import Post from '../../components/Post';
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import {GetServerSideProps, GetServerSidePropsContext, NextApiResponse} from "next";
import {fetchEntries} from "../../contentful";
import {ParsedUrlQuery} from "querystring";
import { Article } from '../../types/common/Article.types';
import { Comment } from '../../types/common/Comment.type';

const BlogPost: FunctionComponent<{ body: Article, comments: Comment[] }> = ({body, comments}) => {
  const { head } = body;

  console.log(comments);

  return body ? (
    <MainLayout head={head ? head.fields : {}}>
      <Grid>
        <Breadcrumbs />
        <Post post={body}/>
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
    .map(({ fields: { message }}) => ({ message }));

  return {
    props: {
      body,
      comments,
    }
  };
}

export default BlogPost;
