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
import { useCallback } from 'react';

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

    const onSubmit = useCallback((data) => {
        console.log('handle sumit', data);
        console.log('executeRecaptcha', executeRecaptcha);
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        executeRecaptcha("enquiryFormSubmit")
            .then((gReCaptchaToken) => {
                console.log(gReCaptchaToken);
                fetch('/api/email/send', { method: 'POST', body: JSON.stringify({ ...data, gReCaptchaToken }) })
            });
    }, [executeRecaptcha])

    return (
        <div className={styles.contactForm}>
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
                <Button.B type="submit" label="Napisz do mnie" pattern={ButtonType.PRIMARY}/>
            </form>
        </div>
    )
}

export default ContactForm;
