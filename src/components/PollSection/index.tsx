import { useTranslations } from '../../hooks/useTranslations';
import { Section, Step, Text, Title } from './ui';

const PollSection = ({ children, title, description, isVisible, currentStep, steps }) => {
  const { translate, t } = useTranslations();

  return (
    <Section isVisible={isVisible}>
      <Step>{translate({ value: t.POLL.STEP, variables: [currentStep, steps]})}</Step>
      <Title>{title}</Title>
      <Text>{description}</Text>
      <div>
        {children}
      </div>
    </Section>
  );
};

export default PollSection;
