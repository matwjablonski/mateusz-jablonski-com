import { FC, use } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import Grid from "../../components/Grid"
import MainLayout from "../../layouts"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Workshop } from '../../types/database'
import { getWorkshopBySlug } from '../../lib/database/workshops'
import TitleBarWithComponent from '../../components/TitleBarWithComponent'
import CourseMeta from '../../components/CourseMeta'
import styles from '../../styles/Course.module.scss';
import Image from 'next/image';
import pig from '../../public/icons/pig-money.svg';
import clock from '../../public/icons/clock-4.svg';
import gps from '../../public/icons/gps.svg';
import Button from '../../components/Button';
import { ButtonType } from '../../components/Button/Button.types'
import TrainingProgram from '../../components/TrainingProgram'
import { useTranslations } from "../../hooks/useTranslations"

interface WorkshopPageProps {
    workshop: Workshop | null,
}

const WorkshopPage: FC<WorkshopPageProps> = ({ workshop }) => {
    const { translateByFullKey } = useTranslations();

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

    return (
        <MainLayout head={{ title: titleText || 'Warsztat' }} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <TitleBarWithComponent title={<>{titleText}</>} text={longDescription || ''} capitalize={false}>
                    <div className={styles.MetaData}>
                        <CourseMeta
                            label="Czas trwania"
                            value={`${days} ${days > 1 ? 'dni' : 'dzień'}`}
                            icon={<Image src={clock || `/icons/clock.svg`} alt="" height={32} width={32} />}
                        />
                        {costPerUser && <CourseMeta
                            label="Koszt na osobę"
                            value={`${costPerUser} ${currency || 'PLN'} netto`}
                            valueBelow={`${(costPerUser * 1.23).toFixed(2)} ${currency || 'PLN'} brutto`}
                            icon={<Image src={pig || `/icons/pig-money.svg`} alt="" height={32} width={32} />}
                        />}
                        {cityOrRemote && <CourseMeta
                            label="Miejsce"
                            value={cityOrRemote}
                            icon={<Image src={gps || `/icons/gps.svg`} alt="" height={32} width={32} />}
                        />}
                        <Button.L pattern={ButtonType.LIGTHENED} label="Zapytaj o termin" href="/contact" />
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

        return {
            props: {
                workshop,
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
