import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from './options';
import { Title } from './ui';
import { useTranslations } from '../../hooks/useTranslations';

const TrainingProgram = ({ content }) => {
  const { t } = useTranslations();

  return (
    <section>
      <Title>{t.WORKSHOPS.PROGRAM.TITLE}</Title>
      {documentToReactComponents(content, options)}
    </section>
  )
}

export default TrainingProgram;
