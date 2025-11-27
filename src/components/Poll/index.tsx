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
import { getPollSteps } from './questions';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import { useCallback, useState } from 'react';
import PollSection from '../PollSection';
import { Actions, PoorBox, WowBox } from './ui';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import PollSuccess from '../PollSuccess';
import { calculateAverage } from '../../utils/calculateAverage';
import { useTranslations } from '../../hooks/useTranslations';

const AVERAGE_FOR_WOW = 4.5;
const AVERAGE_FOR_POOR = 2.6;

const getSchema = (t) => yup.object({
  trainerKnowledge: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  trainerExperience: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  trainerCommunication: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  trainerEngagement: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  trainerQuestions: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  trainerOpenness: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  trainerCulture: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  workshopsContent: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  workshopsRealization: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  workshopsDuration: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  yourKnowledgeBefore: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  yourKnowledgeAfter: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  yourKnowledgeUsefulness: yup.string().required(t.POLL.ERRORS.SELECT_RATING),
  yourOpinionAboutWorkshops: yup.string().required(t.POLL.ERRORS.WRITE_OPINION),
  yourOpinionAboutMaterials: yup.string().required(t.POLL.ERRORS.WRITE_OPINION),
  newsletterEmail: yup.string().email(t.POLL.ERRORS.INVALID_EMAIL),
}).required();

const Poll = ({ date, name }) => {
  const { t } = useTranslations();
  const { register, handleSubmit, reset, watch, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(getSchema(t)),
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
      <PollSuccess message={t.POLL.SUCCESS_MESSAGE} />
    )
  }

  const averageComponent = (average) => {
    if (average >= AVERAGE_FOR_WOW) {
      return <WowBox>{t.POLL.AVERAGE_NOTES.WOW}</WowBox>
    }

    if (average <= AVERAGE_FOR_POOR) {
      return <PoorBox>{t.POLL.AVERAGE_NOTES.IAM_SORRY}</PoorBox>
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

  const pollSteps = getPollSteps(t);

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
                label={t.POLL.NEXT}
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
                label={t.POLL.SUBMIT}
                pattern={ButtonType.PRIMARY}
                type="submit"
                disabled={isSubmitting}
              />
            )}
            {currentStep >= 1 && (
              <Button.B 
                label={t.POLL.BACK}
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
