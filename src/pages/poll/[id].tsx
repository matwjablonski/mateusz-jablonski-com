import { useRouter } from 'next/router';
import Grid from '../../components/Grid';
import MainLayout from '../../layouts';
import { useCallback, useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { useTranslations } from '../../hooks/useTranslations';
import { formatDate } from '../../utils/formatDate';
import PollVerification from '../../components/PollVerification';
import Loader from '../../components/Loader';
import CaptchaProvider from '../../providers/CaptchaProvider';
import Poll from '../../components/Poll';

const PollPage = () => {
  const { query: { id, accessCode }, locale } = useRouter();
  const [ pollData, setPollData ] = useState<{ name: string, date: string, id: number }>();
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

  const verifiedComponent = (
    <Poll 
      date={formatDate({
        dateObject: pollData?.date,
        formatString: 'dd MMMM yyyy',
        locale: locale,
      })}
      name={pollData?.name}
    />  
  );

  return (
    <CaptchaProvider>
      <MainLayout head={{}} hideOverflow dark hideFunds hideSocialMedia>
        <Grid>
          { pollData ? (
            <>
              <PageTitle title={t.POLL.TITLE} description={
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
              {pollData && <PollVerification
                verifiedComponent={verifiedComponent}
                pollId={pollData.id}
                accessCode={accessCode}  
              />}
            </>
          ) : <Loader revert msg={t.POLL.LOADING} /> }
        </Grid>
      </MainLayout>
    </CaptchaProvider>
  )
};


export default PollPage;
