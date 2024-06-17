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
import PageNewsletter from "../../components/Newsletter/PageNewsletter";
import CaptchaProvider from "../../providers/CaptchaProvider";
import MyNewsletter from "../../components/MyNewsletter";
import Columns from "../../components/Columns";
import { useTranslations } from '../../hooks/useTranslations';

interface ContactPageProps {
    body: Page,
    testimonials?: Testimonials[];
}

const ContactPage: FC<ContactPageProps> = ({ body: { title, head, description}, testimonials }) => {
    const { t } = useTranslations();
    return (
        <CaptchaProvider>
            <MainLayout head={head ? head.fields : {}} hideOverflow>
                <Grid>
                    <Breadcrumbs />
                    <PageTitle title={title} description={description} center/>
                    <ContactForm />
                    <MyNewsletter title="Mój newsletter">
                        <div>
                            <p>Dołącz bezpłatnie do mojego newslettera. Raz na dwa tygodnie otrzymasz ode mnie wiadomość z informacjami o nowych materiałach, które znajdziesz na mojej stronie. Będziesz nie tylko pierwszy, ale uzyskasz dostęp do ciekawostek, interesujących ofert i nie publikowanych wcześniej materiałów.</p>
                            <p>Newsletter, podobnie jak większość materiałów na mojej stronie, jest całkowicie bezpłatny. Obiecuję nie spamować i wysłać to, co rzeczywiście może Ci się przydać.</p>
                        </div>
                        <Columns>
                            <div>
                                <h3>Co znajdziesz w newsletterze?</h3>
                                <p>Informacje o najnowszych artykułach, recenzjach, kursach i podcastach. Ciekawostki ze świata IT. Polecane wydarzenia i wcześniejszy dostęp do niektórych materiałów.</p>
                            </div>
                            <div>
                                <h3>Jakie otrzymasz bonusy?</h3>
                                <p>Bądź zawsze pierwszy. Dostęp do nowych materiałów otrzymasz zawsze dzień wcześniej. Dodatkowo otrzymasz rabat 10% na wszystkie moje płatne konsultacje i sesje mentoringowe.</p>
                            </div>
                        </Columns>
                    </MyNewsletter>
                    {testimonials.length && (
                        <TestimonialsList
                            title="Co mówią o mojej pracy?"
                            description="Największą wartością dla mnie jest zadowolenie moich odbiorców: czytelników, słuchaczy, widzów i osób, których pomagam realizować ich cele. Poniżej znajdziesz kilka wybranych opinii na temat mojej pracy."
                            contentAlign="center"
                            testimonials={testimonials}
                        />
                    )}
                    <PageNewsletter />
                </Grid>
            </MainLayout>
        </CaptchaProvider>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'contact',
        include: 2,
    });

    const testimonialsRes = await fetchEntries({
        content_type: 'testimonials',
        'fields.isGeneralReview': true,
        select: 'fields.name,fields.content'
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
