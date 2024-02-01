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
import { Actions } from './ui';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import PollSuccess from '../PollSuccess';

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
  const { register, handleSubmit, reset, watch, formState: { errors, ...rest }, setError } = useForm({
    resolver: yupResolver(schema),
  });
  const [currentStep, setCurrentStep] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = (sectionIndex: number) => {
    setCurrentStep(sectionIndex + 1);
  }

  const isNextDisabled = () => {
    if (currentStep === 0) {
      if (
        !watch('trainerExperience') ||
        !watch('trainerKnowledge') ||
        !watch('trainerCommunication') ||
        !watch('trainerEngagement') ||
        !watch('trainerQuestions') ||
        !watch('trainerOpenness') ||
        !watch('trainerCulture')
      ) {
        return true;
      }
      return false;
    }
    if (currentStep === 1) {
      if (
        !watch('workshopsContent') ||
        !watch('workshopsRealization') ||
        !watch('workshopsDuration')
      ) {
        return true;
      }
      return false;
    }
    if (currentStep === 2) {
      if (
        !watch('yourKnowledgeBefore') ||
        !watch('yourKnowledgeAfter') ||
        !watch('yourKnowledgeUsefulness')
      ) {
        return true;
      }
      return false;
    }
    if (currentStep === 3) {
      if (
        !watch('yourOpinionAboutWorkshops') ||
        !watch('yourOpinionAboutMaterials')
      ) {
        return true;
      }
      return false;
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
