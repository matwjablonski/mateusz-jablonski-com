import { FC, useState } from 'react';
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
import HomeNewsletter from '../../components/Newsletter/HomeNewsletter';
import Button from '../../components/Button';
import { ButtonType } from '../../components/Button/Button.types';

interface BlogPageProps {
    body: Page,
    articles: Article[];
    totalArticles: number;
}

const PAGE_SIZE = 9;
const FIRST_PAGE_SIZE = PAGE_SIZE + 1;

const BlogPage: FC<BlogPageProps> = ({ body: { title, description, head }, articles, totalArticles }) => {
    const [lastArticle, ...restArticles] = articles;
    const [amountOfLoadedArticles, setAmountOfLoadedArticles] = useState(FIRST_PAGE_SIZE);
    const [articlesToShow, setArticlesToShow] = useState(restArticles);
    const [disabledFetch, setDisabledFetch] = useState(false);

    const shouldShowLoadMoreBtn = amountOfLoadedArticles < totalArticles;

    const fetchArticles = async () => {
        setDisabledFetch(true);
        const response = await fetch(`/api/blog/load?limit=${PAGE_SIZE}&skip=${amountOfLoadedArticles}`);
        const data = await response.json();

        setArticlesToShow([...articlesToShow, ...data]);
        setAmountOfLoadedArticles(amountOfLoadedArticles + data.length);
        setDisabledFetch(false);
    }

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
                        externalSource={lastArticle.externalSource}
                    />
                </section>
                <section className={styles.blogList}>
                    {articlesToShow.map((article) => <ArticlePreview 
                        key={`article${article.slug}`}
                        title={article.title}
                        slug={article.slug}
                        excerpt={article.excerpt}
                        createdDate={article.createdDate}
                        featuredImage={article.featuredImage}
                        preview={Preview.VERTICAL}
                        externalSource={article.externalSource}
                    />)}
                    {shouldShowLoadMoreBtn && <Button.B 
                        label="Wczytaj więcej treści"
                        pattern={ButtonType.SECONDARY}
                        action={fetchArticles}
                        disabled={disabledFetch}
                    />}
                </section>
                <section>
                    <HomeNewsletter />
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
        skip: 0,
        limit: FIRST_PAGE_SIZE,
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
