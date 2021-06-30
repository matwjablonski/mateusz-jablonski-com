import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GetServerSideProps, GetStaticProps} from "next";
import {fetchEntries} from '../contentful'

import MainLayout from '../layouts/index'

interface HomeProps {
  articles: any[],
  test: string,
}

const Home = ({articles, test}: HomeProps) => {
  return (
      <MainLayout>
        test
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
