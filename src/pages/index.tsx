import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GetServerSideProps, GetStaticProps} from "next";
import {fetchEntries} from '../contentful'
import PageTitle from '../components/Title';
import Grid from '../components/Grid';
import MainLayout from '../layouts/index'
import TitleBarWithCounter from '../components/TitleBarWithCounter';

interface HomeProps {
  articles: any[],
  test: string,
}

const Home = ({articles, test}: HomeProps) => {
  return (
      <MainLayout>
        <Grid>
          <section>
            <TitleBarWithCounter 
              title={<>Ostatnie <strong>artykuły</strong></>}
              nextItemName="artykuł"
              days={14}
            />
          </section>
          <section>
            <TitleBarWithCounter 
              title={<>Ostatnie <strong>podcasty</strong></>}
              nextItemName="podcast"
              days={1}
            />
          </section>
        </Grid>
      </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetchEntries({
    content_type: 'article'
  })

  const articles = await res.map(p => p.fields)

  return {
    props: {
      articles
    }
  }
}

export default Home
