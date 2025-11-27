import { useTranslations } from '../../hooks/useTranslations';
import { RefCode, Text, Title, Wrapper } from './ui';

const PollSuccess = ({ message }) => {
  const { t } = useTranslations();
  return (
    <Wrapper>
      <Title>{message}</Title>
      <Text>{t.POLL.THANKS.TEXT_1}</Text>
      <Text>{t.POLL.THANKS.TEXT_2}</Text>
      <RefCode>NXU0KB3UMN</RefCode>
    </Wrapper>
  )
}

export default PollSuccess;
