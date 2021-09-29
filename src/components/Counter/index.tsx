import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import styles from './Counter.module.scss';
import { CounterProps } from './Counter.types';
import calendar from '../../public/icons/calendar.svg';

const Counter: FunctionComponent<CounterProps> = ({ days, nextItemName }) => {
    const prepareDaysLabel = () => {
        if (days === 1) {
            return `${days} dzień`
        }
        return `${days} dni`
    }

    return (
        <div className={styles.counter}>
            <div className={styles.counterText}>
                <span className={styles.nextTitle}>Następny {nextItemName}</span>
                <span className={styles.remainingDays}>{prepareDaysLabel()}</span>
            </div>
            <div className={styles.icon}>
                <Image src={calendar || `/icons/calendar.svg`} width={24} height={24}/>
            </div>
        </div>
    )
}

export default Counter;
