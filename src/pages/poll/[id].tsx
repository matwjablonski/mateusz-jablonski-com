import { useRouter } from 'next/router';
import Grid from '../../components/Grid';
import MainLayout from '../../layouts';
import { useCallback, useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { useTranslations } from '../../hooks/useTranslations';
import { formatDate } from '../../utils/formatDate';

const PollPage = () => {
  const { query: { id }, locale} = useRouter();
  const [ pollData, setPollData ] = useState<{ name: string, date: string }>();
  const { t, translate } = useTranslations();

  const fetchDataForPoll = useCallback(async () => {
    const response = await fetch(`/api/poll/check?id=${id}`);
    const { data } = await response.json();
   
    setPollData(data);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDataForPoll();
    }
  }, [id, fetchDataForPoll]);

  return (
    <MainLayout head={{}} hideOverflow dark hideFunds hideSocialMedia>
      <Grid>
        { pollData ? (
          <>
            <PageTitle title="Ankieta" description={
              translate({
                value: t.POLL.DESCRIPTION,
                variables: [
                  pollData?.name,
                  formatDate({
                    dateObject: pollData?.date,
                    formatString: 'dd MMMM yyyy',
                    locale: locale,
                  }),
                ],
              })
            } dark />
          </>
        ) : null }
      </Grid>
    </MainLayout>
  )
};


export default PollPage;
