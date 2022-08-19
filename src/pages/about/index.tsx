import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import { Entry } from "contentful";
import { GetStaticProps } from 'next';
import { fetchEntries } from "../../contentful";
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
import RecommendedPodcasts from "../../components/RecommendedPodcasts";

interface AboutPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
    book: Book,
    testimonials?: Testimonials[];
}

const AboutPage: FC<AboutPageProps> = ({ head, testimonials, body, book }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={body.title} description={body.description}/>
            </Grid>
            <SectionHero
                title={
                    <>
                        Przestrzeń <small>pomiędzy znakami</small>
                    </>
                }
                text="Najpiękniejsze w byciu człowiekiem jest to, że mogę się nieustannie rozwijać. Rozwój to dla mnie najważniejszy i największy motywator do codziennego wstawania. Dlatego właśnie, tak ważne są dla mnie książki - są symbolem wiedzy i rozwoju, kreatywności i szukania własnej drogi."
            />
            <Grid>
                <Columns>
                    {book && <ShortBox title="Aktualnie czytam">
                        <CurrentRead
                            title={book.title}
                            author={book.author}
                            imageUrl={book.cover.fields.file.url}
                            affiliateLink={book.affiliateLink}
                            bookType={book.bookType}
                            slug={book.slug}
                            hasReview={!!book.review}
                        />
                    </ShortBox>}
                    <ShortBox title="Aktualnie słucham">brak danych</ShortBox>
                </Columns>
                <RecommendedPodcasts />
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
            </Grid>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'about',
        include: 2,
    });

    const testimonialsRes = await fetchEntries({
        content_type: 'testimonials'
    });

    const booksRes = await fetchEntries({
        content_type: 'book',
        include: 2,
        'fields.currentRead': true,
        limit: 4,
    });

    const book = await booksRes.data.map(p => ({
        ...p.fields,
      })).shift();

    const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

    const testimonials = await testimonialsRes.data
        .map(t => ({ ...t.fields }));

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
        }
    }
}

export default AboutPage;