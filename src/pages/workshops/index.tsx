import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Entry } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";
import { GetServerSideProps } from 'next';
import { fetchEntries } from '../../contentful';

interface WorkshopsPageProps {
    body: Page,
}

const WorkshopsPage: FC<WorkshopsPageProps> = ({ body }) => {
    return (
        <MainLayout head={{}} hideOverflow dark>
            <Grid>
                <Breadcrumbs dark />
                <PageTitle title={body.title} description={body.description} dark/>
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'workshops',
        include: 2,
    });

    const body = await res.data
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

export default WorkshopsPage;
