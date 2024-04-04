import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import styles from './Counter.module.scss';
import { CounterProps } from './Counter.types';
import calendar from '../../public/icons/calendar.svg';
import { useTranslations } from '../../hooks/useTranslations';

const Counter: FunctionComponent<CounterProps> = ({ days, nextItemName, plural }) => {
    const { t } = useTranslations();

    const prepareDaysLabel = () => {
        if (days === null) {
            return t.COMMON.DONT_KNOW;
        }
        if (days === 1) {
            return t.COMMON.TOMORROW;
        }
        return `${days} ${t.COMMON.DAYS}`
    }

    return (
        <div className={styles.counter}>
            <div className={styles.counterText}>
                <span className={styles.nextTitle}>{plural ? t.COMMON.NEXT_PLURAL : t.COMMON.NEXT} {nextItemName}</span>
                <span className={styles.remainingDays}>{prepareDaysLabel()}</span>
            </div>
            <div className={styles.icon}>
                <Image src={calendar || `/icons/calendar.svg`} width={24} height={24} alt=""/>
            </div>
        </div>
    )
}

export default Counter;
