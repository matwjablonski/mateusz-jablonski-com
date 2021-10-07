import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './ErrorMessageWrapper.module.scss';

const ErrorMessageWrapper: FunctionComponent<{ className?: string }> = ({ children, className }) => (
    <div className={cx(styles.errorWrapper, className)}>
        {children}
    </div>
)

export default ErrorMessageWrapper;
