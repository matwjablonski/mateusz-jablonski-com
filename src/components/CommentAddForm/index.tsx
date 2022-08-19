import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import InputWrapper from '../InputWrapper';
import MessageWrapper, { MessageType } from '../MessageWrapper';
import { ErrorMessage } from '@hookform/error-message';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import styles from './CommentAddForm.module.scss' 

interface CommentAddFormProps {
    postId: string;
    onClose: () => void;
}

const schema = yup.object({
    author: yup.string().required('Imię / Nick jest wymagane.'),
    email: yup.string().email('Podany email nie jest prawidłowy.').required('Adres email jest wymagany.'),
    message: yup.string().required('Treść komentarza jest wymagana.').min(15, "Twój komentarz jest za krótki.")
});

const TIME_TO_CLOSE_MODAL = 5;
const TIME_TO_CLOSE_MODAL_MS = TIME_TO_CLOSE_MODAL * 1000;

const CommentAddForm = ({ postId, onClose }: CommentAddFormProps) => {
    const { register, handleSubmit, reset, formState: { errors }, getValues, watch } = useForm({
        resolver: yupResolver(schema),
    });
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeToClose, setTimeToClose] = useState(TIME_TO_CLOSE_MODAL);

    const onSubmit = useCallback((data) => {
        setIsSubmitting(true);

        if (!executeRecaptcha) {
            return;
        }
 
        executeRecaptcha("enquiryFormSubmit")
            .then(() => {
                fetch('/api/comments/add', { method: 'POST', body: JSON.stringify({ id: postId, ...data })})
                    .finally(() => {
                        setIsSubmitted(true);
                        reset();

                        setInterval(() => {
                            setTimeToClose((prev) => prev - 1);
                        }, 1000);

                        setTimeout(() => {
                            onClose();
                        }, TIME_TO_CLOSE_MODAL_MS);
                    })
            });
    }, [executeRecaptcha])

    return <div className={styles.commentAddForm}>
            {!isSubmitted ? (
            <>
                <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
                    <h2 className={styles.title}>Dodaj komentarz</h2>
                    <InputWrapper label="Nick" error={!!errors['author']}>
                        <input
                            {...register('author')}
                            type="text"
                            placeholder="Podaj swoje imię / nick"
                        />
                        <MessageWrapper messageType={MessageType.ERROR}>
                            <ErrorMessage errors={errors} name={'author'} />
                        </MessageWrapper>
                    </InputWrapper>
                    <InputWrapper label="Email" error={!!errors['email']}>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Podaj swój email"
                        />
                        <MessageWrapper messageType={MessageType.ERROR}>
                            <ErrorMessage errors={errors} name={'email'} />
                        </MessageWrapper>
                    </InputWrapper>
                    <InputWrapper label="Treść" error={!!errors['message']}>
                        <textarea
                            {...register('message')}
                            placeholder="Wpisz swój komentarz"
                        ></textarea>
                        <MessageWrapper messageType={MessageType.ERROR}>
                            <ErrorMessage errors={errors} name={'message'} />
                        </MessageWrapper>
                    </InputWrapper>
                    <Button.B type="submit" label="Wyślij" pattern={ButtonType.PRIMARY} disabled={isSubmitting}/>
                </form>
            </>
        ) : (
            <div className={styles.successContent}>
                <span className={styles.successIcon}>📨</span>
                <h2 className={styles.successTitle}>Twój komentarz został wysłany.</h2>
                <p className={styles.successText}>Udało się! Twój komentarz został zapisany i oczekuje akceptacji. Spam oraz obraźliwe komentarze będą usuwane. Okno zamknie się za {timeToClose} sekund.</p>
                <Button.B label="Wróć do wątku" pattern={ButtonType.PRIMARY} action={onClose}/>
            </div>
        )}
    </div>
}

export default CommentAddForm;