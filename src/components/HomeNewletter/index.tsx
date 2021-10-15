import React, { useState } from 'react';
import _ from 'lodash';
import styles from './HomeNewsletter.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import InputWrapper from '../InputWrapper';
import { ErrorMessage } from '@hookform/error-message';
import { HomeNewsletterFormInputs } from './HomeNewsletter.types';
import MessageWrapper, { MessageType } from '../MessageWrapper';
import { InputPlaceholderTypes } from '../InputWrapper/InputWrapper.types';

const HomeNewsletter = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [ successMessage, setSuccessMessage ] = useState(null);

    const onSubmit = (data: HomeNewsletterFormInputs) => {
        setSuccessMessage(null);
        fetch('/api/newsletter/list/add', { method: 'POST', body: JSON.stringify(data) })
            .then(res => res.json())
            .then(res => {
                if (res.status !== 'subscribed') {
                    setError('email', {
                        type: 'server',
                        message: res.message
                    });

                    return;
                } else {
                    return setSuccessMessage(res.message);
                } 
            });
    }

    return (
        <div className={styles.newsletterHome}>
            <div className={styles.data}>
                <h2 className={styles.title}>Dołącz do newslettera i bądź na bieżąco <strong>za darmo!</strong></h2>
                <p className={styles.text}>Dołącz bezpłatnie do mojego newslettera. Będziesz otrzymywać informacje o nowych artykułach, ciekawostki ze świata programowania i dużo praktycznych porad na temat własnego rozwoju.</p>
                <div className={styles.form}>
                    <InputWrapper icon={InputPlaceholderTypes.NEWSLETTER} error={!_.isEmpty(errors)} success={!!successMessage}>
                        <input 
                            {...register('email', { required: 'Pole email jest wymagane' })}
                            placeholder="Podaj adres e-mail"   
                            onChange={() => setSuccessMessage(null)} 
                        />
                        <MessageWrapper messageType={MessageType.ERROR}>
                            <ErrorMessage errors={errors} name={'email'} />
                        </MessageWrapper>
                        {successMessage && <MessageWrapper messageType={MessageType.SUCCESS}>{successMessage}</MessageWrapper>}
                    </InputWrapper>
                    <Button.B type="submit" label="Zapisz mnie do newslettera" pattern={ButtonType.PRIMARY} onClick={handleSubmit(onSubmit)}/>
                </div>
            </div>
        </div>
    )
}

export default HomeNewsletter;
