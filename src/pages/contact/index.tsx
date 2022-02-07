import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { GetStaticProps } from 'next';
import { fetchEntries } from "../../contentful";
import { FC } from "react";
import { Entry } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";

interface ContactPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
}

const ContactPage: FC<ContactPageProps> = ({ head, body: { title, description} }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={title} description={description} center/>
            </Grid>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'contact',
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

export default ContactPage;