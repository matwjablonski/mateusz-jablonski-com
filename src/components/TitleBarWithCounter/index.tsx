import React, { FunctionComponent } from 'react';
import PageTitle from '../Title';
import styles from './TitleBarWithCounter.module.scss';
import { TitileBarWithCounterProps } from './TitleBarWithCounter.types';

const TitleBarWithCounter: FunctionComponent<TitileBarWithCounterProps> = ({ title, nextItemName, days }) => {

    const prepareDaysLabel = () => {
        if (days === 1) {
            return `${days} dzień`
        }
        return `${days} dni`
    }

    return (
        <div className={styles.bar}>
            <PageTitle>{title}</PageTitle>
            <div className={styles.counter}>
                <div className={styles.counterText}>
                    <span className={styles.nextTitle}>Następny {nextItemName}</span>
                    <span className={styles.remainingDays}>{prepareDaysLabel()}</span>
                </div>
                <div className={styles.icon}>

                </div>
            </div>
        </div>
    )
}

export default TitleBarWithCounter;
