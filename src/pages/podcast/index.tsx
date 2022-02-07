import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Entry } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";

interface PodcastPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
}

const PodcastPage: FC<PodcastPageProps> = ({ head }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title="Podcast" description="W przygotowaniu" center/>
            </Grid>
        </MainLayout>
    )
}

export default PodcastPage;