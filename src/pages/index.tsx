import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import {GetServerSideProps, GetStaticProps} from "next";
import {fetchEntries} from '../contentful'
import Grid from '../components/Grid';
import MainLayout from '../layouts/index'
import TitleBarWithComponent from '../components/TitleBarWithComponent';
import LastArticles from '../components/LastArticles';
import HomeNewsletter from '../components/HomeNewletter';
import { Podcast } from '../types/common/Podcast.types';
import { Article } from '../types/common/Article.types';
import LastPodcasts from '../components/LastPodcasts';
import { Book } from '../types/common/Book.types';
import PageTitle from '../components/Title';
import Counter from '../components/Counter'
import { TitleBarType } from '../components/TitleBarWithComponent/TitleBarWithComponent.types';
import Button from '../components/Button';
import { ButtonType } from '../components/Button/Button.types';
import LastBooks from '../components/LastBooks';
import Hero from '../components/Hero';
import { Asset } from 'contentful';

interface HomeData {
  title: string;
  description: string;
  welcomeImage: Asset;
  mainCtaText: string;
  mainCtaLink: string;
  secondCtaText: string;
  secondCtaLink: string;
  lastArticlesDescription: string;
  lastPodcastsDescription: string;
  lastBooksDescription: string;
}

interface HomeProps {
  podcasts: Podcast[],
  articles: Article[],
  books: Book[],
  data: HomeData;
}

const Home = ({articles, podcasts, books, data}: HomeProps) => {
  const { title, description, welcomeImage, lastArticlesDescription, lastPodcastsDescription, lastBooksDescription } = data; 

  return (
      <MainLayout head={{}}>
        <Grid>
          <Hero title={title} description={description} image={welcomeImage} />
          <section>
            <TitleBarWithComponent 
              title={<>Ostatnie <strong>artykuły</strong></>}
              text={lastArticlesDescription}
            >
              <Counter nextItemName="artykuł" days={14} />
            </TitleBarWithComponent>
            <LastArticles articles={articles} />
          </section>
          <section>
            <TitleBarWithComponent 
              title={<>Ostatnie <strong>podcasty</strong></>}
              text={lastPodcastsDescription}
            >
              <Counter nextItemName="podcast" days={1} />
            </TitleBarWithComponent>
            <LastPodcasts podcasts={podcasts} />
          </section>
        </Grid>
          <section className={styles.booksSection}>
            <Grid>
              <TitleBarWithComponent 
                title={<>Polecane <strong>książki</strong></>} 
                text={lastBooksDescription}
                type={TitleBarType.REVERT}
              >
                <Button.L label="Więcej książek" pattern={ButtonType.PRIMARY} href="/book" />
              </TitleBarWithComponent>
              <LastBooks books={books} />
            </Grid>
          </section>
        <Grid>
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

  const booksRes = await fetchEntries({
    content_type: 'book',
    include: 2,
    order: '-fields.createdDate',
    limit: 4,
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

  const books = await booksRes.map(p => ({
    ...p.fields,
    createdDate: format(new Date(p.fields?.createdDate) || new Date(), 'dd MMMM yyyy', { locale: pl }),
  }));

  return {
    props: {
      data: homeDetails,
      articles,
      podcasts,
      books,
    }
  }
}

export default Home
