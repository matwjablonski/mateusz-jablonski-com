import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { fetchEntries } from '../../contentful'
import { formatDate } from '../../utils/formatDate'
import { ParsedUrlQuery } from 'querystring'
import MainLayout from '../../layouts'
import Grid from '../../components/Grid'
import PageTitle from '../../components/PageTitle'
import { Certificate } from '../../components/Certificate'

const CertificatePage = ({ body }) => {

  return (
    <MainLayout head={{}} hideOverflow dark hideFunds hideSocialMedia>
      <Grid>
        <Certificate
          name={body?.name}
          description={body?.description}
          workshopsTitle={body?.workshops?.title}
          workshopsSlug={body?.workshops?.slug}
          dateOfWorkshops={body?.dateOfWorkshops}
          id={body?.id}
        />
      </Grid>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const { id } = context.params

const res = await fetchEntries({
  content_type: 'certificate',
  'fields.id': id,
  include: 2,
})

const body = await res.data
  .map(p => ({ 
    ...p.fields,
    dateOfWorkshops: formatDate({
      dateObject: p.fields.dateOfWorkshops,
      formatString: 'dd.MM.yyyy',
      locale: context.locale,
    }),
    workshops: {
      title: p.fields.workshops.fields.title,
      slug: p.fields.workshops.fields.slug,
    }
  }))
  .shift();

  return {
      props: {
        body,
      }
    };
}

// id //c1712cb8-62e4-4bde-ac3a-c5e02088a114

export default CertificatePage;
