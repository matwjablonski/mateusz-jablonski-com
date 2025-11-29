import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Page } from "../../types/common/Page.types";
import { GetServerSideProps, GetStaticPropsContext } from 'next';
import { fetchEntries } from '../../contentful';
import FeaturedCoursePreview from '../../components/FeaturedCoursePreview';
import { WorkshopBox, Wrapper } from '../../components/pages/workshops/ui';
import { getAllWorkshops } from '../../lib/database/workshops';
import { Workshop } from '../../types/database';
import { useTranslations } from "../../hooks/useTranslations";
import { mapLocale } from "../../lib/locales";
import { ParsedUrlQuery } from "querystring";

interface WorkshopsPageProps {
    body: Page,
    workshops: Workshop[],
}

const WorkshopsPage: FC<WorkshopsPageProps> = ({ workshops, body }) => {
    const { translateByFullKey } = useTranslations();

    return (
        <MainLayout head={{}} hideOverflow dark>
            <Grid>
                <Breadcrumbs dark />
                <PageTitle title={body.title} description={body.description} dark/>
                <Wrapper>
                    {
                        workshops.map((workshop) => <WorkshopBox key={workshop.id}>
                            <FeaturedCoursePreview
                                title={translateByFullKey(workshop.name)}
                                slug={workshop.slug}
                                description={translateByFullKey(workshop.description)}
                                days={workshop.days}
                                level={workshop.level}
                            />
                        </WorkshopBox>)
                    }
                </Wrapper>
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
    try {
        const res = await fetchEntries({
            content_type: 'page',
            'fields.slug': 'workshops',
            include: 2,
            locale: mapLocale(context.locale),
        });

        const body = await res.data
            .map(p => ({ ...p.fields }))
            .shift();

        const workshops = await getAllWorkshops();
        
        return {
            props: {
                body,
                workshops,
            }
        }
    } catch (error) {
        console.error('Error fetching workshops:', error);
        return {
            props: {
                workshops: [],
            }
        }
    }
}

export default WorkshopsPage;
