import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { fetchEntries } from '../../contentful'
import { formatDate } from '../../utils/formatDate'
import { ParsedUrlQuery } from 'querystring'

const CertificatePage = ({ body }) => {


  return (
    <div>Certificate dla {body.name}</div>
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
    nextWorkshops: formatDate({
      dateObject: p.fields.nextWorkshops,
      formatString: 'dd.MM.yyyy',
      locale: context.locale,
    })
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
