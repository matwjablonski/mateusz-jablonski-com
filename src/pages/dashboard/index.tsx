import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Page } from "../../types/common/Page.types";
import { useRouter } from 'next/router';

interface DashboardPageProps {
    body?: Page,
}

const DashboardPage: FC<DashboardPageProps> = () => {
    const router = useRouter()

    router.push('/auth/login');

    return null;

    return (
        <MainLayout head={{}} hideOverflow dark hideFunds hideSocialMedia>
            <Grid>
                <Breadcrumbs dark />
                <PageTitle title="Strefa kursanta" description="W przygotowaniu" dark/>
            </Grid>
        </MainLayout>
    )
}

export default DashboardPage;
