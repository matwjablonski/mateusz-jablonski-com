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
import { useTranslations } from '../../hooks/useTranslations';

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
  const { t } = useTranslations();

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
                      console.log(res.message);
                      setError('accessPassword', {
                        message: res.message,
                      }, { shouldFocus: true });
                      setIsSubmitting(false);
                    }

                    if (res.status === 'success') {
                      if (shouldResetForm) {
                        reset();
                      }
                      setIsUserVerified(true);
                      setIsSubmitting(false);
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    setIsSubmitting(false);
                  })
            });
  }, [executeRecaptcha, pollId, reset, setError]);

  if (isSubmitting) {
    return <Loader revert msg={t.POLL.PASSWORD_VERIFICATION} />
  }

  if (verifiedComponent && isUserVerified) {
    return verifiedComponent;
  }

  return <Wrapper>
    <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
      <PollQuestion question={t.POLL.PASSWORD_QUESTION}>
        <InputWrapper error={!!errors['accessPassword']} icon={InputPlaceholderTypes.PASSWORD}>
          <input
            {...register('accessPassword')}
            type="text"
            placeholder={t.POLL.PASSWORD}
            disabled={isSubmitting}
          />
          <MessageWrapper messageType={MessageType.ERROR}>
            <ErrorMessage errors={errors} name={'accessPassword'} />
          </MessageWrapper>
        </InputWrapper>
      </PollQuestion>
      <Button.B pattern={ButtonType.PRIMARY} label={t.POLL.NEXT} disabled={isSubmitting} />
    </form>
  </Wrapper>
};

export default PollVerification;
