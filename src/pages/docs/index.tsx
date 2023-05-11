import Breadcrumbs from '../../components/Breadcrumbs';
import Grid from '../../components/Grid';
import NotTranslated from '../../components/NotTranslated';
import PageTitle from '../../components/PageTitle';
import { useTranslations } from '../../hooks/useTranslations';
import MainLayout from '../../layouts';
import CaptchaProvider from '../../providers/CaptchaProvider';

const DocsPage = () => {
  const { t } = useTranslations();
  return (
    <CaptchaProvider>
      <MainLayout head={{}}>
        <Grid>
          <Breadcrumbs />
          <PageTitle title={t.DOCS.TITLE} description={t.DOCS.DESCRIPTION} />
        </Grid>
      </MainLayout>
    </CaptchaProvider>
  )
}

export default DocsPage;
