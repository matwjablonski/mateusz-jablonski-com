import { Entry } from "contentful";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { HeadInterface } from "../../types/common/Head.types";
import { Podcast } from "../../types/common/Podcast.types";
import { ParsedUrlQuery } from "querystring";
import { formatDate } from "../../utils/formatDate";
import { fetchEntries } from "../../contentful";
import prepareFileUrl from "../../utils/prepareAssetUrl";
import dynamic from "next/dynamic";
import MainLayout from "../../layouts";
import Grid from "../../components/Grid";
import Breadcrumbs from "../../components/Breadcrumbs";

interface SinglePodcastPageProps {
    head?: Entry<HeadInterface>;
    body: Podcast,
}

const DynamicPlayer = dynamic(
  () => import('../../components/Player'),
  { ssr: false }
);

const SinglePodcastPage = ({ body, head }: SinglePodcastPageProps) => {

  console.log(body);

  return body ? (
    <MainLayout head={head ? head.fields : {}}>
      <Grid>
        <Breadcrumbs />
        <DynamicPlayer file={prepareFileUrl(body.file.fields.file.url)}/>
      </Grid>
    </MainLayout>
  ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const {slug} = context.params

  const res = await fetchEntries({
    content_type: 'podcast',
    'fields.slug': slug,
    include: 2,
  })

  const body = await res.data
    .map(p => ({ 
      ...p.fields,
      id: p.sys.id,
      createdDate: formatDate({
        dateObject: p.fields.createdDate,
        formatString: 'dd MMMM yyyy',
      })
    }))
    .shift();

    return {
        props: {
          body,
        }
      };
}

export default SinglePodcastPage;
