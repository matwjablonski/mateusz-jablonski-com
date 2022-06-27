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
                <Columns>
                    <ShortBox title="Aktualnie czytam">
                        <CurrentRead title={book.title} author={book.author} imageUrl="" affiliateLink="" />
                    </ShortBox>
                    <ShortBox title="Aktualnie słucham">brak danych</ShortBox>
                </Columns>
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