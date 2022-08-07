import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { GetStaticProps } from 'next';
import { fetchEntries } from "../../contentful";
import { FC } from "react";
import { Entry } from "contentful";
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";
import { Testimonials } from "../../types/common/Testimonials.types";
import TestimonialsList from "../../components/Testimonials";
import ContactForm from "../../components/ContactForm";

interface ContactPageProps {
    head?: Entry<HeadInterface>;
    body: Page,
    testimonials?: Testimonials[];
}

const showContactForm = false;

const ContactPage: FC<ContactPageProps> = ({ head, body: { title, description}, testimonials }) => {
    return (
        <MainLayout head={head ? head.fields : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={title} description={description} center/>
                <ContactForm />
                {testimonials.length && (
                    <TestimonialsList
                        title="Co mówią o mojej pracy?"
                        description="Największą wartością dla mnie jest zadowolenie moich odbiorców: czytelników, słuchaczy, widzów i osób, których pomagam realizować ich cele. Poniżej znajdziesz kilka wybranych opinii na temat mojej pracy."
                        contentAlign="center"
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
        'fields.slug': 'contact',
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

export default ContactPage;