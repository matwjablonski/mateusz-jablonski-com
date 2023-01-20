import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import PageTitle from '../Title';
import styles from './TitleBarWithComponent.module.scss';
import { TitleBarWithComponentProps } from './TitleBarWithComponent.types';


const TitleBarWithComponent: FunctionComponent<TitleBarWithComponentProps> = ({ title, text, type, children, capitalize = true }) => {
    return (
        <div className={styles.bar}>
            <div>
                <PageTitle classes={type && styles[type]} capitalize={capitalize}>{title}</PageTitle>
                <p className={cx(styles.text, styles[type])}>{text}</p>
            </div>
            {children}
        </div>
    )
}

export default TitleBarWithComponent;
