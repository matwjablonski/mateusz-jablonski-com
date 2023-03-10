import { Entry } from "contentful"
import { FC } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import Grid from "../../components/Grid"
import MainLayout from "../../layouts"
import { HeadInterface } from "../../types/common/Head.types"
import { Course } from "../../types/common/Course.types"
import { fetchEntries } from '../../contentful'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import TitleBarWithComponent from '../../components/TitleBarWithComponent'
import CourseMeta from '../../components/CourseMeta'
import CourseProgram from '../../components/CourseProgram'
import CourseParticipantsCounter from '../../components/CourseParticipantsCounter';
import styles from '../../styles/Course.module.scss';
import Image from 'next/image';
import calendar from '../../public/icons/calendar-white.svg';
import pig from '../../public/icons/pig-money.svg';
import clock from '../../public/icons/clock-4.svg';
import gps from '../../public/icons/gps.svg';
import Button from '../../components/Button';
import { ButtonType } from '../../components/Button/Button.types'
import { formatDate } from '../../utils/formatDate'

interface CoursePageProps {
    body: Course,
}


const CoursePage: FC<CoursePageProps> = ({ body }) => {
    const {
        head,
        title,
        longDescription,
        days,
        currency,
        costPerUser,
        program,
        maxParticipants,
        nextWorkshops,
        cityOrRemote,
    } = body;
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <TitleBarWithComponent title={<>{title}</>} text={longDescription} capitalize={false}>
                    <div className={styles.MetaData}>
                        <CourseMeta
                            label="Czas trwania"
                            value={`${days} ${days > 1 ? 'dni' : 'dzień'}`}
                            icon={<Image src={clock || `/icons/clock.svg`} alt="" height={32} width={32} />}
                        />
                        <CourseMeta
                            label="Koszt na osobę"
                            value={`${costPerUser} ${currency} netto`}
                            valueBelow={`${costPerUser * 1.23} ${currency} brutto`}
                            icon={<Image src={pig || `/icons/pig-money.svg`} alt="" height={32} width={32} />}
                        />
                        {nextWorkshops && <CourseMeta
                            label="Najbliższy  termin"
                            value={nextWorkshops?.toString()}
                            icon={<Image src={calendar || `/icons/calendar-white.svg`} alt="" height={32} width={32} />}
                        />}
                        {cityOrRemote && <CourseMeta
                            label="Najbliższe miejsce"
                            value={cityOrRemote}
                            icon={<Image src={gps || `/icons/gps.svg`} alt="" height={32} width={32} />}
                        />}
                        {nextWorkshops && <CourseParticipantsCounter
                            maxParticipants={maxParticipants}
                            participants={1}
                            title="dasda"
                        />}
                        {nextWorkshops && (
                            <Button.L pattern={ButtonType.RED} label="Zarezerwuj miejsce" href="/contact" />
                        )}
                        {!nextWorkshops && (
                            <Button.L pattern={ButtonType.LIGTHENED} label="Zapytaj o termin" href="/contact" />
                        )}
                    </div>
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
      nextWorkshops: formatDate({
        dateObject: p.fields.nextWorkshops,
        formatString: 'dd.MM.yyyy',
        locale: context.locale,
      })
    }))
    .shift();

    return {
        props: {
          body,
        }
      };
}

export default CoursePage;
