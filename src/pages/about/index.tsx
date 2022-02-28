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

interface AboutPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
    testimonials?: Testimonials[];
}

const AboutPage: FC<AboutPageProps> = ({ head, testimonials, body }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={body.title} description={body.description}/>
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
            testimonials,
        }
    }
}

export default AboutPage;