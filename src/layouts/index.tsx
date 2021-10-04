import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HeadInterface } from '../types/common/Head.types';

const mainTitle = "Mateusz Jabłoński - blog, podcast, programowanie, rozwój";
const mainDescription = "Blog, podcast oraz kursy o programowaniu i rozwoju. Oferuję darmową wiedzę oraz wsparcie w nauce programowania.";

const MainLayout: FunctionComponent<{ head: HeadInterface }> = ({children, head}) => {
  return (
    <>
      <Head>
        <title>{head?.title ? `${head.title} :: ${mainTitle}` : mainTitle}</title>
        <meta name="description" content={head?.description ? head.description : mainDescription} />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>

  );
}

export default MainLayout
