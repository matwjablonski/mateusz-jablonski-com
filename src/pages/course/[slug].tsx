import { Entry } from "contentful"
import { FC } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import Grid from "../../components/Grid"
import PageTitle from "../../components/PageTitle"
import MainLayout from "../../layouts"
import { HeadInterface } from "../../types/common/Head.types"
import { Page } from "../../types/common/Page.types"

interface CoursePageProps {
    head?: Entry<HeadInterface>;
    body: Page,
}


const CoursePage: FC<CoursePageProps> = ({ head }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title="Kurs" description="Widok w przygotowaniu. Jeśli chcesz się dowiedzieć więcej na temat tego warsztatu napisz do mnie maila na adres: mail@mateuszjablonski.com"/>
            </Grid>
        </MainLayout>
    )
}

export default CoursePage;
