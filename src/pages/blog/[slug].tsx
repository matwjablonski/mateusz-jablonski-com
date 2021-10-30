import React from 'react';
import { Entry } from 'contentful';
import Post from '../../components/Post';
import MainLayout from '../../layouts'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import {GetServerSideProps, GetServerSidePropsContext, NextApiResponse} from "next";
import {fetchEntries} from "../../contentful";
import {ParsedUrlQuery} from "querystring";
import { Article } from '../../types/common/Article.types';

const BlogPost = ({body}) => {
  console.log('BlogPost', body);
  const { head } = body;
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
  })

  const body = await res
    .map(p => ({ ...p.fields }))
    .shift();

  return {
    props: {
      body
    }
  };
}

export default BlogPost;
