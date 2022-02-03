import { FC } from 'react';
import MainLayout from '../../layouts/index'
import Grid from '../../components/Grid';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Entry } from 'contentful';
import { HeadInterface } from '../../types/common/Head.types';
import { GetServerSideProps } from 'next';
import { Page } from '../../types/common/Page.types';
import { fetchEntries } from '../../contentful';
import Title from '../../components/Title';
import PageTitle from '../../components/PageTitle';

interface BlogPageProps {
    head?: Entry<HeadInterface>;
    body: Page
}

const BlogPage: FC<BlogPageProps> = ({ head, body: { title, description } }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={title} description={description} />
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res: Entry<Page>[] = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'blog',
        include: 2,
    });

    const body = await res
        .map(p => ({ ...p.fields }))
        .shift();

    if (!body) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            body,
        }
    }
}

export default BlogPage;
