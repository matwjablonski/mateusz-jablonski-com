import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import Grid from '../../components/Grid';
import NotTranslated from '../../components/NotTranslated';
import PageTitle from '../../components/PageTitle';
import { fetchEntries } from '../../contentful';
import MainLayout from '../../layouts';
import { mapLocale } from '../../lib/locales';
import CaptchaProvider from '../../providers/CaptchaProvider';
import { Page } from '../../types/common/Page.types';
import Content from '../../components/Content';
import styles from '../../styles/Docs.module.scss';
import DocPageSeparator from '../../components/DocPageSeparator';

type DocPage = {
  body: Page;
}

const DocPage: FC<DocPage> = ({ body }) => {
  const {
    isTranslationReady,
    title,
    description,
    slug,
    head,
    content,
  } = body;

  return (
    <CaptchaProvider>
      <MainLayout head={head ? head.fields : {}}>
        <Grid>
          <Breadcrumbs pageTitle={title} />
          {!isTranslationReady && <NotTranslated />}
          <PageTitle title={title} description={description} />
          <DocPageSeparator />
          <div className={styles.doc}>
            <Content content={content} disableSummary />
          </div>
        </Grid>
      </MainLayout>
    </CaptchaProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const { slug } = context.params;

  const res = await fetchEntries({
    content_type: 'page',
    'fields.slug': slug,
    include: 2,
    locale: mapLocale(context.locale),
    select: 'fields.slug,fields.isTranslationReady,fields.title,fields.description,fields.content'
  });

  const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

  return {
    props: {
      body
    }
  }

}

export default DocPage;
