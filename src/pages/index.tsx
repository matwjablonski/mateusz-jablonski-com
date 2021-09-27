import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import {GetServerSideProps, GetStaticProps} from "next";
import {fetchEntries} from '../contentful'
import Grid from '../components/Grid';
import MainLayout from '../layouts/index'
import TitleBarWithCounter from '../components/TitleBarWithCounter';
import LastArticles from '../components/LastArticles';
import HomeNewsletter from '../components/HomeNewletter';
import { Podcast } from '../types/common/Podcast.types';
import { Article } from '../types/common/Article.types';
import LastPodcasts from '../components/LastPodcasts';

interface HomeData {
  lastArticlesDescription: string;
  lastPodcastsDescription: string;
}

interface HomeProps {
  podcasts: Podcast[],
  articles: Article[],
  data: HomeData;
}

const Home = ({articles, podcasts, data}: HomeProps) => {
  const { lastArticlesDescription, lastPodcastsDescription } = data; 
  console.log(podcasts);
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
            <LastPodcasts podcasts={podcasts} />
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

  const artilesRes = await fetchEntries({
    content_type: 'article',
    include: 2,
    order: '-fields.createdDate',
  });

  const podcastsRes = await fetchEntries({
    content_type: 'podcast',
    include: 2,
    order: '-fields.createdDate',
    limit: 5,
  });

  const homeDetails = await homeRes.map(p => p.fields).shift();

  const articles = await artilesRes.map(p => ({
    ...p.fields,
    createdDate: format(new Date(p.fields?.createdDate) || new Date(), 'dd MMMM yyyy', { locale: pl }),
    featuredImage: p.fields?.featuredImage?.fields || null,
  }));

  const podcasts = await podcastsRes.map(p => ({
    ...p.fields,
    createdDate: format(new Date(p.fields?.createdDate) || new Date(), 'dd MMMM yyyy', { locale: pl }),
  }));

  return {
    props: {
      data: homeDetails,
      articles,
      podcasts,
    }
  }
}

export default Home
