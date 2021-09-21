import React from 'react';
import styles from './HomeNewsletter.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import Input from '../Input';

const HomeNewsletter = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div className={styles.newsletterHome}>
            <div className={styles.data}>
                <h2 className={styles.title}>Dołącz do newslettera i bądź na bieżąco <strong>za darmo!</strong></h2>
                <p className={styles.text}>Dołącz bezpłatnie do mojego newslettera. Będziesz otrzymywać informacje o nowych artykułach, ciekawostki ze świata programowania i dużo praktycznych porad na temat własnego rozwoju.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input register={register} required name="email" className={styles.input}/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <Button.B type="submit" label="Zapisz mnie do newslettera" pattern={ButtonType.PRIMARY}/>
                </form>
            </div>
        </div>
    )
}

export default HomeNewsletter;
