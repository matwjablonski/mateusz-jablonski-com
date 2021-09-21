import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { InputProps } from './Input.types';
import styles from './Input.module.scss';

const Input: FunctionComponent<InputProps> = ({ label, name, register, required, className }) => (
    <div className={cx(styles.inputWrapper, className)}>
        {label && <label htmlFor={name}>{label}</label>}
        <input {...register(name, { required })} className={styles.input}/>
    </div>
);

export default Input;
