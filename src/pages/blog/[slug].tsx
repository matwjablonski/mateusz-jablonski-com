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
import { mapLocale } from '../../lib/locales';
import BuyCoffee from '../../components/BuyCoffee';
import NotTranslated from '../../components/NotTranslated';
import RecommendedContent from '../../components/RecommendedContent';
import { useTranslations } from '../../hooks/useTranslations';
import styles from '../../styles/Article.module.scss';
import { generateRandomNumber } from '../../lib/random';

const MAX_RELATED_CONTENT_ITEMS = 3;

const BlogPost: FunctionComponent<{ body: Article, comments: Comment[] }> = ({body, comments}) => {
  const { head, author, content, title, sources, summary, excerpt, featuredImage, createdDate, categoryName, level, isTranslationReady, related } = body;
  const commentsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslations();

  return body ? (
    <CaptchaProvider>
      <MainLayout head={head ? head.fields : {}}>
        <Grid>
          <Breadcrumbs />
          {!isTranslationReady && <NotTranslated />} 
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
            <CommentsList comments={comments} postId={body.id} title={title} />
          </div>
          <div className={styles.relatedContentSection}>
            <RecommendedContent
              content={related}
              title={t.ARTICLE.RELATED.TITLE}
              text={t.ARTICLE.RELATED.TEXT}  
            />
          </div>
          <PageNewsletter />
        </Grid>
      </MainLayout>
      <BuyCoffee />
    </CaptchaProvider>
  ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const {slug} = context.params

  const res = await fetchEntries({
    content_type: 'article',
    'fields.slug': slug,
    include: 2,
    locale: mapLocale(context.locale),
  });

  

  const tagsObjects = res.data[0].metadata.tags;
  const tags = tagsObjects.map(tag => tag.sys.id);

  const relatedIdsAddedByUser = (res.data[0].fields.related || []).map(r => r.sys.id);
  const idsToExcludeFromRelated = [...relatedIdsAddedByUser, res.data[0].sys.id];

  const body = await res.data
    .map(p => ({ 
      ...p.fields,
      id: p.sys.id,
      related: (p.fields.related || []).map(r => ({
        type: r.sys.contentType.sys.id,
        ...r.fields
      })),
      createdDate: formatDate({
        dateObject: p.fields.createdDate,
        formatString: 'dd MMMM yyyy',
        locale: context.locale,
      })
    }))
    .shift();

  const missingItemsForRelated = MAX_RELATED_CONTENT_ITEMS - body.related.length;

  const relatedRes = await fetchEntries({
    include: 2,
    'sys.id[nin]': idsToExcludeFromRelated.toString(),
    'metadata.tags.sys.id[in]': tags.toString(),
  });

  const relatedToShow = [];
  let n = 0;

  if (relatedRes.data.length <= missingItemsForRelated) {
    relatedToShow.push(...Array.from({length: relatedRes.data.length},(_, k) => k));
  } else {
    while (n < Math.min(missingItemsForRelated, relatedRes.data.length)) {
      const randomId = generateRandomNumber(0, relatedRes.data.length - 1);
      if (!relatedToShow.includes(randomId)) {
        relatedToShow.push(randomId);
        n++;
      }
    }
  }

  const related = await relatedRes.data
    .filter((_, i) => relatedToShow.includes(i))
    .map(p => ({
      type: p.sys.contentType.sys.id,
      ...p.fields,
    }));

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
      body: {
        ...body,
        related: [
          ...body.related,
          ...related,
        ]
      },
      comments,
    }
  };
}

export default BlogPost;
