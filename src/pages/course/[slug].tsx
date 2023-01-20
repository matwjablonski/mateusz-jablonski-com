import { Entry } from "contentful"
import { FC } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import Grid from "../../components/Grid"
import PageTitle from "../../components/PageTitle"
import MainLayout from "../../layouts"
import { HeadInterface } from "../../types/common/Head.types"
import { Course } from "../../types/common/Course.types"
import { fetchEntries } from '../../contentful'
import { formatDate, formatDateAndTimeWithSeparator } from '../../utils/formatDate'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import TitleBarWithComponent from '../../components/TitleBarWithComponent'
import CourseMeta from '../../components/CourseMeta'
import CourseProgram from '../../components/CourseProgram'

interface CoursePageProps {
    head?: Entry<HeadInterface>;
    body: Course,
}


const CoursePage: FC<CoursePageProps> = ({ head, body }) => {
    const {
        title,
        description,
        days,
        currency,
        costPerUser,
        program
    } = body;
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <TitleBarWithComponent title={<>{title}</>} text={description} capitalize={false}>
                    <CourseMeta
                        days={days}
                        costPerUser={costPerUser}
                        currency={currency}
                    />
                </TitleBarWithComponent>
                <CourseProgram content={program}/>
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const {slug} = context.params

  const res = await fetchEntries({
    content_type: 'course',
    'fields.slug': slug,
    include: 2,
  })

  const body = await res.data
    .map(p => ({ 
      ...p.fields,
    }))
    .shift();

    return {
        props: {
          body,
        }
      };
}

export default CoursePage;
