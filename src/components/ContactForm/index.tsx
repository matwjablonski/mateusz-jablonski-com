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
import { InputPlaceholderTypes } from '../InputWrapper/InputWrapper.types';
import ButtonBox from '../ButtonBox';
import IconMail from '../../public/icons/mail-closed.svg';
import CourseIcon from '../../public/icons/course.svg';
import TrainingIcon from '../../public/icons/training.svg';
import CodeIcon from '../../public/icons/code.svg';
import PhoneIcon from '../../public/icons/phone-option.svg';
import MailIcon from '../../public/icons/mail-option.svg';

const schema = yup.object({
    name: yup.string().required('Imię jest wymagane.'),
    email: yup.string().email('Podany email nie jest prawidłowy.').required('Adres email jest wymagany.'),
    topic: yup.string().required('Wybór tematu jest wymagany.').nullable(),
    prefferedForm: yup.string().required('Wybierz preferowaną formę kontaktu.').nullable(),
    phone: yup.string().notRequired().when('prefferedForm', {
        is: 'phone',
        then: yup.string()
            .required('Podanie numeru telefonu jest wymagane.')
            .matches(/[\+\(\)\ 0-9]{9,19}/, 'Numer telefonu powinien zawierać tylko liczby lub znaki: + ( ) oraz spację.'),
    }).nullable(),
}).required();

const possibleTopics = [
    {
        value: 'course',
        label: 'Kurs',
        icon: CourseIcon,
        iconWidth: 24,
    },
    {
        value: 'training',
        label: 'Szkolenie',
        icon: TrainingIcon,
        iconWidth: 24,
    },
    {
        value: 'project',
        label: 'Zapytanie o projekt',
        icon: CodeIcon,
        iconWidth: 24,
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
        icon: PhoneIcon,
        iconWidth: 24,
    },
    {
        value: 'email',
        label: 'Email',
        icon: MailIcon,
        iconWidth: 24,
    },
];

const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors }, getValues, watch } = useForm({
        resolver: yupResolver(schema),
    });
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = useCallback((data) => {
        setIsSubmitting(true);

        if (!executeRecaptcha) {
            return;
        }

        executeRecaptcha("enquiryFormSubmit")
            .then((gReCaptchaToken) => {
                fetch('/api/email/send', { method: 'POST', body: JSON.stringify({ ...data, gReCaptchaToken }) })
                    .finally(() => {
                        reset();
                        setIsSubmitting(false);
                        setIsSubmitted(true);
                    })
            });
    }, [executeRecaptcha]);

    return (
        <div className={styles.contactForm}>
            {
                !isSubmitted ? (
                    <>
                        <h2 className={styles.formTitle}>Formularz kontaktowy</h2>
                        <p className={styles.formText}>Dla twojej wygody formularz skrócony jest do jak najmniejszej liczby punktów, tak abym jak najszybciej i jak najsprawniej skontaktował się z Tobą.</p>
                        <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
                            <InputWrapper label="Wybierz temat:" error={!!errors['topic']}>
                                <RadioButtonsGroup>
                                    {possibleTopics.map(({ value, label, icon, iconWidth }) => (
                                        <RadioButton
                                            register={register}
                                            name="topic"
                                            key={value}
                                            value={value}
                                            label={label}
                                            icon={icon}
                                            iconWidth={iconWidth}
                                        />
                                    ))}
                                </RadioButtonsGroup>
                                <MessageWrapper messageType={MessageType.ERROR}>
                                    <ErrorMessage errors={errors} name={'topic'} />
                                </MessageWrapper>
                            </InputWrapper>
                            <InputWrapper label="Imię:" error={!!errors['name']} icon={InputPlaceholderTypes.USER}>
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="Podaj swoje imię"
                                />
                                <MessageWrapper messageType={MessageType.ERROR}>
                                    <ErrorMessage errors={errors} name={'name'} />
                                </MessageWrapper>
                            </InputWrapper>
                            <InputWrapper label="Adres e-mail:" error={!!errors['email']} icon={InputPlaceholderTypes.NEWSLETTER}>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Podaj adres e-mail"
                                />
                                <MessageWrapper messageType={MessageType.ERROR}>
                                    <ErrorMessage errors={errors} name={'email'} />
                                </MessageWrapper>
                            </InputWrapper>
                            <InputWrapper label="Preferowany kontakt:" error={!!errors['prefferedForm']}>
                                <RadioButtonsGroup>
                                    {prefferedForms.map(({ value, label, icon, iconWidth }) => (
                                        <RadioButton 
                                            value={value}
                                            key={value}
                                            name="prefferedForm"
                                            register={register}
                                            label={label}
                                            icon={icon}
                                            iconWidth={iconWidth}
                                        />
                                    ))}
                                </RadioButtonsGroup>
                                <MessageWrapper messageType={MessageType.ERROR}>
                                    <ErrorMessage errors={errors} name={'prefferedForm'} />
                                </MessageWrapper>
                            </InputWrapper>
                            {
                                watch('prefferedForm') === 'phone' && (
                                    <InputWrapper label="Numer telefonu:" error={!!errors['phone']} icon={InputPlaceholderTypes.PHONE}>
                                        <input
                                            {...register('phone')}
                                            type="string"
                                            placeholder="Podaj numer telefonu"
                                        />
                                        <MessageWrapper messageType={MessageType.ERROR}>
                                            <ErrorMessage errors={errors} name={'phone'} />
                                        </MessageWrapper>
                                    </InputWrapper>
                                )
                            }
                            <Button.B type="submit" label="Napisz do mnie" pattern={ButtonType.PRIMARY} disabled={isSubmitting}/>
                        </form>
                        <div className={styles.mailToSection}>
                            <h2>Chcesz przesłać więcej infomacji?</h2>
                            <p>Najszybciej odpowiadam na wiadomości wysłane za pomocą powyższego formularza. Czas oczekiwania na odpowiedź na zwykły mail może być delikatnie dłuższy. Ale obiecuję - nie będzie to zbyt długo. :)</p>
                            <ButtonBox
                                text="mail@mateuszjablonski.com"
                                icon={IconMail}
                                iconWidth={40}
                                iconHeight={28}
                            >
                                <Button.L label="Napisz do mnie" pattern={ButtonType.LIGTHENED} href="mailto:mail@mateuszjablonski.com" isExternal/>
                            </ButtonBox>
                        </div>
                    </>
                ) : (
                    <div className={styles.successContent}>
                        <h2 className={styles.successTitle}>Wiadomość została wysłana.</h2>
                        <p className={styles.successText}>Teraz Twoja wiadomość dociera do mnie na skrzynkę, gdy tylko otrzymam powiadomienie postaram się odpowiedzieć jak najszybciej. Ale dla pewności daj mi maksymalnie 24 godziny.</p>
                        <Button.L label="Super, zabierz mnie na stronę główną" pattern={ButtonType.PRIMARY} href="/"/>
                    </div>
                )
            }
        </div>
    )
}

export default ContactForm;
