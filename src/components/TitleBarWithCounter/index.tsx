import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import PageTitle from '../Title';
import styles from './TitleBarWithCounter.module.scss';
import { TitileBarWithCounterProps } from './TitleBarWithCounter.types';
import calendar from '../../public/icons/calendar.svg';

const TitleBarWithCounter: FunctionComponent<TitileBarWithCounterProps> = ({ title, text, nextItemName, days }) => {

    const prepareDaysLabel = () => {
        if (days === 1) {
            return `${days} dzień`
        }
        return `${days} dni`
    }

    return (
        <div className={styles.bar}>
            <div>
                <PageTitle>{title}</PageTitle>
                <p className={styles.text}>{text}</p>
            </div>
            <div className={styles.counter}>
                <div className={styles.counterText}>
                    <span className={styles.nextTitle}>Następny {nextItemName}</span>
                    <span className={styles.remainingDays}>{prepareDaysLabel()}</span>
                </div>
                <div className={styles.icon}>
                    <Image src={calendar || `/icons/calendar.svg`} width={24} height={24}/>
                </div>
            </div>
        </div>
    )
}

export default TitleBarWithCounter;
