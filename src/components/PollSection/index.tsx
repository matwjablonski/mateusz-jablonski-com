import { Section, Step, Text, Title } from './ui';

const PollSection = ({ children, title, description, isVisible, currentStep, steps }) => (
  <Section isVisible={isVisible}>
    <Step>KROK {currentStep} z {steps}</Step>
    <Title>{title}</Title>
    <Text>{description}</Text>
    <div>
      {children}
    </div>
  </Section>
);

export default PollSection;
