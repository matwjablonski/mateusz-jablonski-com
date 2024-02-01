import * as yup from 'yup';
import PollQuestion from '../PollQuestion';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputWrapper from '../InputWrapper';
import { InputPlaceholderTypes } from '../InputWrapper/InputWrapper.types';
import MessageWrapper, { MessageType } from '../MessageWrapper';
import { ErrorMessage } from '@hookform/error-message';
import RadioButtonsGroup from '../RadioButtonsGroup';
import RadioButton from '../RadioButton';
import { pollSteps } from './questions';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import { useCallback, useState } from 'react';
import PollSection from '../PollSection';
import { Actions, PoorBox, WowBox } from './ui';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import PollSuccess from '../PollSuccess';
import { calculateAverage } from '../../utils/calculateAverage';

const AVERAGE_FOR_WOW = 4.5;
const AVERAGE_FOR_POOR = 2.6;

const schema = yup.object({
  trainerKnowledge: yup.string().required('Wybierz swoją ocenę.'),
  trainerExperience: yup.string().required('Wybierz swoją ocenę.'),
  trainerCommunication: yup.string().required('Wybierz swoją ocenę.'),
  trainerEngagement: yup.string().required('Wybierz swoją ocenę.'),
  trainerQuestions: yup.string().required('Wybierz swoją ocenę.'),
  trainerOpenness: yup.string().required('Wybierz swoją ocenę.'),
  trainerCulture: yup.string().required('Wybierz swoją ocenę.'),
  workshopsContent: yup.string().required('Wybierz swoją ocenę.'),
  workshopsRealization: yup.string().required('Wybierz swoją ocenę.'),
  workshopsDuration: yup.string().required('Wybierz swoją ocenę.'),
  yourKnowledgeBefore: yup.string().required('Wybierz swoją ocenę.'),
  yourKnowledgeAfter: yup.string().required('Wybierz swoją ocenę.'),
  yourKnowledgeUsefulness: yup.string().required('Wybierz swoją ocenę.'),
  yourOpinionAboutWorkshops: yup.string().required('Napisz swoją opinię.'),
  yourOpinionAboutMaterials: yup.string().required('Napisz swoją opinię.'),
  newsletterEmail: yup.string().email('Podany email nie jest prawidłowy.'),
}).required();

const Poll = ({ date, name }) => {
  const { register, handleSubmit, reset, watch, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(schema),
  });
  const [currentStep, setCurrentStep] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = (sectionIndex: number) => {
    setCurrentStep(sectionIndex + 1);
  }

  const isFirstStepCompleted = !watch('trainerExperience') ||
    !watch('trainerKnowledge') ||
    !watch('trainerCommunication') ||
    !watch('trainerEngagement') ||
    !watch('trainerQuestions') ||
    !watch('trainerOpenness') ||
    !watch('trainerCulture');

  const isSecondStepCompleted = !watch('workshopsContent') ||
    !watch('workshopsRealization') ||
    !watch('workshopsDuration');

  const isThirdStepCompleted = !watch('yourKnowledgeBefore') ||
    !watch('yourKnowledgeAfter') ||
    !watch('yourKnowledgeUsefulness');

  const isForthStepCompleted = !watch('yourOpinionAboutWorkshops') || !watch('yourOpinionAboutMaterials');

  const isNextDisabled = () => {
    if (currentStep === 0) {
      return isFirstStepCompleted;
    }
    if (currentStep === 1) {
      return isSecondStepCompleted;
    }
    if (currentStep === 2) {
      return isThirdStepCompleted;
    }
    if (currentStep === 3) {
      return isForthStepCompleted;
    }
  }

  const onSubmit = useCallback((data) => {
    setIsSubmitting(true);

    if (!executeRecaptcha) {
        return;
    }

    executeRecaptcha("enquiryFormSubmit")
      .then((gReCaptchaToken) => {
        fetch(
          '/api/poll/send',
          {
            method: 'POST',
            body: JSON.stringify({ ...data, name, date, gReCaptchaToken })
          }
        )
          .finally(() => {
              reset();
              setIsSubmitting(false);
              setIsSubmitted(true);
          });
      });
  }, [executeRecaptcha]);

  if (isSubmitted) {
    return (
      <PollSuccess message="Twoje odpowiedzi zostały zapisane." />
    )
  }

  const averageComponent = (average) => {
    if (average >= AVERAGE_FOR_WOW) {
      return <WowBox>Wow! Bardzo sie cieszę, że doceniasz moją pracę! Będę wdzięczny, jeśli w kroku czwartym napiszesz co podobało Ci się najbardziej, a co mógłbym jeszcze poprawić. 😉</WowBox>
    }

    if (average <= AVERAGE_FOR_POOR) {
      return <PoorBox>Przykro mi, że nie udało mi się spełnić Twoich oczekiwań. Będę wdzięczny, jeśli w kroku czwartym opiszesz elementy, które wymagają poprawy. Każde szkolenie to nowe doświadczenie. Każda opinia to szansa na rozwój. 😉</PoorBox>
    }
  }

  const averageLine = () => {
    if (currentStep === 0 && !isFirstStepCompleted) {
      const {
        trainerKnowledge,
        trainerExperience,
        trainerCommunication,
        trainerEngagement,
        trainerOpenness, 
        trainerQuestions,
        trainerCulture,
      } = getValues();

      const average = calculateAverage([
        +trainerKnowledge, +trainerExperience, +trainerCommunication, +trainerEngagement, +trainerQuestions, +trainerOpenness, +trainerCulture
      ]);
      
      return averageComponent(average);
    }

    if (currentStep === 1 && !isSecondStepCompleted) {
      const { workshopsContent, workshopsDuration, workshopsRealization } = getValues();

      const average = calculateAverage([
        +workshopsContent, +workshopsDuration, +workshopsRealization
      ]);

      return averageComponent(average);
    }

    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
      {pollSteps.map(({ id, questions, title, description, type }, sectionIndex) => (
        <PollSection 
          key={id}
          isVisible={sectionIndex === currentStep}
          title={title}
          description={description}
          steps={pollSteps.length}
          currentStep={currentStep + 1}
        >
          {questions.map(({ id, question, options }) => (
            <PollQuestion question={question} key={id} multiple showWow={watch(id) === '5'}>
              <InputWrapper error={!!errors[id]}>
                {type === 'options' && <RadioButtonsGroup>
                  {options.map(({ value, label, icon, iconWidth }) => (
                    <RadioButton
                      register={register}
                      name={id}
                      key={value}
                      value={value}
                      label={label}
                      icon={icon}
                      iconWidth={iconWidth}
                      dark
                    />
                  ))}
                </RadioButtonsGroup>}
                {type === 'textarea' && <textarea {...register(id)} placeholder={question} />}
                {type === 'newsletter' && <input {...register(id)} placeholder={question} type={InputPlaceholderTypes.EMAIL} />}
                <MessageWrapper messageType={MessageType.ERROR}>
                  <ErrorMessage errors={errors} name={id} />
                </MessageWrapper>
              </InputWrapper>
            </PollQuestion>
          ))}
          {averageLine()}
          <Actions>
            {pollSteps.length > currentStep + 1 && (
              <Button.B
                label="Dalej"
                pattern={ButtonType.PRIMARY}
                type="button"
                action={() => {
                  handleNextStep(sectionIndex);
                }}
                disabled={isNextDisabled()}
              />
            )}
            {currentStep === pollSteps.length - 1 && (
              <Button.B
                label="Wyślij"
                pattern={ButtonType.PRIMARY}
                type="submit"
                disabled={isSubmitting}
              />
            )}
            {currentStep >= 1 && (
              <Button.B 
                label="Wstecz"
                pattern={ButtonType.WHITE}
                type="button" 
                action={() => {
                  setCurrentStep(sectionIndex - 1);
                }} 
              />
            )}
          </Actions>
        </PollSection>
      ))}
    </form>
  );
}

export default Poll;
