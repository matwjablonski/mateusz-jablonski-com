import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputWrapper from '../InputWrapper';
import { InputPlaceholderTypes } from '../InputWrapper/InputWrapper.types';
import MessageWrapper, { MessageType } from '../MessageWrapper';
import { ErrorMessage } from '@hookform/error-message';
import { Wrapper } from './ui';
import PollQuestion from '../PollQuestion';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import Loader from '../Loader';

const schema = yup.object({
  accessPassword: yup.string().required('Podaj hasło dostępowe do ankiety.'),
}).required();

const PollVerification = ({ verifiedComponent, pollId, accessCode }) => {
  const [ isUserVerified, setIsUserVerified ] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (accessCode) {
      onSubmit({ accessPassword: accessCode }, true);
    }
  }, [accessCode]);

  const onSubmit = useCallback((data, shouldResetForm = false) => {
    setIsSubmitting(true);

    if (!executeRecaptcha) {
        return;
    }

    executeRecaptcha("enquiryFormSubmit")
            .then((gReCaptchaToken) => {
                fetch(
                  '/api/poll/verify',
                  { method: 'POST', body: JSON.stringify({ ...data, pollId: pollId.toString(), gReCaptchaToken }) }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.status === 'error') {
                      setError('accessPassword', {
                        message: res.message,
                      }, { shouldFocus: true });
                    }

                    if (res.status === 'success') {
                      setIsUserVerified(true);
                    }
                  })
                  .finally(() => {
                    if (shouldResetForm) {
                      reset();
                    }
                    setIsSubmitting(false);
                })
            });
  }, [executeRecaptcha]);

  if (isSubmitting) {
    return <Loader revert msg="Trwa weryfikacja hasła dostępowego" />
  }

  if (verifiedComponent && isUserVerified) {
    return verifiedComponent;
  }

  return <Wrapper>
    <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
      <PollQuestion question="Podaj hasło dostępowe do ankiety">
        <InputWrapper error={!!errors['accessPassword']} icon={InputPlaceholderTypes.PASSWORD}>
          <input
            {...register('accessPassword')}
            type="text"
            placeholder="Podaj hasło dostępowe"
            disabled={isSubmitting}
          />
          <MessageWrapper messageType={MessageType.ERROR}>
            <ErrorMessage errors={errors} name={'accessPassword'} />
          </MessageWrapper>
        </InputWrapper>
      </PollQuestion>
      <Button.B pattern={ButtonType.PRIMARY} label="Dalej" disabled={isSubmitting} />
    </form>
  </Wrapper>
};

export default PollVerification;
