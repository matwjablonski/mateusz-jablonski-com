import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC, ReactNode } from "react";
import { EntrySkeletonType } from "contentful";
import { GetStaticProps } from 'next';
import { fetchEntries, fetchMultipleContentTypesEntries } from "../../contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";
import HowIWork from "../../components/HowIWork";
import { Testimonials } from "../../types/common/Testimonials.types";
import TestimonialsList from "../../components/Testimonials";
import WhatCanITeachYou from "../../components/WhatCanITeachYou";
import Columns from "../../components/Columns";
import ShortBox from "../../components/ShortBox";
import CurrentRead from "../../components/CurrentRead";
import { Book } from "../../types/common/Book.types";
import SectionHero from "../../components/SectionHero";
import PageNewsletter from "../../components/Newsletter/PageNewsletter";
import recommended from '../../data/recommended.json';
import RecommendedPodcastTile from "../../components/RecommendedPodcastTile";
import dynamic from "next/dynamic";
import LastContent, { ContentType } from "../../components/LastContent";
import { getRecommendedChannels, Vlog } from "../../lib/google/youtube/getRecommendedChannels";
import RecommendedVlogTile from "../../components/RecommendedVlogTile";
import MyStory from "../../components/MyStory";
import Motivator from "../../components/Motivator";
import { mapLocale } from '../../lib/locales';
import { useTranslations } from '../../hooks/useTranslations';

interface AboutPageProps {
    head?: EntrySkeletonType<HeadInterface>;
    body: Page,
    book: Book,
    testimonials?: Testimonials[];
    lastContent: ContentType[];
    vlogs: Vlog[];
}

const DynamicRecommendedThree = dynamic(
    () => import('../../components/RecommendedThree'),
    { ssr: false },
)

const AboutPage: FC<AboutPageProps> = ({ head, testimonials, body, book, lastContent, vlogs }) => {
    const { t, translate } = useTranslations();
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                {/* <MyStory /> */}
                <Motivator />
            </Grid>
            <SectionHero
                title={translate({ value: t.ABOUT.DOTTED_TITLE, tagName: 'small' }) as ReactNode[]}
                text="Najpiękniejsze w byciu człowiekiem jest to, że mogę się nieustannie rozwijać. Rozwój to dla mnie najważniejszy i największy motywator do codziennego wstawania. Dlatego właśnie, tak ważne są dla mnie książki - są symbolem wiedzy i rozwoju, kreatywności i szukania własnej drogi."
            />
            <Grid>
                <Columns>
                    {book && <ShortBox title="Aktualnie czytam">
                        <CurrentRead
                            title={book.title}
                            author={book.author}
                            imageUrl={book.cover.fields.file.url as string}
                            affiliateLink={book.affiliateLink}
                            bookType={book.bookType}
                            slug={book.slug}
                            hasReview={!!book.review}
                        />
                    </ShortBox>}
                    <ShortBox title="Aktualnie słucham">brak danych</ShortBox>
                </Columns>
                {
                    recommended.podcasts.length >= 3 && (
                        <DynamicRecommendedThree
                            data={recommended.podcasts}
                            Component={RecommendedPodcastTile}
                            title="Polecane podcasty"
                        />
                    )
                }
                {
                    vlogs.length >= 3 && (
                        <DynamicRecommendedThree
                            data={vlogs}
                            Component={RecommendedVlogTile}
                            title="Polecane vlogi"
                        />
                    )
                }
                <WhatCanITeachYou />
                <HowIWork />
                {testimonials.length && (
                    <TestimonialsList
                        contentAlign="left"
                        title="Opinie"
                        description="Moja praca to praca z ludźmi, którzy chcą się rozwijać, poznawać nowe rzeczy, czasami zmienić swoje życie. Jakkolwiek górnolotnie to brzmi to fakt jest taki, że bez ludzi moja praca nie miałaby sensu. Poniżej kilka opinii na temat mojej pracy."
                        testimonials={testimonials}
                    />
                )}
                <PageNewsletter />
                <LastContent content={lastContent} />
            </Grid>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const lastContentRes = await fetchMultipleContentTypesEntries(['article','book','podcast'], 3, mapLocale(locale));

    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'about',
        include: 2,
        locale: mapLocale(locale),
    });

    const testimonialsRes = await fetchEntries({
        content_type: 'testimonials',
        locale: mapLocale(locale),
    });

    const booksRes = await fetchEntries({
        content_type: 'book',
        include: 2,
        'fields.currentRead': true,
        limit: 4,
        locale: mapLocale(locale),
    });

    const lastContent = await lastContentRes.data.map(p => {
        console.log(p);
        return ({
            type: p.sys?.contentType?.sys?.id || '',
            ...p.fields,
        })
    });

    const book = await booksRes.data.map(p => ({
        ...p.fields,
      })).shift();

    const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

    const testimonials = await testimonialsRes.data
        .map(t => ({ ...t.fields }));

    const vlogs = await getRecommendedChannels();

    if (!body) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            body,
            book,
            testimonials,
            lastContent,
            vlogs,
        }
    }
}

export default AboutPage;
