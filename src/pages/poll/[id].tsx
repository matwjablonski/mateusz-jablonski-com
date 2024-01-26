import { useRouter } from 'next/router';
import Grid from '../../components/Grid';
import MainLayout from '../../layouts';
import { useEffect } from 'react';

const PollPage = () => {

  const { query: { id } } = useRouter();

  useEffect(() => {
    fetch(`/api/poll/check?id=${id}`);
  }, []);

  return (
    <MainLayout head={{}} hideOverflow dark hideFunds hideSocialMedia>
      <Grid>
        poll
      </Grid>
    </MainLayout>
  )
};


export default PollPage;
