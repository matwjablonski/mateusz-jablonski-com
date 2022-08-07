import { useForm } from 'react-hook-form';
import InputWrapper from '../InputWrapper';
import { ErrorMessage } from '@hookform/error-message';
import MessageWrapper, { MessageType } from '../MessageWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../Button';
import * as yup from 'yup';
import { ButtonType } from '../Button/Button.types';
import RadioButton from '../RadioButton';
import RadioButtonsGroup from '../RadioButtonsGroup';
import styles from './ContactForm.module.scss';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback, useState } from 'react';

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    topic: yup.string().required(),
    prefferedForm: yup.string().required(),
}).required();

const possibleTopics = [
    {
        value: 'course',
        label: 'Kurs',
    },
    {
        value: 'training',
        label: 'Szkolenie',
    },
    {
        value: 'project',
        label: 'Zapytanie o projekt',
    },
    {
        value: 'job',
        label: 'Oferta pracy',
    },
];

const prefferedForms = [
    {
        value: 'phone',
        label: 'Telefon',
    },
    {
        value: 'email',
        label: 'Email',
    },
];

const ContactForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = useCallback((data) => {
        setIsSubmitting(true);

        if (!executeRecaptcha) {
            return;
        }

        executeRecaptcha("enquiryFormSubmit")
            .then((gReCaptchaToken) => {
                fetch('/api/email/send', { method: 'POST', body: JSON.stringify({ ...data, gReCaptchaToken }) })
                    .finally(() => {
                        setIsSubmitting(false);
                    })
            });
    }, [executeRecaptcha])

    return (
        <div className={styles.contactForm}>
            <h2 className={styles.formTitle}>Formularz kontaktowy</h2>
            <p className={styles.formText}>Dla twojej wygody formularz skrócony jest do jak najmniejszej liczby punktów, tak abym jak najszybciej i jak najsprawniej skontaktował się z Tobą.</p>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
                <InputWrapper label="Wybierz temat:">
                    <RadioButtonsGroup>
                        {possibleTopics.map(({ value, label }) => (
                            <RadioButton
                                register={register}
                                name="topic"
                                key={value}
                                value={value}
                                label={label}
                            />
                        ))}
                    </RadioButtonsGroup>
                    <MessageWrapper messageType={MessageType.ERROR}>
                        <ErrorMessage errors={errors} name={'topic'} />
                    </MessageWrapper>
                </InputWrapper>
                <InputWrapper label="Imię:">
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Podaj swoje imię"
                    />
                    <MessageWrapper messageType={MessageType.ERROR}>
                        <ErrorMessage errors={errors} name={'name'} />
                    </MessageWrapper>
                </InputWrapper>
                <InputWrapper label="Adres e-mail:">
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Podaj adres e-mail" 
                    />
                    <MessageWrapper messageType={MessageType.ERROR}>
                        <ErrorMessage errors={errors} name={'email'} />
                    </MessageWrapper>
                </InputWrapper>
                <InputWrapper label="Preferowany kontakt:">
                    <RadioButtonsGroup>
                        {prefferedForms.map(({ value, label }) => (
                            <RadioButton 
                                value={value}
                                key={value}
                                name="prefferedForm"
                                register={register}
                                label={label}
                            />
                        ))}
                    </RadioButtonsGroup>
                    <MessageWrapper messageType={MessageType.ERROR}>
                        <ErrorMessage errors={errors} name={'prefferedForm'} />
                    </MessageWrapper>
                </InputWrapper>
                <Button.B type="submit" label="Napisz do mnie" pattern={ButtonType.PRIMARY} disabled={isSubmitting}/>
            </form>
        </div>
    )
}

export default ContactForm;
