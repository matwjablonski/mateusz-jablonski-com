import React from 'react';
import _ from 'lodash';
import styles from './HomeNewsletter.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import InputWrapper from '../InputWrapper';
import { ErrorMessage } from '@hookform/error-message';
import { HomeNewsletterFormInputs } from './HomeNewsletter.types';
import ErrorMessageWrapper from '../ErrorMessageWrapper';
import { InputPlaceholderTypes } from '../InputWrapper/InputWrapper.types';

const HomeNewsletter = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: HomeNewsletterFormInputs) => {
        const res = await fetch('/api/newsletter/list/add', { method: 'POST', body: JSON.stringify(data) });

        res.body.getReader().read().then((a) => console.log(a));   
    }

    return (
        <div className={styles.newsletterHome}>
            <div className={styles.data}>
                <h2 className={styles.title}>Dołącz do newslettera i bądź na bieżąco <strong>za darmo!</strong></h2>
                <p className={styles.text}>Dołącz bezpłatnie do mojego newslettera. Będziesz otrzymywać informacje o nowych artykułach, ciekawostki ze świata programowania i dużo praktycznych porad na temat własnego rozwoju.</p>
                <div className={styles.form}>
                    {console.log()}
                    <InputWrapper icon={InputPlaceholderTypes.NEWSLETTER} className={styles.inputWrapper} error={!_.isEmpty(errors)}>
                        <input 
                            {...register('email', { required: 'Pole email jest wymagane' })}
                            placeholder="Podaj adres e-mail"    
                        />
                        <ErrorMessageWrapper>
                            <ErrorMessage errors={errors} name={'email'} />
                        </ErrorMessageWrapper>
                    </InputWrapper>
                    <Button.B type="submit" label="Zapisz mnie do newslettera" pattern={ButtonType.PRIMARY} onClick={handleSubmit(onSubmit)}/>
                </div>
            </div>
        </div>
    )
}

export default HomeNewsletter;
