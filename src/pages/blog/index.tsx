import { FC } from 'react';
import MainLayout from '../../layouts/index'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Entry } from 'contentful';
import { HeadInterface } from '../../types/common/Head.types';
import { GetServerSideProps } from 'next';
import { Page } from '../../types/common/Page.types';
import { fetchEntries } from '../../contentful';
import PageTitle from '../../components/PageTitle';
import { formatDate } from '../../utils/formatDate';
import { Article } from '../../types/common/Article.types';
import ArticlePreview from '../../components/ArticlePreview';
import styles from '../../styles/Blog.module.scss';
import { Preview } from '../../components/ArticlePreview/ArticlePreview.types';

interface BlogPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
    articles: Article[];
    totalArticles: number;
}

const PAGE_SIZE = 9;

const BlogPage: FC<BlogPageProps> = ({ head, body: { title, description }, articles, totalArticles }) => {
    const [lastArticle, ...restArticles] = articles;
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={title} description={description} />
                <section className={styles.lastArticle}>
                    <ArticlePreview 
                        title={lastArticle.title}
                        slug={lastArticle.slug}
                        excerpt={lastArticle.excerpt}
                        createdDate={lastArticle.createdDate}
                        featuredImage={lastArticle.featuredImage}
                        preview={Preview.HORIZONTAL}
                    />
                </section>
                <section className={styles.blogList}>
                    {restArticles.map((article) => <ArticlePreview 
                        key={`article${Math.random()}`}
                        title={article.title}
                        slug={article.slug}
                        excerpt={article.excerpt}
                        createdDate={article.createdDate}
                        featuredImage={article.featuredImage}
                        preview={Preview.VERTICAL}
                    />)}
                </section>
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'blog',
        include: 2,
    });

    const articlesRes = await fetchEntries({
        content_type: 'article',
        include: 2,
        limit: PAGE_SIZE + 1,
        order: '-fields.createdDate',
        'fields.createdDate[lte]': new Date(),
    });

    const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

    const articles = await articlesRes.data.map(p => ({
        ...p.fields,
        createdDate: formatDate({
            dateObject: p.fields?.createdDate,
            formatString: 'dd MMMM yyyy'
        }),
    }));

    if (!body) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            body,
            articles,
            totalArticles: articlesRes.total,
        }
    }
}

export default BlogPage;
