import React from 'react';
import Post from '../../components/Post';
import MainLayout from '../../layouts'
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {fetchEntries} from "../../contentful";
import {ParsedUrlQuery} from "querystring";

const BlogPost = ({body}) => {
  console.log('BlogPost', body);
  const { head } = body;
  return body ? (
    <MainLayout head={head ? head.fields : {}}>
      <Post post={body}/>
    </MainLayout>
  ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const {slug} = context.params

  const res = await fetchEntries({
    content_type: 'article',
    'fields.slug': slug,
  })

  const body = await res
    .map(p => {
      const { fields: { source, title, author, authorUrl, image, imageUrl } } = p.fields.featuredImage;

      return {
        coverImage: {
          url: image ? image.fields.file.url : '',
          name: title,
          author,
          authorUrl,
          source,
          sourceUrl: imageUrl,
        },
        authors: p.fields.author.map(a => ({...a.fields})),
        ...p.fields
      }
    })
    .shift();

  return {
    props: {
      body
    }
  };
}

export default BlogPost;
