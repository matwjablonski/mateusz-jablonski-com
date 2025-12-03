import { FC, use } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import Grid from "../../components/Grid"
import MainLayout from "../../layouts"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Workshop } from '../../types/database'
import { getWorkshopBySlug } from '../../lib/database/workshops'
import { getCountOfResponsesForWorkshop, getWorkshopAverageRating } from '../../lib/database/polls'
import TitleBarWithComponent from '../../components/TitleBarWithComponent'
import CourseMeta from '../../components/CourseMeta'
import styles from '../../styles/Course.module.scss';
import Image from 'next/image';
import pig from '../../public/icons/pig-money.svg';
import clock from '../../public/icons/clock-4.svg';
import gps from '../../public/icons/gps.svg';
import star from '../../public/icons/star.svg';
import Button from '../../components/Button';
import { ButtonType } from '../../components/Button/Button.types'
import TrainingProgram from '../../components/TrainingProgram'
import { useTranslations } from "../../hooks/useTranslations"

interface WorkshopPageProps {
    workshop: Workshop | null,
    averageRating: number | null,
    numberOfResponses: number | null,
}

const WorkshopPage: FC<WorkshopPageProps> = ({ workshop, averageRating, numberOfResponses }) => {
    const { t, translateByFullKey, translate } = useTranslations();

    if (!workshop) {
        return (
            <MainLayout head={{}} hideOverflow>
                <Grid>
                    <Breadcrumbs />
                    <h1>Warsztat nie został znaleziony</h1>
                </Grid>
            </MainLayout>
        );
    }

    const {
        name: title,
        longDescription,
        days,
        currency,
        costPerUser,
        program,
        maxParticipants,
        cityOrRemote,
    } = workshop;

    const titleText = translateByFullKey(title);
    const longDescriptionText = translateByFullKey(longDescription || '');

    return (
        <MainLayout head={{ title: titleText || 'Warsztat' }} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <TitleBarWithComponent title={<>{titleText}</>} text={longDescriptionText} capitalize={false}>
                    <div className={styles.MetaData}>
                        {days && <CourseMeta
                            label={t.WORKSHOP.DURATION}
                            value={`${days} ${days > 1 ? t.COMMON.DAYS : t.COMMON.DAY}`}
                            icon={<Image src={clock || `/icons/clock.svg`} alt="" height={32} width={32} />}
                        />}
                        {costPerUser && <CourseMeta
                            label={t.WORKSHOP.COST_PER_USER}
                            value={`${costPerUser} ${currency || 'PLN'} ${t.WORKSHOP.NET}`}
                            valueBelow={t.WORKSHOP.COST_NOTE}
                            icon={<Image src={pig || `/icons/pig-money.svg`} alt="" height={32} width={32} />}
                        />}
                        {cityOrRemote && <CourseMeta
                            label={t.WORKSHOP.CITY_OR_REMOTE}
                            value={cityOrRemote}
                            icon={<Image src={gps || `/icons/gps.svg`} alt="" height={32} width={32} />}
                        />}
                        {averageRating > 0 && <CourseMeta
                            label={t.WORKSHOP.AVERAGE_RATING}
                            value={`${averageRating} / 5`}
                            valueBelow={numberOfResponses ? translate({ value: t.WORKSHOP.BASED_ON_RESPONSES, variables: [ numberOfResponses.toString() ] }) : ''}
                            icon={<Image src={star || `/icons/star.svg`} alt="" height={32} width={32} />}
                        />}
                        <Button.L pattern={ButtonType.LIGTHENED} label={t.WORKSHOP.ASK_FOR_PRICE} href="/contact" />
                    </div>
                </TitleBarWithComponent>
                {program && <TrainingProgram content={program}/>}
                {/* TODO: Add reviews from database */}
                {/* <WorkshopReviews reviews={[]} /> */}
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const { slug } = context.params || {};

    if (!slug || typeof slug !== 'string') {
        return {
            notFound: true,
        };
    }

    try {
        const workshop = await getWorkshopBySlug(slug);

        if (!workshop) {
            return {
                notFound: true,
            };
        }

        const averageRating = await getWorkshopAverageRating(workshop.id);
        const numberOfResponses = await getCountOfResponsesForWorkshop(workshop.id);

        return {
            props: {
                workshop,
                averageRating,
                numberOfResponses,
            }
        };
    } catch (error) {
        console.error('Error fetching workshop:', error);
        return {
            notFound: true,
        };
    }
}

export default WorkshopPage;
