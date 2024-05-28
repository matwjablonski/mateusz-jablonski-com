import styles from '../styles/Home.module.scss'
import { differenceInDays } from 'date-fns';
import { GetServerSideProps } from "next";
import { fetchEntries } from '../contentful'
import Grid from '../components/Grid';
import MainLayout from '../layouts/index'
import TitleBarWithComponent from '../components/TitleBarWithComponent';
import LastArticles from '../components/LastArticles';
import HomeNewsletter from '../components/Newsletter/HomeNewsletter';
import { Podcast, PodcastEpisode } from '../types/common/Podcast.types';
import { Article } from '../types/common/Article.types';
import LastPodcasts from '../components/LastPodcasts';
import { Book } from '../types/common/Book.types';
import Counter from '../components/Counter'
import { TitleBarType } from '../components/TitleBarWithComponent/TitleBarWithComponent.types';
import Button from '../components/Button';
import { ButtonType } from '../components/Button/Button.types';
import LastBooks from '../components/LastBooks';
import Hero from '../components/Hero';
import { Asset, EntrySkeletonType, Entry } from 'contentful';
import NextCourseCounter from '../components/NextCourseCounter';
import { Course } from '../types/common/Course.types';
import ListenNow from '../components/ListenNow';
import FeaturedCourses from '../components/FeaturedCourses';
import { HeadInterface } from '../types/common/Head.types';
import { formatDate } from '../utils/formatDate';
import { mapLocale } from '../lib/locales';
import { useTranslations } from '../hooks/useTranslations';
import externalSources from '../data/external-sources.json';
import LastEvents from '../components/LastEvents';
import { Event } from '../types/common/Event.types';

const { podcasts: { piwnicait } } = externalSources;

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
  lastCoursesDescription: string;
  lastEventsDescription: string;
  featuredCourses: Entry<EntrySkeletonType<Course>>[];
  lastBooksDescription: string;
  head?: Entry<EntrySkeletonType<HeadInterface>>;
}

interface HomeProps {
  podcasts: PodcastEpisode[];
  articles: Article[];
  events: Event[];
  nextArticleInDays: number;
  nextPodcastInDays: number;
  nextEventInDays: number;
  books: Book[];
  nextCourse: Course;
  data: HomeData;
}

const Home = ({articles, nextArticleInDays, podcasts, nextPodcastInDays, books, nextCourse, data, events, nextEventInDays}: HomeProps) => {
  const {
    title,
    description,
    welcomeImage,
    lastArticlesDescription,
    lastPodcastsDescription,
    lastCoursesDescription,
    lastEventsDescription,
    featuredCourses,
    lastBooksDescription,
    head,
  } = data;

  const { t, translate } = useTranslations();

  return (
    <MainLayout head={head ? (head.fields as HeadInterface) : {}} hideOverflow>
      <Grid>
        <Hero title={title} description={description} image={welcomeImage} />
        <section>
          <TitleBarWithComponent 
            title={<>{translate({ value: t.HOME.LAST_ARTICLES, tagName: 'strong'})}</>}
            text={lastArticlesDescription}
          >
            <Counter nextItemName={t.HOME.NEXT_ARTICLE} days={nextArticleInDays} />
          </TitleBarWithComponent>
          <LastArticles articles={articles} />
        </section>
        <section>
          <TitleBarWithComponent 
            title={<>{translate({ value: t.HOME.LAST_EVENTS, tagName: 'strong'})}</>}
            text={lastEventsDescription}
          >
            <Counter nextItemName={t.HOME.NEXT_EVENT} days={nextEventInDays} plural />
          </TitleBarWithComponent>
          <LastEvents events={events} />
        </section>
        <section className={styles.podcastSection}>
          <TitleBarWithComponent 
            title={<>{translate({ value: t.HOME.LAST_PODCASTS, tagName: 'strong'})}</>}
            text={lastPodcastsDescription}
          >
            <Counter nextItemName={t.HOME.NEXT_PODCAST} days={nextPodcastInDays} />
          </TitleBarWithComponent>
          <LastPodcasts podcasts={podcasts} />
          <ListenNow className={styles.listenNow} podcastName="Piwnica IT" links={piwnicait} />
        </section>
      </Grid>
        <section className={styles.coursesSection}>
          <Grid>
          <TitleBarWithComponent 
              title={<>{t.HOME.LAST_WORKSHOPS} <br/><strong>{t.HOME.LAST_WORKSHOPS_STRONG}</strong></>} 
              text={lastCoursesDescription}
              type={TitleBarType.REVERT}
            >
              {nextCourse && <NextCourseCounter title={nextCourse.title} startDate={nextCourse.startDate} endDate={nextCourse.publishDate} />}
            </TitleBarWithComponent>
            <FeaturedCourses featuredCourses={featuredCourses} />
          </Grid>
        </section>
        <section className={styles.booksSection}>
          <Grid>
            <TitleBarWithComponent 
              title={<>{translate({ value: t.HOME.RECOMMENDED_BOOKS, tagName: 'strong'})}</>}
              text={lastBooksDescription}
              type={TitleBarType.REVERT}
            >
              <Button.L label={t.HOME.MORE_BOOKS} pattern={ButtonType.PRIMARY} href="/book" />
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const homeRes = await fetchEntries({
    content_type: 'home',
    locale: mapLocale(locale),
  });

  const artilesRes = await fetchEntries({
    content_type: 'article',
    include: 2,
    limit: 5,
    order: '-fields.createdDate',
    'fields.createdDate[lte]': formatDate({
      dateObject: new Date(),
      formatString: 'yyyy-MM-dd HH:mm:ss'
    }),
    locale: mapLocale(locale),
    select: 'fields.slug,fields.title,fields.excerpt,fields.createdDate,fields.featuredImage,fields.externalSource',
  });

  const nextArticlesRes = await fetchEntries({
    content_type: 'article',
    include: 2,
    order: 'fields.createdDate',
    'fields.createdDate[gt]': formatDate({
      dateObject: new Date(),
      formatString: 'yyyy-MM-dd HH:mm:ss'
    }),
    locale: mapLocale(locale),
    select: 'fields.createdDate',
  });

  const eventsRes = await fetchEntries({
    content_type: 'event',
    include: 2,
    order: '-fields.eventDate',
    limit: 6,
    locale: mapLocale(locale),
    select: 'fields.eventDate,fields.slug,fields.title,fields.typeOfEvent,fields.place'
  });

  const podcastsRes = await fetchEntries({
    content_type: 'podcast',
    include: 2,
    order: '-fields.createdDate',
    limit: 4,
    'fields.createdDate[lte]': formatDate({
      dateObject: new Date(),
      formatString: 'yyyy-MM-dd HH:mm:ss'
    }),
    locale: mapLocale(locale),
    select: 'fields.createdDate,fields.slug,fields.title,fields.featuredImage,fields.episode,fields.excerpt,fields.podcast'
  });

  const nextPodcastsRes = await fetchEntries({
    content_type: 'podcast',
    include: 2,
    order: 'fields.createdDate',
    'fields.createdDate[gt]': formatDate({
      dateObject: new Date(),
      formatString: 'yyyy-MM-dd HH:mm:ss'
    }),
    locale: mapLocale(locale),
    select: 'fields.createdDate',
  });

  const booksRes = await fetchEntries({
    content_type: 'book',
    include: 2,
    order: '-fields.createdDate',
    'fields.rate[exists]': true,
    limit: 4,
    locale: mapLocale(locale),
    select: 'fields.title,fields.slug,fields.cover,fields.author,fields.review,fields.rate'
  });

  const nextCourseRes = await fetchEntries({
    content_type: 'course',
    include: 2,
    order: 'fields.publishDate',
    'fields.publishDate[gt]': formatDate({
      dateObject: new Date(),
      formatString: 'yyyy-MM-dd HH:mm:ss'
    }),
    limit: 1,
    locale: mapLocale(locale),
    select: 'fields.title,fields.startDate,fields.publishDate',
  });

  const homeDetails = await homeRes.data.map(p => p.fields).shift();

  const articles = await artilesRes.data.map(p => ({
    ...p.fields,
    createdDate: formatDate({
      dateObject: p.fields?.createdDate,
      formatString: 'dd MMMM yyyy',
      locale,
    }),
  }));

  const nextArticle = await nextArticlesRes.data.shift();

  const nextArticleInDays = nextArticle ? differenceInDays(new Date(nextArticle.fields.createdDate) , new Date()) + 1 : null;

  const nextEvents = await eventsRes.data.filter(events => new Date(events.fields.eventDate) > new Date());

  const closestEvent = nextEvents.length ? nextEvents.reduce((a, b) => (a.fields.eventDate < b.fields.eventDate ? a : b)) : null;
  
  const nextEventInDays = closestEvent ? differenceInDays(new Date(closestEvent.fields.eventDate) , new Date()) : null;

  const podcasts = await podcastsRes.data.map(p => ({
    ...p.fields,
    podcast: p.fields.podcast.fields,
    createdDate: formatDate({
      dateObject: p.fields?.createdDate,
      formatString: 'dd MMMM yyyy',
      locale,
    }),
  }));

  const events = await eventsRes.data.map(p => ({
    ...p.fields,
    rawEventDate: p.fields?.eventDate,
    eventDate: formatDate({
      dateObject: p.fields?.eventDate,
      formatString: 'dd MMMM yyyy',
      locale,
    }),
  }));

  const nextPodcast = await nextPodcastsRes.data.shift();

  const nextPodcastInDays = nextPodcast ? differenceInDays(new Date(nextPodcast.fields.createdDate) , new Date()) + 1 : null;

  const nextCourse = await nextCourseRes.data.length ? nextCourseRes.data.map(p => ({
    title: p.fields.title,
    startDate: new Date(p.fields?.startDate).getTime() || new Date().getTime(),
    publishDate: new Date(p.fields?.publishDate).getTime() || new Date().getTime(),
  })).shift() : null;

  const books = await booksRes.data.map(p => ({
    title: p.fields.title,
    slug: p.fields.slug,
    cover: p.fields.cover,
    author: p.fields.author,
    rate: p.fields.rate,
    hasReview: !!p.fields.review,
    createdDate: formatDate({
      dateObject: p.fields?.createdDate,
      formatString: 'dd MMMM yyyy',
      locale,
    }),
  }));

  return {
    props: {
      data: homeDetails,
      articles,
      nextArticleInDays,
      podcasts,
      events,
      nextEventInDays,
      nextPodcastInDays,
      nextCourse,
      books,
    }
  }
}

export default Home
