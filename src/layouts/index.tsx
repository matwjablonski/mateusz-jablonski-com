import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({children}) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
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
