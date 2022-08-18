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

const CommentAddForm = ({ postId, onClose }: CommentAddFormProps) => {
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
            .then(() => {
                fetch('/api/comments/add', { method: 'POST', body: JSON.stringify({ id: postId, ...data })})
                    .finally(() => {
                        setIsSubmitted(true);
                        reset();

                        setTimeout(() => {
                            onClose();
                        }, 1500);
                    })
            });
    }, [executeRecaptcha])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate className={styles.commentAddForm}>
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
                <Button.B type="submit" label="Napisz komentarz" pattern={ButtonType.PRIMARY} disabled={isSubmitting}/>
                {
                    isSubmitted && (
                        <div className={styles.successAdded}>
                            <MessageWrapper messageType={MessageType.SUCCESS}>
                                Udało się! Twój komentarz został zapisany i oczekuje akceptacji. Formularz za chwilę się zamknie.
                            </MessageWrapper>
                        </div>
                    )
                }
            </form>
        </>
    )

}

export default CommentAddForm;