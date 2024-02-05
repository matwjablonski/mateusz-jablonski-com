import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from './options';
import { Title, Wrapper } from './ui';
import { useTranslations } from '../../hooks/useTranslations';

const TrainingProgram = ({ content }) => {
  const { t } = useTranslations();

  return (
    <Wrapper>
      <Title>{t.WORKSHOPS.PROGRAM.TITLE}</Title>
      {documentToReactComponents(content, options)}
    </Wrapper>
  )
}

export default TrainingProgram;
