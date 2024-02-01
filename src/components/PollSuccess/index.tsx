import { RefCode, Text, Title, Wrapper } from './ui';

const PollSuccess = ({ message }) => (
  <Wrapper>
    <Title>{message}</Title>
    <Text>Dziękuję za Twój czas i szczere odpowiedzi. W ramach podziękowania chciałbym przekazać Ci kod uprawniający do 20% zniżki na zakup Twojej pierwszej przestrzeni hostingowej w mydevil.net</Text>
    <Text>Podaj poniższy kod polecającego podczas zakładania konta w mydevil.net i ciesz się tańszą usługą hostingową.</Text>
    <RefCode>NXU0KB3UMN</RefCode>
  </Wrapper>
)

export default PollSuccess;
