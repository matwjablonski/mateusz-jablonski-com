import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Entry, EntrySkeletonType } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";
import { GetServerSideProps } from 'next';
import { fetchEntries } from '../../contentful';
import { Course } from '../../types/common/Course.types';
import FeaturedCoursePreview from '../../components/FeaturedCoursePreview';
import { WorkshopBox, Wrapper } from './ui';

interface WorkshopsPageProps {
    body: Page,
    courses: Course[],
}

const WorkshopsPage: FC<WorkshopsPageProps> = ({ body, courses }) => {

    return (
        <MainLayout head={{}} hideOverflow dark>
            <Grid>
                <Breadcrumbs dark />
                <PageTitle title={body.title} description={body.description} dark/>
                <Wrapper>
                    {
                        courses.map((course) => <WorkshopBox key={course.title}>
                            <FeaturedCoursePreview course={course}/>
                        </WorkshopBox>)
                    }
                </Wrapper>
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

    const coursesRes = await fetchEntries({
        content_type: 'course',
        include: 2,
        order: 'fields.nextWorkshops',
    });

    const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

    const courses = await coursesRes.data.map(c => ({ ...c.fields }));

    if (!body) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            body,
            courses,
        }
    }
}

export default WorkshopsPage;
