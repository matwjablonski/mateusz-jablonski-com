import React from 'react';
import cx from 'classnames';
import { InputWrapperProps } from './InputWrapper.types';
import styles from './InputWrapper.module.scss';

const InputWrapper= ({ label, name, className, icon, error, success, children }: InputWrapperProps ) => (
    <div className={cx(styles.inputWrapper, className, styles[icon], error && styles.error, success && styles.success)}>
        {label && <label htmlFor={name}>{label}</label>}
        {children}
    </div>
);

export default InputWrapper;
