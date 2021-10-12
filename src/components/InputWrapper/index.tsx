import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { InputWrapperProps } from './InputWrapper.types';
import styles from './InputWrapper.module.scss';

const InputWrapper: FunctionComponent<InputWrapperProps> = ({ label, name, className, icon, error, children }) => (
    <div className={cx(styles.inputWrapper, className, styles[icon], error && styles.error)}>
        {label && <label htmlFor={name}>{label}</label>}
        {children}
    </div>
);

export default InputWrapper;
