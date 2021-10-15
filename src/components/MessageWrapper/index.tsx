import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './MessageWrapper.module.scss';

export enum MessageType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning',
}

const MessageWrapper: FunctionComponent<{ className?: string, messageType: MessageType }> = ({ children, className, messageType }) => (
    <div className={cx(styles.wrapper, className, styles[messageType])}>
        {children}
    </div>
)

export default MessageWrapper;
