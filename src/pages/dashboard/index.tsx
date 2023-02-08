import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Entry } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";

interface DashboardPageProps {
    body: Page,
}

const DashboardPage: FC<DashboardPageProps> = ({ body: { head } }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title="Strefa kursanta" description="W przygotowaniu"/>
            </Grid>
        </MainLayout>
    )
}

export default DashboardPage;
