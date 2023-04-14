import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Entry } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";

interface WorkshopsPageProps {
    body: Page,
}

const WorkshopsPage: FC<WorkshopsPageProps> = () => {
    return (
        <MainLayout head={{}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title="Warsztaty" description="W przygotowaniu"/>
            </Grid>
        </MainLayout>
    )
}

export default WorkshopsPage;
