import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import {GetServerSideProps, GetStaticProps} from "next";
import {fetchEntries} from '../contentful'
import PageTitle from '../components/Title';
import Grid from '../components/Grid';
import MainLayout from '../layouts/index'
import TitleBarWithCounter from '../components/TitleBarWithCounter';
import ArticlePreview from '../components/ArticlePreview';
import LastArticles from '../components/LastArticles';
import HomeNewsletter from '../components/HomeNewletter';

interface HomeData {
  lastArticlesDescription: string;
  lastPodcastsDescription: string;
}

interface HomeProps {
  articles: any[],
  data: HomeData;
}

const Home = ({articles, data}: HomeProps) => {
  const { lastArticlesDescription, lastPodcastsDescription } = data; 
  console.log(articles);
  return (
      <MainLayout>
        <Grid>
          <section>
            <TitleBarWithCounter 
              title={<>Ostatnie <strong>artykuły</strong></>}
              text={lastArticlesDescription}
              nextItemName="artykuł"
              days={14}
            />
            <LastArticles articles={articles} />
          </section>
          <section>
            <TitleBarWithCounter 
              title={<>Ostatnie <strong>podcasty</strong></>}
              text={lastPodcastsDescription}
              nextItemName="podcast"
              days={1}
            />
          </section>
          <section>
            <HomeNewsletter />
          </section>
        </Grid>
      </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const homeRes = await fetchEntries({
    content_type: 'home'
  });

  const res = await fetchEntries({
    content_type: 'article',
    include: 5,
    order: '-fields.createdDate',
  });

  const homeDetails = await homeRes.map(p => p.fields).shift();

  const articles = await res.map(p => ({
    ...p.fields,
    createdDate: format(new Date(p.fields?.createdDate) || new Date(), 'dd MMMM yyyy', { locale: pl }),
    featuredImage: p.fields?.featuredImage?.fields || null,
  }));

  return {
    props: {
      data: homeDetails,
      articles
    }
  }
}

export default Home
