import { useState } from "react";
import _ from 'lodash';
import cx from 'classnames';
import styles from './Newsletter.module.scss';
import { useForm } from "react-hook-form";
import { subscribeNewsletter } from "../../lib/subscribeNewsletter";
import { NewsletterFormInputs } from "./Newsletter.types";
import InputWrapper from '../InputWrapper';
import { ErrorMessage } from '@hookform/error-message';
import MessageWrapper, { MessageType } from '../MessageWrapper';
import Button from '../Button';
import { ButtonType } from "../Button/Button.types";
import { InputPlaceholderTypes } from "../InputWrapper/InputWrapper.types";

const Newsletter = ({ cssFormClass }: { cssFormClass?: string }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [ successMessage, setSuccessMessage ] = useState(null);

    const onSubmit = (data: NewsletterFormInputs) => {
        setSuccessMessage(null);
        subscribeNewsletter<NewsletterFormInputs>(data)
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
        <div className={cx(styles.newsletterForm, cssFormClass)}>
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
    )
}

export default Newsletter;
