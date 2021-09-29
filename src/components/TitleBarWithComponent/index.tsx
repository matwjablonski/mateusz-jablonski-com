import React, { FunctionComponent } from 'react';
import PageTitle from '../Title';
import styles from './TitleBarWithComponent.module.scss';
import { TitleBarWithComponentProps } from './TitleBarWithComponent.types';


const TitleBarWithComponent: FunctionComponent<TitleBarWithComponentProps> = ({ title, text, children }) => {
    return (
        <div className={styles.bar}>
            <div>
                <PageTitle>{title}</PageTitle>
                <p className={styles.text}>{text}</p>
            </div>
            {children}
        </div>
    )
}

export default TitleBarWithComponent;
