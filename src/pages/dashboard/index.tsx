import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Page } from "../../types/common/Page.types";

interface DashboardPageProps {
    body?: Page,
}

const DashboardPage: FC<DashboardPageProps> = () => {
    return (
        <MainLayout head={{}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title="Strefa kursanta" description="W przygotowaniu"/>
            </Grid>
        </MainLayout>
    )
}

export default DashboardPage;
