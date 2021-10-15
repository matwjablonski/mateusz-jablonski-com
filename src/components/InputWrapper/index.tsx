import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { InputWrapperProps } from './InputWrapper.types';
import styles from './InputWrapper.module.scss';

const InputWrapper: FunctionComponent<InputWrapperProps> = ({ label, name, className, icon, error, success, children }) => (
    <div className={cx(styles.inputWrapper, className, styles[icon], error && styles.error, success && styles.success)}>
        {label && <label htmlFor={name}>{label}</label>}
        {children}
    </div>
);

export default InputWrapper;
