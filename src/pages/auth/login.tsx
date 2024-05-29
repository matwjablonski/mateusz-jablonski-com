import { AuthWrapper } from '../../components/AuthWrapper';
import Grid from "../../components/Grid";
import MainLayout from "../../layouts";

const LoginPage = () => {

  return (
    <MainLayout head={{}} hideOverflow dark hideFunds hideSocialMedia>
      <Grid>
        <AuthWrapper>
          <div>Logowanie chwilowo wyłączone</div>
        </AuthWrapper>
      </Grid>
    </MainLayout>
  )
}

export default LoginPage;
